import React,{useState} from 'react';
import {fetchAllUserData, fetchUserData, userDelete} from '../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import { Collapse, Dropdown} from 'react-bootstrap';
import '../../css/sb-admin-2.css';
import '../../css/myCss.css';
import DataTable from 'datatables.net-dt';
import mail from "../../img/mail.png"
import arrow from "../../img/arrow.png"
import leftArrow from "../../img/leftArrow.png"
import bell from "../../img/bell.png"
import search from "../../img/search.png"
import accLogo from "../../img/undraw_profile.svg"
import navimg2 from "../../img/undraw_profile_2.svg"
import navimg1 from "../../img/undraw_profile_1.svg"
import navimg3 from "../../img/undraw_profile_3.svg"
import $ from 'jquery';
import {saveState} from "../../helper/sessionStorage";
import DashboardNav from "./DashboardNav";

export default function AdminDashboardUsers({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [id, setId] = useState(null);

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
        fetchAllUserData().then((response)=>{
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
        setId(id);
        history(`/dashboard/adminDashboard/users/edit/${id}`);
    };


    const [open, setOpen] = useState(false);

    return (
                <main id="page-top">

                    <div id="wrapper">

                        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                            id="accordionSidebar">

                            <Link className="sidebar-brand d-flex align-items-center justify-content-center"
                                  to="/dashboard">
                                <div className="sidebar-brand-icon rotate-n-15">
                                    <i className="fas fa-laugh-wink"></i>
                                </div>
                                <div className="sidebar-brand-text mx-3">PeacefulParts</div>
                            </Link>

                            <hr className="sidebar-divider my-0"/>

                            <li className="nav-item active">
                                <Link className="nav-link" to="/dashboard">
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Dashboard</span></Link>
                            </li>

                            <hr className="sidebar-divider"/>

                            <div className="sidebar-heading">
                                Interface
                            </div>

                            <li className="nav-item" style={{marginTop: "10px", marginBottom: "10px"}}>
                                <a style={{
                                    textDecoration: "none",
                                    color: "white",
                                    fontSize: "13px",
                                    marginLeft: "20px",
                                    fontWeight: "550"
                                }} onClick={() => setOpen(!open)} aria-controls="collapse-text" aria-expanded={open}>
                                    <span>Managing</span>
                                    <img style={{marginLeft: "99px", width: "15px"}} src={arrow} alt="arrow"/>
                                </a>
                                <Collapse in={open}>
                                    <div id="collapse-text">
                                        <div className="bg-white py-2 collapse-inner rounded">
                                            <h6 className="collapse-header">Custom Components:</h6>
                                            <Link className="collapse-item" to="/dashboard/adminDashboard/therapists">Manage Therapists</Link>
                                            <Link className="collapse-item" to="/dashboard/adminDashboard/users">Manage Users</Link>
                                            <Link className="collapse-item" to="/dashboard/adminDashboard/admin">Manage Admins</Link>
                                        </div>
                                    </div>
                                </Collapse>
                            </li>

                            <li className="nav-item" style={{marginTop: "10px", marginBottom: "14px"}}>
                                <a style={{
                                    textDecoration: "none",
                                    color: "white",
                                    fontSize: "13px",
                                    marginLeft: "20px",
                                    fontWeight: "550"
                                }} href="#" data-toggle="collapse" data-target="#collapseUtilities"
                                   aria-expanded="true" aria-controls="collapseUtilities">
                                    <span>Utilities</span>
                                    <img style={{marginLeft: "132px", width: "15px"}} src={arrow} alt="arrow"/>
                                </a>
                                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                                     data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Custom Utilities:</h6>

                                    </div>
                                </div>
                            </li>

                            <hr className="sidebar-divider"/>

                            <div className="sidebar-heading">
                                Addons
                            </div>

                            <li className="nav-item" style={{marginTop: "10px", marginBottom: "20px"}}>
                                <a style={{
                                    textDecoration: "none",
                                    color: "white",
                                    fontSize: "13px",
                                    marginLeft: "20px",
                                    fontWeight: "550"
                                }} href="#" data-toggle="collapse" data-target="#collapsePages"
                                   aria-expanded="true" aria-controls="collapsePages">
                                    <span>Pages</span>
                                    <img style={{marginLeft: "139px", width: "15px"}} src={arrow} alt="arrow"/>
                                </a>
                                <div id="collapsePages" className="collapse" aria-labelledby="headingPages"
                                     data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Login Screens:</h6>

                                        <div className="collapse-divider"></div>
                                        <h6 className="collapse-header">Other Pages:</h6>

                                    </div>
                                </div>
                            </li>

                            <hr className="sidebar-divider d-none d-md-block"/>


                            <div className="text-center d-none d-md-inline">
                                <button className="rounded-circle border-0" id="sidebarToggle"><img
                                    style={{width: "19px", paddingBottom: "3px"}} src={leftArrow} alt="logo"/></button>
                            </div>

                        </ul>

                        <div id="content-wrapper" className="d-flex flex-column">

                            <div id="content">

                                <DashboardNav data={data} setUser={props.setUser} />

                                <div className="container-fluid">

                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered" id="dataTable" width="100%"
                                                       cellSpacing="0">
                                                    <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Number</th>
                                                        <th>Location</th>
                                                        <th>Experience</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Number</th>
                                                        <th>Location</th>
                                                        <th>Experience</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                        {allUsers.map((tempEmployee) => (
                                                            <tr key={tempEmployee.id}>
                                                                <td>{tempEmployee.name} {tempEmployee.surname}</td>
                                                                <td>{tempEmployee.email}</td>
                                                                <td>{tempEmployee.number}</td>
                                                                <td>{tempEmployee.location}</td>
                                                                <td>{tempEmployee.experience}</td>
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

                    <script src="../../vendor/jquery/jquery.min.js"></script>
                    <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

                    <script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>

                    {/*<script src="../../vendor/datatables/jquery.dataTables.min.js"></script>*/}
                    {/*<script src="../../vendor/datatables/dataTables.bootstrap4.min.js"></script>*/}

                    {/*<script src="../../js/demo/datatables-demo.js"></script>*/}

                </main>
    )

}