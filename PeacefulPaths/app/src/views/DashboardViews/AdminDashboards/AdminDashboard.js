import React, {useEffect, useState} from 'react';
import {fetchUserData} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/AdminDashboard.css';
import DashboardNav from "../DashboardNav";
import CanvasJSReact from '@canvasjs/react-charts';
import {
    authenticate,
    authFailure,
    authSuccess
} from "../../../redux/authActions";
import {connect} from "react-redux";
import SideBarAdmin from "../SideBars/SideBarAdmin";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import Loading from "../LoadingPage";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Footer from "../../Footer";
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
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
let loadPage = false
function AdminDashboard({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});

    useEffect(() => {
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        
                        saveState("role",'ROLE_ADMIN')
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        
                        saveState("role",'ROLE_ADMIN')
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else{
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);

    const chart1 = {
        animationEnabled: true,
        // title:{
        //     text: "Monthly Users - 2024"
        // },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            title: "Number Of Users",
            titleFontColor: "#858796",
            // prefix: "$"
        },
        data: [{
            // yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: [
                { x: new Date(2024, 0), y: 1 },
                { x: new Date(2024, 1), y: 1 },
                { x: new Date(2024, 2), y: 2 },
                { x: new Date(2024, 3), y: 3 },
                { x: new Date(2024, 4), y: 3 },
            ]
        }]
    }

    const addSymbols = (e) => {
        const suffixes = ["", "K", "M", "B"];
        let order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        const suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

    const chart2 = {
        animationEnabled: true,
        theme:"light2",
        title: {
            // text: "Most Popular Social Networking Sites"
        },
        axisX: {
            title: "Therapists",
            titleFontColor: "#858796",
            reversed: true,
        },
        axisY: {
            // title: "Monthly Active Users",
            includeZero: true,
            labelFormatter: addSymbols
        },
        data: [{
            type: "bar",
            dataPoints: [
                { y: 3, label: "Loren Markaj" },
                { y: 5, label: "Leon Rama" },
            ]
        }]
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPage = loadState("loadPage", false)
        // Simulate a loading process
        if (loadPage) {

            const timer = setTimeout(() => {
                setIsLoading(false);
                saveState("loadPage",false)
            }, 3000);

            return () => clearTimeout(timer);
        }else{
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 600);

            return () => clearTimeout(timer);
        }
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
            <main>

                <div id="wrapper">

                    <SideBarAdmin />

                    <div id="content-wrapper" className="d-flex flex-column">

                        <div id="content">

                            <DashboardNav data={data} setUser={props.setUser} />

                            <div className="container-fluid">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Admin Dashboard</h1>
                                </div>
                                <br/>

                                <div className="row" style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center",marginBottom:"30px"}}>
                                    <Link className="col-xl-2 col-md-6 mb-4 hover-scale" to={"/dashboard/adminDashboard/admin"}>
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div
                                                    className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Manage Admins <FontAwesomeIcon style={{marginLeft: "7px"}}
                                                                                   icon={faArrowRight}/>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link className="col-xl-2 col-md-6 mb-4 hover-scale" to={"/dashboard/adminDashboard/therapists"}>
                                        <div className="card shadow h-100 py-2" style={{borderLeft: "4px solid #1ed4fc"}}>
                                            <div className="card-body">
                                                <div
                                                    className="text-xs font-weight-bold text-uppercase mb-1" style={{color: "#1ed4fc"}}>
                                                    Manage Therapists <FontAwesomeIcon style={{marginLeft: "7px"}}
                                                                                       icon={faArrowRight}/>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link className="col-xl-2 col-md-6 mb-4 hover-scale" to={"/dashboard/adminDashboard/users"}>
                                        <div className="card  shadow h-100 py-2" style={{borderLeft: "4px solid #28aac7"}}>
                                            <div className="card-body">
                                                <div
                                                    className="text-xs font-weight-bold text-uppercase mb-1" style={{color: "#28aac7"}}>
                                                    Manage Users <FontAwesomeIcon style={{marginLeft: "7px"}}
                                                                                  icon={faArrowRight}/>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                                <div className="row">

                                    <div className="col-xl-8 col-lg-7">
                                        <div className="card shadow mb-4">
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold " style={{color:"#858796"}}>Monthly Users -
                                                    2024</h6>
                                            </div>

                                            <div className="card-body">
                                                <CanvasJSChart options={chart1}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-5">
                                        <div className="card shadow mb-4">

                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold " style={{color:"#858796"}}>Therapists With The Most Clients</h6>
                                            </div>

                                            <div className="card-body">
                                                <CanvasJSChart options={chart2}/>
                                            </div>
                                        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);