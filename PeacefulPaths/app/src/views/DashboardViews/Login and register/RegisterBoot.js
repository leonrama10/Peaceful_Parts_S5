import React,{useState} from 'react';
import {connect} from 'react-redux';
import {userRegister} from '../../../api/authService';
import '../../../css/RegisterBoot.css';
import {Link, useNavigate} from 'react-router-dom';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../../../redux/authActions";
import cat from "../../../img/cat.png";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../../../css/custom-phone-input.css';

function RegisterBoot({loading,error,...props}){

    React.useEffect(()=>{
        if (!props.getStartedFinished){
            props.loginFailure("Authentication Failed.")
            history('/loginBoot');
        }
    },[])
    const history = useNavigate ();
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerFailure, setRegisterFailure] = useState('');
    const [values, setValues] = useState({
        email: '',
        name:'',
        surname:'',
        password: '',
        confirmPassword: '',
        number: '',
        questionnaire: props.questionnaire
    });

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        // Regex for name, surname and phoneNumber
        const nameSurnameRegex = /^[a-zA-Z]+$/; // Matches any string with one or more letters
        const phoneNumberRegex = /^\d{11}$/; // Matches any string with exactly 12 digits

        // Validate name, surname and phoneNumber
        if (!nameSurnameRegex.test(values.name) || !nameSurnameRegex.test(values.surname)) {
            setRegisterFailure("Name and surname fields cannot be empty and should only contain letters!");
            return;
        }
        if (!phoneNumberRegex.test(values.number)) {
            setRegisterFailure("Phone number field should be exactly 11 digits long!");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

        // Validate email and password
        if (!emailRegex.test(values.email)) {
            setRegisterFailure("Invalid email format!");
            return;
        }
        if (!passwordRegex.test(values.password)) {
            setRegisterFailure(" Minimum eight characters, at least one letter and one number!");
            return;
        }


        if (values.password === confirmPassword) {
            // Remove the + sign before sending to the backend
            const phoneNumber = values.number.startsWith('+') ? values.number.slice(1) : values.number;

            userRegister({ ...values, number: phoneNumber }).then((response) => {
                if (response.status === 201) {
                    props.setUser(response.data);
                    history('/loginBoot');
                } else {
                    setRegisterFailure('Something went wrong! Please try again.');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            setRegisterFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            setRegisterFailure('Something went wrong! Please try again.');
                    }

                } else {
                    setRegisterFailure('Something went wrong! Please try again.');
                }

            });
        } else {
            setRegisterFailure('Passwords do not match!!!');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(`${name} changed:`, value);

        if (name === 'password') {
            setValues(values => ({
                ...values,
                [name]: value
            }));
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setValues(values => ({
                ...values,
                [name]: value
            }));
        }
    };

    const handlePhoneChange = (value) => {
        setValues(values => ({
            ...values,
            number: value
        }));
    };


    return (
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:"10px" , minHeight:"calc(100vh - 190px)",overflow: "auto"}}>
                <div className="card o-hidden border-0 shadow-lg " style={{ width: '100%' }}>
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block " style={{
                            backgroundImage: `url(${cat})`,
                            backgroundSize: "cover",
                            backgroundPosition: 'center'
                        }}></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                {registerFailure &&
                                    <Alert style={{marginTop: '20px'}} color="danger">
                                        {registerFailure}
                                    </Alert>
                                }
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control form-control-user"
                                                   id="exampleFirstName" name="name" value={values.name}
                                                   onChange={handleChange}
                                                   placeholder="First Name" required/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user"
                                                   id="exampleLastName" name="surname" value={values.surname}
                                                   onChange={handleChange}
                                                   placeholder="Last Name" required/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user"
                                               aria-describedby="emailHelp"
                                               id="exampleInputEmail" name="email" value={values.email}
                                               onChange={handleChange}
                                               placeholder="Email Address" required/>
                                    </div>
                                    <div className="form-group">
                                        <PhoneInput
                                            buttonClass={"buttonClass"}
                                            buttonStyle={{borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}}
                                            country={'xk'}
                                            value={values.number}
                                            onChange={handlePhoneChange}
                                            inputClass="form-control form-control-user"
                                            specialLabel="Phone Number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user"
                                                   id="exampleInputPassword" placeholder="Password"
                                                   value={values.password}
                                                   onChange={handleChange} name="password" required/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user"
                                                   id="exampleRepeatPassword" placeholder="Repeat Password"
                                                   value={confirmPassword}
                                                   onChange={handleChange} name="confirmPassword" required/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                        Register
                                    </button>

                                </form>
                                <hr/>

                                <div className="text-center">
                                    <Link className="small" to="/loginBoot">Already have an account? Login!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterBoot);