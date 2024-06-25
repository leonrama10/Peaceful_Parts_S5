import React, {useEffect, useState} from 'react';
import {fetchUserData, userUpdate} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {
    authenticate,
    authFailure,
    authSuccess
} from "../../../redux/authActions";
import {Alert} from "reactstrap";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarAdmin from "../SideBars/SideBarAdmin";
import {saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import Loading from "../LoadingPage";
import PhoneInput from "react-phone-input-2";
import DashboardFooter from "../DashboardFooter";
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
function AdminProfile({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [values, setValues] = useState({
        id:0,
        email: '',
        name:'',
        surname:'',
        password:'',
        number:'',
        location:{},
        gender:{},
        roles:[]
    });

    useEffect(() => {
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        setValues({
                            id:response.data.id,
                            email: response.data.email,
                            name: response.data.name,
                            surname: response.data.surname,
                            roles: response.data.roles,
                            password: response.data.password,
                            number:response.data.number,
                            location:response.data.location,
                            gender:response.data.gender,
                            language:response.data.language,
                            experience:response.data.experience,
                        })
                        
                        saveState("role",'ROLE_ADMIN')
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        }else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        setValues({
                            id:response.data.id,
                            email: response.data.email,
                            name: response.data.name,
                            surname: response.data.surname,
                            roles: response.data.roles,
                            password: response.data.password,
                            number:response.data.number,
                            location:response.data.location,
                            gender:response.data.gender,
                            language:response.data.language,
                            experience:response.data.experience,
                        })
                        
                        saveState("role",'ROLE_ADMIN')
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        }
        else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);


    const [updateError,setUpdateError]=useState('');
    const [updateSuccess,setUpdateSuccess]=useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        props.authenticate();

        const nameSurnameRegex = /^[a-zA-Z]+$/; // Matches any string with one or more letters

        // Validate name, surname and phoneNumber
        if (!nameSurnameRegex.test(values.name) || !nameSurnameRegex.test(values.surname)) {
            setUpdateError("Name and surname fields cannot be empty and should only contain letters!");
            return;
        }

        const phoneNumberRegex = /^\d{11}$/;

        if (!phoneNumberRegex.test(values.number)) {
            setUpdateError("Phone number field should be exactly 11 digits long!");
            return;
        }

        const locationRegex = /^(Kosovo|Albania|Montenegro|North Macedonia|Serbia)$/;

        // Validate location
        if (!locationRegex.test(values.location.location)) {
            setUpdateError("Invalid selection. Please select a location.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Validate email and password
        if (!emailRegex.test(values.email)) {
            setUpdateError("Invalid email format!");
            return;
        }
        if (!passwordRegex.test(values.password)) {
            setUpdateError(" Minimum eight characters, at least one letter and one number!");
            return;
        }

        userUpdate(values).then((response)=>{
            if(response.status===201){
                props.setUser(response.data);
                setUpdateSuccess('Updated successfully.')
                history('/dashboard/adminDashboard/profile');
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
        } else {
            setValues(values => ({
                ...values,
                [name]: name === 'experience' ? Number(value) :
                    name === 'gender' ? { id: Number(value.split('-')[0]), gender: value.split('-')[1] } :
                        name === 'location' ? { id: Number(value.split('-')[0]), location: value.split('-')[1] } :
                            value
            }));
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
        <main id="page-top">

            <div id="wrapper">

                <SideBarAdmin />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/adminDashboard"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Dashboard
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Account Information</h1>
                            </div>
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
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
                                                    <option value="3-O">Other</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
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
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                                <div className="text-left" style={{padding: '10px 0'}}>
                                                    <Link className="small" to="/forgotPassBoot"
                                                          style={{textDecoration: "none"}}>Change Password</Link>
                                                    <FontAwesomeIcon icon={faArrowRight} style={{
                                                        marginLeft: "5px",
                                                        fontSize: "13px",
                                                        color: "#2e81fd"
                                                    }}/>
                                                </div>

                                                <div style={{display: "flex", justifyContent: "end"}}>
                                                    <Button variant="primary" type="submit">
                                                        Save
                                                    </Button>
                                                    <Link className="btn btn-danger" to="/dashboard/adminDashboard"
                                                          type={"button"} style={{marginLeft: "5px"}}>Cancel</Link>
                                                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);