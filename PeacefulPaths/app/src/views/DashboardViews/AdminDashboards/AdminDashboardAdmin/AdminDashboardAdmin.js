import React, {useEffect, useState} from 'react';
import {fetchAllAdminData, fetchUserData, userDelete} from '../../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../../css/myCss.css';
import DashboardNav from "../../DashboardNav";
import SideBarAdmin from "../../SideBars/SideBarAdmin";
import {
    authenticate,
    authFailure,
    authSuccess
} from "../../../../redux/authActions";
import {connect} from "react-redux";
import {saveState} from "../../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
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
function AdminDashboardAdmin({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchAllAdminData().then((response)=>{
                            setAllUsers(response.data)
                        }).catch((e)=>{
                            history('/loginBoot');
                        })
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        }else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchAllAdminData().then((response)=>{
                            setAllUsers(response.data)
                        }).catch((e)=>{
                            history('/loginBoot');
                        })
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        }else{
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);


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
        saveState("userInfoId", id);
        history("/dashboard/adminDashboard/editInfo");
    };

    const handleGenerateAdminsClick = () => {
        history("/dashboard/registerBoot-admin");
    };

    const actionBodyTemplate = (rowData) => {
        if (data.id !== rowData.id){
            return (
                <React.Fragment>
                    <button className="btn btn-info btn-sm" style={{color: "white"}}
                            onClick={() => handleEdit(rowData.id)}>
                        Edit
                    </button>

                    <button style={{marginLeft: "5px"}}
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(rowData.id)}>
                        Delete
                    </button>
                </React.Fragment>
            );
        }else {
            return null;
        }

    };

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarAdmin/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser}/>

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/adminDashboard"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Dashboard
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Admins</h1>
                                <button className="btn btn-primary" type="button"
                                        onClick={handleGenerateAdminsClick}>Generate Admin
                                </button>
                            </div>
                            <div className="card shadow ">
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
                                        <Column field="dateAdded" header="Date Added" sortable
                                        ></Column>
                                        <Column header="Actions" body={actionBodyTemplate}></Column>
                                    </DataTable>
                                </div>
                            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardAdmin);