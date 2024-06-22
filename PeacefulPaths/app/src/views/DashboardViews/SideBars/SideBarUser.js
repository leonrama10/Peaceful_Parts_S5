import React from 'react';
import {Link} from 'react-router-dom';
import {authenticate, authFailure, authSuccess} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState} from "../../../helper/sessionStorage";
import {faCalendarCheck, faCommentMedical, faHouseUser, faInbox, faUserNurse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
let connected = loadState("connected",false);
function SideBarUser({loading,error,...props}){

    React.useEffect(() => {
        connected = loadState("connected",false)
    }, []);

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar">

            <div className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-text mx-3">PeacefulParts</div>
            </div>

            <hr className="sidebar-divider my-0"/>

            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard/userDashboard">
                    <FontAwesomeIcon style={{fontSize:"15px"}} icon={faHouseUser}/>
                    <span style={{marginLeft:"3px",fontSize:"15px"}}>Dashboard</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                Interface
            </div>

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/userDashboard/chatDashboard"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faInbox}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Messaging</span>
            </Link>

            {(props.connectedBoolean || connected) && <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/userDashboard/myTherapistInfo"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faUserNurse}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>My Therapist</span>
            </Link>}

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/userDashboard/bookingsInfo"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faCalendarCheck}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Bookings</span>
            </Link>

            <Link className="nav-item sidebar-generate"  style={{marginTop: "10px"}} to={"/dashboard/userDashboard/advice"}>
                <FontAwesomeIcon style={{fontSize:"15px"}} icon={faCommentMedical}/>
                <span style={{marginLeft:"3px",fontSize:"14px"}}>Advice</span>
            </Link>

            <hr className="sidebar-divider"/>

        </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(SideBarUser);