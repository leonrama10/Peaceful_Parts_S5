import React, { useEffect, useState } from 'react';
import { fetchAllUsersConnectedData, sendAdviceToUser, fetchUserData } from '../../../api/authService';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess, setLocation, setTherapistAuthenticationState } from "../../../redux/authActions";
import { loadState, saveState } from "../../../helper/sessionStorage";
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';

const isTherapistAuthenticatedBoolean = loadState("isTherapistAuthenticated", false);

const SendAdvice = ({ loading, error, ...props }) => {
    const history = useNavigate();
    const [data, setData] = useState({});
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [advice, setAdvice] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");

    useEffect(() => {
        props.setLocation("/dashboard/therapistDashboard/sendAdvice");
        if (!isTherapistAuthenticatedBoolean) {
            if (!props.isTherapistAuthenticated) {
                props.setLocation('/loginBoot');
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            } else {
                props.setTherapistAuthenticationState(true);
                saveState("isTherapistAuthenticated", props.isTherapistAuthenticated);
            }
        } else {
            props.setTherapistAuthenticationState(true);
            saveState("isTherapistAuthenticated", isTherapistAuthenticatedBoolean);
        }

        if (localStorage.getItem('reloadTherapist') === "true") {
            localStorage.setItem('reloadTherapist', "false");
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                setData(response.data);

                fetchAllUsersConnectedData(response.data.id).then((response) => {
                    setConnectedUsers(response.data);
                }).catch((e) => {
                    history('/loginBoot');
                });
            } else {
                history('/loginBoot');
            }
        }).catch((e) => {
            history('/loginBoot');
        });
    }, [history]);

    const handleSendAdvice = () => {
        const adviceData = {
            userId: selectedUserId,
            advice: advice,
            therapist_id: data.id
        };
        console.log("Sending advice data:", adviceData);

        sendAdviceToUser(adviceData).then((response) => {
            console.log("Response from API:", response);
            if (response.status === 200) {
                alert("Advice sent successfully!");
                setAdvice("");
                setSelectedUserId("");
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
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Send Advice</h6>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="userSelect">Select User</label>
                                        <select className="form-control" id="userSelect" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                                            <option value="">Select a user</option>
                                            {connectedUsers.map((user) => (
                                                <option key={user.id} value={user.id}>{user.name} {user.surname}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="adviceText">Advice</label>
                                        <textarea className="form-control" id="adviceText" rows="3" value={advice} onChange={(e) => setAdvice(e.target.value)}></textarea>
                                    </div>
                                    <button className="btn btn-primary" onClick={handleSendAdvice}>Send Advice</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        loading: auth.loading,
        error: auth.error,
        isTherapistAuthenticated: auth.isTherapistAuthenticated,
        location: auth.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setTherapistAuthenticationState: (boolean) => dispatch(setTherapistAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendAdvice);
