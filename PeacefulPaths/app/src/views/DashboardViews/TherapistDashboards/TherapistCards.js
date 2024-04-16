import React, { useState } from 'react';
import {Link} from "react-router-dom";

export default function TherapistCards (props) {
    const [showDetails, setShowDetails] = useState(false);

    const handleCardClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className={`card ${showDetails ? 'expanded' : ''}`} onClick={handleCardClick}>
            <h3>{props.title}</h3>
            {showDetails && <p>Additional information about {props.title} goes here.</p>}
            <Link to={`/dashboard/userDashboard/therapistInfo/${props.id}`}>Learn More</Link>
        </div>
    );
};