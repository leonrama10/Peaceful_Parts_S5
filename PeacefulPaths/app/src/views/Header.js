import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../css/Header.css';

export default function Header(){
    const location = useLocation();
    const isLogin = location.pathname.startsWith('/loginBoot') || location.pathname.startsWith('/get-started');
    const [scrolled, setScrolled] = useState(false);

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
        <header className={isLogin?'isLoginHeader':scrolled ? 'scrolled' : ''}>
            <div className={"logo"}>
                <h1 className={isLogin &&  "isLoginLogo"}><span style={{color:"#007cf4"}}>Peaceful</span>Parts</h1>
            </div>
            <nav style={{display: 'flex', alignItems: 'center'}}>
                {isLogin && <Link to="/" className="homeButton">Home</Link>}
                <Link to="/loginBoot">
                    <button className={isLogin?'isLoginHeaderGetStartedButton':"headerGetStartedButton"}>Login</button>
                </Link>
                <Link to="/get-started">
                    <button className="loginButton">Get Started</button>
                </Link>
            </nav>
        </header>
    )
}