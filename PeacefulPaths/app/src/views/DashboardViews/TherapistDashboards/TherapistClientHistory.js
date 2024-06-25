import React, {useEffect, useState} from 'react';
import {
    fetchAllUsersConnectedDataHistory,
    fetchUserData
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Column} from "primereact/column";
import { DataTable } from 'primereact/datatable';
import photo from "../../../img/3585145_66102-removebg-preview.jpg";
import DashboardFooter from "../DashboardFooter";
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
function TherapistClientHistory({loading,error,...props}){

    useEffect(() => {
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/history")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setData(response.data);
                    
                    saveState("role",'ROLE_THERAPIST')

                    fetchAllUsersConnectedDataHistory({id:response.data.id}).then((response)=>{
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

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/therapistDashboard/history")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setData(response.data);
                    
                    saveState("role",'ROLE_THERAPIST')

                    fetchAllUsersConnectedDataHistory({id:response.data.id}).then((response)=>{
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

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUsers, setAllUsers] = useState([]);

    const handleClientInfo = (id) => {
        saveState("clientInfoId",id)
        history(`/dashboard/therapistDashboard/users/info`);
    };

    const handleNotes = (id,name,surname) => {
        saveState("clientHistoryNotesId",id)
        saveState("clientHistoryNotesFullName",name+" "+surname)
        history(`/dashboard/therapistDashboard/users/oldNotesHistory`);
    };

    const dateAddedBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.dateAdded.length === 1 ? (
                    rowData.dateAdded[0]
                ) : (
                    <select>
                        {rowData.dateAdded.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                )}
            </React.Fragment>
        );
    };

    const dateRemovedBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.removeDate.length === 1
                    ? rowData.removeDate[0]
                    : (
                        <select>
                            {rowData.removeDate.map((date, index) => (
                                <option key={index} value={date}>{date}</option>
                            ))}
                        </select>
                    )
                }
            </React.Fragment>
        );
    };

    const buttonsBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <button className="btn btn-info btn-sm" style={{color:"white"}}
                        onClick={() => handleClientInfo(rowData.id)}>
                    Info
                </button>
                <button style={{marginLeft: "5px",color:"white"}}
                        className="btn btn-warning btn-sm"
                        onClick={() => handleNotes(rowData.id,rowData.name,rowData.surname)}>
                    Notes
                </button>
            </React.Fragment>
        );
    };

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/therapistDashboard/users"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Current Clients
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Clients
                                    History</h1>
                            </div>

                            {allUsers.length>0 ? <div className="card shadow mb-4">
                                <div className="card-body">
                                    <DataTable value={allUsers.reduce((unique, tempEmployee) => {
                                        const isExisting = unique.find(u => u.id === tempEmployee.id);
                                        if (!isExisting) {
                                            return [...unique, { ...tempEmployee, dateAdded: [tempEmployee.dateAdded], removeDate: tempEmployee.removeDate ? [tempEmployee.removeDate] : ['/'] }];
                                        } else {
                                            isExisting.dateAdded.push(tempEmployee.dateAdded);
                                            if (tempEmployee.removeDate) {
                                                if (!isExisting.removeDate.includes('/')) {
                                                    isExisting.removeDate.push(tempEmployee.removeDate);
                                                } else {
                                                    isExisting.removeDate = [tempEmployee.removeDate];
                                                }
                                            } else {
                                                isExisting.removeDate.push('/');
                                            }
                                            return unique;
                                        }
                                    }, [])} removableSort className="custom-gridlines"
                                               tableStyle={{ minWidth: '50rem' }} paginator rows={5}
                                               rowsPerPageOptions={[5, 10, 25, 50]}>
                                        <Column field="id" header="Id" sortable></Column>
                                        <Column field="name" header="Name" sortable></Column>
                                        <Column field="surname" header="Surname" sortable></Column>
                                        <Column field="email" header="Email" sortable></Column>
                                        <Column field="number" header="Phone Number" sortable></Column>
                                        <Column field="gender.gender" header="Gender" sortable></Column>
                                        <Column field="location.location" header="Location" sortable></Column>
                                        <Column header="Date Added" body={dateAddedBodyTemplate} sortable></Column>
                                        <Column header="Date Removed" body={dateRemovedBodyTemplate} sortable></Column>
                                        <Column header="Actions" body={buttonsBodyTemplate} sortable></Column>
                                    </DataTable>
                                </div>
                            </div>:
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop:"45px"
                            }}>
                                <img src={photo} style={{maxWidth: "250px"}} alt={"photo"}/>
                                <h4 style={{color: "#5b5c63", fontSize: "28px"}}>No Current Clients</h4>
                                <p style={{
                                    maxWidth: "400px",
                                    textAlign: "center",
                                    color: "#858796"
                                }}>Take advantage of this delightful interlude to recharge your soul!</p>
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
        error: auth.error,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistClientHistory);