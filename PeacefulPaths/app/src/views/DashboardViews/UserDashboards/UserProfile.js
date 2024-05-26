import React, {useEffect, useState} from 'react';
import {fetchUserData, userUpdate} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation,
    setUserAuthenticationState
} from "../../../redux/authActions";
import '../../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import {loadState, saveState} from "../../../helper/sessionStorage";
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function UserProfile({loading,error,...props}){

    useEffect(() => {
        props.setLocation("/dashboard/userDashboard/profile")
        if(!isUserAuthenticatedBoolean){
            if (!props.isUserAuthenticated){
                props.loginFailure("Authentication Failed!!!");
                props.setLocation("/loginBoot")
                history('/loginBoot');
            }else{
                props.setUserAuthenticationState(true)
                saveState("isUserAuthenticated",props.isUserAuthenticated)
            }
        }else{
            props.setUserAuthenticationState(true)
            saveState("isUserAuthenticated",isUserAuthenticatedBoolean)
        }

        if (localStorage.getItem('reloadUser')==="true") {
            // Set the 'reloaded' item in localStorage
            localStorage.setItem('reloadUser', "false");
            // Reload the page
            window.location.reload();
        }
    }, []);

    const history = useNavigate ();
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
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
        therapistGender:{},
        language:[],
        questionnaire:{},
        therapistTypeUser: {},
        therapyTypeUser: {},
        identityTypeUser: {},
        relationshipStatus: {},
        therapyHistory: {},
        communication: {},
        medicationHistory: {},
        physicalHealth: {},
        mentalState1: {},
        mentalState2: {}
    });

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER'){
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


    const handleUpdate = (e) => {
        e.preventDefault();
        props.authenticate();

        userUpdate(values).then((response)=>{
            if(response.status===201){
                props.setUser(response.data);
                history('/dashboard/userDashboard/profile');
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
        }else if (name === 'age') {
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
                [name]:
                    name === 'gender' ? { id: Number(value.split('-')[0]), gender: value.split('-')[1] } :
                        name === 'location' ? { id: Number(value.split('-')[0]), location: value.split('-')[1] } :
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
    };

    return (

        <main id="page-top">

            <div id="wrapper">

                <SideBarUser hideFilterMenu={hideFilterMenu}/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState}/>

                        <div className="container-fluid" style={{marginBottom: '50px'}}>

                            {/*ADD ACCOUNT FEATURES HERE: */}

                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
                                        <h2>Account Information</h2>
                                        {updateError &&
                                            <Alert style={{marginTop: '20px'}} variant="danger">
                                                {updateError}
                                            </Alert>
                                        }
                                        {updateSuccess &&
                                            <Alert style={{marginTop: '20px'}} variant="success">
                                                {updateSuccess}
                                            </Alert>
                                        }
                                        <br/>
                                        <Form onSubmit={handleUpdate}>
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
                                            <Form.Group controlId="formBasicAge">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control type="number" defaultValue={values.questionnaire.age} name="age"
                                                             min={18} max={99} onChange={handleChange} required/>
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
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="tel" defaultValue={data.number}
                                                              onChange={handleChange} name="number"/>
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
                                            </div>
                                            <i>You can select more than one language!</i>
                                            <br/>
                                            <hr/>
                                            <br/>
                                            <div><label htmlFor="specializationSelect"><h2>Therapy and Therapist
                                                preferences:</h2></label>
                                                <br/>
                                                <Form.Group controlId="formBasicTherapyTypeUser">
                                                    <Form.Label>Therapy type:</Form.Label>
                                                    <Form.Select name="therapyTypeUser"
                                                                 value={values.therapyTypeUser ? `${values.therapyTypeUser.id}-${values.therapyTypeUser.therapyType}` : ''}
                                                                 onChange={handleChange} required>
                                                        <option value="1-Individual
                                                            Therapy">Individual
                                                            Therapy
                                                        </option>
                                                        <option value="2-In a relationship">Couples
                                                            Therapy
                                                        </option>
                                                        <option value="3-Married">Teen Therapy</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group controlId="formBasicTherapyTypeUser">
                                                    <Form.Label>Therapist gender:</Form.Label>
                                                    <Form.Select name="therapistGender"
                                                                 value={values.therapistGender ? `${values.therapistGender.id}-${values.therapistGender.gender}` : ''}
                                                                 onChange={handleChange} required>
                                                        <option value="1-M">Male therapist</option>
                                                        <option value="2-F">Female therapist</option>
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
                                                            that teaches new skills</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <br/>
                                                <hr/>
                                                <br/>
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
                                                            <option value="2-Mostly via phone">Mostly via phone</option>
                                                            <option value="3-Video sessions">Video sessions</option>
                                                            <option value="4-Not sure yet (decide later)">Not sure yet
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
                                                        <Form.Label>Feeling down, depressed or hopeless:</Form.Label>
                                                        <Form.Select name="mentalState1"
                                                                     value={values.mentalState1 ? `${values.mentalState1.id}-${values.mentalState1.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Not at all">Not at all</option>
                                                            <option value="2-Several days">Several days</option>
                                                            <option value="3-More than half the days">More than half the
                                                                days
                                                            </option>
                                                            <option value="4-Nearly every day">Nearly every day</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group controlId="formBasicMentalState2">
                                                        <Form.Label>Thoughts that they would be better off dead or of
                                                            hurting themself in some way:</Form.Label>
                                                        <Form.Select name="mentalState2"
                                                                     value={values.mentalState2 ? `${values.mentalState2.id}-${values.mentalState2.answer}` : ''}
                                                                     onChange={handleChange} required>
                                                            <option value="1-Not at all">Not at all</option>
                                                            <option value="2-Several days">Several days</option>
                                                            <option value="3-More than half the days">More than half the
                                                                days
                                                            </option>
                                                            <option value="4-Nearly every day">Nearly every day</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <br/>
                                            <hr/>
                                            <div className="text-left" style={{padding: '10px 0'}}>
                                                <Link className="small" to="/forgotPassBoot">Change Password</Link>
                                            </div>
                                            <hr/>
                                            <br/>
                                            <Button variant="primary" type="submit">
                                                Update Information
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>

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
        isUserAuthenticated: auth.isUserAuthenticated,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);