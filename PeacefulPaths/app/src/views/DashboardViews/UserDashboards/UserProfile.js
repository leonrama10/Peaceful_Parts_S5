import React,{useState} from 'react';
import {fetchUserData, userUpdate} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form, Button, Dropdown} from 'react-bootstrap';
import {authenticate, authFailure, authSuccess} from "../../../redux/authActions";
import '../../../css/sb-admin-2.min.css';
import mail from "../../../img/mail.png"
import arrow from "../../../img/arrow.png"
import leftArrow from "../../../img/leftArrow.png"
import bell from "../../../img/bell.png"
import search from "../../../img/search.png"
import accLogo from "../../../img/undraw_profile.svg"
import navimg2 from "../../../img/undraw_profile_2.svg"
import navimg1 from "../../../img/undraw_profile_1.svg"
import navimg3 from "../../../img/undraw_profile_3.svg"
import {Alert} from "reactstrap";
import {connect} from "react-redux";
import {saveState} from "../../../helper/sessionStorage";
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
function UserProfile({loading,error,...props}){

    const history = useNavigate ();

    const [data,setData]=useState({});

    const [values, setValues] = useState({
        id:0,
        email: '',
        name:'',
        surname:'',
        password:'',
        roles:[],
        number:'',
        experience:0,
        location:''
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
                    location:response.data.location
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
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.name === 'experience' ? Number(e.target.value) : e.target.value
        }));
    };


    return (

        <main id="page-top">

            <div id="wrapper">

                <SideBarUser />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">

                            {/*ADD ACCOUNT FEATURES HERE: */}

                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
                                        <h2>Account Information</h2>
                                        { error &&
                                            <Alert style={{marginTop:'20px'}} variant="danger">
                                                {error}
                                            </Alert>
                                        }
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" name="name"
                                                              defaultValue={data.name} onChange={handleChange} required/>
                                            </Form.Group>

                                            <Form.Group controlId="formSurname">
                                                <Form.Label>Surname</Form.Label>
                                                <Form.Control type="text" name="surname"
                                                              defaultValue={data.surname} onChange={handleChange} required/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" name="email" defaultValue={data.email} onChange={handleChange} required/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="tel" defaultValue={data.number} onChange={handleChange} name="number"/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicAddress">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control type="text" defaultValue={data.location} onChange={handleChange} name="location"/>
                                            </Form.Group>

                                            <div className="text-left" style={{padding:'10px 0'}}>
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
                                <span style={{color:'grey'}}>Copyright &copy; PeacefulParts 2024</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            {/*<a className="scroll-to-top rounded" href="#page-top">*/}
            {/*    <i className="fas fa-angle-up"></i>*/}
            {/*</a>*/}

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
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <Link className="btn btn-primary" to="/loginBoot">Logout</Link>
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
const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error
    }}
const mapDispatchToProps=(dispatch)=>{
    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);