import React, {useEffect, useState} from 'react';
import {
    fetchUserData, fetchUserDataId,
    fetchUserTherapistConnectionData
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import {Alert} from "reactstrap";
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation,
    setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";

let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
const chatTherapistId = loadState("chatTherapistId",false)
function OldChatTherapist({loading,error,...props}){

    useEffect(() => {
        props.setLocation("/dashboard/userDashboard/oldChatTherapist")
        if(!isUserAuthenticatedBoolean){
            if (!props.isUserAuthenticated){
                props.loginFailure("Authentication Failed!!!");
                props.setLocation("/loginBoot")
                history('/loginBoot');
            }else{
                props.setUserAuthenticationState(true)
                saveState("isUserAuthenticated",props.isUserAuthenticated)
            }
        }else{
            props.setUserAuthenticationState(true)
            saveState("isUserAuthenticated",isUserAuthenticatedBoolean)
        }

        if (localStorage.getItem('reloadUser')==="true") {
            // Set the 'reloaded' item in localStorage
            localStorage.setItem('reloadUser', "false");
            // Reload the page
            window.location.reload();
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [oldChats,setOldChats]=useState([]);
    const [connectionFailure, setConnectionFailure] = useState('');
    const [therapistData, setTherapistData] = useState({
        id:0,
        name:'',
        surname:''
    });

    React.useEffect(() => {
        connected = loadState("connected",false)
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                setData(response.data);
                const userId = response.data.id

                fetchUserDataId({therapistId:response.data.id}).then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setTherapistData({
                            id: response.data.id,
                            name: response.data.name,
                            surname: response.data.surname
                        });

                        fetchUserTherapistOldChats({therapistId:response.data.id,userId:userId}).then((response) => {
                                setOldChats(response.data);
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                    } else {
                        localStorage.clear();
                        history('/loginBoot');
                    }
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



    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser hideFilterMenu={hideFilterMenu}/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState}/>

                        { connectionFailure &&
                            <Alert style={{marginTop:'20px'}} variant="danger">
                                {connectionFailure}
                            </Alert>
                        }

                        <div className="container-fluid">
                            {connected && <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title">Full
                                        name: {therapistData.name} {therapistData.surname}</h5>
                                    <br/>

                                    {oldChats.map((data, index) => (
                                        <div key={index} className="card">
                                            <div className="card-body">

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

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
        isUserAuthenticated: auth.isUserAuthenticated,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OldChatTherapist);