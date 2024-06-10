import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderForAdvice.css';

export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <h1><span style={{color: '#007CF4'}}>Peaceful</span>Parts</h1>
            </div>
        </header>
    );
}
