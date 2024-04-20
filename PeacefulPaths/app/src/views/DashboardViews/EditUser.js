import React,{useState} from 'react';
import {fetchUserData, fetchUserDataId, userUpdate} from '../../api/authService';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {authenticate, authFailure, authSuccess} from "../../redux/authActions";
import '../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {loadState, saveState} from "../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "./DashboardNav";
import SideBarAdmin from "./SideBars/SideBarAdmin";
import SideBarTherapist from "./SideBars/SideBarTherapist";
let role;
let userRole ;
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
        roles:[],
        number:'',
        experience:0,
        location:{},
        gender:{},
        allRoles:[]
    });

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_ADMIN' || response.data.roles.at(0).role === 'ROLE_THERAPIST'){
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
    },[])

    React.useEffect(()=>{
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
                    allRoles: response.data.allRoles
                })
            userRole = loadState("userRole",'')
            saveState("userRole",response.data.roles.at(0).role);
        }).catch((e)=>{
            localStorage.clear();
            history('/loginBoot');
        })
    },[])

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
        setValues(values => ({
            ...values,
            [name]: name === 'experience' ? Number(value) :
                name === 'gender' ? { id: Number(value.split('-')[0]), gender: value.split('-')[1] } :
                    name === 'location' ? { id: Number(value.split('-')[0]), location: value.split('-')[1] } :
                        value
        }));
    };


    return (
        <main id="page-top">

            <div id="wrapper">

                {role==='ROLE_ADMIN'?<SideBarAdmin />:role==='ROLE_THERAPIST'?<SideBarTherapist />:false}

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser}/>

                        <div className="container-fluid">

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

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" name="email" defaultValue={data.email}
                                                              onChange={handleChange} required/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicGender">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Select name="gender" value={values.gender ? `${values.gender.id}-${values.gender.gender}` : ''} onChange={handleChange} required>
                                                    {/*<option value="">Select Gender</option>*/}
                                                    <option value="1-M">Male</option>
                                                    <option value="2-F">Female</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="tel" defaultValue={data.number}
                                                              onChange={handleChange} name="number"/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicAddress">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Select name="location" value={values.location ? `${values.location.id}-${values.location.location}` : ''} onChange={handleChange} required>
                                                    {/*<option value="">Select Location</option>*/}
                                                    <option value="1-Zllakuqan">Zllakuqan</option>
                                                    <option value="2-Los Angeles">Los Angeles</option>
                                                    <option value="3-Chicago">Chicago</option>
                                                </Form.Select>
                                            </Form.Group>

                                            {userRole!=='ROLE_USER' && <Form.Group controlId="formBasicExperience">
                                                <Form.Label>Experience</Form.Label>
                                                <Form.Control type="number" defaultValue={data.experience}
                                                              onChange={handleChange} name="experience" min={0}/>
                                            </Form.Group>}

                                            <div className="text-left" style={{padding: '10px 0'}}>
                                                <Link className="small" to="/forgotPassBoot">Forgot Password?</Link>
                                            </div>

                                            <Button variant="primary" type="submit">
                                                Update Information
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>

                        </div>

                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span style={{color: 'grey'}}>Copyright &copy; PeacefulParts 2024</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current
                            session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <Link className="btn btn-primary" to="/loginBoot">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);