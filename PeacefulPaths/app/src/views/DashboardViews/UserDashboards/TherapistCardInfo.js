import React, {useEffect, useState} from 'react';
import {fetchUserData, fetchUserDataId, removeTherapist, userTherapistConnection} from '../../../api/authService';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess,
    setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import SideBarUser from "../SideBars/SideBarUser";
import {loadState, saveState} from "../../../helper/sessionStorage";
let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function TherapistCardInfo({loading,error,...props}){

    useEffect(() => {
        if(!isUserAuthenticatedBoolean){
            if (!props.isUserAuthenticated){
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }else{
                saveState("isUserAuthenticated",props.isUserAuthenticated)
            }
        }else{
            saveState("isUserAuthenticated",isUserAuthenticatedBoolean)
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const { id } = useParams();
    const idNumber = Number(id);
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [therapistData, setTherapistData] = useState({
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
        language:[],
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
                    gender:response.data.gender,
                    language:response.data.language,
                    allRoles: response.data.allRoles
                })
                setUserTherapistValues(data => {
                    return {
                        ...data,
                        therapistId: response.data.id
                    };
                });
                connected = loadState("connected",false)
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
                saveState("connected",true)
                history('/dashboard/userDashboard/therapists');
            }
            else{
                props.connectionFailure('Something LEKAAAAAAA!Please Try Again');
            }

        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        props.connectionFailure("U cant have two therapists at the same time!!!");
                        break;
                    default:
                        props.connectionFailure('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                props.connectionFailure('Something NaNAAAAA!Please Try Again');
            }

        });
    };


    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser hideFilterMenu={hideFilterMenu}/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState}/>

                        <div className="container-fluid">

                            <div className="card-details">
                                <h3>Therapist Details</h3>
                                {/* Other card details */}
                                <p>Email: {therapistData.email}</p>
                                <p>Name: {therapistData.name}</p>
                                <p>Surname: {therapistData.surname}</p>
                                <p>Gender: {therapistData.gender.gender}</p>
                                <p>Number: {therapistData.number}</p>
                                <p>Experience: {therapistData.experience} years</p>
                                <p>Location: {therapistData.location.location}</p>
                                <p>Language: {therapistData.language.map(lang => lang.language).join(', ')}</p>
                            </div>
                            {!connected ? <button onClick={handleConnection}>Connect</button> :
                                <p>You already are connected with another therapist.
                                    <br/>If you want to change your therapist,
                                    you need to remove them first.
                                    <br/>Click the link below so you can change your therapist:
                                    <br/><Link to="/dashboard/userDashboard/therapists">Manage Therapists</Link></p>}

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
        isUserAuthenticated: auth.isUserAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        connectionFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistCardInfo);