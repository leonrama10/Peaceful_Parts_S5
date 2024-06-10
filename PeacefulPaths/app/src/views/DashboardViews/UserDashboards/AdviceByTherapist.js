import React, { useEffect, useState } from 'react';
import { fetchAdviceForUser } from '../../../api/authService';
import { loadState } from '../../../helper/sessionStorage';
import { useNavigate } from 'react-router-dom';
import './AdviceByTherapist.css';

export default function AdviceByTherapist() {
    const [adviceList, setAdviceList] = useState([]);
    const navigate = useNavigate();
    let userId = 0;

    useEffect(() => {
        userId = loadState("userId", 0);
        fetchAdviceForUser(userId).then(response => {
            setAdviceList(response.data);
        }).catch(error => {
            console.error('Error fetching advice', error);
        });
    }, [userId]);

    const handleBackClick = () => {
        navigate(-1);
    };

//    const formatDate = (dateString) => {
//        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//        const date = new Date(dateString);
//        if (isNaN(date)) {
//            return 'Invalid Date';
//        }
//        return date.toLocaleDateString(undefined, options);
//    };

    return (
        <main id="page-top">
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid advice-container">
                            <div className="header">
                                <div className="logo">
                                    <h1><span style={{ color: '#007CF4' }}>Peaceful</span>Parts</h1>
                                </div>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <button className="btn btn-secondary" onClick={handleBackClick}>Back</button>
                            </div>
                            <h2 className="text-center mb-4">Advice from Your Therapist</h2>
                            {adviceList.length > 0 ? (
                                <ul className="list-group">
                                    {adviceList.map((advice, index) => (
                                        <li key={index} className="list-group-item advice-item">
                                            <div className="advice-header d-flex justify-content-between align-items-center mb-2">

                                                <span className="badge bg-primary text-light">Therapist</span>
                                            </div>
                                            <p className="advice-text">{advice.advice}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center">
                                    <p>No advice available at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>&copy; 2024 PeacefulPaths</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </main>
    );
}
