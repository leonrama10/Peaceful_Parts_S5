import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
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
                {/* You'll need to replace the following lines with your own authentication logic */}
                <Link to="/users" className="btn costum-btn">Manage Users</Link>
                <Link to="/account" className="btn costum-btn">Account</Link>
                <Link to="/login" className="btn costum-btn">Login</Link>
                <Link to="/get-started" className="btn costum-btn">Get Started</Link>
            </nav>
        </header>
    )
}