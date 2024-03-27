import '../styles/App.css';
import Users from "./Users";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import {Account} from "./Account";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./DashboardViews/Dashboard";
import UserDashboard from "./DashboardViews/UserDashboard";
import AdminDashboard from "./DashboardViews/AdminDashboard";
import TherapistDashboard from "./DashboardViews/TherapistDashboard";
import LoginBoot from "./DashboardViews/LoginBoot";
import RegisterBoot from "./DashboardViews/RegisterBoot";
import ForgotPasswordBoot from "./DashboardViews/ForgotPasswordBoot";
import ErrorPage from "./DashboardViews/ErrorPage";
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
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/dashboard/userDashboard" element={<UserDashboard />}/>
                <Route path="/dashboard/adminDashboard" element={<AdminDashboard />}/>
                <Route path="/dashboard/therapistDashboard" element={<TherapistDashboard />}/>
                <Route path="/dashboard/errorPage" element={<ErrorPage />}/>
                <Route path="/users" element={<Users />}/>
                <Route path="/" element={<Home />}/>
                <Route path="/account" element={<Account />}/>
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
