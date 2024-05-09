import React, {useEffect, useState} from 'react';
import {
    fetchAvailableSlots,
    fetchUserData,
    fetchUserTherapistConnectionData, removeTherapist
} from '../../../api/authService';
import {useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import {Alert} from "reactstrap";
import {
    authenticate,
    authFailure,
    authSuccess,
    setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function UserDashboardTherapists({loading,error,...props}){

    useEffect(() => {
        if(!isUserAuthenticatedBoolean){
            if (!props.isUserAuthenticated){
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }else{
                saveState("isUserAuthenticated",props.isUserAuthenticated)
            }
        }else{
            saveState("isUserAuthenticated",isUserAuthenticatedBoolean)
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [connectionFailure, setConnectionFailure] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
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

    React.useEffect(() => {
        connected = loadState("connected",false)
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                setData(response.data);

                fetchUserTherapistConnectionData(response.data.id).then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setTherapistData({
                           id: response.data.id,
                           email: response.data.email,
                           name: response.data.name,
                           surname: response.data.surname,
                           password: response.data.password,
                           roles: response.data.roles,
                           number: response.data.number,
                           experience: response.data.experience,
                           location: response.data.location,
                           allRoles: response.data.allRoles,
                           University: response.data.University,
                           gender: response.data.gender
                        });
                        connected = loadState("connected",false)
                        if(response.data.id===0){
                            saveState("connected",false)
                        }else {
                            saveState("connected",true)
                        }

                        const newSessionData = {
                            therapistId: response.data.id
                        };

                        fetchAvailableSlots(newSessionData).then((response) => {
                            setAvailableSlots(response.data);
                        }).catch((e) => {
                            history('/loginBoot');
                        });
                    } else {
                        localStorage.clear();
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    connected = loadState("connected",false)
                    if (e.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        setConnectionFailure(e.response.data);
                        console.log(e.response.data); // This will log 'Connect with a therapist!!!'
                        console.log(e.response.status); // This will log 404 (NOT_FOUND)
                    } else if (e.request) {
                        // The request was made but no response was received
                        console.log(e.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
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

    function handleSubmit() {

    }

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
                            {connected && <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Full name: {therapistData.name} {therapistData.surname}</h5>
                                    <p className="card-text">Email: {therapistData.email}</p>
                                    <p className="card-text">Phone: {therapistData.number}</p>
                                    <p className="card-text">Gender: {therapistData.gender.gender}</p>
                                    <p className="card-text">Experience: {therapistData.experience} years</p>
                                    <p className="card-text">Location: {therapistData.location.location}</p>
                                    <p className="card-text">Select next session date and time:</p>
                                    <p className="card-text">Select next session date and time:</p>
                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor="sessionDate">Date:</label><br/>
                                        <input type="date" id="sessionDate" value={date}
                                               onChange={e => setDate(e.target.value)}/><br/>
                                        {/*show the list of hours that are not booked for the selected date*/}
                                        {/*VERY IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
                                    </form>
                                    <br/>

                                    <button onClick={() => handleRemove(data.id)}>Remove Therapist</button>
                                </div>
                            </div>}
                        </div>

                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current
                            session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel
                            </button>
                            <a className="btn btn-primary" href="login.html">Logout</a>
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
        isUserAuthenticated: auth.isUserAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardTherapists);