import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Collapse} from "react-bootstrap";
import arrow from "../../../img/arrow.png";
import {
    therapistFilterByExperience, therapistFilterByExperienceNotConnected,
    therapistFilterByGender, therapistFilterByGenderNotConnected,
    therapistFilterByLocation, therapistFilterByLocationNotConnected,
    therapistFilterByLanguage,therapistFilterByLanguageNotConnected
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
     const [selectedLanguage, setSelectedLanguage] = useState('');

     const [openTherapyFilter, setOpenTherapyFilter] = useState(false);
     const [openIdentityFilter, setOpenIdentityFilter] = useState(false);
     const [openTherapistTypeFilter, setOpenTherapistTypeFilter] = useState(false);

    React.useEffect(() => {
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
         console.log(connected, therapistId);

    }, []);

    function handleFilterByGender (gender){
        connected = loadState("connected",false)
        therapistId = loadState("therapistId",0)
        const newFilterData = {
            therapistId: therapistId,
            gender: gender
        };
        if (!connected){
            therapistFilterByGender(gender).then((response)=>{
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



    function handleFilterByTherapy (therapy){
            connected = loadState("connected",false)
            therapistId = loadState("therapistId",0)
            const newFilterData = {
                therapistId: therapistId,
                therapy: therapy
            };
            if (!connected){
                therapistFilterByTherapy(therapy).then((response)=>{
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
                therapistFilterByTherapyNotConnected(newFilterData).then((response)=>{
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





        function handleFilterByIdentity (identity){
                    connected = loadState("connected",false)
                    therapistId = loadState("therapistId",0)
                    const newFilterData = {
                        therapistId: therapistId,
                        identity: identity
                    };
                    if (!connected){
                        therapistFilterByIdentity(identity).then((response)=>{
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
                        therapistFilterByIdentityNotConnected(newFilterData).then((response)=>{
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
                                        therapistFilterByTherapistType(therapistType).then((response)=>{
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
            therapistFilterByExperience(experience).then((response)=>{
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
            therapistFilterByLocation(location).then((response)=>{
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

    // Hapi 2: krijoj 3 funksione si ma nalt veq pershtatja me qa osht e lypme,
    // masanej funksionin e shton ne authService.js 6 funksione sepse mrena funksionit i ki 2 funksione qe i shkrun ne authService.js

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
                            <Link className="collapse-item" to="/dashboard/userDashboard/therapists">Manage
                                Therapists</Link>
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
                            <button className="collapse-item" onClick={() => setOpenGenderFilter(!openGenderFilter)}>Filter By Gender</button>
                            <Collapse in={openGenderFilter}>
                                <div>
                                    <button onClick={() => handleFilterByGender('M')}>Male</button>
                                    <button onClick={() => handleFilterByGender('F')}>Female</button>
                                </div>
                            </Collapse>
                            <button className="collapse-item" onClick={() => setOpenExperienceFilter(!openExperienceFilter)}>Filter By Experience</button>
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
                            <button className="collapse-item" onClick={() => setOpenLanguageFilter(!openLanguageFilter)}>Filter By Language</button>
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
                            //HAPI :

                            <button className="collapse-item"
                                     onClick={() => setOpenTherapyFilter(!openTherapyFilter)}>Filter By Location
                            </button>
                            <Collapse in={openTherapyFilter}>
                                   <div>
                                       <select onChange={(event) => handleFilterByTherapy(event.target.value)}>
                                              <option value="">Therapy Type</option>
                                              <option value="Individual therapy">Kosovo</option>
                                              <option value="Couples therapy">Albania</option>
                                              <option value="Teen therapy">Montenegro</option>
                                       </select>
                                   </div>
                            </Collapse>

                            <button className="collapse-item"
                                                                 onClick={() => setOpenIdentityFilter(!openIdentityFilter)}>Filter By Location
                                                        </button>
                                                        <Collapse in={openIdentityFilter}>
                                                               <div>
                                                                   <select onChange={(event) => handleFilterByIdentity(event.target.value)}>
                                                                          <option value="">Identity Type</option>
                                                                          <option value="Straight">Kosovo</option>
                                                                          <option value="Gay">Albania</option>
                                                                          <option value="Lesbian">Montenegro</option>
                                                                   </select>
                                                               </div>
                            </Collapse>

                            <button className="collapse-item"
                                                                 onClick={() => setOpenTherapistTypeFilter(!openTherapistTypeFilter)}>Filter By Location
                                                        </button>
                                                        <Collapse in={openTherapistTypeFilter}>
                                                               <div>
                                                                   <select onChange={(event) => handleFilterByTherapistType(event.target.value)}>
                                                                          <option value="">Therapist Type</option>
                                                                          <option value="A therapist that listens">Kosovo</option>
                                                                          <option value="A therapist that explores my past">Albania</option>
                                                                          <option value="A therapist that teaches new skills">Montenegro</option>
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

            {/* <li className="nav-item" style={{marginTop: "10px", marginBottom: "20px"}}>*/}
            {/*     <a style={{*/}
            {/*         textDecoration: "none",*/}
            {/*         color: "white",*/}
            {/*         fontSize: "13px",*/}
            {/*         marginLeft: "20px",*/}
            {/*         fontWeight: "550"*/}
            {/*     }} href="#" data-toggle="collapse" data-target="#collapsePages"*/}
            {/*aria-expanded="true" aria-controls="collapsePages">*/}
           {/* <span>Pages</span>*/}
           {/* <img style={{marginLeft: "139px", width: "15px"}} src={arrow} alt="arrow"/>*/}
           {/*     </a>*/}
           {/*     <div id="collapsePages" className="collapse" aria-labelledby="headingPages"*/}
           {/*          data-parent="#accordionSidebar">*/}
           {/*         <div className="bg-white py-2 collapse-inner rounded">*/}
           {/*             <h6 className="collapse-header">Login Screens:</h6>*/}

           {/*             <div className="collapse-divider"></div>*/}
           {/*             <h6 className="collapse-header">Other Pages:</h6>*/}

           {/*         </div>*/}
           {/*     </div>*/}
           {/* </li>*/}

            <hr className="sidebar-divider d-none d-md-block"/>

            {/*<div className="text-center d-none d-md-inline">*/}
            {/*    <button className="rounded-circle border-0" id="sidebarToggle"><img*/}
            {/*        style={{width: "19px", paddingBottom: "3px"}} src={leftArrow} alt="logo"/></button>*/}
            {/*</div>*/}

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