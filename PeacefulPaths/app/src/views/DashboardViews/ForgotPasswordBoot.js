import React,{useState} from 'react';
import {userSendEmail} from '../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../helper/sessionStorage";
loadState("ResetPassword",false)
function ForgotPasswordBoot({loading,error,...props}){

    const history = useNavigate ();
    const [forgotPasswordFailure, setForgotPasswordFailure] = useState('');
    const [values, setValues] = useState({
        email: ''
    });

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        userSendEmail(values).then((response)=>{
            if(response.status===201){

                // props.setUser(response.data);
                if (response.data.roles.at(0)){
                    saveState("ResetPassword",true)
                    history('/verifyPasswordInfo');
                }
                else{
                    setForgotPasswordFailure('Email does not exist! Please Try Again');
                }
            }
            else{
                setForgotPasswordFailure('Something LEKAAAAAAA!Please Try Again');
            }
        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status) {
                    case 401:
                        console.log("401 status");
                        setForgotPasswordFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        setForgotPasswordFailure('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                setForgotPasswordFailure('Something NaNAAAAA!Please Try Again');
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

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">

                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                                <p className="mb-4">We get it, stuff happens. Just enter your email address below
                                                    and we'll send you a link to reset your password!</p>
                                            </div>
                                            { forgotPasswordFailure &&
                                                <Alert style={{marginTop:'20px'}} variant="danger">
                                                    {forgotPasswordFailure}
                                                </Alert>
                                            }
                                            <form className="user" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                           id="exampleInputEmail" aria-describedby="emailHelp"
                                                           placeholder="Enter Email Address..." value={values.email}
                                                           name="email" onChange={handleChange} required/>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Reset Password
                                                </button>
                                            </form>
                                            <hr/>
                                            <div className="text-center">
                                                <Link className="small" to="/registerBoot">Create an Account!</Link>
                                            </div>
                                            <div className="text-center">
                                                <Link className="small" to="/loginBoot">Already have an account? Login!</Link>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>


            <script src="../../vendor/jquery/jquery.min.js"></script>
            <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>


            <script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>


            <script src="../../js/sb-admin-2.min.js"></script>

            </main>
    )
}

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error
    }}
const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ForgotPasswordBoot);