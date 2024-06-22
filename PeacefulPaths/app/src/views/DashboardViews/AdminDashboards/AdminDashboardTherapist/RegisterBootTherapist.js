import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUserData, registerTherapist} from '../../../../api/authService';
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
function RegisterBootTherapist({loading,error,...props}){
    const [userData,setUserData]=useState({});
    const [registerTherapistError,setRegisterTherapistError]=useState('');
    const history = useNavigate ();
    const [values, setValues] = useState({
        id:0,
        email: '',
        name: '',
        surname: '',
        password: '',
        university: {},
        gender: {},
        location: {},
        language: [],
        therapistType: [],
        therapyType: [],
        identityType: [],
        experience: 0,
        number:'',
        dateOfBirth: '',
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


    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        const nameSurnameRegex = /^[a-zA-Z]+$/; // Matches any string with one or more letters
        const phoneNumberRegex = /^\d{11}$/; // Matches any string with exactly 12 digits

        // Validate name, surname and phoneNumber
        if (!nameSurnameRegex.test(values.name) || !nameSurnameRegex.test(values.surname)) {
            setRegisterTherapistError("Name and surname fields cannot be empty and should only contain letters!");
            return;
        }

        // Regex for dateOfBirth
        // Get the current date
        const currentDate = new Date();

        // Get the date of birth entered by the user
        const dateOfBirth = new Date(values.dateOfBirth);

        // Calculate the difference in years
        const age = currentDate.getFullYear() - dateOfBirth.getFullYear();

        // Check if the user is at least 24 years old
        if (age < 24) {
            setRegisterTherapistError("Invalid date of birth. You must be at least 24 years old.");
            return;
        }

        // Regex for university
        const universityRegex = /^(AAB|UBT|KAKTUS|UNIVERSITETI I PRISHTINES)$/;

        // Validate university
        if (!universityRegex.test(values.university.university)) {
            setRegisterTherapistError("Invalid selection. Please select a university.");
            return;
        }


        if (!phoneNumberRegex.test(values.number)) {
            setRegisterTherapistError("Phone number field should be exactly 11 digits long!");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number


        const locationRegex = /^(Kosovo|Albania|Montenegro|North Macedonia|Serbia)$/;

        // Validate location
        if (!locationRegex.test(values.location.location)) {
            setRegisterTherapistError("Invalid selection. Please select a location.");
            return;
        }

        // Validate language
        if (!values.language.length) {
            setRegisterTherapistError("Invalid selection. Please select at least one language.");
            return;
        }

        // Validate gender
        if (!values.gender.gender) {
            setRegisterTherapistError("Invalid selection. Please select a gender.");
            return;
        }

        // Regex for experience
        const experienceRegex = /^[3-9]$|^([1-4][0-9]|50)$/; // Matches any number from 3 to 50

        // Validate experience
        if (!experienceRegex.test(values.experience)) {
            setRegisterTherapistError("Invalid input. Work experience should be a number between 3 and 50.");
            return;
        }


        // Validate therapyType
        if (!values.therapyType.length) {
            setRegisterTherapistError("Invalid selection. Please select at least one therapy type.");
            return;
        }

        if (!values.therapistType.length) {
            setRegisterTherapistError("Invalid selection. Please select at least one therapist type.");
            return;
        }

        if (!values.identityType.length) {
            setRegisterTherapistError("Invalid selection. Please select at least one identity type.");
            return;
        }

        // Validate email and password
        if (!emailRegex.test(values.email)) {
            setRegisterTherapistError("Invalid email format!");
            return;
        }
        if (!passwordRegex.test(values.password)) {
            setRegisterTherapistError(" Minimum eight characters, at least one letter and one number!");
            return;
        }


        if (values.password === confirmPassword) {
            // hapi 1: registerAdmin
            registerTherapist(values).then((response) => {
                if (response.status === 201) {
                    history('/dashboard/adminDashboard/therapists');
                } else {
                    setRegisterTherapistError('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            setRegisterTherapistError("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            setRegisterTherapistError('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    setRegisterTherapistError('Something NaNAAAAA!Please Try Again');
                }

            });
        } else {
            setRegisterTherapistError('Passwords do not match!!!');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const languageObject = { id: Number(value.split('-')[0]), language: value.split('-')[1] };
        const therapistTypeObject = { id: Number(value.split('-')[0]), therapistType: value.split('-')[1] };
        const therapyTypeObject = { id: Number(value.split('-')[0]), therapyType: value.split('-')[1] };
        const identityTypeObject = { id: Number(value.split('-')[0]), identityType: value.split('-')[1] };

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
        } else if (name === 'therapistType') {
            if (values.therapistType.some(type => type.id === therapistTypeObject.id)) {
                setValues(values => ({
                    ...values,
                    [name]: values[name].filter(type => type.id !== therapistTypeObject.id)
                }));
            } else {
                setValues(values => ({
                    ...values,
                    [name]: [...values[name], therapistTypeObject]
                }));
            }
        } else if (name === 'therapyType') {
            if (values.therapyType.some(type => type.id === therapyTypeObject.id)) {
                setValues(values => ({
                    ...values,
                    [name]: values[name].filter(type => type.id !== therapyTypeObject.id)
                }));
            } else {
                setValues(values => ({
                    ...values,
                    [name]: [...values[name], therapyTypeObject]
                }));
            }
        } else if (name === 'identityType') {
            if (values.identityType.some(type => type.id === identityTypeObject.id)) {
                setValues(values => ({
                    ...values,
                    [name]: values[name].filter(type => type.id !== identityTypeObject.id)
                }));
            } else {
                setValues(values => ({
                    ...values,
                    [name]: [...values[name], identityTypeObject]
                }));
            }
        } else {
            setValues(values => ({
                ...values,
                [name]: name === 'experience' ? Number(value) :
                    name === 'gender' ? { id: Number(value.split('-')[0]), gender: value.split('-')[1] } :
                        name === 'location' ? { id: Number(value.split('-')[0]), location: value.split('-')[1] } :
                            name === 'university' ? { id: Number(value.split('-')[0]), university: value.split('-')[1] } :
                                value
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
                               <Link to={"/dashboard/adminDashboard/therapists"}
                                     className="btn goBack"
                                     style={{color: "#0d6efd"}}
                                     type="button"
                               ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Therapists
                               </Link>
                           </div>
                           <div className="d-sm-flex align-items-center justify-content-between mb-4">
                               <h1 className="h3 mb-0 text-800"
                                   style={{color: "#5a5c69"}}>Generate Therapist</h1>
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
                                                       {registerTherapistError &&
                                                           <Alert style={{marginTop: '20px'}} variant="danger">
                                                               {registerTherapistError}
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
                                                                          placeholder="First Name" required style={{placeHolderColor:"#007bff"}}/>
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

                                                           <label htmlFor="dateOfBirth"
                                                                  className="date-of-birth-label" style={{color:"#007bff"}}>Date of Birth
                                                           </label>
                                                           <br/>
                                                           <input
                                                               type="date"
                                                               id="dateOfBirth"
                                                               name="dateOfBirth"
                                                               value={values.dateOfBirth}
                                                               onChange={handleChange}
                                                               className="date-of-birth-input"
                                                               required
                                                           />

                                                           <div className="custom-dropdown">
                                                               <label htmlFor="universitySelect" style={{color:"#007bff"}}>University
                                                                   Attended</label>
                                                               <select
                                                                   id="universitySelect"
                                                                   name="university"
                                                                   value={values.university ? `${values.university.id}-${values.university.university}` : ''}
                                                                   onChange={handleChange}
                                                                   required
                                                               >
                                                                   <option defaultValue="">Select the university
                                                                   </option>
                                                                   <option value="1-AAB">AAB</option>
                                                                   <option value="2-UBT">UBT</option>
                                                                   <option value="3-KAKTUS">KAKTUS</option>
                                                                   <option
                                                                       value="4-UNIVERSITETI I PRISHTINES">UNIVERSITETI
                                                                       I
                                                                       PRISHTINES
                                                                   </option>
                                                               </select>
                                                           </div>

                                                           <div className="custom-dropdown">
                                                               <label htmlFor="locationSelect" style={{color:"#007bff"}}>Location</label>
                                                               <select
                                                                   id="locationSelect"
                                                                   name="location"
                                                                   value={values.location ? `${values.location.id}-${values.location.location}` : ''}
                                                                   onChange={handleChange}
                                                                   required
                                                               >
                                                                   <option defaultValue="">Select the location</option>
                                                                   <option value="1-Kosovo">Kosovo</option>
                                                                   <option value="2-Albania">Albania</option>
                                                                   <option value="3-Montenegro">Montenegro</option>
                                                                   <option value="4-North Macedonia">North Macedonia
                                                                   </option>
                                                                   <option value="5-Serbia">Serbia</option>
                                                               </select>
                                                           </div>

                                                           <div className="custom-checkboxes">
                                                               <label style={{color:"#007bff"}}>Language</label>
                                                               <div>
                                                                   <input
                                                                       type="checkbox"
                                                                       id="albanianCheckbox"
                                                                       name="language"
                                                                       value="1-Albanian"
                                                                       checked={values.language.some(lang => lang.id === 1)}
                                                                       onChange={handleChange}
                                                                   />
                                                                   <label htmlFor="albanianCheckbox">Albanian</label>
                                                               </div>
                                                               <div>
                                                                   <input
                                                                       type="checkbox"
                                                                       id="albanianCheckbox"
                                                                       name="language"
                                                                       value="2-English"
                                                                       checked={values.language.some(lang => lang.id === 2)}
                                                                       onChange={handleChange}
                                                                   />
                                                                   <label htmlFor="englishCheckbox">English</label>
                                                               </div>
                                                               <div>
                                                                   <input
                                                                       type="checkbox"
                                                                       id="albanianCheckbox"
                                                                       name="language"
                                                                       value="3-Serbian"
                                                                       checked={values.language.some(lang => lang.id === 3)}
                                                                       onChange={handleChange}
                                                                   />
                                                                   <label htmlFor="serbianCheckbox">Serbian</label>
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

                                                           <label style={{fontSize:"17px", color:"#007bff"}}>Years of work experience</label>
                                                           <div className="form-group experience-input-group">

                                                               <input type="number"
                                                                      className="form-control form-control-user"
                                                                      id="exampleExperience" name="experience"
                                                                      value={values.experience}
                                                                      onChange={handleChange}
                                                                      placeholder="Work Experience" min="3" max="50"
                                                                      required />
                                                           </div>

                                                           <hr/>

                                                           <label htmlFor="specializationSelect"><h5 style={{color:"#007bff"}}> What do they
                                                               specialize
                                                               in:</h5></label>
                                                           <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                               <div className="custom-checkboxes">
                                                                   <label style={{color:"#007bff"}}>Therapy Type</label>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="IndividualCheckbox"
                                                                           name="therapyType"
                                                                           value="1-Individual"
                                                                           checked={values.therapyType.some(type => type.id === 1)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="IndividualCheckbox">Individual
                                                                           Therapy</label>
                                                                   </div>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="CouplesCheckbox"
                                                                           name="therapyType"
                                                                           value="2-Couples"
                                                                           checked={values.therapyType.some(type => type.id === 2)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="CouplesCheckbox">Couples
                                                                           Therapy</label>
                                                                   </div>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="TeenCheckbox"
                                                                           name="therapyType"
                                                                           value="3-Teen"
                                                                           checked={values.therapyType.some(type => type.id === 3)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="TeenCheckbox">Teen Therapy</label>
                                                                   </div>
                                                               </div>

                                                               <div className="custom-checkboxes">
                                                                   <label style={{color:"#007bff"}}>
                                                                       Identity Type
                                                                   </label>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="straightCheckbox"
                                                                           name="identityType"
                                                                           value="1-Straight"
                                                                           checked={values.identityType.some(type => type.id === 1)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="straightCheckbox">Straight</label>
                                                                   </div>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="gayCheckbox"
                                                                           name="identityType"
                                                                           value="2-Gay"
                                                                           checked={values.identityType.some(type => type.id === 2)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="gayCheckbox">Gay</label>
                                                                   </div>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="lesbianCheckbox"
                                                                           name="identityType"
                                                                           value="3-Lesbian"
                                                                           checked={values.identityType.some(type => type.id === 3)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="lesbianCheckbox">Lesbian</label>
                                                                   </div>
                                                               </div>

                                                               <div className="custom-checkboxes">
                                                                   <label style={{color:"#007bff"}}>Therapist Type</label>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="listensCheckbox"
                                                                           name="therapistType"
                                                                           value="1-Listens"
                                                                           checked={values.therapistType.some(type => type.id === 1)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="listensCheckbox">A therapist that
                                                                           listens</label>
                                                                   </div>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="exploresPastCheckbox"
                                                                           name="therapistType"
                                                                           value="2-ExploresPast"
                                                                           checked={values.therapistType.some(type => type.id === 2)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="exploresPastCheckbox">A therapist
                                                                           that explores the past</label>
                                                                   </div>
                                                                   <div>
                                                                       <input
                                                                           type="checkbox"
                                                                           id="teachesSkillsCheckbox"
                                                                           name="therapistType"
                                                                           value="3-TeachesSkills"
                                                                           checked={values.therapistType.some(type => type.id === 3)}
                                                                           onChange={handleChange}
                                                                       />
                                                                       <label htmlFor="teachesSkillsCheckbox">A therapist
                                                                           that teaches new skills</label>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                           <hr/>

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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterBootTherapist);