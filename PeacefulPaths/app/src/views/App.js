import React from 'react';
import '../css/App.css';
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import AdminDashboard from "./DashboardViews/AdminDashboards/AdminDashboard";
import AdminProfile from "./DashboardViews/AdminDashboards/AdminProfile";
import UserProfile from "./DashboardViews/UserDashboards/UserProfile";
import AdminDashboardUsers from "./DashboardViews/AdminDashboards/AdminDashboardUser/AdminDashboardUsers";
import TherapistDashboardUsers from "./DashboardViews/TherapistDashboards/TherapistDashboardUsers";
import AdminDashboardTherapists from "./DashboardViews/AdminDashboards/AdminDashboardTherapist/AdminDashboardTherapists";
import AdminDashboardAdmin from "./DashboardViews/AdminDashboards/AdminDashboardAdmin/AdminDashboardAdmin";
import TherapistDashboard from "./DashboardViews/TherapistDashboards/TherapistDashboard";
import TherapistProfile from "./DashboardViews/TherapistDashboards/TherapistProfile";
import LoginBoot from "./DashboardViews/Login and register/LoginBoot";
import RegisterBoot from "./DashboardViews/Login and register/RegisterBoot";
import ForgotPasswordBoot from "./DashboardViews/Login and register/ForgotPasswordBoot";
import VerifyPasswordInfo from "./DashboardViews/Login and register/VerifyPasswordInfo";
import PasswordResetView from "./DashboardViews/Login and register/PasswordResetView";
import ErrorPage from "./DashboardViews/ErrorDashboard/ErrorPage";
import EditUser from "./DashboardViews/AdminDashboards/EditUser";
import { useLocation } from 'react-router-dom';
import UserDashboard from "./DashboardViews/UserDashboards/UserDashboard";
import TherapistCardInfo from "./DashboardViews/UserDashboards/TherapistCardInfo";
import GetStarted from "./DashboardViews/GetStartedDirectory/GetStarted";
import RegisterBootTherapist from "./DashboardViews/AdminDashboards/AdminDashboardTherapist/RegisterBootTherapist";
import RegisterBootAdmin from "./DashboardViews/AdminDashboards/AdminDashboardAdmin/RegisterBootAdmin";
import TherapistClientHistory from "./DashboardViews/TherapistDashboards/TherapistClientHistory";
import ClientInfo from "./DashboardViews/TherapistDashboards/ClientInfo";
import TherapistAddNotes from "./DashboardViews/TherapistDashboards/TherapistAddNotes";
import TherapistOldNotes from "./DashboardViews/TherapistDashboards/TherapistOldNotes";
import TherapistOldNotesHistory from "./DashboardViews/TherapistDashboards/TherapistOldNotesHistory";
import AddBookings from "./DashboardViews/UserDashboards/AddBookings";
import BookingsInfo from "./DashboardViews/UserDashboards/BookingsInfo";
import TherapistAddNewWorkDays from "./DashboardViews/TherapistDashboards/TherapistAddNewWorkDays";
import ChatDashboard from "./DashboardViews/UserDashboards/ChatDashboard";
import ChatTherapist from "./DashboardViews/UserDashboards/ChatTherapist";
import TherapistChatDashboard from "./DashboardViews/TherapistDashboards/TherapistChatDashboard";
import ChatClient from "./DashboardViews/TherapistDashboards/ChatClient";
import SendAdvice from "./DashboardViews/TherapistDashboards/SendAdvice";
import AdviceByTherapist from "./DashboardViews/UserDashboards/AdviceByTherapist";
import OldChatTherapist from "./DashboardViews/UserDashboards/OldChatTherapist";
import OldChatClient from "./DashboardViews/TherapistDashboards/OldChatClient";
import EditTherapistWorkDays from "./DashboardViews/AdminDashboards/AdminDashboardTherapist/EditTherapistWorkDays";
import EditTherapistClients from "./DashboardViews/AdminDashboards/AdminDashboardTherapist/EditTherapistClients";
import EditTherapistClientBookings
    from "./DashboardViews/AdminDashboards/AdminDashboardTherapist/EditTherapistClientBookings";
import EditTherapistClientBookingEdit
    from "./DashboardViews/AdminDashboards/AdminDashboardTherapist/EditTherapistClientBookingEdit";
import EditUserBookings from "./DashboardViews/AdminDashboards/AdminDashboardUser/EditUserBookings";
import EditUserConnection from "./DashboardViews/AdminDashboards/AdminDashboardUser/EditUserConnection";
import EditUserBookingsEdit from "./DashboardViews/AdminDashboards/AdminDashboardUser/EditUserBookingsEdit";
import EditTherapistPastClients
    from "./DashboardViews/AdminDashboards/AdminDashboardTherapist/EditTherapistPastClients";
import EditTherapistPastClientsBookings
    from "./DashboardViews/AdminDashboards/AdminDashboardTherapist/EditTherapistPastClientsBookings";
import TherapistBookings from "./DashboardViews/TherapistDashboards/TherapistBookings";
import TherapistBookingsEdit from "./DashboardViews/TherapistDashboards/TherapistBookingsEdit";
import TherapistOldNotesEdit from "./DashboardViews/TherapistDashboards/TherapistOldNotesEdit";
import MyTherapist from "./DashboardViews/UserDashboards/MyTherapist";
import Feedbacks from "./DashboardViews/TherapistDashboards/Feedbacks";

