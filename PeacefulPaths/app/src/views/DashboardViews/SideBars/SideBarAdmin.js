import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/SideBar.css';
import {faHouseUser, faPlus, faUserNurse, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SideBarAdmin(){

    return (

        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar">

            <div className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-text mx-3">PeacefulParts</div>
            </div>

            <hr className="sidebar-divider my-0"/>

            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard/adminDashboard">
                    <FontAwesomeIcon style={{fontSize:"15px"}} icon={faHouseUser}/>
                    <span style={{marginLeft:"3px",fontSize:"15px"}}>Dashboard</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                Manage
            </div>

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/adminDashboard/admin"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faUserTie}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Manage Admins</span>
            </Link>

            <Link className="nav-item sidebar-generate" to={"/dashboard/adminDashboard/therapists"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faUserNurse}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Manage Therapists</span>
            </Link>

            <Link className="nav-item sidebar-generate"  to={"/dashboard/adminDashboard/users"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faUser}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Manage Users</span>
            </Link>

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                Generate
            </div>

            <Link className="nav-item sidebar-generate" to={"/dashboard/registerBoot-admin"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faUserTie}/>
                <FontAwesomeIcon style={{fontSize:"10px"}} icon={faPlus}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Generate Admin</span>
            </Link>

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/registerBoot-therapist"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faUserNurse}/>
                <FontAwesomeIcon style={{fontSize:"10px"}} icon={faPlus}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Generate Therapist</span>
            </Link>
        </ul>
    )
}