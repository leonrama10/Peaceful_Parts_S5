import React from 'react';
import '../../css/Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-animation">
                <div className="loading-logo" style={{color:"#007cf4"}}>Peaceful<span style={{color:"white"}}>Parts</span></div>
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default Loading;