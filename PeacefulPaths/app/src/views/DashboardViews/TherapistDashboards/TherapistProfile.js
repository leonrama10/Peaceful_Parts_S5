import React, {useEffect, useState} from 'react';
import {fetchUserData, userUpdate} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {Alert} from "reactstrap";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faChevronLeft, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import Loading from "../LoadingPage";
import PhoneInput from "react-phone-input-2";
import DashboardFooter from "../DashboardFooter";
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
function TherapistProfile({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [updateError,setUpdateError]=useState('');
    const [updateSuccess,setUpdateSuccess]=useState('');
    const [values, setValues] = useState({
        id:0,
        email: '',
        name:'',
        surname:'',
        password:'',
        number:'',
        experience:0,
        location:{},
        gender:{},
        language:[],
        roles:[],
        university: {},
        therapistInfo: [],
        therapistTypeTherapist: [],
        therapyTypeTherapist: [],
        identityTypeTherapist: [],
        dateOfBirth: '',
        about:''
    });

    useEffect(() => {
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/profile")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    
                    saveState("role",'ROLE_THERAPIST')
                    setData(response.data);
                    setValues({
                        id:response.data.id,
                        email: response.data.email,
                        name: response.data.name,
                        surname: response.data.surname,
                        password: response.data.password,
                        number:response.data.number,
                        location:response.data.location,
                        gender:response.data.gender,
                        language:response.data.language,
                        experience:response.data.experience,
                        university:response.data.university,
                        roles: response.data.roles,
                        therapistInfo: response.data.therapistInfo,
                        therapistTypeTherapist: response.data.therapistTypeTherapist,
                        therapyTypeTherapist: response.data.therapyTypeTherapist,
                        identityTypeTherapist: response.data.identityTypeTherapist,
                        dateOfBirth: response.data.dateOfBirth,
                        about: response.data.about
                    })
                }
                else{
                    localStorage.clear();
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/therapistDashboard/profile")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    saveState("role",'ROLE_THERAPIST')
                    setData(response.data);
                    setValues({
                        id:response.data.id,
                        email: response.data.email,
                        name: response.data.name,
                        surname: response.data.surname,
                        password: response.data.password,
                        number:response.data.number,
                        location:response.data.location,
                        gender:response.data.gender,
                        language:response.data.language,
                        experience:response.data.experience,
                        university:response.data.university,
                        roles: response.data.roles,
                        therapistInfo: response.data.therapistInfo,
                        therapistTypeTherapist: response.data.therapistTypeTherapist,
                        therapyTypeTherapist: response.data.therapyTypeTherapist,
                        identityTypeTherapist: response.data.identityTypeTherapist,
                        dateOfBirth: response.data.dateOfBirth,
                        about: response.data.about
                    })
                }
                else{
                    localStorage.clear();
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        props.authenticate();

        const nameSurnameRegex = /^[a-zA-Z]+$/; // Matches any string with one or more letters
        const phoneNumberRegex = /^\d{11}$/; // Matches any string with exactly 12 digits

        // Validate name, surname and phoneNumber
        if (!nameSurnameRegex.test(values.name) || !nameSurnameRegex.test(values.surname)) {
            setUpdateError("Name and surname fields cannot be empty and should only contain letters!");
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
            setUpdateError("Invalid date of birth. You must be at least 24 years old.");
            return;
        }

        // Regex for university
        const universityRegex = /^(AAB|UBT|KAKTUS|UNIVERSITETI I PRISHTINES)$/;

        // Validate university
        if (!universityRegex.test(values.university.university)) {
            setUpdateError("Invalid selection. Please select a university.");
            return;
        }

        if (!phoneNumberRegex.test(values.number)) {
            setUpdateError("Phone number field should be exactly 11 digits long!");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number


        const locationRegex = /^(Kosovo|Albania|Montenegro|North Macedonia|Serbia)$/;

        // Validate location
        if (!locationRegex.test(values.location.location)) {
            setUpdateError("Invalid selection. Please select a location.");
            return;
        }

        // Validate language
        if (!values.language.length) {
            setUpdateError("Invalid selection. Please select at least one language.");
            return;
        }

        // Validate gender
        if (!values.gender.gender) {
            setUpdateError("Invalid selection. Please select a gender.");
            return;
        }

        // Regex for experience
        const experienceRegex = /^[3-9]$|^([1-4][0-9]|50)$/; // Matches any number from 3 to 50

        // Validate experience
        if (!experienceRegex.test(values.experience)) {
            setUpdateError("Invalid input. Work experience should be a number between 3 and 50.");
            return;
        }


        // Validate therapyType
        if (!values.therapyTypeTherapist.length) {
            setUpdateError("Invalid selection. Please select at least one therapy type.");
            return;
        }

        if (!values.therapistTypeTherapist.length) {
            setUpdateError("Invalid selection. Please select at least one therapist type.");
            return;
        }

        if (!values.identityTypeTherapist.length) {
            setUpdateError("Invalid selection. Please select at least one identity type.");
            return;
        }

        // Validate email and password
        if (!emailRegex.test(values.email)) {
            setUpdateError("Invalid email format!");
            return;
        }

        userUpdate(values).then((response)=>{
            if(response.status===201){
                props.setUser(response.data);
                history('/dashboard/therapistDashboard/profile');
                setUpdateSuccess("Profile updated Successfully :)")
            }
            else{
                setUpdateError('Something LEKAAAAAAA!Please Try Again');
            }
        }).catch((err)=>{
            if(err && err.response){
                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        setUpdateError("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        setUpdateError('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                setUpdateError('Something NaNAAAAA!Please Try Again');
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const languageObject = { id: Number(value.split('-')[0]), language: value.split('-')[1] };
        const therapistTypeObject = { id: Number(value.split('-')[0]), therapistType: value.split('-')[1] };
        const therapyTypeObject = { id: Number(value.split('-')[0]), therapyType: value.split('-')[1] };
        const identityTypeObject = { id: Number(value.split('-')[0]), identityType: value.split('-')[1] };

        if (name === 'about') {
            const letterCount = value.replace(/\s+/g, '').length;
            if (letterCount > 500) {
                setUpdateError("Your input exceeds the 500 letter limit.");
                return;
            }
        }

        if (name === 'language') {
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
        } else if (name === 'therapistTypeTherapist') {
            if (values.therapistTypeTherapist.some(type => type.id === therapistTypeObject.id)) {
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
        } else if (name === 'therapyTypeTherapist') {
            if (values.therapyTypeTherapist.some(type => type.id === therapyTypeObject.id)) {
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
        } else if (name === 'identityTypeTherapist') {
            if (values.identityTypeTherapist.some(type => type.id === identityTypeObject.id)) {
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

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (

        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid" style={{marginBottom: '50px'}}>
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/therapistDashboard"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Dashboard
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Account Information</h1>
                            </div>

                            {updateError &&
                                <Alert style={{marginTop: '20px',textAlign:"center"}} color="danger">
                                    {updateError}
                                </Alert>
                            }
                            {updateSuccess &&
                                <Alert style={{marginTop: '20px',textAlign:"center"}} color="success">
                                    {updateSuccess}
                                </Alert>
                            }

                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <br/>
                                <Form onSubmit={handleUpdate} style={{width: '100%'}}>
                                    <br/>
                                    <div style={{display: "flex", justifyContent: 'space-evenly'}}>
                                        <div style={{width:"450px",paddingLeft:"5px",paddingRight:"5px"}}>
                                            <label htmlFor="specializationSelect"><h3>My Information:</h3></label>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" name="name"
                                                              defaultValue={data.name} onChange={handleChange}
                                                              required/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formSurname">
                                                <Form.Label>Surname</Form.Label>
                                                <Form.Control type="text" name="surname"
                                                              defaultValue={data.surname} onChange={handleChange}
                                                              required/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" name="email" defaultValue={data.email}
                                                              onChange={handleChange} required/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicGender">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Select name="gender"
                                                             value={values.gender ? `${values.gender.id}-${values.gender.gender}` : ''}
                                                             onChange={handleChange} required>
                                                    <option value="1-M">Male</option>
                                                    <option value="2-F">Female</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicDateOfBirth">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="date" defaultValue={values.dateOfBirth}
                                                              onChange={handleChange} name="dateOfBirth"/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <PhoneInput
                                                    buttonClass={"buttonClass"}
                                                    country={'xk'}
                                                    value={values.number}
                                                    onChange={handlePhoneChange}
                                                    inputClass="form-control form-control-user"
                                                    specialLabel="Phone Number"
                                                    required
                                                />
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicAddress">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Select name="location"
                                                             value={values.location ? `${values.location.id}-${values.location.location}` : ''}
                                                             onChange={handleChange} required>
                                                    <option value="1-Kosovo">Kosovo</option>
                                                    <option value="2-Albania">Albania</option>
                                                    <option value="3-Montenegro">Montenegro</option>
                                                    <option value="4-North Macedonia">North Macedonia</option>
                                                    <option value="5-Serbia">Serbia</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicAddress">
                                                <Form.Label>Years of experience</Form.Label>
                                                <Form.Control type="number" defaultValue={data.experience}
                                                              onChange={handleChange} name="experience" min={3} max={50}/>
                                            </Form.Group>
                                            <br/>
                                            <div className="custom-checkboxes">
                                                <label>Language</label>
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
                                                <br/>
                                                <i><FontAwesomeIcon icon={faCircleInfo} style={{
                                                    color: "#2e81fd"
                                                }}/>You can select more than one language!</i>
                                            </div>
                                        </div>
                                        <div style={{width: "350px", paddingLeft: "5px", paddingRight: "5px"}}>
                                            <div>
                                                <label htmlFor="specializationSelect"><h3>What do I
                                                    specialize
                                                    in:</h3></label>
                                                <div className="custom-checkboxes">
                                                    <label><h5>Therapy type</h5></label>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="IndividualCheckbox"
                                                            name="therapyTypeTherapist"
                                                            value="1-Individual"
                                                            checked={values.therapyTypeTherapist.some(type => type.id === 1)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="IndividualCheckbox">Individual
                                                            Therapy</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="CouplesCheckbox"
                                                            name="therapyTypeTherapist"
                                                            value="2-Couples"
                                                            checked={values.therapyTypeTherapist.some(type => type.id === 2)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="CouplesCheckbox">Couples
                                                            Therapy</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="TeenCheckbox"
                                                            name="therapyTypeTherapist"
                                                            value="3-Teen"
                                                            checked={values.therapyTypeTherapist.some(type => type.id === 3)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="TeenCheckbox">Teen Therapy</label>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="custom-checkboxes">
                                                    <label><h5>Therapist type</h5></label>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="listensCheckbox"
                                                            name="therapistTypeTherapist"
                                                            value="1-Listens"
                                                            checked={values.therapistTypeTherapist.some(type => type.id === 1)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="listensCheckbox">A therapist that
                                                            listens</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="exploresPastCheckbox"
                                                            name="therapistTypeTherapist"
                                                            value="2-ExploresPast"
                                                            checked={values.therapistTypeTherapist.some(type => type.id === 2)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="exploresPastCheckbox">A therapist
                                                            that explores the past</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="teachesSkillsCheckbox"
                                                            name="therapistTypeTherapist"
                                                            value="3-TeachesSkills"
                                                            checked={values.therapistTypeTherapist.some(type => type.id === 3)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="teachesSkillsCheckbox">A therapist
                                                            that teaches new skills</label>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="custom-checkboxes">
                                                    <label>
                                                        <h5>Identity type</h5>
                                                    </label>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="straightCheckbox"
                                                            name="identityTypeTherapist"
                                                            value="1-Straight"
                                                            checked={values.identityTypeTherapist.some(type => type.id === 1)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="straightCheckbox">Straight</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="gayCheckbox"
                                                            name="identityTypeTherapist"
                                                            value="2-Gay"
                                                            checked={values.identityTypeTherapist.some(type => type.id === 2)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="gayCheckbox">Gay</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="lesbianCheckbox"
                                                            name="identityTypeTherapist"
                                                            value="3-Lesbian"
                                                            checked={values.identityTypeTherapist.some(type => type.id === 3)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="lesbianCheckbox">Lesbian</label>
                                                    </div>
                                                </div>
                                                <br/>
                                                <i>
                                                    <FontAwesomeIcon icon={faCircleInfo} style={{
                                                        color: "#2e81fd"
                                                    }}/>You can select more than one!
                                                </i>
                                            </div>
                                            <br/>
                                            <div style={{display: "flex", flexDirection: "column"}}>
                                                <label htmlFor="about"><h3>About:</h3></label>
                                                <textarea id="about" name="about"
                                                          value={values.about}
                                                          placeholder="Enter about yourself here..."
                                                          onChange={handleChange}
                                                />
                                            </div>
                                            <br/>
                                            <i>
                                                <FontAwesomeIcon icon={faCircleInfo} style={{
                                                    color: "#2e81fd"
                                                }}/>Limit 500 letters!
                                            </i>
                                        </div>
                                    </div>
                                    <br/>
                                    <hr/>
                                    <br/>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <div className="text-left">
                                            <Link className="small" to="/forgotPassBoot"
                                                  style={{marginLeft: "5px", textDecoration: "none", fontSize: "15px"}}>Change
                                                Password</Link>
                                            <FontAwesomeIcon icon={faArrowRight} style={{
                                                marginLeft: "5px",
                                                fontSize: "14px",
                                                color: "#2e81fd"
                                            }}/>
                                        </div>
                                        <div>
                                            <Button variant="primary" type="submit">
                                                Save
                                            </Button>
                                            <Link className="btn btn-danger" to="/dashboard/therapistDashboard"
                                                  type={"button"}
                                                  style={{marginLeft: "5px"}}>Cancel
                                            </Link>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <DashboardFooter />
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
export default connect(mapStateToProps, mapDispatchToProps)(TherapistProfile);