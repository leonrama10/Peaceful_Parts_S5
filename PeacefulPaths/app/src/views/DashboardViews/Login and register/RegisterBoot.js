import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../../../api/authService';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css/sb-admin-2.min.css';
import { Alert } from "reactstrap";
import { authenticate, authFailure, authSuccess } from "../../../redux/authActions";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './custom-phone-input.css'; // Import the custom CSS file

function RegisterBoot({ loading, error, ...props }) {

    useEffect(() => {
        if (!props.getStartedFinished) {
            props.loginFailure("Authentication Failed.");
            history('/loginBoot');
        }
    }, []);

    const history = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerFailure, setRegisterFailure] = useState('');
    const [values, setValues] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        confirmPassword: '',
        number: '',
        questionnaire: props.questionnaire
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.authenticate();

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
                            setRegisterFailure("Authentication Failed. Bad Credentials");
                            break;
                        default:
                            setRegisterFailure('Something went wrong! Please try again.');
                    }
                } else {
                    setRegisterFailure('Something went wrong! Please try again.');
                }
            });
        } else {
            setRegisterFailure('Passwords do not match!');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(values => ({
            ...values,
            [name]: value
        }));
    };

    const handlePhoneChange = (value) => {
        setValues(values => ({
            ...values,
            number: value
        }));
    };

    return (
        <main className="bg-gradient-primary">
            <style>
                {`
                .bg-gradient-primary {
                    height: 100vh;
                }
                .container {
                    height: 100%;
                }
                `}
            </style>
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    {registerFailure &&
                                        <Alert style={{ marginTop: '20px' }} variant="danger">
                                            {registerFailure}
                                        </Alert>
                                    }
                                    <form className="user" onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user"
                                                    id="exampleFirstName" name="name" value={values.name}
                                                    onChange={handleChange}
                                                    placeholder="First Name" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control form-control-user"
                                                    id="exampleLastName" name="surname" value={values.surname}
                                                    onChange={handleChange}
                                                    placeholder="Last Name" required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                aria-describedby="emailHelp"
                                                id="exampleInputEmail" name="email" value={values.email}
                                                onChange={handleChange}
                                                placeholder="Email Address" required />
                                        </div>
                                        <div className="form-group">
                                            <PhoneInput
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
                                                    onChange={handleChange} name="password" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control form-control-user"
                                                    id="exampleRepeatPassword" placeholder="Repeat Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" required />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Register
                                        </button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <Link className="small" to="/loginBoot">Already have an account? Login!</Link>
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
    );
}

const mapStateToProps = ({ auth }) => {
    return {
        loading: auth.loading,
        error: auth.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBoot);
