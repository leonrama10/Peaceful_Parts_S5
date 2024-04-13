import React,{useState} from 'react';
import {fetchAllTherapistData, fetchUserData} from '../../api/authService';
import {useNavigate} from 'react-router-dom';
import '../../css/sb-admin-2.css';
import DashboardNav from "./DashboardNav";
import {authenticate, authFailure, authSuccess} from "../../redux/authActions";
import {connect} from "react-redux";
import SideBarUser from "./SideBarUser";
import $ from "jquery";
import TherapistCards from "./TherapistCards";
function UserDashboard({loading,error,...props}){

    const history = useNavigate ();
    const [allUsers, setAllUsers] = useState([]);
    const [data,setData]=useState({});


    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER'){
                setData(response.data);
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
        fetchAllTherapistData().then((response)=>{
            setAllUsers(response.data)
        }).catch((e)=>{
            history('/loginBoot');
        })
    },[])

    React.useEffect(() => {
        if (allUsers.length > 0) {
            if ($.fn.dataTable.isDataTable('#dataTable')) {
                $('#dataTable').DataTable().destroy();
            }
            $('#dataTable').DataTable();
        }
    }, [allUsers]);


    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser}/>

                        <div className="container-fluid">

                            {allUsers.map((card, index) => (
                                <TherapistCards key={index} title={card.name} id={card.id} />
                            ))}

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
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);