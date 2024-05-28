import React, {useEffect, useState} from 'react';
import {fetchAllAdminData, fetchUserData, userDelete} from '../../../api/authService';
import {useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import DataTable from 'datatables.net-dt';
import $ from 'jquery';
import DashboardNav from "../DashboardNav";
import SideBarAdmin from "../SideBars/SideBarAdmin";
import {
    authenticate,
    authFailure,
    authSuccess,
    setAdminAuthenticationState,
    setAuthState, setTherapistAuthenticationState, setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
const isAdminAuthenticatedBoolean = loadState("isAdminAuthenticated",false)
function AdminDashboardAdmin({loading,error,...props}){


    useEffect(() => {
        if(!isAdminAuthenticatedBoolean){
            if (!props.isAdminAuthenticated){
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }else{
                saveState("isAdminAuthenticated",props.isAdminAuthenticated)
            }
        }else{
            saveState("isAdminAuthenticated",isAdminAuthenticatedBoolean)
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUsers, setAllUsers] = useState([]);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_ADMIN'){
                setData(response.data);
            }
            else{
                history('/loginBoot');
            }
        }).catch((e)=>{

            history('/loginBoot');
        })
    },[])

    React.useEffect(()=>{
        fetchAllAdminData().then((response)=>{
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

    function handleDelete(id) {
    const confirmation = window.confirm("Are you sure you want to delete this ADMIN");
    if(confirmation){

        userDelete(id).then((response)=>{
            if(response.status===200){
                window.location.reload();
            }
            else{
                //Add error on page if user cant be deleted
                history('/loginBoot');
            }
        }).catch((err)=>{
            history('/loginBoot');
        });
    }
    }

    const handleEdit = (id) => {
        history(`/dashboard/adminDashboard/users/edit/${id}`);
    };

    const handleGenerateAdminsClick = () => {
                 history("/dashboard/registerBoot-admin");
    };

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarAdmin />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setAdminAuthenticationState={props.setAdminAuthenticationState}/>

                        <div className="container-fluid">

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                                    <div className="text-center mb-4">
                                        <button className="btn btn-primary" type="button"
                                                onClick={handleGenerateAdminsClick}>Generate Admins
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%"
                                               cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Gender</th>
                                                <th>Date Added</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Gender</th>
                                                <th>Date Added</th>
                                                <th>Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            {allUsers.map((tempEmployee) => (
                                                <tr key={tempEmployee.id}>
                                                    <td>{tempEmployee.id}</td>
                                                    <td>{tempEmployee.name} {tempEmployee.surname}</td>
                                                    <td>{tempEmployee.email}</td>
                                                    <td>{tempEmployee.number}</td>
                                                    <td>{tempEmployee.gender.gender}</td>
                                                    <td>{tempEmployee.dateAdded}</td>
                                                    <td>
                                                        <button className="btn btn-info btn-sm"
                                                                onClick={() => handleEdit(tempEmployee.id)}>
                                                            Edit
                                                        </button>

                                                        <button style={{marginLeft: "5px"}}
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDelete(tempEmployee.id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
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

        </main>
    )

}
const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isAdminAuthenticated: auth.isAdminAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setAdminAuthenticationState: (boolean) => dispatch(setAdminAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardAdmin);