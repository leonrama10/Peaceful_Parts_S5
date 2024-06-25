import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUserData, registerAdmin} from '../../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {Alert} from "reactstrap";
import {
    authenticate,
    authFailure,
    authSuccess
} from "../../../../redux/authActions";
import SideBarAdmin from "../../SideBars/SideBarAdmin";
import DashboardNav from "../../DashboardNav";
import {saveState} from "../../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";
import DashboardFooter from "../../DashboardFooter";
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

const getAccessToken = () => {
    const token = localStorage.getItem('USER_KEY');

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
function RegisterBootAdmin({loading,error,...props}){
    const [userData,setUserData]=useState({});
    const history = useNavigate ();
    const [registerAdminError,setRegisterAdminError]=useState('');
    const [values, setValues] = useState({
        id:0,
        email: '',
        name: '',
        surname: '',
        password: '',
        gender: {},
        number:''
    });

    useEffect(() => {
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setUserData(response.data);
                        
                        saveState("role",'ROLE_ADMIN')
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    setUserData(response.data);
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        
                        saveState("role",'ROLE_ADMIN')
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else{
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);

    useEffect(() => {
      console.log("Current values state:", values);
    }, [values]); // This effect runs whenever `values` changes

    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number
        const phoneNumberRegex = /^\d{11}$/; // Matches any string with exactly 12 digits

        // Validate gender
        if (!values.gender.gender) {
            setRegisterAdminError("Invalid selection. Please select a gender.");
            return;
        }

        if (!phoneNumberRegex.test(values.number)) {
            setRegisterAdminError("Phone number field should be exactly 11 digits long!");
            return;
        }

        // Validate email and password
        if (!emailRegex.test(values.email)) {
            setRegisterAdminError("Invalid email format!");
            return;
        }
        if (!passwordRegex.test(values.password)) {
            setRegisterAdminError(" Minimum eight characters, at least one letter and one number!");
            return;
        }


        if (values.password === confirmPassword) {
            registerAdmin(values).then((response) => {
                if (response.status === 201) {
                    history('/dashboard/adminDashboard/admin');
                } else {
                    setRegisterAdminError('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            setRegisterAdminError("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            setRegisterAdminError('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    setRegisterAdminError('Something NaNAAAAA!Please Try Again');
                }

            });
        } else {
            setRegisterAdminError('Passwords do not match!!!');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const languageObject = { id: Number(value.split('-')[0]), language: value.split('-')[1] };

        if (name === 'password') {
            setValues(values => ({
                ...values,
                [name]: value
            }));
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else if (name === 'language') {
            if (values.language.some(lang => lang.id === languageObject.id)) {
                setValues(values => ({
                    ...values,
                    [name]: values[name].filter(lang => lang.id !== languageObject.id)
                }));
            } else {
                setValues(values => ({
                    ...values,
                    [name]: [...values[name], languageObject]
                }));
            }
        } else {
            setValues(values => ({
                ...values,
                [name]: name === 'gender' ? { id: Number(value.split('-')[0]), gender: value.split('-')[1] } : value
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
       <main id="page-top">

           <div id="wrapper">

               <SideBarAdmin />

               <div id="content-wrapper" className="d-flex flex-column">

                   <div id="content">

                       <DashboardNav data={userData} setUser={props.setUser} />

                       <div className="container-fluid">
                           <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                               <Link to={"/dashboard/adminDashboard/admin"}
                                     className="btn goBack"
                                     style={{color: "#0d6efd"}}
                                     type="button"
                               ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Admins
                               </Link>
                           </div>
                           <div className="d-sm-flex align-items-center justify-content-between mb-4">
                               <h1 className="h3 mb-0 text-800"
                                   style={{color: "#5a5c69"}}>Generate Admin</h1>
                           </div>
                           <div className="bg-gradient-primary" style={{marginTop: "-20px"}}>
                               <div className="card o-hidden border-0 shadow-lg my-5">
                                   <div className="card-body p-0">
                                       <div className="row">
                                           <div style={{display: 'flex', justifyContent: 'center'}}>
                                               <div className="col-lg-7">
                                                   <div className="p-5">
                                                       <div className="text-center">
                                                           <h1 className="h4 text-900 mb-4" style={{color:"#007bff"}}>Create an Account!</h1>
                                                       </div>
                                                       {registerAdminError &&
                                                           <Alert style={{marginTop: '20px'}} variant="danger">
                                                               {registerAdminError}
                                                           </Alert>
                                                       }
                                                       <form className="user" onSubmit={handleSubmit}>
                                                           <div className="form-group row">
                                                               <div className="col-sm-6 mb-3 mb-sm-0">
                                                                   <input type="text"
                                                                          className="form-control form-control-user"
                                                                          id="exampleFirstName" name="name"
                                                                          value={values.name}
                                                                          onChange={handleChange}
                                                                          placeholder="First Name" required/>
                                                               </div>
                                                               <div className="col-sm-6">
                                                                   <input type="text"
                                                                          className="form-control form-control-user"
                                                                          id="exampleLastName" name="surname"
                                                                          value={values.surname}
                                                                          onChange={handleChange}
                                                                          placeholder="Last Name" required/>
                                                               </div>
                                                           </div>

                                                           <div className="gender-segmented-control">
                                                               <button
                                                                   type="button"
                                                                   name="gender"
                                                                   className={`gender-option ${values.gender.gender === 'M' ? 'selected' : ''}`}
                                                                   onClick={() => handleChange({
                                                                       target: {
                                                                           name: 'gender',
                                                                           value: '1-M'
                                                                       }
                                                                   })}
                                                               >
                                                                   Male
                                                               </button>
                                                               <button
                                                                   type="button"
                                                                   name="gender"
                                                                   className={`gender-option ${values.gender.gender === 'F' ? 'selected' : ''}`}
                                                                   onClick={() => handleChange({
                                                                       target: {
                                                                           name: 'gender',
                                                                           value: '2-F'
                                                                       }
                                                                   })}
                                                               >
                                                                   Female
                                                               </button>
                                                               <button
                                                                   type="button"
                                                                   name="gender"
                                                                   className={`gender-option ${values.gender.gender === 'O' ? 'selected' : ''}`}
                                                                   onClick={() => handleChange({
                                                                       target: {
                                                                           name: 'gender',
                                                                           value: '3-O'
                                                                       }
                                                                   })}
                                                               >
                                                                   Other
                                                               </button>
                                                           </div>


                                                           <div className="form-group">
                                                               <input type="email"
                                                                      className="form-control form-control-user"
                                                                      aria-describedby="emailHelp"
                                                                      id="exampleInputEmail" name="email"
                                                                      value={values.email}
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
                                                                   <input type="password"
                                                                          className="form-control form-control-user"
                                                                          id="exampleInputPassword"
                                                                          placeholder="Password"
                                                                          value={values.password}
                                                                          onChange={handleChange} name="password"
                                                                          required/>
                                                               </div>
                                                               <div className="col-sm-6">
                                                                   <input type="password"
                                                                          className="form-control form-control-user"
                                                                          id="exampleRepeatPassword"
                                                                          placeholder="Repeat Password"
                                                                          value={confirmPassword}
                                                                          onChange={handleChange} name="confirmPassword"
                                                                          required/>
                                                               </div>
                                                           </div>
                                                           <button type="submit"
                                                                   className="btn btn-primary btn-user btn-block">
                                                               Register
                                                           </button>
                                                       </form>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <DashboardFooter />
               </div>
           </div>
       </main>
   );
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterBootAdmin);