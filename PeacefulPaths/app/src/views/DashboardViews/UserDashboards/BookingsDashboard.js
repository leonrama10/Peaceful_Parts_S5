import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import {
    authenticate,
    authFailure,
    authSuccess,
    setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {
    fetchUserData,
    fetchUserTherapistConnectionData, therapistFilterByGetStarted,
    therapistFilterByGetStartedNotConnectedData
} from "../../../api/authService";
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function BookingsDashboard({loading,error,...props}){

    useEffect(() => {
        if(!isUserAuthenticatedBoolean){
            if (!props.isUserAuthenticated){
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }else{
                saveState("isUserAuthenticated",props.isUserAuthenticated)
            }
        }else{
            saveState("isUserAuthenticated",isUserAuthenticatedBoolean)
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});

    React.useEffect(() => {
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                setData(response.data);
            } else {
                history('/loginBoot');
            }
        }).catch((e) => {
            history('/loginBoot');
        });
    }, []);

    function showBookingsInfo() {
        history(`/dashboard/userDashboard/bookingsInfo`);
    }

    function addNewBooking() {
        history(`/dashboard/userDashboard/addBookings`);
    }

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState}/>

                        <div className="container-fluid">
                            <button onClick={showBookingsInfo}>Show Your Bookings</button>
                            <button onClick={addNewBooking}>Book a session</button>
                        </div>

                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current
                            session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel
                            </button>
                            <a className="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>

            <script src="../../../vendor/jquery/jquery.min.js"></script>
            <script src="../../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../../../vendor/jquery-easing/jquery.easing.min.js"></script>

        </main>
    )

}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isUserAuthenticated: auth.isUserAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookingsDashboard);