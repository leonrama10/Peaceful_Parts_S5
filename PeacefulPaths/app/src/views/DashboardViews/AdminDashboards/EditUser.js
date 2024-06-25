import React, {useEffect, useState} from 'react';
import {fetchUserData, fetchUserDataId, userUpdate} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess
} from "../../../redux/authActions";
import {Alert} from "reactstrap";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarAdmin from "../SideBars/SideBarAdmin";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import Loading from "../LoadingPage";
import PhoneInput from "react-phone-input-2";
let role;
let userRole ;
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
function EditUser({loading,error,...props}){

    let userInfoId =null
    const history = useNavigate ();
    const [updateSuccess,setUpdateSuccess]=useState('');
    const [updateError,setUpdateError]=useState('');
    const [data,setData]=useState({});
    const [userData,setUserData]=useState({});
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
        questionnaire:{},
        university:{},
        dateOfBirth: '',
        therapistTypeTherapist: [],
        therapistTypeUser: {},
        therapyTypeTherapist: [],
        therapyTypeUser: {},
        identityTypeTherapist: [],
        identityTypeUser:{},
        relationshipStatus: {},
        therapyHistory: {},
        communication: {},
        medicationHistory: {},
        physicalHealth: {},
        mentalState1: {},
        mentalState2: {},
        therapistGender: {},
        dateAdded:'',
        therapistInfo:[]
    });

    useEffect(() => {
        userInfoId = loadState("userInfoId",0)
        if(getRefreshToken()) {
                fetchUserData().then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setUserData(response.data);
                        role = loadState("role", '');

                        saveState("role",'ROLE_ADMIN')
                    } else {
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    localStorage.clear();
                    history('/loginBoot');
                })

                fetchUserDataId({id:userInfoId}).then((response) => {
                    setData(response.data);
                    setValues({
                        id: response.data.id,
                        email: response.data.email,
                        name: response.data.name,
                        surname: response.data.surname,
                        password: response.data.password,
                        roles: response.data.roles,
                        number: response.data.number,
                        experience: response.data.experience,
                        location: response.data.location,
                        gender: response.data.gender,
                        language: response.data.language,
                        allRoles: response.data.allRoles,
                        questionnaire: response.data.questionnaire,
                        university: response.data.university,
                        dateOfBirth: response.data.dateOfBirth,
                        therapistTypeTherapist: response.data.therapistTypeTherapist,
                        therapistTypeUser: response.data.therapistTypeUser,
                        therapyTypeTherapist: response.data.therapyTypeTherapist,
                        therapyTypeUser: response.data.therapyTypeUser,
                        identityTypeTherapist: response.data.identityTypeTherapist,
                        identityTypeUser: response.data.identityTypeUser,
                        relationshipStatus: response.data.relationshipStatus,
                        therapyHistory: response.data.therapyHistory,
                        communication: response.data.communication,
                        medicationHistory: response.data.medicationHistory,
                        physicalHealth: response.data.physicalHealth,
                        mentalState1: response.data.mentalState1,
                        mentalState2: response.data.mentalState2,
                        therapistGender: response.data.therapistGender,
                        dateAdded: response.data.dateAdded,
                        therapistInfo: response.data.therapistInfo
                    })
                    userRole = loadState("userRole", '')
                    saveState("userRole", response.data.roles.at(0).role);
                }).catch((e) => {
                    localStorage.clear();
                    history('/loginBoot');
                })
        }else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                    setUserData(response.data);
                    role = loadState("role", '');

                    saveState("role",'ROLE_ADMIN')
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                localStorage.clear();
                history('/loginBoot');
            })

            fetchUserDataId({id:userInfoId}).then((response) => {
                setData(response.data);
                setValues({
                    id: response.data.id,
                    email: response.data.email,
                    name: response.data.name,
                    surname: response.data.surname,
                    password: response.data.password,
                    roles: response.data.roles,
                    number: response.data.number,
                    experience: response.data.experience,
                    location: response.data.location,
                    gender: response.data.gender,
                    language: response.data.language,
                    allRoles: response.data.allRoles,
                    questionnaire: response.data.questionnaire,
                    university: response.data.university,
                    dateOfBirth: response.data.dateOfBirth,
                    therapistTypeTherapist: response.data.therapistTypeTherapist,
                    therapistTypeUser: response.data.therapistTypeUser,
                    therapyTypeTherapist: response.data.therapyTypeTherapist,
                    therapyTypeUser: response.data.therapyTypeUser,
                    identityTypeTherapist: response.data.identityTypeTherapist,
                    identityTypeUser: response.data.identityTypeUser,
                    relationshipStatus: response.data.relationshipStatus,
                    therapyHistory: response.data.therapyHistory,
                    communication: response.data.communication,
                    medicationHistory: response.data.medicationHistory,
                    physicalHealth: response.data.physicalHealth,
                    mentalState1: response.data.mentalState1,
                    mentalState2: response.data.mentalState2,
                    therapistGender: response.data.therapistGender,
                    dateAdded: response.data.dateAdded,
                    therapistInfo: response.data.therapistInfo
                })
                userRole = loadState("userRole", '')
                saveState("userRole", response.data.roles.at(0).role);
            }).catch((e) => {
                localStorage.clear();
                history('/loginBoot');
            })
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (changedFields.length === 0) {
            setUpdateError("Nothing has been updated!");
            return;
        }

        const nameSurnameRegex = /^[a-zA-Z]+$/; // Matches any string with one or more letters
        const phoneNumberRegex = /^\d{11}$/; // Matches any string with exactly 12 digits

        // Validate name, surname and phoneNumber
        if (!nameSurnameRegex.test(values.name) || !nameSurnameRegex.test(values.surname)) {
            setUpdateError("Name and surname fields cannot be empty and should only contain letters!");
            return;
        }

        if (!phoneNumberRegex.test(values.number)) {
            setUpdateError("Phone number field should be exactly 11 digits long!");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const locationRegex = /^(Kosovo|Albania|Montenegro|North Macedonia|Serbia)$/;

        // Validate location
        if (!locationRegex.test(values.location.location)) {
            setUpdateError("Invalid selection. Please select a location.");
            return;
        }

        if (userRole === 'ROLE_THERAPIST') {
            // Regex for experience
            const experienceRegex = /^[3-9]$|^([1-4][0-9]|50)$/; // Matches any number from 3 to 50

            // Validate experience

            if (!experienceRegex.test(values.experience)) {
                setUpdateError("Invalid input. Work experience should be a number between 3 and 50.");
                return;
            }
        }

        if (userRole === 'ROLE_THERAPIST') {
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
        }

        if (userRole === 'ROLE_THERAPIST' || userRole === 'ROLE_USER' ) {
            // Validate language
            if (!values.language.length) {
                setUpdateError("Invalid selection. Please select at least one language.");
                return;
            }
        }

        // Validate gender
        if (!values.gender.gender) {
            setUpdateError("Invalid selection. Please select a gender.");
            return;
        }

        if (userRole === 'ROLE_USER') {
            if (!values.therapistGender.gender) {
                setUpdateError("Invalid selection. Please select therapists gender!");
                return;
            }


            if (!values.relationshipStatus.answer) {
                setUpdateError("Invalid selection. Please select relationship status!");
                return;
            }

            if (!values.therapyHistory.answer) {
                setUpdateError("Invalid selection. Please select therapy history!");
                return;
            }

            if (!values.communication.answer) {
                setUpdateError("Invalid selection. Please select communication!");
                return;
            }

            if (!values.medicationHistory.answer) {
                setUpdateError("Invalid selection. Please select medication history!");
                return;
            }

            if (!values.physicalHealth.answer) {
                setUpdateError("Invalid selection. Please select physical health!");
                return;
            }

            if (!values.mentalState1.answer) {
                setUpdateError("Invalid selection. Please select mental state!");
                return;
            }

            if (!values.mentalState2.answer) {
                setUpdateError("Invalid selection. Please select mental state!");
                return;
            }

            if (!values.therapyTypeUser.therapyType) {
                setUpdateError("Invalid selection. Please select at least one therapy type!");
                return;
            }


            if (!values.therapistTypeUser.therapistType) {
                setUpdateError("Invalid selection. Please select at least one therapist type.");
                return;
            }

            if (!values.identityTypeUser.identityType) {
                setUpdateError("Invalid selection. Please select at least one identity type.");
                return;
            }
        }

        // Validate email and password
        if (!emailRegex.test(values.email)) {
            setUpdateError("Invalid email format!");
            return;
        }

        userUpdate(values).then((response)=>{
            if(response.status===201){
                let successMessage = 'Updated successfully: ';
                if (changedFields.length > 0) {
                    successMessage += changedFields.map(field => field.charAt(0).toUpperCase() + field.slice(1)).join(', ');
                } else {
                    successMessage += 'No fields were changed';
                }

                setUpdateSuccess(successMessage);
            } else{
                props.loginFailure('Something went wrong! Please try again');
            }

        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something went wrong! Please try again');
                }
            }
            else{
                console.log("ERROR: ",err)
                props.loginFailure('Something went wrong! Please try again');
            }
        });
    };

    const [changedFields, setChangedFields] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        const languageObject = { id: Number(value.split('-')[0]), language: value.split('-')[1] };
        const therapistTypeObject = { id: Number(value.split('-')[0]), therapistType: value.split('-')[1] };
        const therapyTypeObject = { id: Number(value.split('-')[0]), therapyType: value.split('-')[1] };
        const identityTypeObject = { id: Number(value.split('-')[0]), identityType: value.split('-')[1] };

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
        } else if (name === 'age') {
            setValues(values => ({
                ...values,
                questionnaire: {
                    ...values.questionnaire,
                    [name]: value
                }
            }));
        } else {
            setValues(values => ({
                ...values,
                [name]: name === 'experience' ? Number(value) :
                    name === 'gender' ? { id: Number(value.split('-')[0]), gender: value.split('-')[1] } :
                        name === 'location' ? { id: Number(value.split('-')[0]), location: value.split('-')[1] } :
                            name === 'university' ? { id: Number(value.split('-')[0]), university: value.split('-')[1] } :
                                name === 'therapyTypeUser' ? { id: Number(value.split('-')[0]), therapyType: value.split('-')[1] } :
                                    name === 'therapistGender' ? { id: Number(value.split('-')[0]), gender: value.split('-')[1] } :
                                        name === 'therapistTypeUser' ? { id: Number(value.split('-')[0]), therapistType: value.split('-')[1] } :
                                            name === 'relationshipStatus' ? { id: Number(value.split('-')[0]), answer: value.split('-')[1] } :
                                                name === 'identityTypeUser' ? { id: Number(value.split('-')[0]), identityType: value.split('-')[1] } :
                                                    name === 'therapyHistory' ? { id: Number(value.split('-')[0]), answer: value.split('-')[1] } :
                                                        name === 'communication' ? { id: Number(value.split('-')[0]), answer: value.split('-')[1] } :
                                                            name === 'medicationHistory' ? { id: Number(value.split('-')[0]), answer: value.split('-')[1] } :
                                                                name === 'physicalHealth' ? { id: Number(value.split('-')[0]), answer: value.split('-')[1] } :
                                                                    name === 'mentalState1' ? { id: Number(value.split('-')[0]), answer: value.split('-')[1] } :
                                                                        name === 'mentalState2' ? { id: Number(value.split('-')[0]), answer: value.split('-')[1] } :
                                value
            }));
        }
        if (!changedFields.includes(name)) {
            setChangedFields([...changedFields, name]);
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
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarAdmin/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser}/>

                        <div className="container-fluid" style={{marginBottom: '50px'}}>
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                {userRole === "ROLE_ADMIN" ?
                                    <Link to={"/dashboard/adminDashboard/admin"}
                                          className="btn goBack"
                                          style={{color: "#0d6efd"}}
                                          type="button"
                                    ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Admins
                                    </Link> :
                                    userRole === "ROLE_THERAPIST" ?
                                        <Link to={"/dashboard/adminDashboard/therapists"}
                                              className="btn goBack"
                                              style={{color: "#0d6efd"}}
                                              type="button"
                                        ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to
                                            Therapists
                                        </Link> :
                                        <Link to={"/dashboard/adminDashboard/users"}
                                              className="btn goBack"
                                              style={{color: "#0d6efd"}}
                                              type="button"
                                        ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to
                                            Users
                                        </Link>
                                }

                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>Edit {userRole === "ROLE_ADMIN" ? "Admin" : userRole === "ROLE_THERAPIST" ? "Therapist" : "User"}</h1>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Form onSubmit={handleUpdate} style={{width: '100%'}}>
                                    <div style={{display: "flex", justifyContent: "end",marginTop:"-70px"}}>
                                        <Button variant="primary" type="submit">
                                            Save
                                        </Button>
                                        {userRole === "ROLE_USER" ?
                                            <Link className="btn btn-danger"
                                                  to="/dashboard/adminDashboard/users"
                                                  type={"button"} style={{marginLeft: "5px"}}>Cancel</Link> :
                                            userRole === "ROLE_THERAPIST" ?
                                                <Link className="btn btn-danger"
                                                      to="/dashboard/adminDashboard/therapists"
                                                      type={"button"}
                                                      style={{marginLeft: "5px"}}>Cancel</Link> :
                                                <Link className="btn btn-danger"
                                                      to="/dashboard/adminDashboard/admin"
                                                      type={"button"} style={{marginLeft: "5px"}}>Cancel</Link>
                                        }
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        textAlign: "center",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        {updateError &&
                                            <Alert style={{marginTop: '20px'}} color="danger">
                                                {updateError}
                                            </Alert>
                                        }
                                        {updateSuccess &&
                                            <Alert style={{marginTop: '20px'}} color="success">
                                                {updateSuccess}
                                            </Alert>
                                        }
                                    </div>
                                    <br/>
                                    <div style={{display: "flex", justifyContent: 'space-evenly'}}>
                                        <div style={{width: "400px", paddingLeft: "5px", paddingRight: "5px"}}>
                                            <label htmlFor="specializationSelect">
                                                <h3>{userRole === "ROLE_ADMIN" ? "Admin" : userRole === "ROLE_THERAPIST" ? "Therapist" : "User"} Information:</h3>
                                            </label>
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

                                            {(userRole === 'ROLE_THERAPIST') &&
                                                <Form.Group controlId="formBasicDateOfBirth">
                                                    <br/>
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <Form.Control type="date" value={values.dateOfBirth}
                                                                  name="dateOfBirth"
                                                                  onChange={handleChange}
                                                                  required/>
                                                </Form.Group>}

                                            {(userRole === 'ROLE_USER') &&
                                                <Form.Group controlId="formBasicAge">
                                                    <br/>
                                                    <Form.Label>Age</Form.Label>
                                                    <Form.Control type="number"
                                                                  defaultValue={values.questionnaire && values.questionnaire.age}
                                                                  name="age"
                                                                  min={18} max={99} onChange={handleChange}
                                                                  required/>
                                                </Form.Group>}
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
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone number</Form.Label>
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

                                            {userRole === 'ROLE_THERAPIST' &&
                                                <Form.Group controlId="formBasicUniversity">
                                                    <br/>
                                                    <Form.Label>University attended</Form.Label>
                                                    <Form.Select
                                                        id="universitySelect"
                                                        name="university"
                                                        value={values.university ? `${values.university.id}-${values.university.university}` : ''}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="1-AAB">AAB</option>
                                                        <option value="2-UBT">UBT</option>
                                                        <option value="3-KAKTUS">KAKTUS</option>
                                                        <option value="4-UNIVERSITETI I PRISHTINES">UNIVERSITETI I
                                                            PRISHTINES
                                                        </option>
                                                    </Form.Select>
                                                </Form.Group>}

                                            {(userRole === 'ROLE_THERAPIST' || userRole === 'ROLE_USER') &&
                                                <Form.Group controlId="formBasicAddress">
                                                    <br/>
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
                                            }

                                            {(userRole === 'ROLE_THERAPIST') &&
                                                <Form.Group controlId="formBasicExperience">
                                                    <br/>
                                                    <Form.Label>Years of work experience</Form.Label>
                                                    <Form.Control type="number" defaultValue={data.experience}
                                                                  onChange={handleChange} name="experience" min={0}
                                                                  max={50}/>
                                                </Form.Group>
                                            }

                                            {(userRole === 'ROLE_THERAPIST' || userRole === 'ROLE_USER') &&
                                                <div className="custom-checkboxes">
                                                    <br/>
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
                                            }
                                        </div>
                                        {(userRole === 'ROLE_THERAPIST') &&
                                            <div style={{width: "350px", paddingLeft: "5px", paddingRight: "5px"}}>
                                                <label htmlFor="specializationSelect"><h3>What do they
                                                    specialize
                                                    in:</h3></label>
                                                <br/>
                                                <div className="custom-checkboxes">
                                                    <label><h5>Therapy Type</h5></label>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="IndividualCheckbox"
                                                            name="therapyTypeTherapist"
                                                            value="1-Individual"
                                                            checked={values.therapyTypeTherapist && values.therapyTypeTherapist.some(type => type.id === 1)}
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
                                                            checked={values.therapyTypeTherapist && values.therapyTypeTherapist.some(type => type.id === 2)}
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
                                                            checked={values.therapyTypeTherapist && values.therapyTypeTherapist.some(type => type.id === 3)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="TeenCheckbox">Teen Therapy</label>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="custom-checkboxes">
                                                    <label>
                                                        <h5>Identity Type</h5>
                                                    </label>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="straightCheckbox"
                                                            name="identityTypeTherapist"
                                                            value="1-Straight"
                                                            checked={values.identityTypeTherapist && values.identityTypeTherapist.some(type => type.id === 1)}
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
                                                            checked={values.identityTypeTherapist && values.identityTypeTherapist.some(type => type.id === 2)}
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
                                                            checked={values.identityTypeTherapist && values.identityTypeTherapist.some(type => type.id === 3)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="lesbianCheckbox">Lesbian</label>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="custom-checkboxes">
                                                    <label><h5>Therapist Type</h5></label>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="listensCheckbox"
                                                            name="therapistTypeTherapist"
                                                            value="1-Listens"
                                                            checked={values.therapistTypeTherapist && values.therapistTypeTherapist.some(type => type.id === 1)}
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
                                                            checked={values.therapistTypeTherapist && values.therapistTypeTherapist.some(type => type.id === 2)}
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
                                                            checked={values.therapistTypeTherapist && values.therapistTypeTherapist.some(type => type.id === 3)}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="teachesSkillsCheckbox">A therapist
                                                            that teaches new skills</label>
                                                    </div>
                                                </div>
                                                <br/>
                                                <i><FontAwesomeIcon icon={faCircleInfo} style={{
                                                    color: "#2e81fd"
                                                }}/>You can select more than one!</i>
                                            </div>
                                        }
                                        {(userRole === 'ROLE_USER') &&
                                            <div style={{width: "400px", paddingLeft: "5px", paddingRight: "5px"}}>
                                                <label htmlFor="specializationSelect"><h3>Therapy and Therapist
                                                    preferences:</h3></label>

                                                <Form.Group controlId="formBasicTherapyTypeUser">
                                                    <Form.Label>Therapy type:</Form.Label>
                                                    <Form.Select name="therapyTypeUser"
                                                                 value={values.therapyTypeUser ? `${values.therapyTypeUser.id}-${values.therapyTypeUser.therapyType}` : ''}
                                                                 onChange={handleChange} required>
                                                        <option value="1-Individual">Individual
                                                            Therapy
                                                        </option>
                                                        <option value="2-Couples">Couples
                                                            Therapy
                                                        </option>
                                                        <option value="3-Teen">Teen Therapy</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicTherapistGender">
                                                    <Form.Label>Therapist gender:</Form.Label>
                                                    <Form.Select name="therapistGender"
                                                                 value={values.therapistGender ? `${values.therapistGender.id}-${values.therapistGender.gender}` : ''}
                                                                 onChange={handleChange} required>
                                                        <option value="1-M">Male therapist
                                                        </option>
                                                        <option value="2-F">Female therapist
                                                        </option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicTherapistTypeUser">
                                                    <Form.Label>Therapist type:</Form.Label>
                                                    <Form.Select name="therapistTypeUser"
                                                                 value={values.therapistTypeUser ? `${values.therapistTypeUser.id}-${values.therapistTypeUser.therapistType}` : ''}
                                                                 onChange={handleChange} required>
                                                        <option value="1-Listens">A therapist that
                                                            listens
                                                        </option>
                                                        <option value="2-ExploresPast">A therapist
                                                            that explores the past
                                                        </option>
                                                        <option value="3-TeachesSkills">A therapist
                                                            that teaches new skills
                                                        </option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                        }
                                        {(userRole === 'ROLE_USER') &&
                                            <div style={{width: "400px", paddingLeft: "5px", paddingRight: "5px"}}>
                                                <div><label htmlFor="specializationSelect"><h2>More info about
                                                    myself:</h2></label>

                                                    <Form.Group controlId="formBasicRelationshipStatus">
                                                        <Form.Label>Relationship status:</Form.Label>
                                                        <Form.Select name="relationshipStatus"
                                                                     value={values.relationshipStatus ? `${values.relationshipStatus.id}-${values.relationshipStatus.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Single">Single</option>
                                                            <option value="2-In a relationship">In a relationship
                                                            </option>
                                                            <option value="3-Married">Married</option>
                                                            <option value="4-Divorced">Divorced</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group controlId="formBasicIdentityType">
                                                        <Form.Label>My Identity type:</Form.Label>
                                                        <Form.Select name="identityTypeUser"
                                                                     value={values.identityTypeUser ? `${values.identityTypeUser.id}-${values.identityTypeUser.identityType}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Straight">Straight</option>
                                                            <option value="2-Gay">Gay</option>
                                                            <option value="3-Lesbian">Lesbian</option>
                                                            <option value="4-Prefer not to say">Prefer not to say
                                                            </option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group controlId="formBasicTherapyHistory">
                                                        <Form.Label>Been to therapy before?</Form.Label>
                                                        <Form.Select name="therapyHistory"
                                                                     value={values.therapyHistory ? `${values.therapyHistory.id}-${values.therapyHistory.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Yes">Yes</option>
                                                            <option value="2-No">No</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group controlId="formBasicCommunication">
                                                        <Form.Label>Communication preferences:</Form.Label>
                                                        <Form.Select name="communication"
                                                                     value={values.communication ? `${values.communication.id}-${values.communication.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Mostly via messaging">Mostly via
                                                                messaging
                                                            </option>
                                                            <option value="2-Mostly via phone">Mostly via phone
                                                            </option>
                                                            <option value="3-Video sessions">Video sessions</option>
                                                            <option value="4-Not sure yet (decide later)">Not sure
                                                                yet
                                                                (decide later)
                                                            </option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group controlId="formBasicMedicationHistory">
                                                        <Form.Label>Currently taking any medication:</Form.Label>
                                                        <Form.Select name="medicationHistory"
                                                                     value={values.medicationHistory ? `${values.medicationHistory.id}-${values.medicationHistory.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Yes">Yes</option>
                                                            <option value="2-No">No</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group controlId="formBasicPhysicalHealth">
                                                        <Form.Label>Current physical health:</Form.Label>
                                                        <Form.Select name="physicalHealth"
                                                                     value={values.physicalHealth ? `${values.physicalHealth.id}-${values.physicalHealth.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Good">Good</option>
                                                            <option value="2-Fair">Fair</option>
                                                            <option value="3-Poor">Poor</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group controlId="formBasicMentalState1">
                                                        <Form.Label>Feeling down, depressed or
                                                            hopeless:</Form.Label>
                                                        <Form.Select name="mentalState1"
                                                                     value={values.mentalState1 ? `${values.mentalState1.id}-${values.mentalState1.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Not at all">Not at all</option>
                                                            <option value="2-Several days">Several days</option>
                                                            <option value="3-More than half the days">More than half
                                                                the
                                                                days
                                                            </option>
                                                            <option value="4-Nearly every day">Nearly every day
                                                            </option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group controlId="formBasicMentalState2">
                                                        <Form.Label>Thoughts that they would be better off dead or
                                                            of
                                                            hurting themself in some way:</Form.Label>
                                                        <Form.Select name="mentalState2"
                                                                     value={values.mentalState2 ? `${values.mentalState2.id}-${values.mentalState2.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Not at all">Not at all</option>
                                                            <option value="2-Several days">Several days</option>
                                                            <option value="3-More than half the days">More than half
                                                                the
                                                                days
                                                            </option>
                                                            <option value="4-Nearly every day">Nearly every day
                                                            </option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);