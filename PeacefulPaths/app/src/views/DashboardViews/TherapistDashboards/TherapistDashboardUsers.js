import React, {useEffect, useState} from 'react';
import {fetchAllUsersConnectedData, fetchUserData, userDelete} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import photo from "../../../img/3585145_66102-removebg-preview.jpg";
import DashboardFooter from "../DashboardFooter";
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
function TherapistDashboardUsers({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/users")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setData(response.data);

                    saveState("role",'ROLE_THERAPIST')

                    fetchAllUsersConnectedData({id:response.data.id}).then((response)=>{
                        setAllUsers(response.data)
                    }).catch((e)=>{
                        history('/loginBoot');
                    })
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                history('/loginBoot');
            })

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/therapistDashboard/users")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setData(response.data);

                    saveState("role",'ROLE_THERAPIST')

                    fetchAllUsersConnectedData({id:response.data.id}).then((response)=>{
                        setAllUsers(response.data)
                    }).catch((e)=>{
                        history('/loginBoot');
                    })
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                history('/loginBoot');
            })

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    function handleDelete(id) {
        userDelete(id).then((response)=>{
            if(response.status===200){
                window.location.reload();
            }
            else{
                //Add error on page if user cant be deleted
                history('/dashboard/therapistDashboard');
            }
        }).catch((err)=>{
            history('/loginBoot');
        });
    }

    const handleClientInfo = (id) => {
        saveState("clientInfoId",id)
        history(`/dashboard/therapistDashboard/users/info`);
    };

    const handleNotes = (id) => {
        saveState("clientNotesId",id)
        history(`/dashboard/therapistDashboard/users/oldNotes`);
    };

    //send advice so tu punu !!! :)

    const handleSendAdvice = (id) => {
        saveState("clientAdviceId",id)
        history(`/dashboard/therapistDashboard/sendAdvice`);
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <button className="btn btn-info btn-sm" style={{color: "white"}}
                        onClick={() => handleClientInfo(rowData.id)}>
                    Info
                </button>

                <button style={{marginLeft: "5px", color: "white"}}
                        className="btn btn-warning btn-sm"
                        onClick={() => handleNotes(rowData.id)}>
                    Notes
                </button>
                <button style={{marginLeft: "5px"}} className="btn btn-success btn-sm"
                        onClick={() => handleSendAdvice(rowData.id)}>
                    Send Advice
                </button>
                <button style={{marginLeft: "5px"}}
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(rowData.id)}>
                    Remove
                </button>

            </React.Fragment>
        );
    };

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                    <DashboardNav data={data} setUser={props.setUser}/>

                        <div className="container-fluid">
                            <div style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: 'center',
                                marginTop: "-14px"
                            }}>
                                <Link to={"/dashboard/therapistDashboard"} className="btn goBack"
                                      style={{color: "#0d6efd", marginLeft: "-10px"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to
                                    Dashboard
                                </Link>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Current
                                        Clients</h1>
                                </div>
                                <div style={{
                                    marginTop: "-10px",
                                    border: "1px solid #0d6efd",
                                    borderRadius: "5px"
                                }}>
                                    <Link to={"/dashboard/therapistDashboard/history"}
                                          className="btn goBack"
                                          style={{color: "#0d6efd"}}
                                          type="button"
                                    >Go to Clients History
                                        <FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "6.5px"}}/>
                                    </Link>
                                </div>
                            </div>
                            <br/>

                            {allUsers.length > 0 ? <div className="card shadow ">
                                    <div className="card-body">
                                        <DataTable value={allUsers} removableSort className="custom-gridlines"
                                                   tableStyle={{minWidth: '50rem'}}
                                                   paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                                            <Column field="id" header="Id" sortable
                                            ></Column>
                                            <Column field="name" header="Name" sortable
                                            ></Column>
                                            <Column field="surname" header="Surname" sortable
                                            ></Column>
                                            <Column field="email" header="Email" sortable
                                            ></Column>
                                            <Column field="number" header="Phone Number" sortable
                                            ></Column>
                                            <Column field="gender.gender" header="Gender" sortable
                                            ></Column>
                                            <Column field="location.location" header="Location" sortable
                                            ></Column>
                                            <Column field="dateAdded" header="Date Added" sortable
                                            ></Column>
                                            <Column header="Actions" body={actionBodyTemplate}></Column>
                                        </DataTable>
                                    </div>
                            </div>:
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingTop:"20px"
                                }}>
                                    <img src={photo} style={{maxWidth: "250px"}} alt={"photo"}/>
                                    <h4 style={{color: "#5b5c63", fontSize: "28px"}}>No Current Clients</h4>
                                    <p style={{
                                        maxWidth: "400px",
                                        textAlign: "center",
                                        color: "#858796"
                                    }}>Take advantage of this delightful interlude to recharge your soul!</p>
                                </div>
                            }
                        </div>
                    </div>
                    <DashboardFooter />
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistDashboardUsers);