    import React,{useState} from 'react';
    import {fetchAllUserData, fetchUserData, userDelete, fetchAllTherapistData} from '../../api/authService';
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

    export default function AdminDashboardTherapists({loading,error,...props}){

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
    //
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
            setId(id);
            history(`/dashboard/adminDashboard/users/edit/${id}`);
        };

        // const logOut=()=>{
        //
        //     localStorage.clear();
        //     props.history.push('/');
        //
        // }

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

                                    <nav
                                        className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                        <button id="sidebarToggleTop"
                                                className="btn btn-link d-md-none rounded-circle mr-3">
                                            <i className="fa fa-bars"></i>
                                        </button>

                                        <form
                                            className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small"
                                                       placeholder="Search for..."
                                                       aria-label="Search" aria-describedby="basic-addon2"/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <img width={"17px"} src={search} alt="logo"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                        <ul className="navbar-nav ml-auto">

                                            <li className="nav-item dropdown no-arrow d-sm-none">
                                                <a className="nav-link dropdown-toggle" href="#" id="searchDropdown"
                                                   role="button"
                                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-search fa-fw"></i>
                                                </a>

                                                <div
                                                    className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                                    aria-labelledby="searchDropdown">
                                                    <form className="form-inline mr-auto w-100 navbar-search">
                                                        <div className="input-group">
                                                            <input type="text"
                                                                   className="form-control bg-light border-0 small"
                                                                   placeholder="Search for..." aria-label="Search"
                                                                   aria-describedby="basic-addon2"/>
                                                            <div className="input-group-append">
                                                                <button className="btn btn-primary" type="button">
                                                                    <i className="fas fa-search fa-sm"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </li>

                                            {/*<li className="nav-item dropdown no-arrow mx-1">*/}
                                            {/*    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown"*/}
                                            {/*       role="button"*/}
                                            {/*       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                                            {/*        <img style={{paddingRight: "7px"}} src={bell} alt="logo"/>*/}

                                            {/*        <span className="badge badge-danger badge-counter">3+</span>*/}
                                            {/*    </a>*/}

                                            {/*    <div*/}
                                            {/*        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"*/}
                                            {/*        aria-labelledby="alertsDropdown">*/}
                                            {/*        <h6 className="dropdown-header">*/}
                                            {/*            Alerts Center*/}
                                            {/*        </h6>*/}
                                            {/*        <a className="dropdown-item d-flex align-items-center" href="#">*/}
                                            {/*            <div className="mr-3">*/}
                                            {/*                <div className="icon-circle bg-primary">*/}
                                            {/*                    <i className="fas fa-file-alt text-white"></i>*/}
                                            {/*                </div>*/}
                                            {/*            </div>*/}
                                            {/*            <div>*/}
                                            {/*                <div className="small text-gray-500">December 12, 2019</div>*/}
                                            {/*                <span className="font-weight-bold">A new monthly report is ready to download!</span>*/}
                                            {/*            </div>*/}
                                            {/*        </a>*/}
                                            {/*        <a className="dropdown-item d-flex align-items-center" href="#">*/}
                                            {/*            <div className="mr-3">*/}
                                            {/*                <div className="icon-circle bg-success">*/}
                                            {/*                    <i className="fas fa-donate text-white"></i>*/}
                                            {/*                </div>*/}
                                            {/*            </div>*/}
                                            {/*            <div>*/}
                                            {/*                <div className="small text-gray-500">December 7, 2019</div>*/}
                                            {/*                $290.29 has been deposited into your account!*/}
                                            {/*            </div>*/}
                                            {/*        </a>*/}
                                            {/*        <a className="dropdown-item d-flex align-items-center" href="#">*/}
                                            {/*            <div className="mr-3">*/}
                                            {/*                <div className="icon-circle bg-warning">*/}
                                            {/*                    <i className="fas fa-exclamation-triangle text-white"></i>*/}
                                            {/*                </div>*/}
                                            {/*            </div>*/}
                                            {/*            <div>*/}
                                            {/*                <div className="small text-gray-500">December 2, 2019</div>*/}
                                            {/*                Spending Alert: We've noticed unusually high spending for your*/}
                                            {/*                account.*/}
                                            {/*            </div>*/}
                                            {/*        </a>*/}
                                            {/*        <a className="dropdown-item text-center small text-gray-500" href="#">Show*/}
                                            {/*            All Alerts</a>*/}
                                            {/*    </div>*/}
                                            {/*</li>*/}

                                            <Dropdown className="nav-item dropdown no-arrow mx-1 hover-effect">
                                                <Dropdown.Toggle id="alertsDropdown" role="button" className="nav-link dropdown-toggle hover-effect">
                                                    <img src={bell} alt="logo"/>
                                                    <span className="badge badge-danger badge-counter" style={{marginTop:"18px", marginRight:"-5px"}}>3+</span>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow animated--grow-in" style={{width:"330px" }}>
                                                    <h6 className="dropdown-header">Alerts Center</h6>
                                                    <Dropdown.Item href="#" className="d-flex align-items-center"  style={ {marginLeft:"-0px" , height:"90px"}}>
                                                        <div className="mr-3" >
                                                            <div className="icon-circle bg-primary" >
                                                                <i className="fas fa-file-alt text-white"></i>
                                                            </div>
                                                        </div>
                                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            <div className="small text-gray-500">December 12, 2019</div>
                                                            <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#" className="d-flex align-items-center" style={{marginLeft:"-0px", height:"90px"}}>
                                                        <div className="mr-3" >
                                                            <div className="icon-circle bg-success">
                                                                <i className="fas fa-donate text-white"></i>
                                                            </div>
                                                        </div>
                                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            <div className="small text-gray-500">December 7, 2019</div>
                                                            $290.29 has been deposited into your account!
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#" className="text-center small text-gray-500" style={{marginLeft:"-0px"}}>Show All Alerts</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>


                                            <Dropdown className="nav-item dropdown no-arrow mx-1 hover-effect" >
                                                <Dropdown.Toggle id="messagesDropdown" role="button" className="nav-link dropdown-toggle hover-effect">
                                                    <img  src={mail} alt="logo"/>
                                                    <span className="badge badge-danger badge-counter" style={{marginTop:"18px"}}>7</span>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow animated--grow-in" style={{width:"330px"}}>
                                                    <h6 className="dropdown-header">Message Center</h6>
                                                    <Dropdown.Item href="#" className="d-flex align-items-center" style={{marginLeft:"-0px"}}>
                                                        <div className="dropdown-list-image mr-3" style={{width:"35px"}}>
                                                            <img className="rounded-circle" src={navimg1} alt="..."/>
                                                            <div className="status-indicator bg-success"></div>
                                                        </div>
                                                        <div className="font-weight-bold" style={{width:"240px"}}>
                                                            <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                                            <div className="small text-gray-500">Emily Fowler · 58m</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item className="dropdown-item d-flex align-items-center" href="#" style={{marginLeft:"-0px"}}>
                                                        <div className="dropdown-list-image mr-3" style={{width:"35px"}}>
                                                            <img className="rounded-circle" src={navimg2}
                                                                 alt="..."/>
                                                            <div className="status-indicator"></div>
                                                        </div>
                                                        <div>
                                                            <div className="text-truncate" style={{width:"240px"}}>I have the photos that you
                                                                ordered last month, how
                                                                would you like them sent to you?
                                                            </div>
                                                            <div className="small text-gray-500">Jae Chun · 1d</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item className=" d-flex align-items-center" href="#" style={{marginLeft:"-0px"}}>
                                                        <div className="dropdown-list-image mr-3" style={{width:"35px"}}>
                                                            <img className="rounded-circle" src={navimg3}
                                                                 alt="LEKA"/>
                                                            <div className="status-indicator bg-warning"></div>
                                                        </div>
                                                        <div>
                                                            <div className="text-truncate" style={{width:"240px"}}>Last month's report looks great,
                                                                I am very happy with
                                                                the progress so far, keep up the good work!
                                                            </div>
                                                            <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item className="dropdown-item d-flex align-items-center"
                                                                   href="#" style={{marginLeft:"-0px"}}>
                                                        <div className="dropdown-list-image mr-3" style={{width:"35px"}}>
                                                            <img className="rounded-circle"
                                                                 src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                                                 alt="..." style={{width:"35px"}}/>
                                                            <div className="status-indicator bg-success"></div>
                                                        </div>
                                                        <div>
                                                            <div className="text-truncate" style={{width:"240px"}}>Am I a good boy? The reason I ask
                                                                is because someone
                                                                told me that people say this to all dogs, even if they
                                                                aren't good...
                                                            </div>
                                                            <div className="small text-gray-500" >Chicken the Dog · 2w</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#" className="text-center small text-gray-500" style={{marginLeft:"-0px"}}>Read More Messages</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <div className="topbar-divider d-none d-sm-block"></div>

                                            {/*HEREEEEEEEEEEEEEEEEEEEEEEE IS THE ACCOUNT*/}

                                            <Dropdown className="nav-item dropdown no-arrow hover-effect">
                                                <Dropdown.Toggle id="dropdown-basic" className="nav-link dropdown-toggle custom-dropdown-toggle hover-effect">
                                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{data.name} {data.surname}</span>
                                                    <img className="img-profile rounded-circle" src={accLogo} alt="logo"/>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow animated--grow-in ">
                                                    <Dropdown.Item as={Link} to="/dashboard/adminDashboard/profile"><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="#"><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>Settings</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="#"><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>Activity Log</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item as={Link} to="#" data-toggle="modal" data-target="#logoutModal">
                                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>


                                        </ul>

                                    </nav>

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