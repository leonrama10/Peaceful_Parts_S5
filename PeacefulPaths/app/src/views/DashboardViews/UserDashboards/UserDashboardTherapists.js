import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    fetchNextBooking,
    fetchUserData,
    fetchUserTherapistConnectionData,
    removeTherapist,
    submitFeedback
} from '../../../api/authService';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation,
    setUserAuthenticationState
} from "../../../redux/authActions";
import { connect } from "react-redux";
import { loadState, saveState } from "../../../helper/sessionStorage";

const UserDashboardTherapists = ({ loading, error, ...props }) => {
    const history = useNavigate();
    const [data, setData] = useState({});
    const [hideFilterMenu, setHideFilterMenu] = useState(true);
    const [bookingExists, setBookingExists] = useState(false);
    const [nextBooking, setNextBooking] = useState({});
    const [connectionFailure, setConnectionFailure] = useState('');
    const [therapistData, setTherapistData] = useState({
        id: 0,
        email: '',
        name: '',
        surname: '',
        password: '',
        roles: [],
        number: '',
        experience: 0,
        allRoles: [],
        university: '',
        location: {},
        gender: {},
    });
    const [feedbackModal, setFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [connected, setConnected] = useState(loadState("connected", false));
    const isUserAuthenticatedBoolean = loadState("isUserAuthenticated", false);

    useEffect(() => {
        props.setLocation("/dashboard/userDashboard/therapists");
        if (!isUserAuthenticatedBoolean) {
            if (!props.isUserAuthenticated) {
                props.loginFailure("Authentication Failed!!!");
                props.setLocation("/loginBoot");
                history('/loginBoot');
            } else {
                props.setUserAuthenticationState(true);
                saveState("isUserAuthenticated", props.isUserAuthenticated);
            }
        } else {
            props.setUserAuthenticationState(true);
            saveState("isUserAuthenticated", isUserAuthenticatedBoolean);
        }

        if (localStorage.getItem('reloadUser') === "true") {
            localStorage.setItem('reloadUser', "false");
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                setData(response.data);

                const newBookingsData = {
                    clientId: response.data.id,
                    therapistId: 0
                };

                fetchUserTherapistConnectionData(response.data.id).then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setTherapistData({
                            id: response.data.id,
                            email: response.data.email,
                            name: response.data.name,
                            surname: response.data.surname,
                            password: response.data.password,
                            roles: response.data.roles,
                            number: response.data.number,
                            experience: response.data.experience,
                            location: response.data.location,
                            allRoles: response.data.allRoles,
                            university: response.data.university,
                            gender: response.data.gender
                        });
                        setConnected(true);
                        saveState("connected", true);

                        newBookingsData.therapistId = response.data.id;

                        fetchNextBooking(newBookingsData).then((response) => {
                            if (response.data.bookingId !== 0) {
                                setBookingExists(true);
                                setNextBooking(response.data);
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                    } else {
                        localStorage.clear();
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    setConnected(false);
                    saveState("connected", false);
                    if (e.response) {
                        setConnectionFailure(e.response.data);
                    } else if (e.request) {
                        console.log(e.request);
                    } else {
                        console.log('Error', e.message);
                    }
                });
            } else {
                history('/loginBoot');
            }
        }).catch((e) => {
            history('/loginBoot');
        });
    }, [history]);

    const toggleFeedbackModal = () => {
        setFeedbackModal(!feedbackModal);
    };

    const handleRemove = () => {
        toggleFeedbackModal();
    };

   const handleFeedbackSubmit = () => {
       const feedbackData = {
           userId: data.id,
           therapistId: therapistData.id,
           feedback: feedback
       };

       // Remove therapist first
       removeTherapist(data.id)
           .then(() => {
               // Submit feedback after successful removal
               return submitFeedback(feedbackData);
           })
           .then(() => {
               toggleFeedbackModal();
               setTherapistData({}); // Clear therapist data from state
               setConnected(false);
               saveState("connected", false);
               history('/dashboard/userDashboard'); // Navigate to dashboard or refresh data
           })
           .catch((error) => {
               console.error('Error:', error);
               if (error.response) {
                   console.error('Error Response:', error.response.data);
               } else if (error.request) {
                   console.error('Error Request:', error.request);
               } else {
                   console.error('Error Message:', error.message);
               }
           });
   };


    function formatHour(hour) {
        return `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
    }

    return (
        <main id="page-top">
            <div id="wrapper">
                <SideBarUser hideFilterMenu={hideFilterMenu} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState} />
                        {connectionFailure &&
                            <Alert style={{ marginTop: '20px' }} variant="danger">
                                {connectionFailure}
                            </Alert>
                        }
                        <div className="container-fluid">
                            {connected && <div className="card" style={{ display: "flex", flexDirection: "row" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Full name: {therapistData.name} {therapistData.surname}</h5>
                                    <p className="card-text">Email: {therapistData.email}</p>
                                    <p className="card-text">Phone: {therapistData.number}</p>
                                    <p className="card-text">Gender: {therapistData.gender?.gender}</p>
                                    <p className="card-text">Experience: {therapistData.experience} years</p>
                                    <p className="card-text">Location: {therapistData.location?.location}</p>
                                    <br />
                                    <button onClick={() => handleRemove(data.id)}>Remove Therapist</button>
                                </div>
                                {bookingExists ? <div className="card-body">
                                    <h5 className="card-title">Next Session:</h5>
                                    <p className="card-text">Date: {new Date(nextBooking.date).toLocaleDateString()}</p>
                                    <p className="card-text">Hour: {nextBooking && nextBooking.hour && formatHour(nextBooking.hour)}</p>
                                </div> : <div><p>No bookings in the future, <br />why don't you select a date <br />and talk some stuff :)</p>
                                    <Link to="/dashboard/userDashboard/addBookings">Click here</Link>
                                </div>
                                }
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            <Modal isOpen={feedbackModal} toggle={toggleFeedbackModal}>
                <ModalHeader toggle={toggleFeedbackModal}>Feedback Form</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="feedback">Feedback</Label>
                            <Input type="textarea" name="feedback" id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleFeedbackSubmit}>Submit</Button>
                    <Button color="secondary" onClick={toggleFeedbackModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <script src="../../../vendor/jquery/jquery.min.js"></script>
            <script src="../../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../../../vendor/jquery-easing/jquery.easing.min.js"></script>
        </main>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        loading: auth.loading,
        error: auth.error,
        isUserAuthenticated: auth.isUserAuthenticated,
        location: auth.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardTherapists);
