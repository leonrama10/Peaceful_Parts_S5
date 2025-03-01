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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import photo from "../../../../img/3585145_66102-removebg-preview.jpg";
import Loading from "../../LoadingPage";
import DashboardFooter from "../../DashboardFooter";
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

    const handleClientBookings = (id,name,surname) => {
        saveState("editTherapistPastClientId", id);
        saveState("editTherapistPastClientFullName", name+" "+surname);
        history("/dashboard/adminDashboard/therapists/editTherapistPastClients/bookings");
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <button className="btn btn-info btn-sm" style={{color: "white"}}
                        onClick={() => handleClientBookings(rowData.id, rowData.name, rowData.surname)}>
                    Bookings History
                </button>
            </React.Fragment>
        );
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);

    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarAdmin/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser}/>

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

                            {allUsers.length > 0 ? <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <DataTable value={allUsers} removableSort className="custom-gridlines"
                                                   tableStyle={{minWidth: '50rem'}}
                                                   paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                                            <Column field="id" header="Id" sortable
                                            ></Column>
                                            <Column field="name" header="Name" sortable
                                            ></Column>
                                            <Column field="surname" header="Surname" sortable
                                            ></Column>
                                            <Column field="email" header="Email" sortable
                                            ></Column>
                                            <Column field="number" header="Phone Number" sortable
                                            ></Column>
                                            <Column field="gender.gender" header="Gender" sortable
                                            ></Column>
                                            <Column field="location.location" header="Location" sortable
                                            ></Column>
                                            <Column field="dateAdded" header="Date Added" sortable
                                            ></Column>
                                            <Column field="removeDate" header="Date Removed" sortable
                                            ></Column>
                                            <Column header="Actions" body={actionBodyTemplate}></Column>
                                        </DataTable>
                                    </div>
                                </div> :
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingTop: "20px"
                                }}>
                                    <img src={photo} style={{maxWidth: "250px"}} alt={"photo"}/>
                                    <h4 style={{color: "#5b5c63", fontSize: "28px"}}>No Clients</h4>
                                </div>
                            }
                        </div>
                    </div>
                    <DashboardFooter />
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