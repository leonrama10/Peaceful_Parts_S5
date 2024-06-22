import React, {useEffect, useState} from 'react';
import {
    fetchAllUserTherapistOldConnectionData,
    fetchUserData,
    fetchUserTherapistConnectionData, removeTherapist
} from '../../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../../css/AdminDashboard.css';
import DashboardNav from "../../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess
} from "../../../../redux/authActions";
import {connect} from "react-redux";
import SideBarAdmin from "../../SideBars/SideBarAdmin";
import {loadState, saveState} from "../../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
const getRefreshToken = () => {
    const token = localStorage.getItem('REFRESH_TOKEN');

    if (!token || token==="null") {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        return null;
    } else {
        return token;
    }
}

const getAccessToken = () => {
    const token = localStorage.getItem('USER_KEY');

    if (!token || token==="null") {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        return null;
    } else {
        return token;
    }
}
let editUserId =null
let editUserConnectionsFullName =null
function EditUserConnection({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [therapistData, setTherapistData] = useState({
        id:0,
        name:'',
        surname:'',
        dateAdded:'',
    });
    const [allOldTherapistData, setAllOldTherapistData] = useState([]);

    useEffect(() => {
        editUserId = loadState("editUserId", 0);
        editUserConnectionsFullName = loadState("editUserConnectionsFullName", null);
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchUserTherapistConnectionData({id:editUserId}).then((response) => {
                                setTherapistData({
                                    id: response.data.id,
                                    name: response.data.name,
                                    surname: response.data.surname,
                                    dateAdded: response.data.dateAdded
                                });

                                fetchAllUserTherapistOldConnectionData({therapistId:response.data.id,userId:editUserId}).then((response) => {
                                    setAllOldTherapistData(response.data);
                                }).catch((e) => {
                                    history('/loginBoot');
                                });
                        }).catch((e) => {
                            history('/loginBoot');
                        });
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchUserTherapistConnectionData({id:editUserId}).then((response) => {
                            setTherapistData({
                                id: response.data.id,
                                name: response.data.name,
                                surname: response.data.surname,
                                dateAdded: response.data.dateAdded
                            });

                            fetchAllUserTherapistOldConnectionData({therapistId:response.data.id,userId:editUserId}).then((response) => {
                                setAllOldTherapistData(response.data);
                            }).catch((e) => {
                                history('/loginBoot');
                            });
                        }).catch((e) => {
                            history('/loginBoot');
                        });
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else{
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);

    function handleRemove(id) {
        removeTherapist(id).then((response)=>{
            if(response.status===200){
                saveState("connected",false)
                history('/dashboard/userDashboard')
            }
            else{
                //Add error on page if user cant be deleted
                history('/loginBoot');
            }
        }).catch((err)=>{
            history('/loginBoot');
        });
    }

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarAdmin />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/adminDashboard/users"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Users
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>{editUserConnectionsFullName}'s Connections History</h1>
                            </div>

                            <div >
                                <div className="card shadow" style={{display: "flex", flexDirection: "row"}}>
                                    <div className="card-body">
                                        <h4>Current Therapist</h4>

                                        <div className="card-body" style={{display: "flex", justifyContent: "space-between",alignItems: "center"}}>
                                            <div className="card-body">
                                                <h5 className="card-title">{therapistData.name} {therapistData.surname}</h5>
                                                <p className={"card-text"}>Therapist Id: {therapistData.id}</p>
                                                {/*<p className={"card-text"}>Connected since: {therapistData.dateAdded}</p>*/}
                                            </div>
                                            <button className="btn btn-danger"
                                                    onClick={() => handleRemove(data.id)}>Remove Connection
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <br/>

                                {allOldTherapistData.length > 0 &&
                                    <div className="card shadow" style={{marginBottom:"10px"}}>
                                        <div className="card-body">
                                            <h4>Connections History:</h4>
                                            <br/>
                                            {allOldTherapistData
                                                .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
                                                .map((data, index, array) => (
                                                    <div key={index} >
                                                        <div>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{data.name} {data.surname}</h5>
                                                                <p className="card-text">Date connected: {data.dateAdded}</p>
                                                                <p className="card-text">Date removed: {data.removeDate===null?"/":data.removeDate}</p>
                                                            </div>
                                                        </div>
                                                        {index !== array.length - 1 && <hr/>}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUserConnection);