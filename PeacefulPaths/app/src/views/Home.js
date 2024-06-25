import React from 'react';
import {jwtDecode} from 'jwt-decode';
import {Link, useNavigate} from "react-router-dom";
import {fetchUserData} from "../api/authService";
import '../css/Home.css';
import photo from '../img/communication-concept-social-media-and-chat-talk-vector-35897944-removebg-preview.jpg';
import FAQ from './FAQ';
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation
} from "../redux/authActions";
import {connect} from "react-redux";
import {saveState} from "../helper/sessionStorage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
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

function Home({loading,error,...props}){
    const history = useNavigate ();

    React.useEffect(()=>{
        if(getRefreshToken()) {
            //throw a alert telling that you are already logged in do you want to log out
            let confirmLogout = window.confirm("You are already logged in. Do you want to log out?");

            if (confirmLogout) {
                saveState("chatTherapistId", 0);
                saveState("chatUserId", 0);
                saveState("therapistBookingId", 0);
                saveState("addNotesBoolean",false)
                saveState("endSessionTherapist",false);
                saveState("startTimerTherapist",false)
                saveState("startTimerValueTherapist",0)
                saveState("userRole", null);
                saveState("editUserBookingId", 0);
                saveState("editUserTherapistId", 0);
                saveState("editUserId", 0);
                saveState("editTherapistPastClientId", 0);
                saveState("editTherapistClientId", 0);
                saveState("editTherapistClientBookingId", 0);
                saveState("clientHistoryNotesId",0)
                saveState("meetingAvailableUser",false)
                saveState("startTimer",false)
                saveState("endSession",false);
                saveState("startTimerValue",0)
                saveState("clientInfoId",0)
                saveState("clientNotesId",0)
                saveState("therapistClientNoteId", 0);
                saveState("editTherapistId", 0);
                saveState("userInfoId", 0);
                saveState("therapistInfoId",0)
                saveState("chatStateLocation",'')
                saveState("therapistId",0)
                saveState("role", '')
                props.setUser(null);
                saveState("connected",false)
            }else {
                fetchUserData().then((response) => {
                    if (response.data.roles.at(0)){
                        if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                            saveState("role",'ROLE_ADMIN')
                            props.setLocation("/dashboard/adminDashboard")
                            history('/dashboard/adminDashboard');
                        }else if (response.data.roles.at(0).role === 'ROLE_USER') {
                            saveState("role",'ROLE_USER')
                            props.setLocation("/dashboard/userDashboard")
                            history('/dashboard/userDashboard');
                        } else if(response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                            saveState("role",'ROLE_THERAPIST')
                            props.setLocation("/dashboard/therapistDashboard")
                            history('/dashboard/therapistDashboard');
                        }
                    }
                }).catch((e) => {
                    history('/loginBoot');
                });
            }
        }else {
            saveState("chatTherapistId", 0);
            saveState("chatUserId", 0);
            saveState("therapistBookingId", 0);
            saveState("addNotesBoolean",false)
            saveState("endSessionTherapist",false);
            saveState("startTimerTherapist",false)
            saveState("startTimerValueTherapist",0)
            saveState("userRole", null);
            saveState("editUserBookingId", 0);
            saveState("editUserTherapistId", 0);
            saveState("editUserId", 0);
            saveState("editTherapistPastClientId", 0);
            saveState("editTherapistClientId", 0);
            saveState("editTherapistClientBookingId", 0);
            saveState("clientHistoryNotesId",0)
            saveState("meetingAvailableUser",false)
            saveState("startTimer",false)
            saveState("endSession",false);
            saveState("startTimerValue",0)
            saveState("clientInfoId",0)
            saveState("clientNotesId",0)
            saveState("therapistClientNoteId", 0);
            saveState("editTherapistId", 0);
            saveState("userInfoId", 0);
            saveState("therapistInfoId",0)
            saveState("chatStateLocation",'')
            saveState("therapistId",0)
            saveState("role", '')
            props.setUser(null);
            saveState("connected",false)
        }
    },[])

    return (
         <main className="Main-home">
             <div className="Home-div-kryesor">
                 <div className="title-home">
                     <h1 className="title-1">You deserve to be happy.</h1>
                     <p className="title-2">What type of therapy are you looking for?</p>
                 </div>

                 <div className="Container-home">
                     <Link to="/get-started" className="box1">
                         <h3 className="box1-h4">Individual</h3>
                         <p className="box1-a1" >For myself <FontAwesomeIcon icon={faArrowRight} /></p>
                     </Link>

                     <Link to="/get-started"  className="box2">
                         <h3 className="box1-h4">Couples</h3>
                         <p className="box1-a1" >For me and my partner <FontAwesomeIcon icon={faArrowRight} /></p>
                     </Link>

                     <Link to="/get-started" className="box3">
                         <h3 className="box1-h4">Teen</h3>
                         <p className="box1-a1" >For my child <FontAwesomeIcon icon={faArrowRight} /></p>
                     </Link>
                 </div>
             </div>


             <div className="part-two-main">
                 <div className="part-two-Container">
                     <div>
                         <h1 className="pt-title-1">The Balkan's first <br/> therapy service.</h1>
                         <h1 className="pt-title-2">100% online.</h1>
                     </div>
                 </div>

                 <div className="part-two-main-right">
                     <h1 className="pt-title-3">380,418,761</h1>
                     <p className="pt-paragraf-1">Messages, chat, phone, video sessions</p>
                     <hr/>

                     <h1 className="pt-title-3">35,803</h1>
                     <p className="pt-paragraf-1">Credentialed therapists ready to help </p>
                     <hr/>

                     <h1 className="pt-title-3">4,747,193</h1>
                     <p className="pt-paragraf-1">People got help</p>
                 </div>
             </div>


             <div className="part-three-main">
                 <div className="part-three-Container">
                     <h1 className="pth-title-3">Professional and <br/>credentialled therapists <br/>who you can trust
                     </h1>
                     <p className="pth-paragraf-3">Tap into the world's largest network of credentialled and <br/>
                         experienced therapists who can help you with a range of <br/>
                         issues including depression, anxiety, relationships, <br/>
                         trauma, grief, and more. With our therapists, you get the <br/>
                         same professionalism and quality you would expect from <br/>
                         an in-office therapist, but with the ability to <br/>
                         communicate when and how you want.
                     </p>
                     <div className="part-three-main-right">
                         <a className="pth-button-a1" href="/get-started">Get matched to a therapist</a>
                     </div>
                 </div>
                <div style={{paddingLeft:"50px"}}>
                    <img width={"600px"} height={"500px"} src={photo} alt={"Photo"}/>
                </div>
             </div>


             <div className="part-four-main">
                 <div className="part-four-Container">
                     <h1><span className="pf-span-4">Peaceful</span><span className="pf-span-5">Parts vs. traditional in-office therapy</span></h1>
                       <table className="comparison-table">
                           <thead>
                               <tr>
                                   <th></th>
                                   <th className="pf-Peaceful-Parts">PeacefulParts</th>
                                   <th>In-office</th>
                               </tr>
                           </thead>
                           <tbody>
                               <tr>
                                   <td className={"comparison-table-td"}>Provided by a credentialled therapist <span className="tooltip">i<span className="tooltiptext">All therapists are licensed.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="checkmark">&#10003;</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>In-office visits <span className="tooltip">i<span className="tooltiptext">In-office visits available.</span></span></td>
                                   <td className="pf-td-2"><span className="cross">✖</span></td>
                                   <td><span className="checkmark">&#10003;</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Messaging any time <span className="tooltip">i<span className="tooltiptext">Message your therapist at any time.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Chat sessions <span className="tooltip">i<span className="tooltiptext">Live chat sessions available.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Phone sessions <span className="tooltip">i<span className="tooltiptext">Phone sessions available.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Video sessions <span className="tooltip">i<span className="tooltiptext">Video sessions available.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Easy scheduling <span className="tooltip">i<span className="tooltiptext">Easy to schedule appointments.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Digital worksheets <span className="tooltip">i<span className="tooltiptext">Access to digital worksheets.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Group sessions <span className="tooltip">i<span className="tooltiptext">Group therapy sessions available.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="info">?</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Smart provider matching <span className="tooltip">i<span className="tooltiptext">Smart matching with the best therapist for you.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Easy to switch providers <span className="tooltip">i<span className="tooltiptext">Easily switch therapists if needed.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                               <tr>
                                   <td className={"comparison-table-td"}>Access therapy from anywhere <span className="tooltip">i<span className="tooltiptext">Access your therapy sessions from anywhere.</span></span></td>
                                   <td className="pf-td-2"><span className="checkmark">&#10003;</span></td>
                                   <td><span className="cross">✖</span></td>
                               </tr>
                           </tbody>
                       </table>
                </div>
            </div>


            <FAQ />


         </main>
    );
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
export default connect(mapStateToProps,mapDispatchToProps)(Home);