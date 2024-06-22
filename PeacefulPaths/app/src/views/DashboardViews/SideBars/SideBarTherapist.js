import React from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarCheck, faHouseUser, faInbox, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faCalendarDays, faCommentDots} from "@fortawesome/free-regular-svg-icons";

export default function SideBarTherapist(){

    return (

        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar">

            <div className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-text mx-3">PeacefulParts</div>
            </div>

            <hr className="sidebar-divider my-0"/>

            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard/therapistDashboard">
                    <FontAwesomeIcon style={{fontSize: "15px"}} icon={faHouseUser}/>
                    <span style={{marginLeft: "3px", fontSize: "15px"}}>Dashboard</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                Interface
            </div>

            <Link className="nav-item sidebar-generate" style={{marginTop: "10px"}}
                  to={"/dashboard/therapistDashboard/therapistChatDashboard"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faInbox}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Messaging</span>
            </Link>

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/therapistDashboard/addNewWorkDays"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faCalendarDays}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Work Days</span>
            </Link>

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/therapistDashboard/bookings"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faCalendarCheck}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Bookings</span>
            </Link>

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/therapistDashboard/users"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faUsers}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Clients</span>
            </Link>

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/therapistDashboard/feedbacks"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faCommentDots}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Feedbacks</span>
            </Link>

            <hr className="sidebar-divider d-none d-md-block"/>

        </ul>
    )
}