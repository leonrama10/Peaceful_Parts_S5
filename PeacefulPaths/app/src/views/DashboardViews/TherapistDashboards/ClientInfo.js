import React, {useEffect, useState} from 'react';
import {fetchUserData, fetchUserDataId} from '../../../api/authService';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess,
    setTherapistAuthenticationState
} from "../../../redux/authActions";
import '../../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
let role;
let userRole ;
const isTherapistAuthenticatedBoolean = loadState("isTherapistAuthenticated",false)
function ClientInfo({loading,error,...props}){

    const { id } = useParams();
    const idNumber = Number(id);
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
        identityTypeUser: {}
    });

    useEffect(() => {
         if(isTherapistAuthenticatedBoolean){
            saveState("isTherapistAuthenticated",isTherapistAuthenticatedBoolean)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setUserData(response.data);
                    role = loadState("role",'');
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

            fetchUserDataId(idNumber).then((response)=>{
                setData(response.data);
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
                    gender:response.data.gender,
                    therapistGender:response.data.therapistGender,
                    language:response.data.language,
                    allRoles: response.data.allRoles,
                    questionnaire: response.data.questionnaire,
                    dateOfBirth: response.data.dateOfBirth,
                    therapistTypeUser: response.data.therapistTypeUser,
                    therapyTypeUser: response.data.therapyTypeUser,
                    identityTypeUser: response.data.identityTypeUser
                })
                userRole = loadState("userRole",'')
                saveState("userRole",response.data.roles.at(0).role);
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })
        }else if(props.isTherapistAuthenticated){
            saveState("isTherapistAuthenticated",props.isTherapistAuthenticated)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setUserData(response.data);
                    role = loadState("role",'');
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

            fetchUserDataId(idNumber).then((response)=>{
                setData(response.data);
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
                    gender:response.data.gender,
                    therapistGender:response.data.therapistGender,
                    language:response.data.language,
                    allRoles: response.data.allRoles,
                    questionnaire: response.data.questionnaire,
                    dateOfBirth: response.data.dateOfBirth,
                    therapistTypeUser: response.data.therapistTypeUser,
                    therapyTypeUser: response.data.therapyTypeUser,
                    identityTypeUser: response.data.identityTypeUser
                })
                userRole = loadState("userRole",'')
                saveState("userRole",response.data.roles.at(0).role);
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })
        }else{
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);



    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser}/>

                        <div className="container-fluid" style={{marginBottom: '50px'}}>

                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
                                        <h2>Client Information</h2>
                                        {error &&
                                            <Alert style={{marginTop: '20px'}} variant="danger">
                                                {error}
                                            </Alert>
                                        }
                                        <Form >
                                            <Form.Group controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" name="name"
                                                              defaultValue={data.name}
                                                              required readOnly/>
                                            </Form.Group>

                                            <Form.Group controlId="formSurname">
                                                <Form.Label>Surname</Form.Label>
                                                <Form.Control type="text" name="surname"
                                                              defaultValue={data.surname}
                                                              required readOnly/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicDateOfBirth">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control type="text" value={values.questionnaire.age} readOnly/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" name="email" defaultValue={data.email}
                                                              required readOnly/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicGender">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control type="text" name="gender"
                                                              defaultValue={values.gender.gender}
                                                              readOnly/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="tel" defaultValue={data.number}
                                                               name="number" readOnly/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicLocation">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control type="text" value={values.location.location}
                                                               name="location" readOnly/>
                                            </Form.Group>

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
                                                                  value={values.questionnaire.relationshipStatus}
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
                                                                  value={values.questionnaire.therapyHistory} readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicCommunication">
                                                    <Form.Label>Communication Preferences:</Form.Label>
                                                    <Form.Control type="text" value={values.questionnaire.communication}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicMedicationHistory">
                                                    <Form.Label>Currently taking any medication:</Form.Label>
                                                    <Form.Control type="text"
                                                                  value={values.questionnaire.medicationHistory}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicCurrentPhysicalHealth">
                                                    <Form.Label>Current physical health:</Form.Label>
                                                    <Form.Control type="text"
                                                                  value={values.questionnaire.currentPhysicalHealth}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicMentalState1">
                                                    <Form.Label>Feeling down, depressed or hopeless:</Form.Label>
                                                    <Form.Control type="text" value={values.questionnaire.mentalState1}
                                                                  readOnly/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicMentalState2">
                                                    <Form.Label>Thoughts that they would be better off dead or of
                                                        hurting themself in some way:</Form.Label>
                                                    <Form.Control type="text" value={values.questionnaire.mentalState2}
                                                                  readOnly/>
                                                </Form.Group>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <script src="../../../vendor/jquery/jquery.min.js"></script>
            <script src="../../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

            <script src="../../../vendor/jquery-easing/jquery.easing.min.js"></script>

            <script src="../../../js/sb-admin-2.min.js"></script>

            <script src="../../../vendor/chart.js/Chart.min.js"></script>

            <script src="../../../js/demo/chart-area-demo.js"></script>
            <script src="../../../js/demo/chart-pie-demo.js"></script>

        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isTherapistAuthenticated: auth.isTherapistAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setTherapistAuthenticationState: (boolean) => dispatch(setTherapistAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);