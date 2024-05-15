import React,{useState} from 'react';
import {connect} from 'react-redux';
import {userLogin} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.min.css';
import {
    authenticate,
    authFailure,
    authSuccess,
    setAdminAuthenticationState,
    setTherapistAuthenticationState, setUserAuthenticationState
} from "../../../redux/authActions";
import {Alert} from "reactstrap";
import {saveState} from "../../../helper/sessionStorage";


function LoginBoot({loading,error,...props}){
    const history = useNavigate ();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    React.useEffect(()=>{
        saveState("loggedInState", false)
        saveState("role",'')
    },[])

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response)=>{
            if(response.status===200){
                props.setUser(response.data);
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        saveState("loggedInState",true)
                        saveState("role",'ROLE_ADMIN')
                        props.setAdminAuthenticationState(true)
                        history('/dashboard/adminDashboard');
                    }else if (response.data.roles.at(0).role === 'ROLE_USER') {
                        saveState("loggedInState",true)
                        saveState("role",'ROLE_USER')
                        props.setUserAuthenticationState(true)
                        history('/dashboard/userDashboard');
                    } else if(response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                        saveState("loggedInState",true)
                        saveState("role",'ROLE_THERAPIST')
                        props.setTherapistAuthenticationState(true)
                         history('/dashboard/therapistDashboard');
                    }
                }
                else{
                    history('/loginBoot');
                }
            }
            else{
                props.loginFailure('Something LEKAAAAAAAA!Please Try Again');
            }
        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                props.loginFailure('Something NaNAAAAA!Please Try Again');
            }
        });
    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    return (
            <main className="bg-gradient-primary">
            <style>
            {`
            .bg-gradient-primary{
            height: 100vh;
            }
            .container{
            height: 100vh;
            }
            `}
            </style>

            <div className="container">


                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">

                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            { error &&
                                                <Alert style={{marginTop:'20px'}} variant="danger">
                                                    {error}
                                                </Alert>
                                            }
                                            <form className="user" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                           id="exampleInputEmail" aria-describedby="emailHelp"
                                                           placeholder="Enter Email Address..." value={values.email} name="email" onChange={handleChange} required/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                           id="exampleInputPassword" placeholder="Password" value={values.password} onChange={handleChange} name="password"
                                                           autoComplete="new-password" required/>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                            <label className="custom-control-label" htmlFor="customCheck">Remember
                                                                Me</label>
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

                    </div>

                </div>

            </div>


            <script src="../../../vendor/jquery/jquery.min.js"></script>
            <script src="../../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

            <script src="../../../vendor/jquery-easing/jquery.easing.min.js"></script>

            <script src="../../../js/sb-admin-2.min.js"></script>

            </main>
    )

}
const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isAdminAuthenticated: auth.isAdminAuthenticated,
        isTherapistAuthenticated: auth.isTherapistAuthenticated,
        isUserAuthenticated: auth.isUserAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setAdminAuthenticationState: (boolean) => dispatch(setAdminAuthenticationState(boolean)),
        setTherapistAuthenticationState: (boolean) => dispatch(setTherapistAuthenticationState(boolean)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginBoot);