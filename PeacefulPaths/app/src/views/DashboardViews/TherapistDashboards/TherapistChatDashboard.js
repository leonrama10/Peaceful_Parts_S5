import React, {useEffect, useState} from 'react';
import {
    fetchAllUsersConnectedData,
    fetchUserData
} from '../../../api/authService';
import {useLocation, useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation,
    setTherapistAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import SideBarTherapist from "../SideBars/SideBarTherapist";
const isTherapistAuthenticatedBoolean = loadState("isTherapistAuthenticated",false)
function TherapistChatDashboard({loading,error,...props}){

    useEffect(() => {
        props.setLocation("/dashboard/therapistDashboard/therapistChatDashboard")
        if(!isTherapistAuthenticatedBoolean){
            if (!props.isTherapistAuthenticated){
                props.setLocation('/loginBoot')
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }else{
                props.setTherapistAuthenticationState(true)
                saveState("isTherapistAuthenticated",props.isTherapistAuthenticated)
            }
        }else{
            props.setTherapistAuthenticationState(true)
            saveState("isTherapistAuthenticated",isTherapistAuthenticatedBoolean)
        }

        if (localStorage.getItem('reloadTherapist')==="true") {
            // Set the 'reloaded' item in localStorage
            localStorage.setItem('reloadTherapist', "false");
            // Reload the page
            window.location.reload();
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUserData, setAllUserData] = useState([]);
    const [allOldUsersData, setAllOldUsersData] = useState([]);

    React.useEffect(() => {
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                setData(response.data);
                const therapistId = response.data.id;

                fetchAllUsersConnectedData(response.data.id).then((response) => {
                        setAllUserData(response.data);

                    //     // fetchAllTherapistUserOldConnectionData({therapistId:therapistId,userId:response.data.id}).then((response) => {
                    //     //     setAllUsersData(response.data);
                    //     // }).catch((e) => {
                    //     //     history('/loginBoot');
                    //     // });
                }).catch((e) => {
                    history('/loginBoot');
                });
            } else {
                history('/loginBoot');
            }
        }).catch((e) => {
            history('/loginBoot');
        });
    }, []);

    function handleClick(id) {
        saveState("chatUserId", id);
        props.setLocation("/dashboard/therapistDashboard/chatClient")
        history("/dashboard/therapistDashboard/chatClient")
    }

    function handleOldClick(id) {
        saveState("chatUserId", id);
        history("/dashboard/therapistDashboard/oldChatClient")
    }

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setTherapistAuthenticationState={props.setTherapistAuthenticationState}/>

                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    CONNECTED CLIENTS CHATS:
                                    {allUserData.map((data, index) => (
                                        <div key={index} className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Full
                                                    name: {data.name} {data.surname}</h5>
                                                <br/>
                                                <button onClick={() => handleClick(data.id)}>Chat With Client
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr/>
                                <div className="card-body">
                                    NOT CONNECTED CLIENTS CHATS:
                                    {/*{allOldUsersData.map((data, index) => (*/}
                                    {/*    <div key={index} className="card">*/}
                                    {/*        <div className="card-body">*/}
                                    {/*            <h5 className="card-title">Full*/}
                                    {/*                name: {data.name} {data.surname}</h5>*/}
                                    {/*            <br/>*/}
                                    {/*            <button onClick={() => handleOldClick(data.id)}>See Old Chats*/}
                                    {/*            </button>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*))}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="../../../vendor/jquery/jquery.min.js"></script>
            <script src="../../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../../../vendor/jquery-easing/jquery.easing.min.js"></script>
        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isTherapistAuthenticated: auth.isTherapistAuthenticated,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setTherapistAuthenticationState: (boolean) => dispatch(setTherapistAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistChatDashboard);