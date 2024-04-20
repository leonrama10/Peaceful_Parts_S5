import React,{useState} from 'react';
import {fetchAllUserData, fetchAllUsersConnectedData, fetchUserData, userDelete} from '../../../api/authService';
import {useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import DataTable from 'datatables.net-dt';
import $ from 'jquery';
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";

export default function TherapistDashboardUsers({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUsers, setAllUsers] = useState([]);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                setData(response.data);

                    fetchAllUsersConnectedData(response.data.id).then((response)=>{
                        setAllUsers(response.data)
                    }).catch((e)=>{
                        history('/loginBoot');
                    })
            }
            else{
                history('/loginBoot');
            }
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
                history('/dashboard/therapistDashboard');
            }
        }).catch((err)=>{
            history('/loginBoot');
        });
    }

    const handleEdit = (id) => {
        history(`/dashboard/therapistDashboard/users/edit/${id}`);
    };


    return (
                <main id="page-top">

                    <div id="wrapper">

                        <SideBarTherapist />

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
                                                        <th>Gender</th>
                                                        <th>Location</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Number</th>
                                                        <th>Gender</th>
                                                        <th>Location</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    </tfoot>
                                                    <tbody>
                                                        {allUsers.map((tempEmployee) => (
                                                            <tr key={tempEmployee.id}>
                                                                <td>{tempEmployee.name} {tempEmployee.surname}</td>
                                                                <td>{tempEmployee.email}</td>
                                                                <td>{tempEmployee.number}</td>
                                                                <td>{tempEmployee.gender.gender}</td>
                                                                <td>{tempEmployee.location.location}</td>
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