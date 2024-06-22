import React, { useEffect, useState } from 'react';
import {
    fetchAdviceForUser,
    fetchUserData, fetchUserDataId
} from '../../../api/authService';
import {loadState, saveState} from '../../../helper/sessionStorage';
import '../../../css/AdviceByTherapist.css';
import photo from '../../../img/3585145_66102.jpg';
import DashboardNav from "../DashboardNav";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {authenticate, authFailure, authSuccess, setLocation} from "../../../redux/authActions";
import {connect} from "react-redux";
import {jwtDecode} from "jwt-decode";
import SideBarUser from "../SideBars/SideBarUser";
let connected = null;
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
function AdviceByTherapist({loading,error,...props}) {
    const [adviceList, setAdviceList] = useState([]);
    const [data,setData]=useState({});
    const history = useNavigate ();

    useEffect(() => {
        if(getRefreshToken()) {
            props.setLocation("/dashboard/userDashboard/advice")
            connected = loadState("connected",false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    setData(response.data);
                    saveState("role",'ROLE_USER')

                    fetchAdviceForUser({userId:response.data.id}).then(response => {
                        setAdviceList(response.data);
                    }).catch(error => {
                        console.error('Error fetching advice', error);
                    });
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

            if (localStorage.getItem('reloadUser') === "true") {
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadUser', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/userDashboard/advice")
            connected = loadState("connected",false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    setData(response.data);
                    saveState("role",'ROLE_USER')

                    fetchAdviceForUser({userId:response.data.id}).then(response => {
                        setAdviceList(response.data);
                    }).catch(error => {
                        console.error('Error fetching advice', error);
                    });
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

            if (localStorage.getItem('reloadUser') === "true") {
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadUser', "false");
                // Reload the page
                window.location.reload();
            }
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);


    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser/>

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
                                <Link to={"/dashboard/userDashboard"} className="btn goBack"
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
                                    <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Advices from My Therapist</h1>
                                </div>
                            </div>

                            <div >
                                {adviceList.length > 0 ? (
                                        adviceList
                                            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                                            .map((advice, index) => (
                                            <div key={index} className={"card shadow"} style={{marginBottom:"20px"}}>
                                                <div className="card-body">
                                                    <div className="card-body" style={{border:"1px solid lightgray"}}>
                                                        <p>- {advice.advice}</p>
                                                    </div>
                                                    <br/>
                                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                                        <i>Therapist Id: {advice.therapistId}</i>
                                                        <i>Date created: {advice.dateAdded}</i>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="card shadow text-center" style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                    <img src={photo} alt={"photo"} style={{width: "400px"}}/>
                                        <h4 style={{color: "#5b5c63", fontSize: "28px"}}>No advice available.</h4>
                                        <p style={{width: "400px", textAlign: "center", color: "#858796"}}>Find more
                                            about yourself by having more conversations.</p>
                                        <Link style={{marginBottom:"30px"}} to={"/dashboard/userDashboard/chatDashboard"}
                                              className={"discoverButton"} type={"button"}>Discover</Link>
                                    </div>
                                )}
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
export default connect(mapStateToProps, mapDispatchToProps)(AdviceByTherapist);