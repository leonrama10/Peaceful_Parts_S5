import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadState } from "../helper/sessionStorage";
import '../css/Header.css';

const loggedInState = loadState("loggedInState", false);
const role = loadState("role", '');

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [location, setLocation] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const locationn = useLocation();
    const isGetStarted = locationn.pathname.startsWith('/get-started');

    useEffect(() => {
        if (loggedInState) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (role === 'ROLE_USER') {
            setLocation('/userDashboard');
        } else if (role === 'ROLE_THERAPIST') {
            setLocation('/therapistDashboard');
        } else if (role === 'ROLE_ADMIN') {
            setLocation('/adminDashboard');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            <div className="logo">
                <h1><span style={{color: '#007CF4'}}>Peaceful</span>Parts</h1>
            </div>
            <nav>
                <Link className="linku-i-pare" to="/business">Business</Link>
                <Link to="/about">About</Link>
                <Link to="/advice">Advice</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/therapist-jobs">Therapist Jobs</Link>
                <Link to="/contact">Contact</Link>
                {loggedIn && <Link to={`/dashboard${location}`} className="btn costum-btn">Account</Link>}
                {!loggedIn && <Link to="/loginBoot" className="btn costum-btn">Login</Link>}
                {!isGetStarted && !loggedIn && <Link to="/get-started" className="btn costum-btn">Get Started</Link>}
            </nav>
        </header>
    );
}