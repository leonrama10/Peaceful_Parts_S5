import React from 'react';

import '../css/Footer.css';

export default function Footer(){
    return (
        <footer className="footer">
                    <div className="footer-nav">
                        <a href="/home">Home</a>
                        <a href="/business">Business</a>
                        <a href="/about">About</a>
                        <a href="/faq">FAQ</a>
                        <a href="/reviews">Reviews</a>
                        <a href="/advice">Advice</a>
                        <a href="/careers">Careers</a>
                        <a href="/find-a-therapist">Find a Therapist</a>
                        <a href="/online-therapy">Online Therapy</a>
                        <a href="/contact">Contact</a>
                        <a href="/for-therapists">For Therapists</a>
                    </div>
                    <div className="social-media-icons">
                        <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.tiktok.com"><i className="fab fa-tiktok"></i></a>
                        <a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i></a>
                    </div>
                    <p>&copy; 2024 PeacefulPaths</p>
                </footer>
    )
}