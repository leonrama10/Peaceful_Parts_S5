import React, { useEffect, useState } from 'react';
import {
    fetchUserData,
    fetchUserTherapistConnectionData, therapistFilterByGetStarted, therapistFilterByGetStartedNotConnectedData
} from '../../../api/authService';
import { useNavigate } from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess, setLocation,
    setUserAuthenticationState
} from "../../../redux/authActions";
import { connect } from "react-redux";
import SideBarUser from "../SideBars/SideBarUser";
import TherapistCards from "./TherapistCards";
import { loadState, saveState } from "../../../helper/sessionStorage";

let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated", false);

function UserDashboard({ loading, error, ...props }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        props.setLocation("/dashboard/userDashboard");
        if (!isUserAuthenticatedBoolean) {
            if (!props.isUserAuthenticated) {
                props.loginFailure("Authentication Failed!!!");
                props.setLocation("/loginBoot");
                history('/loginBoot');
            } else {
                props.setUserAuthenticationState(true);
                saveState("isUserAuthenticated", props.isUserAuthenticated);
            }
        } else {
            props.setUserAuthenticationState(true);
            saveState("isUserAuthenticated", isUserAuthenticatedBoolean);
        }

        if (localStorage.getItem('reloadUser') === "true") {
            localStorage.setItem('reloadUser', "false");
            window.location.reload();
        }
    }, []);

    const history = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    const [data, setData] = useState({});
    const [hideTherapists, setHideTherapists] = useState(false);
    const [therapistData, setTherapistData] = useState({
        id: 0,
    });

    useEffect(() => {
        connected = loadState("connected", false);
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                saveState("userId",response.data.id)
                setData(response.data);
                const newFilterUserData = {
                    userId: response.data.id
                };
                fetchUserTherapistConnectionData(response.data.id).then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setTherapistData({
                            id: response.data.id
                        });
                        saveState("therapistId", response.data.id);
                        if (response.data.id === 0) {
                            saveState("connected", false);
                        } else {
                            saveState("connected", true);
                        }

                        if (!hideTherapists) {
                            const newFilterData = {
                                therapistId: response.data.id,
                                userId: newFilterUserData.userId
                            };
                            therapistFilterByGetStartedNotConnectedData(newFilterData).then((response) => {
                                setAllUsers(response.data);
                            }).catch((e) => {
                                history('/loginBoot');
                            });
                        }
                    } else {
                        localStorage.clear();
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    therapistFilterByGetStarted(newFilterUserData).then((response) => {
                        setAllUsers(response.data);
                    }).catch((e) => {
                        history('/loginBoot');
                    });
                    connected = loadState("connected", false);
                    if (e.response) {
                        console.log(e.response.data);
                        console.log(e.response.status);
                    } else if (e.request) {
                        console.log(e.request);
                    } else {
                        console.log('Error', e.message);
                    }
                });
            } else {
                history('/loginBoot');
            }
        }).catch((e) => {
            history('/loginBoot');
        });
    }, []);

    useEffect(() => {
        const results = allUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, allUsers]);

    return (
        <main id="page-top">
            <div id="wrapper">
                <SideBarUser setAllUsers={setAllUsers} setHideTherapists={setHideTherapists} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState} />
                        <div className="container-fluid">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search therapists by name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            {filteredUsers.map((card, index) => (
                                <TherapistCards key={index} title={card.name} email={card.email}
                                    experience={card.experience} number={card.number} id={card.id} />
                            ))}
                        </div>
                    </div>
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>&copy; 2024 PeacefulPaths</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            <script src="../../../vendor/jquery/jquery.min.js"></script>
            <script src="../../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../../../vendor/jquery-easing/jquery.easing.min.js"></script>
            <script src="../../../js/sb-admin-2.min.js"></script>
            <script src="../../../vendor/chart.js/Chart.min.js"></script>
            <script src="../../../js/demo/chart-area-demo.js"></script>
            <script src="../../../js/demo/chart-pie-demo.js"></script>
        </main>
    );
}

const mapStateToProps = ({ auth }) => {
    console.log("state ", auth);
    return {
        loading: auth.loading,
        error: auth.error,
        isUserAuthenticated: auth.isUserAuthenticated,
        location: auth.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
