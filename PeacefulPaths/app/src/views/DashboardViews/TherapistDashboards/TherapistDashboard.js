import React, {useEffect, useState} from 'react';
import {fetchAllNextBookings, fetchUserData} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import '../../../css/TherapistDashboard.css';
import photo from '../../../img/3585145_66102.jpg';
import photo2 from '../../../img/Cartoon-illustration-website-building-vector.jpg';
import {connect} from "react-redux";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import DashboardNav from "../DashboardNav";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import CanvasJSReact from "@canvasjs/react-charts";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Loading from "../LoadingPage";
import {faMessage} from "@fortawesome/free-regular-svg-icons";
import DashboardFooter from "../DashboardFooter";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
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
let endSessionTherapist = false
let loadPage = false
function TherapistDashboard({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allNextBookings, setAllNextBookings] = useState([]);

    useEffect(() => {
        endSessionTherapist = loadState("endSessionTherapist",false)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setData(response.data);
                    
                    saveState("role",'ROLE_THERAPIST')

                    fetchAllNextBookings({therapistId:response.data.id,endSessionBoolean:endSessionTherapist}).then((response) => {
                        setAllNextBookings(response.data)
                    }).catch((e) => {
                        history('/loginBoot');
                    });
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/therapistDashboard")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setData(response.data);
                    
                    saveState("role",'ROLE_THERAPIST')

                    fetchAllNextBookings({therapistId:response.data.id,endSessionBoolean:endSessionTherapist}).then((response) => {
                        setAllNextBookings(response.data)
                    }).catch((e) => {
                        history('/loginBoot');
                    });
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        } else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    const chart1 = {
        animationEnabled: true,
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            title: "Number Of Clients",
            titleFontColor: "#858796",
            // prefix: "$"
        },
        data: [{
            // yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: [
                { x: new Date(2024, 0), y: 1, click: () => history('/dashboard/therapistDashboard/history') },
                { x: new Date(2024, 1), y: 1, click: () => history('/dashboard/therapistDashboard/history') },
                { x: new Date(2024, 2), y: 2, click: () => history('/dashboard/therapistDashboard/history') },
                { x: new Date(2024, 3), y: 3, click: () => history('/dashboard/therapistDashboard/history') },
                { x: new Date(2024, 4), y: 3, click: () => history('/dashboard/therapistDashboard/history') },
            ]
        }]
    }

    //timer
    let timeDifference = 0

    useEffect(() => {
        if (endSessionTherapist){
            if(timeDifference >= 0 && timeDifference <= 50){
                saveState("endSessionTherapist",true)
            }
            else {
                saveState("endSessionTherapist",false)
            }
        }
    },[])

    function formatHour(hour) {
        return `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
    }

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
        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">

                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Dashboard</h1>
                            </div>

                            <div className="row" style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}>
                                <Link className="col-xl-2 col-md-6 mb-4 hover-scale"
                                      to={"/dashboard/therapistDashboard/therapistChatDashboard"}>
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div
                                                className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Messaging <FontAwesomeIcon style={{marginLeft: "7px"}}
                                                                               icon={faArrowRight}/>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link className="col-xl-2 col-md-6 mb-4 hover-scale"
                                      to={"/dashboard/therapistDashboard/addNewWorkDays"}>
                                    <div className="card  shadow h-100 py-2" style={{borderLeft: "4px solid #1ed4fc"}}>
                                        <div className="card-body">
                                            <div
                                                className="text-xs font-weight-bold text-uppercase mb-1" style={{color: "#1ed4fc"}}>
                                                Work Days <FontAwesomeIcon style={{marginLeft: "7px"}}
                                                                                   icon={faArrowRight}/>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link className="col-xl-2 col-md-6 mb-4 hover-scale"
                                      to={"/dashboard/therapistDashboard/users"}>
                                    <div className="card shadow h-100 py-2" style={{borderLeft: "4px solid #28aac7"}}>
                                        <div className="card-body">
                                            <div
                                                className="text-xs font-weight-bold  text-uppercase mb-1" style={{color: "#28aac7"}}>
                                                Clients <FontAwesomeIcon style={{marginLeft: "7px"}}
                                                                              icon={faArrowRight}/>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                            <div className="row">

                                <div className="col-xl-8 col-lg-7">
                                    <div className="card shadow mb-4" style={{height: "570px"}}>
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Monthly Clients -
                                                2024</h6>
                                        </div>

                                        <div className="card-body">
                                            <br/>
                                            <CanvasJSChart options={chart1}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-5">
                                    <div className="card shadow mb-4" style={{maxHeight: "570px"}}>

                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Future Sessions</h6>
                                        </div>

                                        <div className="card-body">
                                            {allNextBookings.some((booking) => booking.therapistId === data.id) ? (
                                                allNextBookings
                                                    .filter((booking) => booking.therapistId === data.id)
                                                    .slice(0, 3)
                                                    .map((filteredBooking, index, array) => {
                                                        let hours, minutes;
                                                        if (filteredBooking && filteredBooking.hour) {
                                                            [hours, minutes] = filteredBooking.hour;
                                                        }

                                                        const currentTime = new Date();
                                                        let meetingTime = currentTime;
                                                        if (filteredBooking && filteredBooking.date) {
                                                            const [year, month, day] = filteredBooking.date;
                                                            meetingTime = new Date(year, month - 1, day, hours, minutes);
                                                        }

                                                        timeDifference = (currentTime - meetingTime) / 1000 / 60;

                                                        return (
                                                            <div key={index}>
                                                                <div >{timeDifference >= 0 && timeDifference <= 50 && !endSessionTherapist ?
                                                                    <div className="card-body" style={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
                                                                        <h4 style={{marginBottom: "15px",color: "#5b5c63", fontSize: "28px"}}
                                                                            className="card-title" >Session is in
                                                                            progress
                                                                        </h4>
                                                                        <img src={photo2} style={{maxWidth:"300px"}} alt={"photo2"}/>
                                                                        <Link
                                                                            to={"/dashboard/therapistDashboard/therapistChatDashboard"}
                                                                            type={"button"}
                                                                            style={{borderRadius:"15px"}}
                                                                            className={"btn btn-primary"}><FontAwesomeIcon style={{marginRight:"3.5px"}} icon={faMessage}/>Chat with
                                                                            Client
                                                                        </Link>
                                                                    </div> : <div className="card-body">
                                                                        <h5 className="card-title">Next Session:</h5>
                                                                        <p className="card-text">Date: {new Date(filteredBooking.date).toLocaleDateString()}</p>
                                                                        <p className="card-text">Hour: {filteredBooking && filteredBooking.hour && formatHour(filteredBooking.hour)}</p>
                                                                    </div>}
                                                                </div>
                                                                {index !== array.length - 1 && <hr/>}
                                                                {index === 2 &&
                                                                    <Link to={"/dashboard/therapistDashboard/bookings"}
                                                                          className={"loadMoreButton"} type={"button"}>Load
                                                                        More<FontAwesomeIcon style={{marginLeft: "7px"}}
                                                                                             icon={faArrowRight}/></Link>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                            ) : (
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <img src={photo} style={{maxWidth:"250px"}} alt={"photo"}/>
                                                    <h4 style={{color: "#5b5c63", fontSize: "28px"}}>No Future Sessions</h4>
                                                    <p style={{
                                                        maxWidth: "400px",
                                                        textAlign: "center",
                                                        color: "#858796"
                                                    }}>Take advantage of this delightful interlude to recharge your soul!</p>
                                                </div>
                                            )}
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
        error: auth.error,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistDashboard);