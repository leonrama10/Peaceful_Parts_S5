import React, {useEffect, useState} from 'react';
import {
    fetchAllUsersConnectedDataHistory,
    fetchUserData,
    userDelete
} from '../../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../../css/AdminDashboard.css';
import DashboardNav from "../../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess
} from "../../../../redux/authActions";
import {connect} from "react-redux";
import SideBarAdmin from "../../SideBars/SideBarAdmin";
import {loadState, saveState} from "../../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
const getRefreshToken = () => {
    const token = localStorage.getItem('REFRESH_TOKEN');

    if (!token || token==="null") {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        return null;
    } else {
        return token;
    }
}

const getAccessToken = () => {
    const token = localStorage.getItem('USER_KEY');

    if (!token || token==="null") {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        return null;
    } else {
        return token;
    }
}

function EditTherapistPastClients({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUsers, setAllUsers] = useState([]);
    let editTherapistId =null

    useEffect(() => {
        editTherapistId = loadState("editTherapistId", 0);
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchAllUsersConnectedDataHistory({id:editTherapistId}).then((response)=>{
                            setAllUsers(response.data)
                        }).catch((e)=>{
                            history('/loginBoot');
                        })
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchAllUsersConnectedDataHistory({id:editTherapistId}).then((response)=>{
                            setAllUsers(response.data)
                        }).catch((e)=>{
                            history('/loginBoot');
                        })
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else{
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);

    React.useEffect(() => {
        if (allUsers.length > 0) {
            if ($.fn.dataTable.isDataTable('#dataTable')) {
                $('#dataTable').DataTable().destroy();
            }
            $('#dataTable').DataTable();
        }
    }, [allUsers]);

    function handleDelete(id) {
        const confirmation = window.confirm("Are you sure you want to remove this connection?");
        if(confirmation) {
            userDelete(id).then((response) => {
                if (response.status === 200) {
                    window.location.reload();
                } else {
                    //Add error on page if user cant be deleted
                    history('/loginBoot');
                }
            }).catch((err) => {
                history('/loginBoot');
            });
        }
    }

    const handleClientBookings = (id,name,surname) => {
        saveState("editTherapistPastClientId", id);
        saveState("editTherapistPastClientFullName", name+" "+surname);
        history("/dashboard/adminDashboard/therapists/editTherapistPastClients/bookings");
    };

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarAdmin />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft:"-10px",marginTop:"-15px"}}>
                                <Link to={"/dashboard/adminDashboard/therapists/editTherapistClients"} className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Current
                                    Clients
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>History of Clients</h1>
                            </div>
                            <div className="card shadow mb-4">
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
                                                <th>Date Added</th>
                                                <th>Date Removed</th>
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
                                                <th>Date Added</th>
                                                <th>Date Removed</th>
                                                <th>Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            {allUsers.map((tempEmployee) => (
                                                <tr key={tempEmployee.dateAdded}>
                                                    <td>{tempEmployee.id}</td>
                                                    <td>{tempEmployee.name} {tempEmployee.surname}</td>
                                                    <td>{tempEmployee.email}</td>
                                                    <td>{tempEmployee.number}</td>
                                                    <td>{tempEmployee.gender.gender}</td>
                                                    <td>{tempEmployee.location.location}</td>
                                                    <td>{tempEmployee.dateAdded}</td>
                                                    <td>{tempEmployee.removeDate === null ?
                                                        <p>/</p> : tempEmployee.removeDate}</td>
                                                    <td style={{
                                                        display: "flex",
                                                        justifyContent: "space-evenly", alignItems: "center"
                                                    }}>
                                                        <button className="btn btn-info btn-sm" style={{color: "white"}}
                                                                onClick={() => handleClientBookings(tempEmployee.id,tempEmployee.name,tempEmployee.surname)}>
                                                            Bookings History
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
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditTherapistPastClients);