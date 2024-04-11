import React from 'react';
import { Link } from 'react-router-dom';
import {loadState} from "../helper/sessionStorage";
const loggedInState = loadState("loggedInState", false)
const role = loadState("role",'')

export default function Header(){

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [location, setLocation] = React.useState('');

    React.useEffect(()=>{
        if (loggedInState){
            setLoggedIn(l => true)
        }else {
            setLoggedIn(l => false)
        }
    },[])

    React.useEffect(()=>{
        if (role === 'ROLE_USER'){
            setLocation(l => l = '/userDashboard/profile')
        }else if (role === 'ROLE_THERAPIST'){
            setLocation(l => l = '/therapistDashboard')
        }else if(role === 'ROLE_ADMIN'){
            setLocation(l => l = '/adminDashboard')
        }
    },[])

    return (
        <header>
            <div className="logo">
                <h1><span style={{color: '#007CF4'}}>Peaceful</span>Parts</h1>
            </div>
            <nav>
                <Link to="/business">Business</Link>
                <Link to="/about">About</Link>
                <Link to="/advice">Advice</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/therapist-jobs">Therapist Jobs</Link>
                <Link to="/contact">Contact</Link>
                {loggedIn && <Link to={`/dashboard${location}`} className="btn costum-btn">Account</Link>}
                {!loggedIn && <Link to="/loginBoot" className="btn costum-btn">Login</Link>}
                {!loggedIn && <Link to="/get-started" className="btn costum-btn">Get Started</Link>}
            </nav>
        </header>
    )
}