function Main() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <>
            {!isDashboard && <Header />}
            <Routes>
                <Route path="/loginBoot" element={<LoginBoot />}/>
                <Route path="/registerBoot" element={<RegisterBoot />}/>
                <Route path="/get-started" element={<GetStarted />}/>
                <Route path="/forgotPassBoot" element={<ForgotPasswordBoot />}/>
                <Route path="/verifyPasswordInfo" element={<VerifyPasswordInfo />}/>
                <Route path="/passwordReset/:token" element={<PasswordResetView />}/>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/dashboard/registerBoot-therapist" element={<RegisterBootTherapist />}/>
                <Route path="/dashboard/registerBoot-admin" element={<RegisterBootAdmin />}/>
                <Route path="/dashboard/userDashboard/profile" element={<UserProfile />}/>
                <Route path="/dashboard/userDashboard" element={<UserDashboard />}/>
                <Route path="/dashboard/userDashboard/chatDashboard" element={<ChatDashboard />}/>
                <Route path="/dashboard/userDashboard/chatTherapist" element={<ChatTherapist />}/>
                <Route path="/dashboard/userDashboard/oldChatTherapist" element={<OldChatTherapist />}/>
                <Route path="/dashboard/userDashboard/bookingsInfo" element={<BookingsInfo />}/>
                <Route path="/dashboard/userDashboard/addBookings" element={<AddBookings />}/>
                <Route path="/dashboard/userDashboard/therapistInfo" element={<TherapistCardInfo />}/>
                <Route path="/dashboard/userDashboard/myTherapistInfo" element={<MyTherapist />}/>
                <Route path="/dashboard/userDashboard/advice" element={<AdviceByTherapist />} />
                <Route path="/dashboard/adminDashboard" element={<AdminDashboard />}/>
                <Route path="/dashboard/adminDashboard/profile" element={<AdminProfile />}/>
                <Route path="/dashboard/adminDashboard/users" element={<AdminDashboardUsers />}/>
                <Route path="/dashboard/adminDashboard/users/editUserBookings" element={<EditUserBookings />}/>
                <Route path="/dashboard/adminDashboard/users/editUserBookings/edit" element={<EditUserBookingsEdit />}/>
                <Route path="/dashboard/adminDashboard/users/editUserConnection" element={<EditUserConnection />}/>
                <Route path="/dashboard/adminDashboard/therapists" element={<AdminDashboardTherapists />}/>
                <Route path="/dashboard/adminDashboard/therapists/editTherapistWorkDays" element={<EditTherapistWorkDays />}/>
                <Route path="/dashboard/adminDashboard/therapists/editTherapistClients" element={<EditTherapistClients />}/>
                <Route path="/dashboard/adminDashboard/therapists/editTherapistPastClients" element={<EditTherapistPastClients />}/>
                <Route path="/dashboard/adminDashboard/therapists/editTherapistPastClients/bookings" element={<EditTherapistPastClientsBookings />}/>
                <Route path="/dashboard/adminDashboard/therapists/editTherapistClients/bookings" element={<EditTherapistClientBookings />}/>
                <Route path="/dashboard/adminDashboard/therapists/editTherapistClients/bookings/edit" element={<EditTherapistClientBookingEdit />}/>
                <Route path="/dashboard/adminDashboard/admin" element={<AdminDashboardAdmin />}/>
                <Route path="/dashboard/adminDashboard/editInfo" element={<EditUser />}/>
                <Route path="/dashboard/therapistDashboard/users/info" element={<ClientInfo />}/>
                <Route path="/dashboard/therapistDashboard/users/addNotes" element={<TherapistAddNotes />}/>
                <Route path="/dashboard/therapistDashboard/users/oldNotes" element={<TherapistOldNotes />}/>
                <Route path="/dashboard/therapistDashboard/users/oldNotes/edit" element={<TherapistOldNotesEdit />}/>
                <Route path="/dashboard/therapistDashboard/users/oldNotesHistory" element={<TherapistOldNotesHistory />}/>
                <Route path="/dashboard/therapistDashboard" element={<TherapistDashboard />}/>
                <Route path="/dashboard/therapistDashboard/therapistChatDashboard" element={<TherapistChatDashboard />}/>
                <Route path="/dashboard/therapistDashboard/chatClient" element={<ChatClient />}/>
                <Route path="/dashboard/therapistDashboard/oldChatClient" element={<OldChatClient />}/>
                <Route path="/dashboard/therapistDashboard/profile" element={<TherapistProfile />}/>
                <Route path="/dashboard/therapistDashboard/users" element={<TherapistDashboardUsers />}/>
                <Route path="/dashboard/therapistDashboard/addNewWorkDays" element={<TherapistAddNewWorkDays />}/>
                <Route path="/dashboard/therapistDashboard/history" element={<TherapistClientHistory />}/>
                <Route path="/dashboard/therapistDashboard/sendAdvice" element={<SendAdvice />} />
                <Route path="/dashboard/therapistDashboard/bookings" element={<TherapistBookings />}/>
                <Route path="/dashboard/therapistDashboard/bookings/editBooking" element={<TherapistBookingsEdit />}/>
                <Route path="/dashboard/therapistDashboard/feedbacks" element={<Feedbacks />}/>
            </Routes>
            {!isDashboard && <Footer />}
        </>
    );
}

function AppContent() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <>
            {!isDashboard ? <Main /> : <React.StrictMode><Main /></React.StrictMode>}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
