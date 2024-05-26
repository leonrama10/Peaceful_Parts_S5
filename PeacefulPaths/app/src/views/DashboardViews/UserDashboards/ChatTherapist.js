import React, {useEffect, useState} from 'react';
import {
    fetchNextBooking,
    fetchTherapistUserConnectionData,
    fetchUserData, fetchUserTherapistChats,
    fetchUserTherapistConnectionData, sendMessage
} from '../../../api/authService';
import {useLocation, useNavigate} from 'react-router-dom';
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
let meetingAvailable = loadState("meetingAvailable",false)
let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function ChatTherapist({loading,error,...props}){
    const location = useLocation();
    const [refreshKey, setRefreshKey] = React.useState(0);

    useEffect(() => {
        if (meetingAvailable) {
            props.setLocation("/dashboard/userDashboard/chatTherapist")
            localStorage.setItem('reloadUser', "true");
            if (!isUserAuthenticatedBoolean) {
                if (!props.isUserAuthenticated) {
                    props.setLocation('/loginBoot')
                    props.loginFailure("Authentication Failed!!!");
                    history('/loginBoot');
                } else {
                    saveState("isUserAuthenticated", props.isUserAuthenticated)
                }
            } else {
                saveState("isUserAuthenticated", isUserAuthenticatedBoolean)
            }
        }else{
            props.setLocation('/loginBoot')
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [bookingExists,setBookingExists]=useState(false);
    const [nextBooking,setNextBooking]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [chats,setChats]=useState([]);
    const [connectionFailure, setConnectionFailure] = useState('');
    const [therapistData, setTherapistData] = useState({
        id:0,
        email: '',
        name:'',
        surname:'',
        password:'',
        roles:[],
        number:'',
        experience:0,
        allRoles:[],
        university: '',
        location:{},
        gender:{},
    });

    const [values, setValues] = useState({
        therapistId:0,
        userId: 0,
        chatId: 0,
        message:'',
        writtenBy:''
    });


    React.useEffect(() => {
        let interval = null;
        connected = loadState("connected",false)
        const fetchData = async () => {
            try {
                const userData = await fetchUserData();
                if (userData.data.roles.at(0).role === 'ROLE_USER') {
                    setData(userData.data);
                    let userId = userData.data.id

                    const connectionData = await fetchUserTherapistConnectionData(userData.data.id);

                    setTherapistData(connectionData.data);

                    connected = loadState("connected",false)
                    if(connectionData.data.id===0){
                        saveState("connected",false)
                    }else {
                        saveState("connected",true)
                    }

                    const therapistId = connectionData.data.id;

                    fetchNextBooking({therapistId:therapistId,clientId:userId}).then((response) => {
                        if(response.data.bookingId!==0){
                            setBookingExists(true)
                            setNextBooking(response.data)
                        }
                    }).catch((e) => {
                        history('/loginBoot');
                    });

                    const chatData = await fetchUserTherapistChats({therapistId: therapistId, userId: userId});
                    setValues({
                        therapistId: therapistId,
                        userId: userId,
                        chatId: chatData.data.id,
                        message: '',
                        writtenBy: 'User'
                    });
                    if (chatData.data.messages !== null) {
                        setChats(chatData.data.messages);
                    }

                    // Check if the current page is the chat page
                    if (location.pathname === '/dashboard/userDashboard/chatTherapist') {
                        console.log("LOCATIONNNNNNNNN",location.pathname)
                        interval = setInterval(async () => {
                            const chatData = await fetchUserTherapistChats({therapistId: therapistId, userId: userId});
                            if(props.location!=='/dashboard/userDashboard/chatTherapist'){
                                console.log("PROPSSSSSSSSSSSSSS",props.location)
                                props.setLocation("")
                                clearInterval(interval);
                            }
                            if (chatData.data.messages !== null) {
                                setChats(chatData.data.messages);
                            }
                        }, 1800); // Fetches chat data every 1.9 seconds
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

    let hours, minutes;
    if (nextBooking && nextBooking.hour) {
        [hours, minutes] = nextBooking.hour;
    }

    const currentTime = new Date();
    let meetingTime = currentTime;
    if (nextBooking && nextBooking.date) {
        const [year, month, day] = nextBooking.date;
        meetingTime = new Date(year, month - 1, day, hours, minutes);
    }

    const timeDifference = (currentTime - meetingTime) / 1000 / 60;

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

                                    {
                                        chats.length === 0 ? (
                                            <p>No chats available, start your first conversation :) </p>
                                        ) : (
                                            chats.map((data, index) => (
                                                <div key={index} className="card">
                                                    <div className="card-body" style={{ backgroundColor: data.writtenBy === 'User' ? '#4e73df' : 'white' }}>
                                                        <p >{data.message}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    }

                                    <br/>
                                    {bookingExists && nextBooking && timeDifference >= 0 && timeDifference <= 50 &&<form onSubmit={handleSend}>
                                        <input type="text" id="message" name="message" value={values.message}
                                               placeholder="Enter your message here..."
                                               onChange={handleChange}/><br/><br/>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Send message
                                        </button>
                                    </form>}

                                </div>
                            </div>}
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatTherapist);