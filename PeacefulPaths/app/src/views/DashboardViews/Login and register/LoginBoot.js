import React,{useState} from 'react';
import {connect} from 'react-redux';
import {fetchUserData, userLogin} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import blueDog from "../../../img/wp8767335.jpg.png";
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation
} from "../../../redux/authActions";
import {Alert} from "reactstrap";
import {saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
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

function LoginBoot({loading,error,...props}){

    const history = useNavigate ();
    const [values, setValues] = useState({
        email: '',
        password: '',
        rememberMe:false
    });

    React.useEffect(()=>{
        if(getRefreshToken()) {

            let confirmLogout = window.confirm("You are already logged in. Do you want to log out?");

            if (confirmLogout) {
                saveState("chatTherapistId", 0);
                saveState("chatUserId", 0);
                saveState("therapistBookingId", 0);
                saveState("addNotesBoolean",false)
                saveState("endSessionTherapist",false);
                saveState("startTimerTherapist",false)
                saveState("startTimerValueTherapist",0)
                saveState("userRole", null);
                saveState("editUserBookingId", 0);
                saveState("editUserTherapistId", 0);
                saveState("editUserId", 0);
                saveState("editTherapistPastClientId", 0);
                saveState("editTherapistClientId", 0);
                saveState("editTherapistClientBookingId", 0);
                saveState("clientHistoryNotesId",0)
                saveState("meetingAvailableUser",false)
                saveState("startTimer",false)
                saveState("endSession",false);
                saveState("startTimerValue",0)
                saveState("clientInfoId",0)
                saveState("clientNotesId",0)
                saveState("therapistClientNoteId", 0);
                saveState("editTherapistId", 0);
                saveState("userInfoId", 0);
                saveState("therapistInfoId",0)
                saveState("chatStateLocation",'')
                saveState("therapistId",0)
                saveState("role", '')
                props.setUser(null);
                saveState("connected",false)
            }else {
                fetchUserData().then((response) => {
                    if (response.data.roles.at(0)){
                        if (response.data.roles.at(0).role === 'ROLE_ADMIN') {

                            saveState("role",'ROLE_ADMIN')
                            props.setLocation("/dashboard/adminDashboard")
                            history('/dashboard/adminDashboard');
                        }else if (response.data.roles.at(0).role === 'ROLE_USER') {

                            saveState("role",'ROLE_USER')
                            props.setLocation("/dashboard/userDashboard")
                            history('/dashboard/userDashboard');
                        } else if(response.data.roles.at(0).role === 'ROLE_THERAPIST'){

                            saveState("role",'ROLE_THERAPIST')
                            props.setLocation("/dashboard/therapistDashboard")
                            history('/dashboard/therapistDashboard');
                        }
                    }
                }).catch((e) => {
                    history('/loginBoot');
                });
            }
        }else {
            saveState("chatTherapistId", 0);
            saveState("chatUserId", 0);
            saveState("therapistBookingId", 0);
            saveState("addNotesBoolean",false)
            saveState("endSessionTherapist",false);
            saveState("startTimerTherapist",false)
            saveState("startTimerValueTherapist",0)
            saveState("userRole", null);
            saveState("editUserBookingId", 0);
            saveState("editUserTherapistId", 0);
            saveState("editUserId", 0);
            saveState("editTherapistPastClientId", 0);
            saveState("editTherapistClientId", 0);
            saveState("editTherapistClientBookingId", 0);
            saveState("clientHistoryNotesId",0)
            saveState("meetingAvailableUser",false)
            saveState("startTimer",false)
            saveState("endSession",false);
            saveState("startTimerValue",0)
            saveState("clientInfoId",0)
            saveState("clientNotesId",0)
            saveState("therapistClientNoteId", 0);
            saveState("editTherapistId", 0);
            saveState("userInfoId", 0);
            saveState("therapistInfoId",0)
            saveState("chatStateLocation",'')
            saveState("therapistId",0)
            saveState("role", '')
            props.setUser(null);
            saveState("connected",false)
        }
    },[])

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        // Email and password regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

        // Validate email and password
        if (!emailRegex.test(values.email)) {
            console.log("Invalid email format");
            return;
        }
        if (!passwordRegex.test(values.password)) {
            props.loginFailure('Minimum eight characters, at least one letter and one number!');
            return;
        }

        userLogin(values).then((response)=>{
            if(response.status===200){
                props.setUser(response.data);
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        saveState("loadPage",true)
                        saveState("role",'ROLE_ADMIN')
                        props.setLocation("/dashboard/adminDashboard")
                        history('/dashboard/adminDashboard');
                    }else if (response.data.roles.at(0).role === 'ROLE_USER') {
                        saveState("loadPage",true)
                        saveState("role",'ROLE_USER')
                        props.setLocation("/dashboard/userDashboard")
                        history('/dashboard/userDashboard');
                    } else if(response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                        saveState("loadPage",true)
                        saveState("role",'ROLE_THERAPIST')
                        props.setLocation("/dashboard/therapistDashboard")
                        history('/dashboard/therapistDashboard');
                    }
                }
                else{
                    history('/loginBoot');
                }
            }
            else{
                props.loginFailure('Something went wrong! Please try again.');
            }
        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something went wrong! Please try again.');
                }
            }
            else{
                console.log("ERROR: ",err)
                props.loginFailure('Something went wrong! Please try again.');
            }
        });
    }

    const handleChange = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        }));
    };


    return (
        <main className="bg-gradient-primary" style={{paddingTop:"58.4px"}}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "10px",
                minHeight: "calc(100vh - 190px)",
                overflow: "auto"
            }}>
                <div className="card o-hidden border-0 shadow-lg " style={{width: '100%',height:"500px"}}>
                    <div className="row" style={{width: '100%',height:"500px"}}>
                        <div className="col-lg-6 d-none d-lg-block"
                             style={{backgroundImage: `url(${blueDog})`, backgroundSize: 'cover'}}></div>
                        <div className="col-lg-6" >
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                </div>
                                {error &&
                                    <Alert style={{marginTop: '20px'}} color="danger">
                                        {error}
                                    </Alert>
                                }
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user"
                                               id="exampleInputEmail" aria-describedby="emailHelp"
                                               placeholder="Enter Email Address..." value={values.email}
                                               name="email" onChange={handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user"
                                               id="exampleInputPassword" placeholder="Password"
                                               value={values.password} onChange={handleChange}
                                               name="password"
                                               autoComplete="new-password" required/>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox small">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customCheck"
                                                checked={values.rememberMe}
                                                onChange={handleChange}
                                                name="rememberMe"
                                            />
                                            <label className="custom-control-label" htmlFor="customCheck">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                        Login
                                    </button>
                                </form>
                                <hr/>
                                <div className="text-center">
                                    <Link className="small" to="/forgotPassBoot">Forgot Password?</Link>
                                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginBoot);