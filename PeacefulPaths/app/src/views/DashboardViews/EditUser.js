import React, {useEffect, useState} from 'react';
import {fetchUserData, fetchUserDataId, userUpdate} from '../../api/authService';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess,
    setAdminAuthenticationState
} from "../../redux/authActions";
import '../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {loadState, saveState} from "../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "./DashboardNav";
import SideBarAdmin from "./SideBars/SideBarAdmin";
let role;
let userRole ;
const isAdminAuthenticatedBoolean = loadState("isAdminAuthenticated",false)
function EditUser({loading,error,...props}){

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
        language:[],
        questionnaire:{},
        university:{},
        dateOfBirth: '',
        therapistType: [],
        therapyType: [],
        identityType: []
    });

    useEffect(() => {
        if(isAdminAuthenticatedBoolean ){
            saveState("isAdminAuthenticated",isAdminAuthenticatedBoolean)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_ADMIN'){
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
                    language:response.data.language,
                    allRoles: response.data.allRoles,
                    questionnaire: response.data.questionnaire,
                    university: response.data.university,
                    dateOfBirth: response.data.dateOfBirth,
                    therapistType: response.data.therapistType,
                    therapyType: response.data.therapyType,
                    identityType: response.data.identityType
                })
                userRole = loadState("userRole",'')
                saveState("userRole",response.data.roles.at(0).role);
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

        }else if(props.isAdminAuthenticated){
            saveState("isAdminAuthenticated",props.isAdminAuthenticated)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_ADMIN' ){
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
                    language:response.data.language,
                    allRoles: response.data.allRoles,
                    questionnaire: response.data.questionnaire,
                    university: response.data.university,
                    dateOfBirth: response.data.dateOfBirth,
                    therapistType: response.data.therapistType,
                    therapyType: response.data.therapyType,
                    identityType: response.data.identityType
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



    const handleUpdate = (e) => {
        e.preventDefault();

        userUpdate(values).then((response)=>{
            if(response.status===201){
               if (role==="ROLE_ADMIN") {
                   // update this so it when u update a user it sends to adminDashboard/users ,
                   // when u update a therapist sends to adminDashboard/therapists ,
                   // and when u update admins sends to adminDashboard/admins
                    history('/dashboard/adminDashboard');
               }else if (role==="ROLE_THERAPIST"){
                    history('/dashboard/therapistDashboard/users');
               }
            }
            else{
                props.loginFailure('Something LEKAAAAAAA!Please Try Again');
            }

        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                props.loginFailure('Something NaNAAAAA!Please Try Again');
            }
        });
    };

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
        }  else {
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


    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarAdmin/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser} setAdminAuthenticationState={props.setAdminAuthenticationState}/>

                        <div className="container-fluid" style={{marginBottom: '100px'}}>

                            {/*ADD ACCOUNT FEATURES HERE: */}

                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
                                        <h2>Account Information</h2>
                                        {error &&
                                            <Alert style={{marginTop: '20px'}} variant="danger">
                                                {error}
                                            </Alert>
                                        }
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" name="name"
                                                              defaultValue={data.name} onChange={handleChange}
                                                              required/>
                                            </Form.Group>

                                            <Form.Group controlId="formSurname">
                                                <Form.Label>Surname</Form.Label>
                                                <Form.Control type="text" name="surname"
                                                              defaultValue={data.surname} onChange={handleChange}
                                                              required/>
                                            </Form.Group>

                                            {(userRole === 'ROLE_THERAPIST') &&
                                                <Form.Group controlId="formBasicDateOfBirth">
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <Form.Control type="text" value={values.dateOfBirth} readOnly/>
                                                </Form.Group>}


                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" name="email" defaultValue={data.email}
                                                              onChange={handleChange} required/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicGender">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Select name="gender"
                                                             value={values.gender ? `${values.gender.id}-${values.gender.gender}` : ''}
                                                             onChange={handleChange} required>
                                                    <option value="1-M">Male</option>
                                                    <option value="2-F">Female</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="tel" defaultValue={data.number}
                                                              onChange={handleChange} name="number"/>
                                            </Form.Group>

                                            {userRole === 'ROLE_THERAPIST' &&
                                                <Form.Group controlId="formBasicUniversity">
                                                    <Form.Label>University Attended</Form.Label>
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

                                            {(userRole === 'ROLE_THERAPIST' || userRole === 'ROLE_USER') &&
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
                                                </div>}

                                            {(userRole === 'ROLE_THERAPIST') &&
                                                <Form.Group controlId="formBasicExperience">
                                                    <Form.Label>Experience</Form.Label>
                                                    <Form.Control type="number" defaultValue={data.experience}
                                                                  onChange={handleChange} name="experience" min={0}/>
                                                </Form.Group>}

                                            {(userRole === 'ROLE_THERAPIST') &&
                                                <div><label htmlFor="specializationSelect"><h4><b>What do they
                                                    specialize
                                                    in:</b></h4></label>

                                                    <div className="custom-checkboxes">
                                                        <label><h5><b>Therapy Type</b></h5></label>
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
                                                        <label>
                                                            <h5><b>Identity Type</b></h5>
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
                                                        <label><h5><b>Therapist Type</b></h5></label>
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
                                                </div>}

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

                    <footer className="bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span style={{color: 'grey'}}>Copyright © PeacefulParts 2024</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>


            <script src="../../vendor/jquery/jquery.min.js"></script>
            <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

            <script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>

            <script src="../../js/sb-admin-2.min.js"></script>

            <script src="../../vendor/chart.js/Chart.min.js"></script>

            <script src="../../js/demo/chart-area-demo.js"></script>
            <script src="../../js/demo/chart-pie-demo.js"></script>

        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isAdminAuthenticated: auth.isAdminAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setAdminAuthenticationState: (boolean) => dispatch(setAdminAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);