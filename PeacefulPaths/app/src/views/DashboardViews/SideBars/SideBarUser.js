import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Collapse} from "react-bootstrap";
import arrow from "../../../img/arrow.png";
import {
    therapistFilterByExperience,
    therapistFilterByExperienceNotConnected,
    therapistFilterByGender,
    therapistFilterByGenderNotConnected,
    therapistFilterByLocation,
    therapistFilterByLocationNotConnected,
    therapistFilterByLanguage,
    therapistFilterByLanguageNotConnected,
    fetchAllTherapistData,
    fetchAllTherapistNotConnectedData,
    therapistFilterByTherapistType,
    therapistFilterByTherapistTypeNotConnected,
    therapistFilterByIdentityTypeNotConnected,
    therapistFilterByIdentityType,
    therapistFilterByTherapyTypeNotConnected, therapistFilterByTherapyType
} from "../../../api/authService";
import {authenticate, authFailure, authSuccess} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState} from "../../../helper/sessionStorage";
let connected = loadState("connected",false);
let therapistId = 0;

function SideBarUser({loading,error,...props}){

    const [openManaging, setOpenManaging] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [openGenderFilter, setOpenGenderFilter] = useState(false);
    const [openExperienceFilter, setOpenExperienceFilter] = useState(false);
    const [openLocationFilter, setOpenLocationFilter] = useState(false);
    const [openLanguageFilter, setOpenLanguageFilter] = useState(false);
    const [openTherapyTypeFilter, setOpenTherapyTypeFilter] = useState(false);
    const [openIdentityTypeFilter, setOpenIdentityTypeFilter] = useState(false);
    const [openTherapistTypeFilter, setOpenTherapistTypeFilter] = useState(false);

    React.useEffect(() => {
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
        console.log(connected, therapistId);
    }, []);

    function handleFilterByAll(){
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
        const newFilterData = {
            therapistId: therapistId
        };
        if (!connected){
            fetchAllTherapistData().then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }else {
            fetchAllTherapistNotConnectedData(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }
    }

    function handleFilterByGender (gender){
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
        const newFilterData = {
            therapistId: therapistId,
            gender: gender
        };
        if (!connected){
            therapistFilterByGender(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }else {
            therapistFilterByGenderNotConnected(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }
    }

    function handleFilterByTherapyType (therapyType){
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
        const newFilterData = {
            therapistId: therapistId,
            therapyType: therapyType
        };
        if (!connected){
            therapistFilterByTherapyType(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err)=>{
                if(err && err.response){
                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                            default:
                                props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }else {
            therapistFilterByTherapyTypeNotConnected(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err)=>{
                if(err && err.response){
                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                            default:
                                props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }
    }

    function handleFilterByIdentityType (identityType){
        connected = loadState("connected",false)
            therapistId = loadState("therapistId",0)
            const newFilterData = {
            therapistId: therapistId,
                identityType: identityType
        };
        if (!connected){
            therapistFilterByIdentityType(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err)=>{
                if(err && err.response){
                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                            default:
                                props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }else {
            therapistFilterByIdentityTypeNotConnected(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err)=>{
                if(err && err.response){
                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                            default:
                                props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }
    }

    function handleFilterByTherapistType (therapistType){
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
        const newFilterData = {
            therapistId: therapistId,
            therapistType: therapistType
        };
        if (!connected){
            therapistFilterByTherapistType(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err)=>{
                if(err && err.response){
                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                            default:
                                props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }else {
            therapistFilterByTherapistTypeNotConnected(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err)=>{
                if(err && err.response){
                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                            default:
                                props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }
    }


    function handleFilterByLanguage (language){
            connected = loadState("connected",false)
            therapistId = loadState("therapistId",0)
            const newFilterData = {
                therapistId: therapistId,
                language: language
            };
            if (!connected){
                therapistFilterByLanguage(newFilterData).then((response)=>{
                    if(response.status===200){
                        props.setAllUsers(response.data)
                        props.setHideTherapists(true);
                    }
                    else{
                        props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                    }

                }).catch((err)=>{

                    if(err && err.response){

                        switch(err.response.status){
                            case 401:
                                console.log("401 status");
                                props.loginFailure("Authentication Failed.Bad Credentials");
                                break;
                            default:
                                props.loginFailure('Something BABAAAAAA!Please Try Again');

                        }

                    }
                    else{
                        console.log("ERROR: ",err)
                        props.loginFailure('Something NaNAAAAA!Please Try Again');
                    }

                });
            }else {
                therapistFilterByLanguageNotConnected(newFilterData).then((response)=>{
                    if(response.status===200){
                        props.setAllUsers(response.data)
                        props.setHideTherapists(true);
                    }
                    else{
                        props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                    }

                }).catch((err)=>{

                    if(err && err.response){

                        switch(err.response.status){
                            case 401:
                                console.log("401 status");
                                props.loginFailure("Authentication Failed.Bad Credentials");
                                break;
                            default:
                                props.loginFailure('Something BABAAAAAA!Please Try Again');

                        }

                    }
                    else{
                        console.log("ERROR: ",err)
                        props.loginFailure('Something NaNAAAAA!Please Try Again');
                    }

                });
            }
    }


    function handleFilterByExperience (experience){
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
        const newFilterData = {
            therapistId: therapistId,
            experience: experience
        };
        if (!connected){
            therapistFilterByExperience(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }else {
            therapistFilterByExperienceNotConnected(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }

    }

    function handleFilterByLocation (location){
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
        const newFilterData = {
            therapistId: therapistId,
            location: location
        };
        if (!connected){
            therapistFilterByLocation(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }else {
            therapistFilterByLocationNotConnected(newFilterData).then((response)=>{
                if(response.status===200){
                    props.setAllUsers(response.data)
                    props.setHideTherapists(true);
                }
                else{
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err)=>{

                if(err && err.response){

                    switch(err.response.status){
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                }
                else{
                    console.log("ERROR: ",err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }
    }


    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar">

            <Link className="sidebar-brand d-flex align-items-center justify-content-center"
                  to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">PeacefulParts</div>
            </Link>

            <hr className="sidebar-divider my-0"/>

            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard/userDashboard">
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
                }} onClick={() => setOpenManaging(!openManaging)} aria-controls="collapse-text" aria-expanded={openManaging}>
                    <span>Managing</span>
                    <img style={{marginLeft: "115px", width: "15px"}} src={arrow} alt="arrow"/>
                </a>
                <Collapse in={openManaging}>
                    <div id="collapse-text">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Components:</h6>
                            <Link className="collapse-item" to="/dashboard/userDashboard/chatDashboard">Message Center</Link>
                            <Link className="collapse-item" to="/dashboard/userDashboard/therapists">Manage
                                Therapists</Link>
                            <Link className="collapse-item" to="/dashboard/userDashboard/bookingsDashboard">Manage
                                Bookings</Link>
                            <Link className="collapse-item" to="/dashboard/userDashboard/advice">Advice by Therapist</Link>
                        </div>
                    </div>
                </Collapse>
            </li>

            {!props.hideFilterMenu && <li className="nav-item" style={{marginTop: "10px", marginBottom: "14px"}}>
                <a style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "13px",
                    marginLeft: "20px",
                    fontWeight: "550"
                }} onClick={() => setOpenFilter(!openFilter)} aria-controls="collapseUtilities" aria-expanded={openFilter}>
                    <span>Filter Menu:</span>
                    <img style={{marginLeft: "104px", width: "15px"}} src={arrow} alt="arrow"/>
                </a>
                <Collapse in={openFilter}>
                    <div id="collapse-text">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Filter Menu:</h6>
                            <button className="collapse-item"
                                    onClick={() => handleFilterByAll()}>Show All Therapists
                            </button>
                            <button className="collapse-item"
                                    onClick={() => setOpenGenderFilter(!openGenderFilter)}>Filter By Gender
                            </button>
                            <Collapse in={openGenderFilter}>
                                <div>
                                    <button onClick={() => handleFilterByGender('M')}>Male</button>
                                    <button onClick={() => handleFilterByGender('F')}>Female</button>
                                </div>
                            </Collapse>
                            <button className="collapse-item"
                                    onClick={() => setOpenExperienceFilter(!openExperienceFilter)}>Filter By Experience
                            </button>
                            <Collapse in={openExperienceFilter}>
                                <div>
                                    <select onChange={(event) => handleFilterByExperience(event.target.value)}>
                                        <option value="">Select Number</option>
                                        {[...Array(50).keys()].map((value, index) =>
                                            <option key={index} value={value + 1}>{value + 1}</option>
                                        )}
                                    </select>
                                </div>
                            </Collapse>
                            <button className="collapse-item"
                                    onClick={() => setOpenLocationFilter(!openLocationFilter)}>Filter By Location
                            </button>
                            <Collapse in={openLocationFilter}>
                                <div>
                                    <select onChange={(event) => handleFilterByLocation(event.target.value)}>
                                        <option value="">Select Location</option>
                                        <option value="Kosovo">Kosovo</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Montenegro">Montenegro</option>
                                        <option value="North Macedonia">North Macedonia</option>
                                        <option value="Serbia">Serbia</option>
                                    </select>
                                </div>
                            </Collapse>
                            <button className="collapse-item"
                                    onClick={() => setOpenLanguageFilter(!openLanguageFilter)}>Filter By Language
                            </button>
                            <Collapse in={openLanguageFilter}>
                                <div>
                                    <select onChange={(event) => handleFilterByLanguage(event.target.value)}>
                                        <option value="">Select Language</option>
                                        <option value="Albanian">Albanian</option>
                                        <option value="English">English</option>
                                        <option value="Serbian">Serbian</option>
                                    </select>
                                </div>
                            </Collapse>
                            <button className="collapse-item"
                                     onClick={() => setOpenTherapyTypeFilter(!openTherapyTypeFilter)}>Filter By Therapy Type
                            </button>
                            <Collapse in={openTherapyTypeFilter}>
                                   <div>
                                       <select onChange={(event) => handleFilterByTherapyType(event.target.value)}>
                                              <option value="">Therapy Type</option>
                                              <option value="Individual">Individual Therapy</option>
                                              <option value="Couples">Couples Therapy</option>
                                              <option value="Teen">Teen Therapy</option>
                                       </select>
                                   </div>
                            </Collapse>

                            <button className="collapse-item"
                                    onClick={() => setOpenIdentityTypeFilter(!openIdentityTypeFilter)}>Filter By Identity Type
                            </button>
                            <Collapse in={openIdentityTypeFilter}>
                                <div>
                                    <select onChange={(event) => handleFilterByIdentityType(event.target.value)}>
                                        <option value="">Identity Type</option>
                                        <option value="Straight">Straight</option>
                                        <option value="Gay">Gay</option>
                                        <option value="Lesbian">Lesbian</option>
                                    </select>
                                 </div>
                            </Collapse>

                            <button className="collapse-item"
                                    onClick={() => setOpenTherapistTypeFilter(!openTherapistTypeFilter)}>Filter By Therapist Type
                            </button>
                            <Collapse in={openTherapistTypeFilter}>
                                <div>
                                    <select onChange={(event) => handleFilterByTherapistType(event.target.value)}>
                                        <option value="">Therapist Type</option>
                                        <option value="Listens">A therapist that listens</option>
                                        <option value="ExploresPast">A therapist that explores my past</option>
                                        <option value="TeachesSkills">A therapist that teaches new skills</option>
                                    </select>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </Collapse>
            </li>}

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                Addons
            </div>

            <hr className="sidebar-divider d-none d-md-block"/>

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
