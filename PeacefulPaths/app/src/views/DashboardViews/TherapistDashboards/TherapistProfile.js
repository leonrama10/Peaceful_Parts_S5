import React, {useEffect, useState} from 'react';
import {fetchUserData, userUpdate} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation,
    setTherapistAuthenticationState
} from "../../../redux/authActions";
import '../../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {loadState, saveState} from "../../../helper/sessionStorage";
const isTherapistAuthenticatedBoolean = loadState("isTherapistAuthenticated",false)
function TherapistProfile({loading,error,...props}){

    useEffect(() => {
        props.setLocation("/dashboard/therapistDashboard/profile")
        if(!isTherapistAuthenticatedBoolean){
            if (!props.isTherapistAuthenticated){
                props.setLocation('/loginBoot')
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }else{
                props.setTherapistAuthenticationState(true)
                saveState("isTherapistAuthenticated",props.isTherapistAuthenticated)
            }
        }else{
            props.setTherapistAuthenticationState(true)
            saveState("isTherapistAuthenticated",isTherapistAuthenticatedBoolean)
        }

        if (localStorage.getItem('reloadTherapist')==="true") {
            // Set the 'reloaded' item in localStorage
            localStorage.setItem('reloadTherapist', "false");
            // Reload the page
            window.location.reload();
        }
    }, []);

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
    });

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
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
                    dateOfBirth: response.data.dateOfBirth
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

    return (

        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setTherapistAuthenticationState={props.setTherapistAuthenticationState}/>

                        <div className="container-fluid" style={{marginBottom: '50px'}}>

                            {/*ADD ACCOUNT FEATURES HERE: */}

                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
                                        <h2>Account Information</h2>
                                        { updateError &&
                                            <Alert style={{marginTop:'20px'}} variant="danger">
                                                {updateError}
                                            </Alert>
                                        }
                                        { updateSuccess &&
                                            <Alert style={{marginTop:'20px'}} variant="success">
                                                {updateSuccess}
                                            </Alert>
                                        }
                                        <Form onSubmit={handleUpdate}>
                                            <br/>
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
                                                <i>You can select more than one!</i>
                                            </div>
                                            <br/>
                                            <Form.Group controlId="formBasicAddress">
                                                <Form.Label>Years of experience</Form.Label>
                                                <Form.Control type="number" defaultValue={data.experience}
                                                              onChange={handleChange} name="experience" min={0}/>
                                            </Form.Group>
                                            <br/>
                                            <hr/>
                                            <br/>
                                            <div><label htmlFor="specializationSelect"><h2>What do I
                                                specialize
                                                in:</h2></label>

                                                <div className="custom-checkboxes">
                                                    <label><h5>Therapy type:</h5></label>
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
                                                <br/>
                                                <div className="custom-checkboxes">
                                                    <label><h5>Therapist type:</h5></label>
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

                                                <br/>

                                                <div className="custom-checkboxes">
                                                    <label>
                                                        <h5>Identity type:</h5>
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
                                                <i>You can select more than one!</i>
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
        isTherapistAuthenticated: auth.isTherapistAuthenticated,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setTherapistAuthenticationState: (boolean) => dispatch(setTherapistAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TherapistProfile);