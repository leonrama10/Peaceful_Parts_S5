import '../css/App.css';
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import AdminDashboard from "./DashboardViews/AdminDashboard";
import AdminProfile from "./DashboardViews/AdminProfile";
import UserProfile from "./DashboardViews/UserProfile";
import AdminDashboardUsers from "./DashboardViews/AdminDashboardUsers";
import AdminDashboardTherapists from "./DashboardViews/AdminDashboardTherapists";
import AdminDashboardAdmin from "./DashboardViews/AdminDashboardAdmin";
import TherapistDashboard from "./DashboardViews/TherapistDashboard";
import LoginBoot from "./DashboardViews/LoginBoot";
import RegisterBoot from "./DashboardViews/RegisterBoot";
import ForgotPasswordBoot from "./DashboardViews/ForgotPasswordBoot";
import VerifyPasswordInfo from "./DashboardViews/VerifyPasswordInfo";
import PasswordResetView from "./DashboardViews/PasswordResetView";
import ErrorPage from "./DashboardViews/ErrorPage";
import EditUser from "./DashboardViews/EditUser";
import { useLocation } from 'react-router-dom';

function Main() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <>
            {!isDashboard && <Header />}
               <Routes>
                <Route path="/loginBoot" element={<LoginBoot />}/>
                <Route path="/registerBoot" element={<RegisterBoot />}/>
                <Route path="/forgotPassBoot" element={<ForgotPasswordBoot />}/>
                <Route path="/verifyPasswordInfo" element={<VerifyPasswordInfo />}/>
                <Route path="/passwordReset/:token" element={<PasswordResetView />}/>
                <Route path="/dashboard/userDashboard/profile" element={<UserProfile />}/>
                <Route path="/dashboard/adminDashboard" element={<AdminDashboard />}/>
                <Route path="/dashboard/adminDashboard/profile" element={<AdminProfile />}/>
                <Route path="/dashboard/adminDashboard/users" element={<AdminDashboardUsers />}/>
                <Route path="/dashboard/adminDashboard/therapists" element={<AdminDashboardTherapists />}/>
                <Route path="/dashboard/adminDashboard/admin" element={<AdminDashboardAdmin />}/>
                <Route path="/dashboard/adminDashboard/users/edit/:id" element={<EditUser />}/>
                <Route path="/dashboard/therapistDashboard" element={<TherapistDashboard />}/>
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
