import React, { useState } from 'react';
import {Link} from "react-router-dom";
import '../../../css/therapistCards.css';

export default function TherapistCards (props) {
    const [showDetails, setShowDetails] = useState(false);

    const handleCardClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className={`therapist-card expanded`}>
                    <h3>{props.title}</h3>
                    <div className="therapist-personal">
                        <p><span style={{fontWeight: 'bold'}}>Email:</span> {props.email}</p>
                        <p><span style={{fontWeight: 'bold'}}>Experience:</span> {props.experience}</p>
                        <p><span style={{fontWeight: 'bold'}}>Number:</span> {props.number}</p>
                        <p><Link to={`/dashboard/userDashboard/therapistInfo/${props.id}`}>Learn More About Therapist</Link></p>
                    </div>

                </div>
    );
};