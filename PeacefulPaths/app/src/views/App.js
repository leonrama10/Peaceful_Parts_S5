import '../css/App.css';
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import AdminDashboard from "./DashboardViews/AdminDashboards/AdminDashboard";
import AdminProfile from "./DashboardViews/AdminDashboards/AdminProfile";
import UserProfile from "./DashboardViews/UserDashboards/UserProfile";
import AdminDashboardUsers from "./DashboardViews/AdminDashboards/AdminDashboardUsers";
import TherapistDashboardUsers from "./DashboardViews/TherapistDashboards/TherapistDashboardUsers";
import AdminDashboardTherapists from "./DashboardViews/AdminDashboards/AdminDashboardTherapists";
import AdminDashboardAdmin from "./DashboardViews/AdminDashboards/AdminDashboardAdmin";
import TherapistDashboard from "./DashboardViews/TherapistDashboards/TherapistDashboard";
import TherapistProfile from "./DashboardViews/TherapistDashboards/TherapistProfile";
import LoginBoot from "./DashboardViews/Login and register/LoginBoot";
import RegisterBoot from "./DashboardViews/Login and register/RegisterBoot";
import ForgotPasswordBoot from "./DashboardViews/Login and register/ForgotPasswordBoot";
import VerifyPasswordInfo from "./DashboardViews/Login and register/VerifyPasswordInfo";
import PasswordResetView from "./DashboardViews/Login and register/PasswordResetView";
import ErrorPage from "./DashboardViews/ErrorDashboard/ErrorPage";
import EditUser from "./DashboardViews/EditUser";
import { useLocation } from 'react-router-dom';
import UserDashboard from "./DashboardViews/UserDashboards/UserDashboard";
import TherapistCardInfo from "./DashboardViews/UserDashboards/TherapistCardInfo";
import UserDashboardTherapists from "./DashboardViews/UserDashboards/UserDashboardTherapists";
import GetStarted from "./DashboardViews/GetStartedDirectory/GetStarted";
import RegisterBootTherapist from "./DashboardViews/Login and register/RegisterBootTherapist";
import RegisterBootAdmin from "./DashboardViews/Login and register/RegisterBootAdmin";
import TherapistClientHistory from "./DashboardViews/TherapistDashboards/TherapistClientHistory";
import ClientInfo from "./DashboardViews/TherapistDashboards/ClientInfo";
import TherapistNotesDashboard from "./DashboardViews/TherapistDashboards/TherapistNotesDashboard";
import TherapistAddNotes from "./DashboardViews/TherapistDashboards/TherapistAddNotes";
import TherapistOldNotes from "./DashboardViews/TherapistDashboards/TherapistOldNotes";
import TherapistOldNotesHistory from "./DashboardViews/TherapistDashboards/TherapistOldNotesHistory";
import TherapistWorkDaysDashboard from "./DashboardViews/TherapistDashboards/TherapistWorkDaysDashboard";
import BookingsDashboard from "./DashboardViews/UserDashboards/BookingsDashboard";
import AddBookings from "./DashboardViews/UserDashboards/AddBookings";
import BookingsInfo from "./DashboardViews/UserDashboards/BookingsInfo";
import TherapistCurrentWorkDays from "./DashboardViews/TherapistDashboards/TherapistCurrentWorkDays";
import TherapistAddNewWorkDays from "./DashboardViews/TherapistDashboards/TherapistAddNewWorkDays";
import EditBooking from "./DashboardViews/UserDashboards/EditBooking";

function Main() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <>
            {!isDashboard && <Header />}
            <Routes>
                <Route path="/admin-dashboard" element={<AdminDashboardTherapists />} />

                <Route path="/loginBoot" element={<LoginBoot />}/>
                <Route path="/registerBoot" element={<RegisterBoot />}/>
                <Route path="/dashboard/registerBoot-therapist" element={<RegisterBootTherapist />}/>
                <Route path="/dashboard/registerBoot-admin" element={<RegisterBootAdmin />}/>
                <Route path="/get-started" element={<GetStarted />}/>
                <Route path="/forgotPassBoot" element={<ForgotPasswordBoot />}/>
                <Route path="/verifyPasswordInfo" element={<VerifyPasswordInfo />}/>
                <Route path="/passwordReset/:token" element={<PasswordResetView />}/>
                <Route path="/dashboard/userDashboard/profile" element={<UserProfile />}/>
                <Route path="/dashboard/userDashboard" element={<UserDashboard />}/>
                <Route path="/dashboard/userDashboard/therapists" element={<UserDashboardTherapists />}/>
                <Route path="/dashboard/userDashboard/bookingsDashboard" element={<BookingsDashboard />}/>
                <Route path="/dashboard/userDashboard/bookingsInfo" element={<BookingsInfo />}/>
                <Route path="/dashboard/userDashboard/addBookings" element={<AddBookings />}/>
                <Route path="/dashboard/userDashboard/editBooking/:id" element={<EditBooking />}/>
                <Route path="/dashboard/userDashboard/therapistInfo/:id" element={<TherapistCardInfo />}/>
                <Route path="/dashboard/adminDashboard" element={<AdminDashboard />}/>
                <Route path="/dashboard/adminDashboard/profile" element={<AdminProfile />}/>
                <Route path="/dashboard/adminDashboard/users" element={<AdminDashboardUsers />}/>
                <Route path="/dashboard/adminDashboard/therapists" element={<AdminDashboardTherapists />}/>
                <Route path="/dashboard/adminDashboard/admin" element={<AdminDashboardAdmin />}/>
                <Route path="/dashboard/adminDashboard/users/edit/:id" element={<EditUser />}/>
                <Route path="/dashboard/therapistDashboard/users/info/:id" element={<ClientInfo />}/>
                <Route path="/dashboard/therapistDashboard/users/addNotes/:id" element={<TherapistAddNotes />}/>
                <Route path="/dashboard/therapistDashboard/users/oldNotes/:id" element={<TherapistOldNotes />}/>
                <Route path="/dashboard/therapistDashboard/users/oldNotesHistory/:id" element={<TherapistOldNotesHistory />}/>
                <Route path="/dashboard/therapistDashboard/users/notesDashboard/:id" element={<TherapistNotesDashboard />}/>
                <Route path="/dashboard/therapistDashboard" element={<TherapistDashboard />}/>
                <Route path="/dashboard/therapistDashboard/profile" element={<TherapistProfile />}/>
                <Route path="/dashboard/therapistDashboard/users" element={<TherapistDashboardUsers />}/>
                <Route path="/dashboard/therapistDashboard/workDaysDashboard" element={<TherapistWorkDaysDashboard />}/>
                <Route path="/dashboard/therapistDashboard/currentWorkDays" element={<TherapistCurrentWorkDays />}/>
                <Route path="/dashboard/therapistDashboard/addNewWorkDays" element={<TherapistAddNewWorkDays />}/>
                <Route path="/dashboard/therapistDashboard/history" element={<TherapistClientHistory />}/>
                <Route path="/dashboard/errorPage" element={<ErrorPage />}/>
                <Route path="/" element={<Home />}/>
            </Routes>
            {!isDashboard && <Footer />}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    );
}

export default App;
