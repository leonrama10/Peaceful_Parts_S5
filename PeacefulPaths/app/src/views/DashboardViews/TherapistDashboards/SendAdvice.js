import React, { useEffect, useState } from 'react';
import {fetchAllUsersConnectedData, sendAdviceToUser, fetchUserData, fetchUserDataId} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess, setLocation} from "../../../redux/authActions";
import { loadState, saveState } from "../../../helper/sessionStorage";
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import {jwtDecode} from "jwt-decode";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import DashboardNav from "../DashboardNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

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
let clientAdviceId = 0
const SendAdvice = ({ loading, error, ...props }) => {
    const history = useNavigate();
    const [data, setData] = useState({});
    const [connectedUser, setConnectedUser] = useState({});
    const [advice, setAdvice] = useState("");

    useEffect(() => {
        clientAdviceId = loadState("clientAdviceId",0)
        if (getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/sendAdvice")

            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setData(response.data);

                    fetchUserDataId({id:clientAdviceId}).then((response) => {
                        setConnectedUser(response.data);
                    }).catch((e) => {
                        history('/loginBoot');
                    });
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId", 0)
                saveState("meetingAvailableTherapist/" + userId, false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        } else if (getAccessToken()) {
            props.setLocation("/dashboard/therapistDashboard/sendAdvice")

            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setData(response.data);

                    fetchUserDataId({id:clientAdviceId}).then((response) => {
                        setConnectedUser(response.data);
                    }).catch((e) => {
                        history('/loginBoot');
                    });
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId", 0)
                saveState("meetingAvailableTherapist/" + userId, false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        } else {
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    const handleSendAdvice = () => {
        const adviceData = {
            userId: connectedUser.id,
            advice: advice,
            therapistId: data.id
        };

        sendAdviceToUser(adviceData).then((response) => {
            console.log("Response from API:", response);
            if (response.status === 200) {
                alert("Advice sent successfully!");
                setAdvice("");
            } else {
                alert("Failed to send advice.");
            }
        }).catch((e) => {
            console.error("Error sending advice:", e);
        });
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
                                <Link to={"/dashboard/therapistDashboard/users"} className="btn goBack"
                                      style={{color: "#0d6efd", marginLeft: "-10px"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to
                                    Clients
                                </Link>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Advice Center</h1>
                                </div>
                            </div>

                            <div className="card shadow ">
                                <div className="card-body">
                                    <h4 >Send Advice
                                        to {connectedUser.name} {connectedUser.surname}</h4>

                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="adviceText" style={{color:"#0d6efd"}}>Advice</label>
                                            <textarea placeholder={"Write your advice here..."} className="form-control"
                                                      id="adviceText" rows="3" value={advice}
                                                      onChange={(e) => setAdvice(e.target.value)}></textarea>
                                        </div>
                                        <div style={{display: "flex", justifyContent: "end", alignItems: "center"}}>
                                            <button className="btn btn-primary" onClick={handleSendAdvice}>Send Advice</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
    ;
};

const mapStateToProps = ({auth}) => {
    return {
        loading: auth.loading,
        error: auth.error,
        location: auth.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendAdvice);
