import React,{useState} from 'react';
import {fetchUserData, fetchUserDataId, userTherapistConnection} from '../../../api/authService';
import {useNavigate, useParams} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import DashboardNav from "../DashboardNav";
import {authenticate, authFailure, authSuccess} from "../../../redux/authActions";
import {connect} from "react-redux";
import SideBarUser from "../SideBars/SideBarUser";
import {Alert} from "reactstrap";

function TherapistCardInfo({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const { id } = useParams();
    const idNumber = Number(id);
    const [therapistData, setTherapistData] = useState({
        id:0,
        email: '',
        name:'',
        surname:'',
        password:'',
        roles:[],
        number:'',
        experience:0,
        location:'',
        allRoles:[]
    });

    const [userTherapistValues, setUserTherapistValues] = useState({
        userId:0,
        therapistId:0
    })

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER'){
                setData(response.data);
                setUserTherapistValues(data => {
                    return {
                        ...data,
                        userId: response.data.id
                    };
                });
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
            if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                setTherapistData({
                    id:response.data.id,
                    email: response.data.email,
                    name: response.data.name,
                    surname: response.data.surname,
                    password: response.data.password,
                    roles: response.data.roles,
                    number:response.data.number,
                    experience:response.data.experience,
                    location:response.data.location,
                    allRoles: response.data.allRoles
                })
                setUserTherapistValues(data => {
                    return {
                        ...data,
                        therapistId: response.data.id
                    };
                });
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


    const handleConnection = (e) => {
        e.preventDefault();

        userTherapistConnection(userTherapistValues).then((response)=>{
            if(response.status===201){
                history('/dashboard/userDashboard/therapists');
            }
            else{
                props.loginFailure('Something LEKAAAAAAA!Please Try Again');
            }

        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        props.loginFailure("U cant have two therapists at the same time!!!");
                        // props.loginFailure("Authentication Failed.Bad Credentials");
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

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser}/>

                        <div className="container-fluid">

                            { error &&
                                <Alert style={{marginTop:'20px'}} variant="danger">
                                    {error}
                                </Alert>
                            }

                            <div className="card-details">
                                <h3>Card {id} Details</h3>
                                {/* Other card details */}
                                <p>Email: {therapistData.email}</p>
                                <p>Name: {therapistData.name}</p>
                                <p>Surname: {therapistData.surname}</p>
                                <p>Number: {therapistData.number}</p>
                                <p>Experience: {therapistData.experience} years</p>
                                <p>Location: {therapistData.location}</p>
                            </div>
                            <button onClick={handleConnection}>Connect</button>
                        </div>

                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>&copy; 2024 PeacefulPaths</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            {/*<div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog"*/}
            {/*     aria-labelledby="exampleModalLabel"*/}
            {/*     aria-hidden="true">*/}
            {/*    <div className="modal-dialog" role="document">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>*/}
            {/*                <button className="close" type="button" data-dismiss="modal" aria-label="Close">*/}
            {/*                    <span aria-hidden="true">×</span>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <div className="modal-body">Select "Logout" below if you are ready to end your current*/}
            {/*                session.*/}
            {/*            </div>*/}
            {/*            <div className="modal-footer">*/}
            {/*                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>*/}
            {/*                <Link className="btn btn-primary" to="/loginBoot">Logout</Link>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

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
export default connect(mapStateToProps, mapDispatchToProps)(TherapistCardInfo);