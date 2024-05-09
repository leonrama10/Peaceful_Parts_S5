import React, {useEffect, useState} from 'react';
import {addNewNote, fetchUserData, fetchUserDataId} from '../../../api/authService';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
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
let userRole;
let therapistId;
const isTherapistAuthenticatedBoolean = loadState("isTherapistAuthenticated",false)
function TherapistAddNotes({loading,error,...props}){

    const { id } = useParams();
    const idNumber = Number(id);
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [userData,setUserData]=useState({});

    const [values, setValues] = useState({
        clientId:0,
        therapistId:0,
        mainPoints: [],
        notesText: '',
        patientMoodBefore: 0,
        patientMoodAfter: 0
    });

    useEffect(() => {
        if(isTherapistAuthenticatedBoolean){
            saveState("isTherapistAuthenticated",isTherapistAuthenticatedBoolean)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setUserData(response.data);
                    role = loadState("role",'');
                    therapistId = response.data.id
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
                    clientId:response.data.id,
                    therapistId:therapistId,
                    mainPoints: response.data.mainPoints,
                    notesText: response.data.notesText,
                    patientMoodBefore: response.data.patientMoodBefore,
                    patientMoodAfter: response.data.patientMoodAfter
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
                    therapistId = response.data.id
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
                    clientId:response.data.id,
                    therapistId:therapistId,
                    mainPoints: response.data.mainPoints,
                    notesText: response.data.notesText,
                    patientMoodBefore: response.data.patientMoodBefore,
                    patientMoodAfter: response.data.patientMoodAfter
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

        addNewNote(values).then((response)=>{
            if(response.status===200){
                history('/dashboard/therapistDashboard/users');
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

    const handleChange = (e, index) => {
            const { name, value } = e.target;

            if (name === 'mainPoints') {
                const newPoints = [...values.mainPoints];
                newPoints[index] = value;
                setValues(values => ({ ...values, mainPoints: newPoints }));
            } else {
                setValues(values => ({
                    ...values,
                    [name]: name === 'patientMoodAfter' || name === 'patientMoodBefore' ? Number(value) : value
                }));
            }
    };

    const handleAddPoint = () => {
        setValues(prevValues => ({
            ...prevValues,
            mainPoints: [...(prevValues.mainPoints || []), ''],
        }));
    };


    useEffect(() => {
        console.log("Current values state:", values);
    }, [values]); // This effect runs whenever `values` changes


    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser} setTherapistAuthenticationState={props.setTherapistAuthenticationState}/>

                        <div className="container-fluid" style={{marginBottom: '100px'}}>

                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
                                        <h2>Client Notes</h2>
                                        {error && (
                                            <Alert style={{ marginTop: '20px' }} variant="danger">
                                                {error}
                                            </Alert>
                                        )}
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group controlId="formMainPoints">
                                                <Form.Label>Main Points of Discussion:</Form.Label>
                                                <ul>
                                                    {values.mainPoints && values.mainPoints.map((point, index) => (
                                                        <li key={index}>
                                                            <Form.Control
                                                                name="mainPoints"
                                                                type="text"
                                                                value={point}
                                                                onChange={(e) => handleChange(e, index)}
                                                                required
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Button onClick={handleAddPoint}>Add Point</Button>
                                            </Form.Group>
                                            <br />
                                            <Form.Group controlId="formNotesText">
                                                <Form.Label>Session Notes & Observations:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="notesText"
                                                    value={values.notesText}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <br />
                                            <Form.Group controlId="formPatientMoodBefore">
                                                <Form.Label>Patient Mood (Before):</Form.Label>
                                                <br/>
                                                {Array.from({length: 10}, (_, i) => i + 1).map((value) => (
                                                    <Form.Check
                                                        key={value}
                                                        inline
                                                        label={value}
                                                        type="radio"
                                                        name="patientMoodBefore"
                                                        value={value}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ))}
                                            </Form.Group>
                                            <br />
                                            <Form.Group controlId="formPatientMoodAfter">
                                                <Form.Label>Patient Mood (After):</Form.Label>
                                                <br/>
                                                {Array.from({length: 10}, (_, i) => i + 1).map((value) => (
                                                    <Form.Check
                                                        key={value}
                                                        inline
                                                        label={value}
                                                        type="radio"
                                                        name="patientMoodAfter"
                                                        value={value}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ))}
                                            </Form.Group>
                                            <br />
                                            <Button variant="primary" type="submit">
                                                Save Notes
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
export default connect(mapStateToProps, mapDispatchToProps)(TherapistAddNotes);