import React,{useState} from 'react';
import {fetchUserData, userResetPassword} from '../../../api/authService';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../../../redux/authActions";
import {connect} from "react-redux";
import blueDog from "../../../img/360_F_707594227_0VXeidsvzawU5WJkCvldiF0aud4SVKOx-removebg-preview.jpg";

function PasswordResetView({loading,error,...props}){

    const { token } = useParams();
    const paramResetToken = token;
    const history = useNavigate ();
    const [passwordResetFailure, setPasswordResetFailure] = useState('');
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
                console.log("WOHOOOOOOO")
                localStorage.clear();
                history('/loginBoot');
            }
        }).catch((e)=>{
            console.log("LUSHIIIIIIIIIII")
            localStorage.clear();
            history('/loginBoot');
        })
    },[])


    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

        if (!passwordRegex.test(values.password)) {
            setPasswordResetFailure('Minimum eight characters, at least one letter and one number!');
            return;
        }

        if (values.password === confirmPassword) {
            userResetPassword(values).then((response)=>{
                // props.setUser(response.data);

                    history('/loginBoot');

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status) {
                        case 401:
                            console.log("401 status");
                            setPasswordResetFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            setPasswordResetFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    setPasswordResetFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        } else {
            setPasswordResetFailure('Passwords do not match!!!');
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
        <main className="bg-gradient-primary" style={{paddingTop:"58.4px"}}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "10px",
                minHeight: "calc(100vh - 190px)",
                overflow: "auto"
            }}>
                <div className="card o-hidden border-0 shadow-lg my-5" style={{width: '100%', height: "500px"}}>
                    <div className="row" style={{width: '100%', height: "500px"}}>
                        <div className="col-lg-6 d-none d-lg-block " style={{backgroundImage: `url(${blueDog})`, backgroundSize: '120%'}}></div>
                        <div className="col-lg-6" style={{display: "flex", justifyContent: "", alignItems: "center"}}>
                            <div className="p-5" style={{width:'100%'}}>
                                <div className="container">
                                    <p className="h4 mb-4">Reset Password</p>
                                    {passwordResetFailure &&
                                        <Alert style={{marginTop: '20px'}} color="danger">
                                            {passwordResetFailure}
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