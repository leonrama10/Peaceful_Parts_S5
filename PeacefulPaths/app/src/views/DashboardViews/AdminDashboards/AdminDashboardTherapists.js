import React,{useState} from 'react';
    import {fetchUserData, userDelete, fetchAllTherapistData} from '../../../api/authService';
    import {useNavigate} from 'react-router-dom';
    import '../../../css/sb-admin-2.css';
    import '../../../css/myCss.css';
    import DataTable from 'datatables.net-dt';
    import $ from 'jquery';
    import SideBarAdmin from "../SideBars/SideBarAdmin";
    import DashboardNav from "../DashboardNav";
    import {authenticate, authFailure, authSuccess} from "../../../redux/authActions";
    import {connect} from "react-redux";

function AdminDashboardTherapists({loading,error,...props}){

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

        function handleDelete(id) {
            userDelete(id).then((response)=>{
                if(response.status===200){
                    window.location.reload();
                }
                else{
                    //Add error on page if user cant be deleted
                    history('/dashboard/adminDashboard');
                }
            }).catch((err)=>{
                history('/loginBoot');
            });
        }

        const handleEdit = (id) => {
            history(`/dashboard/adminDashboard/users/edit/${id}`);
        };

        const handleGenerateTherapistsClick = () => {
            console.log('Generate Therapists button clicked');
             history("/dashboard/registerBoot-therapist");
        };

        return (
                    <main id="page-top">

                        <div id="wrapper">

                            <SideBarAdmin />

                            <div id="content-wrapper" className="d-flex flex-column">

                                <div id="content">

                                    <DashboardNav data={data} setUser={props.setUser}/>

                                    <div className="container-fluid">

                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>

                                                <div className="text-center mb-4">
                             <button className="btn btn-primary" type="button" onClick={handleGenerateTherapistsClick}>Generate Therapists</button>

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
                                                            <th>Location</th>
                                                            <th>Experience</th>
                                                            <th>Gender</th>
                                                            <th>University</th>
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
                                                            <th>Location</th>
                                                            <th>Experience</th>
                                                            <th>Gender</th>
                                                            <th>University</th>
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
                                                                    <td>{tempEmployee.location.location}</td>
                                                                    <td>{tempEmployee.experience}</td>
                                                                    <td>{tempEmployee.gender.gender}</td>
                                                                    <td>{tempEmployee.university.university}</td>

                                                                    <td>
                                                                        <button  className="btn btn-info btn-sm" onClick={() => handleEdit(tempEmployee.id)}>
                                                                            Edit
                                                                        </button>

                                                                        <button  style={{marginLeft:"5px"}} className="btn btn-danger btn-sm" onClick={() => handleDelete(tempEmployee.id)} >
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


                        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalLabel"
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
                                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel
                                        </button>
                                        <a className="btn btn-primary" href="login.html">Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>

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
    export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardTherapists);