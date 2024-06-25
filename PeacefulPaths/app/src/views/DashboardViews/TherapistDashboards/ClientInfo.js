import React, {useEffect, useState} from 'react';
import {fetchUserData, fetchUserDataId} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {Alert} from "reactstrap";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import DashboardFooter from "../DashboardFooter";
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
let clientInfoId = 0
function ClientInfo({loading,error,...props}){

    const history = useNavigate ();
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
        therapistGender:{},
        language:[],
        questionnaire:{},
        dateOfBirth: '',
        therapistTypeUser: {},
        therapyTypeUser: {},
        identityTypeUser: {},
        relationshipStatus:{},
        therapyHistory: {},
        communication:{},
        medicationHistory:{},
        physicalHealth:{},
        mentalState1:{},
        mentalState2:{}
    });

    useEffect(() => {
        clientInfoId = loadState("clientInfoId",0)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/users/info")
                fetchUserData().then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setUserData(response.data);
                        
                        saveState("role",'ROLE_THERAPIST')
                    } else {
                        props.setLocation('/loginBoot')
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    props.setLocation('/loginBoot')
                    localStorage.clear();
                    history('/loginBoot');
                })

                fetchUserDataId({id:clientInfoId}).then((response) => {
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
                        therapistGender: response.data.therapistGender,
                        language: response.data.language,
                        allRoles: response.data.allRoles,
                        questionnaire: response.data.questionnaire,
                        dateOfBirth: response.data.dateOfBirth,
                        therapistTypeUser: response.data.therapistTypeUser,
                        therapyTypeUser: response.data.therapyTypeUser,
                        identityTypeUser: response.data.identityTypeUser,
                        relationshipStatus: response.data.relationshipStatus,
                        therapyHistory: response.data.therapyHistory,
                        communication: response.data.communication,
                        medicationHistory: response.data.medicationHistory,
                        physicalHealth: response.data.physicalHealth,
                        mentalState1: response.data.mentalState1,
                        mentalState2: response.data.mentalState2
                    })
                    userRole = loadState("userRole", '')
                    saveState("userRole", response.data.roles.at(0).role);
                }).catch((e) => {
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
            props.setLocation("/dashboard/therapistDashboard/users/info")
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setUserData(response.data);
                    
                    saveState("role",'ROLE_THERAPIST')
                } else {
                    props.setLocation('/loginBoot')
                    history('/loginBoot');
                }
            }).catch((e) => {
                props.setLocation('/loginBoot')
                localStorage.clear();
                history('/loginBoot');
            })

            fetchUserDataId({id:clientInfoId}).then((response) => {
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
                    therapistGender: response.data.therapistGender,
                    language: response.data.language,
                    allRoles: response.data.allRoles,
                    questionnaire: response.data.questionnaire,
                    dateOfBirth: response.data.dateOfBirth,
                    therapistTypeUser: response.data.therapistTypeUser,
                    therapyTypeUser: response.data.therapyTypeUser,
                    identityTypeUser: response.data.identityTypeUser,
                    relationshipStatus: response.data.relationshipStatus,
                    therapyHistory: response.data.therapyHistory,
                    communication: response.data.communication,
                    medicationHistory: response.data.medicationHistory,
                    physicalHealth: response.data.physicalHealth,
                    mentalState1: response.data.mentalState1,
                    mentalState2: response.data.mentalState2
                })
                userRole = loadState("userRole", '')
                saveState("userRole", response.data.roles.at(0).role);
            }).catch((e) => {
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
    }, [])


    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser}/>

                        <div className="container-fluid" style={{marginBottom: '50px'}}>
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/therapistDashboard/users"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Clients
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>Client Information</h1>
                            </div>

                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
                                        {/*<h2>Client Information</h2>*/}
                                        {error &&
                                            <Alert style={{marginTop: '20px'}} variant="danger">
                                                {error}
                                            </Alert>
                                        }
                                        <Form>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" name="name"
                                                              defaultValue={data.name}
                                                              required readOnly/>
                                            </Form.Group>
                                            <br/>

                                            <Form.Group controlId="formSurname">
                                                <Form.Label>Surname</Form.Label>
                                                <Form.Control type="text" name="surname"
                                                              defaultValue={data.surname}
                                                              required readOnly/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicDateOfBirth">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control type="text" defaultValue={values.questionnaire.age}
                                                              readOnly/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" name="email" defaultValue={data.email}
                                                              required readOnly/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicGender">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control type="text" name="gender"
                                                              defaultValue={values.gender.gender}
                                                              readOnly/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="tel" defaultValue={data.number}
                                                              name="number" readOnly/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicLocation">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control type="text" defaultValue={values.location.location}
                                                              name="location" readOnly/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicLanguage">
                                                <Form.Label>Language</Form.Label>
                                                <Form.Control type="text"
                                                              defaultValue={values.language.map(lang => lang.language).join(', ')}
                                                              name="language" readOnly/>
                                            </Form.Group>
                                            <br/>
                                            <hr/>
                                            <div><label htmlFor="specializationSelect"><h2>Therapist preferences:
                                            </h2></label>

                                                <Form.Group controlId="formBasicTherapyType">
                                                    <Form.Label>Therapy type:</Form.Label>
                                                    <Form.Control type="text"
                                                                  defaultValue={values.therapyTypeUser.therapyType}
                                                                  name="therapyTypeUser"
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicTherapistGender">
                                                    <Form.Label>Therapist gender:</Form.Label>
                                                    <Form.Control type="text"
                                                                  defaultValue={values.therapistGender.gender}
                                                                  name="therapistGender"
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicTherapistType">
                                                    <Form.Label>Therapist expectations, a therapist who:</Form.Label>
                                                    <Form.Control type="text"
                                                                  defaultValue={values.therapistTypeUser.therapistType}
                                                                  name="therapistTypeUser"
                                                                  readOnly/>
                                                </Form.Group>

                                            </div>

                                            <br/>
                                            <hr/>

                                            <div><label htmlFor="specializationSelect"><h2>More info about
                                                therapy:</h2></label>

                                                <Form.Group controlId="formBasicRelationshipStatus">
                                                    <Form.Label>Relationship status:</Form.Label>
                                                    <Form.Control type="text"
                                                                  defaultValue={values.relationshipStatus.answer}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicIdentityType">
                                                    <Form.Label>Identify as:</Form.Label>
                                                    <Form.Control type="text"
                                                                  defaultValue={values.identityTypeUser.identityType}
                                                                  name="identityTypeUser"
                                                                  readOnly/>
                                                </Form.Group>

                                                <br/>
                                                <Form.Group controlId="formBasicTherapyHistory">
                                                    <Form.Label>Been to therapy before?</Form.Label>
                                                    <Form.Control type="text"
                                                                  defaultValue={values.therapyHistory.answer} readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicCommunication">
                                                    <Form.Label>Communication Preferences:</Form.Label>
                                                    <Form.Control type="text" defaultValue={values.communication.answer}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicMedicationHistory">
                                                    <Form.Label>Currently taking any medication:</Form.Label>
                                                    <Form.Control type="text"
                                                                  defaultValue={values.medicationHistory.answer}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicCurrentPhysicalHealth">
                                                    <Form.Label>Current physical health:</Form.Label>
                                                    <Form.Control type="text"
                                                                  defaultValue={values.physicalHealth.answer}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicMentalState1">
                                                    <Form.Label>Feeling down, depressed or hopeless:</Form.Label>
                                                    <Form.Control type="text" defaultValue={values.mentalState1.answer}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicMentalState2">
                                                    <Form.Label>Thoughts that they would be better off dead or of
                                                        hurting themself in some way:</Form.Label>
                                                    <Form.Control type="text" defaultValue={values.mentalState2.answer}
                                                                  readOnly/>
                                                </Form.Group>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);