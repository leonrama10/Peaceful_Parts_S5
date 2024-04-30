import React from 'react';
import { Link } from 'react-router-dom';
import {Dropdown} from "react-bootstrap";
import bell from "../../img/bell.png";
import mail from "../../img/mail.png";
import navimg1 from "../../img/undraw_profile_1.svg";
import navimg2 from "../../img/undraw_profile_2.svg";
import navimg3 from "../../img/undraw_profile_3.svg";
import accLogo from "../../img/undraw_profile.svg";
import {saveState,loadState} from "../../helper/sessionStorage";

export default function DashboardNav(props){

    const role = loadState("role",'')
    const [location, setLocation] = React.useState('');

    function logout()  {
        if (role==='ROLE_ADMIN') {
            props.setAdminAuthenticationState(false)
            saveState("isAdminAuthenticated",'')
        }else if (role==='ROLE_USER') {
            props.setUserAuthenticationState(false)
        }else if (role==='ROLE_THERAPIST') {
            props.setTherapistAuthenticationState(false)
            saveState("isTherapistAuthenticated",'')
        }
        props.setUser({});
        saveState("loggedInState", false)
        saveState("role",'')
    }

    React.useEffect(()=>{
        if (role === 'ROLE_USER'){
            setLocation(l => l = '/userDashboard/profile')
        }else if (role === 'ROLE_THERAPIST'){
            setLocation(l => l = '/therapistDashboard/profile')
        }else if(role === 'ROLE_ADMIN'){
            setLocation(l => l = '/adminDashboard/profile')
        }
    },[])

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                         aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                       placeholder="Search for..." aria-label="Search"
                                       aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <Dropdown className="nav-item dropdown no-arrow mx-1 hover-effect">
                    <Dropdown.Toggle id="alertsDropdown" role="button"
                                     className="nav-link dropdown-toggle hover-effect">
                        <img src={bell} alt="logo"/>
                        <span className="badge badge-danger badge-counter"
                              style={{marginTop: "18px", marginRight: "-5px"}}>3+</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                   style={{width: "330px"}}>
                        <h6 className="dropdown-header">Alerts Center</h6>
                        <Dropdown.Item href="#" className="d-flex align-items-center"
                                       style={{marginLeft: "-0px", height: "90px"}}>
                            <div className="mr-3">
                                <div className="icon-circle bg-primary">
                                    <i className="fas fa-file-alt text-white"></i>
                                </div>
                            </div>
                            <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                <div className="small text-gray-500">December 12, 2019</div>
                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="d-flex align-items-center"
                                       style={{marginLeft: "-0px", height: "90px"}}>
                            <div className="mr-3">
                                <div className="icon-circle bg-success">
                                    <i className="fas fa-donate text-white"></i>
                                </div>
                            </div>
                            <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                <div className="small text-gray-500">December 7, 2019</div>
                                $290.29 has been deposited into your account!
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="text-center small text-gray-500"
                                       style={{marginLeft: "-0px"}}>Show All Alerts</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="nav-item dropdown no-arrow mx-1 hover-effect">
                    <Dropdown.Toggle id="messagesDropdown" role="button"
                                     className="nav-link dropdown-toggle hover-effect">
                        <img src={mail} alt="logo"/>
                        <span className="badge badge-danger badge-counter" style={{marginTop: "18px"}}>7</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                   style={{width: "330px"}}>
                        <h6 className="dropdown-header">Message Center</h6>
                        <Dropdown.Item href="#" className="d-flex align-items-center" style={{marginLeft: "-0px"}}>
                            <div className="dropdown-list-image mr-3" style={{width: "35px"}}>
                                <img className="rounded-circle" src={navimg1} alt="..."/>
                                <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold" style={{width: "240px"}}>
                                <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                    problem I've been having.
                                </div>
                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item d-flex align-items-center" href="#"
                                       style={{marginLeft: "-0px"}}>
                            <div className="dropdown-list-image mr-3" style={{width: "35px"}}>
                                <img className="rounded-circle" src={navimg2}
                                     alt="..."/>
                                <div className="status-indicator"></div>
                            </div>
                            <div>
                                <div className="text-truncate" style={{width: "240px"}}>I have the photos that you
                                    ordered last month, how
                                    would you like them sent to you?
                                </div>
                                <div className="small text-gray-500">Jae Chun · 1d</div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className=" d-flex align-items-center" href="#" style={{marginLeft: "-0px"}}>
                            <div className="dropdown-list-image mr-3" style={{width: "35px"}}>
                                <img className="rounded-circle" src={navimg3}
                                     alt="LEKA"/>
                                <div className="status-indicator bg-warning"></div>
                            </div>
                            <div>
                                <div className="text-truncate" style={{width: "240px"}}>Last month's report looks great,
                                    I am very happy with
                                    the progress so far, keep up the good work!
                                </div>
                                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item d-flex align-items-center"
                                       href="#" style={{marginLeft: "-0px"}}>
                            <div className="dropdown-list-image mr-3" style={{width: "35px"}}>
                                <img className="rounded-circle"
                                     src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                     alt="..." style={{width: "35px"}}/>
                                <div className="status-indicator bg-success"></div>
                            </div>
                            <div>
                                <div className="text-truncate" style={{width: "240px"}}>Am I a good boy? The reason I
                                    ask
                                    is because someone
                                    told me that people say this to all dogs, even if they
                                    aren't good...
                                </div>
                                <div className="small text-gray-500">Chicken the Dog · 2w</div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="text-center small text-gray-500"
                                       style={{marginLeft: "-0px"}}>Read More Messages</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <div className="topbar-divider d-none d-sm-block"></div>

                {/*HEREEEEEEEEEEEEEEEEEEEEEEE IS THE ACCOUNT*/}

                <Dropdown className="nav-item dropdown no-arrow hover-effect">
                    <Dropdown.Toggle id="dropdown-basic"
                                     className="nav-link dropdown-toggle custom-dropdown-toggle hover-effect">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{props.data.name} {props.data.surname}</span>
                        <img className="img-profile rounded-circle" src={accLogo} alt="logo"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow animated--grow-in ">
                        <Dropdown.Item as={Link} to={`/dashboard${location}`}><i
                            className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</Dropdown.Item>
                        <Dropdown.Item as={Link} to="#"><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>Settings</Dropdown.Item>
                        <Dropdown.Item as={Link} to="#"><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>Activity
                            Log</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item as={Link} to="/loginBoot" data-toggle="modal" data-target="#logoutModal"
                                       onClick={logout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </ul>

        </nav>
    )
}
