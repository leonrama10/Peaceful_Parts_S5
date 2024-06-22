import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import {Dropdown, Modal, Button} from "react-bootstrap";
import {saveState,loadState} from "../../helper/sessionStorage";
import malePhoto from "../../img/Depositphotos_484354208_S.jpg"
import femalePhoto from "../../img/person-gray-photo-placeholder-woman-600nw-1241538838.webp"
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
export default function DashboardNav(props){
    const [showModal, setShowModal] = useState(false);
    const role = loadState("role",'')
    const [location, setLocation] = React.useState('');

    function handleLogout() {
        setShowModal(true);
    }

    function logout()  {
        setShowModal(false);
        props.setUser(null);
        saveState("role",'')
        saveState("connected",false)
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
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <ul className="navbar-nav ml-auto">

                    <div className="topbar-divider d-none d-sm-block"></div>

                    <Dropdown className="nav-item dropdown no-arrow hover-effect">
                        <Dropdown.Toggle id="dropdown-basic"
                                         className="nav-link dropdown-toggle custom-dropdown-toggle hover-effect">
                            <span className="mr-2 d-none d-lg-inline text-600 small"
                                  style={{color: "#5a5c69"}}>{props.data.name} {props.data.surname}</span>
                            {props.data.gender && props.data.gender.gender === "M" ?
                                <img className="img-profile rounded-circle" src={malePhoto} alt="logo"
                                     style={{border: "1px solid #858796"}}/> :
                                <img className="img-profile rounded-circle" src={femalePhoto} alt="logo"
                                     style={{border: "1px solid #858796"}}/>
                            }
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow animated--grow-in ">
                            <Dropdown.Item as={Link} to={`/dashboard${location}`} style={{marginLeft: "0px"}}>
                                <FontAwesomeIcon icon={faUser}/> Profile
                            </Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item as={Link} to="/loginBoot" onClick={handleLogout} style={{marginLeft: "0px"}}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </ul>

            </nav>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={logout}>Logout</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
