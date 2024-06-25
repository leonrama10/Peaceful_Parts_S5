import React from 'react';

import '../css/Footer.css';
import {Link, useLocation} from "react-router-dom";

export default function Footer(){
    const location = useLocation();
    const isLogin = location.pathname.startsWith('/loginBoot') || location.pathname.startsWith('/get-started') || location.pathname.startsWith('/forgotPassBoot')  || location.pathname.startsWith('/verifyPasswordInfo') || location.pathname.startsWith('/passwordReset');

    return (
        <footer className={isLogin?"isLoginFooter":"footer"}>
            <div className={isLogin?"isLoginFooterNav":"footer-nav"}>
                <Link to="/">Home</Link>
                {/*<a href="/business">Business</a>*/}
                {/*<a href="/about">About</a>*/}
                {/*<a href="/faq">FAQ</a>*/}
                {/*<a href="/reviews">Reviews</a>*/}
                {/*<a href="/advice">Advice</a>*/}
                {/*<a href="/careers">Careers</a>*/}
                <Link to="/get-started">Find a Therapist</Link>

                {/*<a href="/contact">Contact</a>*/}
                {/*<a href="/for-therapists">For Therapists</a>*/}
            </div>
            <div className={isLogin?"isLoginSocial":"social-media-icons"}>
                <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                <a href="https://www.tiktok.com"><i className="fab fa-tiktok"></i></a>
                <a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a>
                <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i></a>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <p style={{textDecoration: "underline", marginRight:"15px"}}>contact@peacefulparts.com</p>
                <p>&copy; 2024 PeacefulParts</p>
            </div>
        </footer>
    )
}