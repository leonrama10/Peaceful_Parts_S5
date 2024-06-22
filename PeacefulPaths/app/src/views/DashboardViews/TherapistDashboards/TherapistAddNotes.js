import React, {useEffect, useState} from 'react';
import {addNewNote, fetchUserData, fetchUserDataId} from '../../../api/authService';
import {useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import '../../../css/Notes.css';
import {Alert} from "reactstrap";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {jwtDecode} from "jwt-decode";
let userRole;
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
let userId = null
let addNotesBoolean = null
function TherapistAddNotes({loading,error,...props}){

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
        userId = loadState("chatUserId",0)
        addNotesBoolean = loadState("addNotesBoolean",false)
        if (addNotesBoolean) {
            if (getRefreshToken()) {
                props.setLocation("/dashboard/therapistDashboard/users/addNotes")

                fetchUserData().then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setUserData(response.data);
                        saveState("role", 'ROLE_THERAPIST')
                        let therapistId = response.data.id

                        fetchUserDataId({id:userId}).then((response) => {
                            setData(response.data);
                            setValues({
                                clientId: response.data.id,
                                therapistId: therapistId,
                                mainPoints: response.data.mainPoints,
                                notesText: response.data.notesText,
                                patientMoodBefore: response.data.patientMoodBefore,
                                patientMoodAfter: response.data.patientMoodAfter
                            })
                            userRole = loadState("userRole", '')
                            saveState("userRole", response.data.roles.at(0).role);
                        }).catch((e) => {
                            localStorage.clear();
                            history('/loginBoot');
                        })
                    } else {
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    localStorage.clear();
                    history('/loginBoot');
                })


                if (localStorage.getItem('reloadTherapist') === "true") {
                    let userId = loadState("chatUserId", 0)
                    saveState("meetingAvailableTherapist/" + userId, false)
                    saveState("chatStateLocation",'')
                    // Set the 'reloaded' item in localStorage
                    localStorage.setItem('reloadTherapist', "false");
                    // Reload the page
                    window.location.reload();
                }
            } else if (getAccessToken()) {
                props.setLocation("/dashboard/therapistDashboard/users/addNotes")

                fetchUserData().then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setUserData(response.data);
                        saveState("role", 'ROLE_THERAPIST')
                        let therapistId = response.data.id

                        fetchUserDataId({id:userId}).then((response) => {
                            setData(response.data);
                            setValues({
                                clientId: response.data.id,
                                therapistId: therapistId,
                                mainPoints: response.data.mainPoints,
                                notesText: response.data.notesText,
                                patientMoodBefore: response.data.patientMoodBefore,
                                patientMoodAfter: response.data.patientMoodAfter
                            })
                            userRole = loadState("userRole", '')
                            saveState("userRole", response.data.roles.at(0).role);
                        }).catch((e) => {
                            localStorage.clear();
                            history('/loginBoot');
                        })
                    } else {
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    localStorage.clear();
                    history('/loginBoot');
                })

                if (localStorage.getItem('reloadTherapist') === "true") {
                    let userId = loadState("chatUserId", 0)
                    saveState("meetingAvailableTherapist/" + userId, false)
                    saveState("chatStateLocation",'')
                    // Set the 'reloaded' item in localStorage
                    localStorage.setItem('reloadTherapist', "false");
                    // Reload the page
                    window.location.reload();
                }
            } else {
                props.loginFailure("Authentication Failed!!!");
                props.setLocation("/loginBoot")
                history('/loginBoot');
            }
        }else {
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();

        addNewNote(values).then((response)=>{
            if(response.status===200){
                history('/dashboard/therapistDashboard/therapistChatDashboard');
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

    const handleRemovePoint = (index) => {
        setValues(prevValues => ({
            ...prevValues,
            mainPoints: prevValues.mainPoints.filter((_, i) => i !== index),
        }));
    };

    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser} />

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
                                                        <li key={index} style={{
                                                            marginBottom: '10px',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}>
                                                            <span style={{marginRight: '10px'}}>•</span>
                                                            <Form.Control
                                                                name="mainPoints"
                                                                type="text"
                                                                value={point}
                                                                onChange={(e) => handleChange(e, index)}
                                                                required
                                                            />
                                                            <button onClick={() => handleRemovePoint(index)}
                                                                    className={"button-mainPoints"}> ̶
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Button onClick={handleAddPoint}>Add Point</Button>
                                            </Form.Group>
                                            <br/>
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
                                            <br/>
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
export default connect(mapStateToProps, mapDispatchToProps)(TherapistAddNotes);