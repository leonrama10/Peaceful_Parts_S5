import React, {useEffect, useState} from 'react';
import {
    fetchNote,
    fetchUserData,
    updateNote
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import '../../../css/Notes.css';
import {loadState, saveState} from "../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {jwtDecode} from "jwt-decode";
import {Button, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
let role;
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
let clientNotesId = 0
let therapistClientNoteId = 0
function TherapistOldNotesEdit({loading,error,...props}){

    const history = useNavigate ();
    const [userData,setUserData]=useState({});
    const [values, setValues] = useState({
        id: 0,
        mainPoints: [],
        mainPointsId: 0,
        notesText: '',
        patientMoodBefore: 0,
        patientMoodAfter: 0,
        dateAdded:''
    });


    useEffect(() => {
        clientNotesId = loadState("clientNotesId",0)
        therapistClientNoteId = loadState("therapistClientNoteId",0)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/users/oldNotes/edit")
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    let therapistId = response.data.id
                    setUserData(response.data);
                    role = loadState("role", '');
                    saveState("role",'ROLE_THERAPIST')

                    fetchNote({id:therapistClientNoteId}).then((response) => {
                        setValues({
                            id:response.data.id,
                            clientId: clientNotesId,
                            therapistId: therapistId,
                            mainPoints: response.data.mainPoints,
                            mainPointsId: response.data.mainPointsId,
                            notesText: response.data.notesText,
                            patientMoodBefore: response.data.patientMoodBefore,
                            patientMoodAfter: response.data.patientMoodAfter,
                            dateAdded:response.data.dateAdded
                        })
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
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/therapistDashboard/users/oldNotes/edit")
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    let therapistId = response.data.id
                    setUserData(response.data);
                    role = loadState("role", '');
                    saveState("role",'ROLE_THERAPIST')

                    fetchNote({id:therapistClientNoteId}).then((response) => {
                        setValues({
                            id:response.data.id,
                            clientId: clientNotesId,
                            therapistId: therapistId,
                            mainPoints: response.data.mainPoints,
                            mainPointsId: response.data.mainPointsId,
                            notesText: response.data.notesText,
                            patientMoodBefore: response.data.patientMoodBefore,
                            patientMoodAfter: response.data.patientMoodAfter,
                            dateAdded:response.data.dateAdded
                        })
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

        updateNote(values).then((response)=>{
            if(response.status===200){
                history('/dashboard/therapistDashboard/users/oldNotes');
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

    useEffect(() => {
        console.log("VALUESSSSSSSSSSSSSSSS:", values);
    }, [values]);

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

                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/therapistDashboard/users/oldNotes"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Notes
                                </Link>
                            </div>

                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Edit Note</h1>
                            </div>

                            <Row className="justify-content-md-center">
                                <Col xs={12} md={6}>
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
                                            <Button  onClick={handleAddPoint}>Add Point</Button>
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
                                                    checked={value === values.patientMoodBefore}
                                                    required
                                                />
                                            ))}
                                        </Form.Group>
                                        <br/>
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
                                                    checked={value === values.patientMoodAfter}
                                                    required
                                                />
                                            ))}
                                        </Form.Group>
                                        <br/>
                                        <br/>
                                        <div style={{display: "flex", justifyContent: "end", alignItems: "center"}}>
                                            <Button variant="info" type="submit" style={{marginRight:"5px",color:"white"}}>
                                                Update Note
                                            </Button>
                                            <Link to={"/dashboard/therapistDashboard/users/oldNotes"} className={"btn btn-danger"}  type="button">
                                                Cancel
                                            </Link>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(TherapistOldNotesEdit);