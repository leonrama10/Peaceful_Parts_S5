import React,{useState} from 'react';
import {fetchUserData, userResetPassword} from '../../api/authService';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../../redux/authActions";
import {connect} from "react-redux";

function PasswordResetView({loading,error,...props}){

    const { token } = useParams();
    const paramResetToken = token;
    const history = useNavigate ();

    const [values, setValues] = useState({
        id:0,
        email: '',
        name:'',
        surname:'',
        password:'',
        roles:[],
        number:'',
        experience:0,
        location:'',
        resetToken:'',
        expirationTime: 0
    });

    const [confirmPassword, setConfirmPassword] = useState('')

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER' || response.data.roles.at(0).role === 'ROLE_ADMIN' || response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                setValues({
                    id:response.data.id,
                    email: response.data.email,
                    name: response.data.name,
                    surname: response.data.surname,
                    password: response.data.password,
                    roles: response.data.roles,
                    number:response.data.number,
                    experience:response.data.experience,
                    location:response.data.location,
                    resetToken: response.data.resetToken,
                    expirationTime:response.data.expirationTime
                })

                console.log("NOWWWWW",Date.now())
                console.log("EEEEEEEEEEEEE",response.data.expirationTime)
                if (response.data.resetToken!==paramResetToken || Date.now()>response.data.expirationTime ){
                    console.log("BABAAAAAAAAA")
                    history('/loginBoot');
                }
            }
            else{
                localStorage.clear();
                history('/loginBoot');
            }
        }).catch((e)=>{
            localStorage.clear();
            history('/loginBoot');
        })
    },[])



    //

    // React.useEffect(()=>{
    //     console.log("LEKAAAAAAAAAAAA",values.resetToken)
    //     if (values.resetToken!==paramResetToken ){
    //         history('/loginBoot');
    //     }
    // },[])

    console.log("YPPPPPPPPPPPPPPP ", values)
    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        if (values.password === confirmPassword) {
            userResetPassword(values).then((response)=>{
                if(response.status===201){
                    props.setUser(response.data);
                    if (response.data.roles.at(0)){
                        history('/loginBoot');
                    }
                    else{
                        props.loginFailure('Please Try Again!!!');
                    }
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
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
        } else {
            props.loginFailure('Passwords do not match!!!');
        }
    }

    const handleChange = (e) => {
        e.persist();
        if (e.target.name === 'password') {
            setValues(values => ({
                ...values,
                [e.target.name]: e.target.value
            }));
        } else if (e.target.name === 'confirmPassword') {
            setConfirmPassword(e.target.value);
        }
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
                                            <div className="container">
                                                <p className="h4 mb-4">Reset Password</p>
                                                { error &&
                                                    <Alert style={{marginTop:'20px'}} variant="danger">
                                                        {error}
                                                    </Alert>
                                                }
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <input type="password"
                                                               className="form-control form-control-user"
                                                               id="exampleInputPassword" placeholder="Password"
                                                               onChange={handleChange}
                                                               name="password"
                                                               autoComplete="new-password" required/>
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            onChange={handleChange}
                                                            className="form-control form-control-user"
                                                            placeholder="Confirm Password" required
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-info col-2">Login</button>
                                                </form>
                                                <hr/>
                                                <Link to="/loginboot">Back to Login Page</Link>
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

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetView);