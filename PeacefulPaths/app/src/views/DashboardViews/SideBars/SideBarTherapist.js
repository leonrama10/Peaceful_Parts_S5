import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {Collapse} from "react-bootstrap";
import arrow from "../../../img/arrow.png";
import leftArrow from "../../../img/leftArrow.png";

export default function SideBarTherapist(){

    const [open, setOpen] = useState(false);

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
                <Link className="nav-link" to="/dashboard/therapistDashboard">
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
                }} onClick={() => setOpen(!open)} aria-controls="collapse-text" aria-expanded={open}>
                    <span>Managing</span>
                    <img style={{marginLeft: "99px", width: "15px"}} src={arrow} alt="arrow"/>
                </a>
                <Collapse in={open}>
                    <div id="collapse-text">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Components:</h6>
                            <Link className="collapse-item" to="/dashboard/therapistDashboard/users">Manage Clients</Link>
                            <Link className="collapse-item" to="/dashboard/therapistDashboard/history">Client History</Link>
                        </div>
                    </div>
                </Collapse>
            </li>


            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                Addons
            </div>

            {/*<li className="nav-item" style={{marginTop: "10px", marginBottom: "20px"}}>*/}
            {/*    <a style={{*/}
            {/*        textDecoration: "none",*/}
            {/*        color: "white",*/}
            {/*        fontSize: "13px",*/}
            {/*        marginLeft: "20px",*/}
            {/*        fontWeight: "550"*/}
            {/*    }} href="#" data-toggle="collapse" data-target="#collapsePages"*/}
            {/*       aria-expanded="true" aria-controls="collapsePages">*/}
            {/*        <span>Pages</span>*/}
            {/*        <img style={{marginLeft: "139px", width: "15px"}} src={arrow} alt="arrow"/>*/}
            {/*    </a>*/}
            {/*    <div id="collapsePages" className="collapse" aria-labelledby="headingPages"*/}
            {/*         data-parent="#accordionSidebar">*/}
            {/*        <div className="bg-white py-2 collapse-inner rounded">*/}
            {/*            <h6 className="collapse-header">Login Screens:</h6>*/}

            {/*            <div className="collapse-divider"></div>*/}
            {/*            <h6 className="collapse-header">Other Pages:</h6>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</li>*/}

            <hr className="sidebar-divider d-none d-md-block"/>


            {/*<div className="text-center d-none d-md-inline">*/}
            {/*    <button className="rounded-circle border-0" id="sidebarToggle"><img*/}
            {/*        style={{width: "19px", paddingBottom: "3px"}} src={leftArrow} alt="logo"/></button>*/}
            {/*</div>*/}

        </ul>
    )
}