import React, {useEffect, useRef, useState} from 'react';
import {
    fetchTherapistUserConnectionData,
    fetchUserData, fetchUserTherapistChats,
    sendMessage
} from '../../../api/authService';
import {useLocation, useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess, setLocation,
    setTherapistAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import SideBarTherapist from "../SideBars/SideBarTherapist";
let userId = loadState("chatUserId",0)
const isTherapistAuthenticatedBoolean = loadState("isTherapistAuthenticated",false)

function ChatClient({loading,error,...props}){
    const [refreshKey, setRefreshKey] = React.useState(0);
    const history = useNavigate ();
    const location = useLocation();
    const [data,setData]=useState({});
    const [chats,setChats]=useState([]);
    const [userData, setUserData] = useState({});
    const [values, setValues] = useState({
        therapistId:0,
        userId: 0,
        chatId: 0,
        message:'',
        writtenBy:''
    });

    useEffect(() => {
        props.setLocation("/dashboard/therapistDashboard/chatClient")
        localStorage.setItem('reloadTherapist', "true");
        if(!isTherapistAuthenticatedBoolean){
            if (!props.isTherapistAuthenticated){
                props.setLocation('/loginBoot')
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }else{
                saveState("isTherapistAuthenticated",props.isTherapistAuthenticated)
            }
        }else{
            saveState("isTherapistAuthenticated",isTherapistAuthenticatedBoolean)
        }
    }, []);

    React.useEffect(() => {
        let interval = null;

        const fetchData = async () => {
            try {
                const userData = await fetchUserData();
                if (userData.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setData(userData.data);
                    const therapistId = userData.data.id;
                    userId = loadState("chatUserId", 0);

                    const connectionData = await fetchTherapistUserConnectionData({therapistId: therapistId, userId: userId});

                    setUserData(connectionData.data);
                    userId = connectionData.data.id;

                    const chatData = await fetchUserTherapistChats({therapistId: therapistId, userId: userId});
                    setValues({
                        therapistId: therapistId,
                        userId: userId,
                        chatId: chatData.data.id,
                        message: '',
                        writtenBy: 'Therapist'
                    });
                    if (chatData.data.messages !== null) {
                        setChats(chatData.data.messages);
                    }


                    // Check if the current page is the chat page
                    if (location.pathname === '/dashboard/therapistDashboard/chatClient') {
                        console.log("LOCATIONNNNNNNNN",location.pathname)
                        interval = setInterval(async () => {
                            const chatData = await fetchUserTherapistChats({therapistId: therapistId, userId: userId});
                            if(props.location!=='/dashboard/therapistDashboard/chatClient'){
                                console.log("PROPSSSSSSSSSSSSSS",props.location)
                                props.setLocation("")
                                clearInterval(interval);
                            }
                            if (chatData.data.messages !== null) {
                                setChats(chatData.data.messages);
                            }
                        }, 2000); // Fetches chat data every 2 seconds
                    }else {
                        clearInterval(interval);
                    }

                } else {
                    history('/loginBoot');
                }
            } catch (e) {
                history('/loginBoot');
            }
        };

        fetchData();

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [refreshKey]);

    function handleSend(evt) {
        evt.preventDefault();

        sendMessage(values).then((response) => {
            setValues({...values, message: ''});
            setRefreshKey(oldKey => oldKey + 1);
        }).catch((err) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something BABAAAAAA!Please Try Again');

                }
            } else {
                console.log("ERROR: ", err)
                props.loginFailure('Something NaNAAAAA!Please Try Again');
            }
        });
    }

    React.useEffect(() => {
        console.log("VALUESSSSSSSSS",values)
    }, [values])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setValues(values => ({ ...values, [name]: value }));
    };


    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setTherapistAuthenticationState={props.setTherapistAuthenticationState}/>

                        <div className="container-fluid">
                            <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title">Full
                                        name: {userData.name} {userData.surname}</h5>
                                    <br/>

                                    <div className="chat-content">
                                        {
                                            chats.length === 0 ? (
                                                <p>No chats available, start your first conversation :) </p>
                                            ) : (
                                                chats.map((data, index) => (
                                                    <div key={index} className="card">
                                                        <div className="card-body"
                                                             style={{backgroundColor: data.writtenBy === 'Therapist' ? '#4e73df' : 'white'}}>
                                                            <p>{data.message}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                    <br/>
                                    <form onSubmit={handleSend}>
                                        <input type="text" id="message" name="message" value={values.message}
                                               placeholder="Enter your message here..."
                                               onChange={handleChange}/><br/><br/>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Send message
                                        </button>
                                    </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatClient);