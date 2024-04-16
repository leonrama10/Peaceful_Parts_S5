import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.min.css';
import Questionnaire from "./Questionnaire";
import ScoreView from "./ScoreView";
import "../../../css/QuestionnaireForm.css";
export default function GetStarted({loading,error,...props}){

    const history = useNavigate ();

    const questions = [
        {
            question: "Total number of oceans in the World is",
            answers: [{ text: "7" }, { text: "6" }, { text: "5", isCorrect: true }],
        },
        {
            question: "Who is CEO of Tesla?",
            answers: [
                { text: "Jeff Bezos" },
                { text: "Elon Musk", isCorrect: true },
                { text: "Bill Gates" },
                { text: "Tony Stark" },
            ],
        },
        {
            question: "Where is Statue of Liberty is located?",
            answers: [
                { text: "India" },
                { text: "Russia" },
                { text: "UK" },
                { text: "USA", isCorrect: true },
            ],
        },
        {
            question: "What is the capital of Germany?",
            answers: [
                { text: "Paris" },
                { text: "Berlin", isCorrect: true },
                { text: "London" },
                { text: "Dublin" },
            ],
        },
        {
            question: "Which one is the largest tropical rain forest in the world?",
            answers: [
                { text: "Amazon", isCorrect: true },
                { text: "Bosawas" },
                { text: "Southeast Asian Rain Forest" },
                { text: "Daintree Rain Forest" },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerClick = (isCorrect) => {
        // check score
        if (isCorrect) setScore(score + 1);

        const next = currentQuestion + 1;
        if (next < questions.length) setCurrentQuestion(next);
        else setIsQuizOver(true);
    };

    const handleResetClick = () => {
        // fix: score not resetting
        setScore(0);

        setCurrentQuestion(0);
        setIsQuizOver(false);
    };

    return (
        <main className="bg-gradient-primary">
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="QuestionnaireForm">
                                {isQuizOver ? (
                                    <ScoreView handleResetClick={handleResetClick} score={score}/>
                                ) : (
                                    <Questionnaire
                                        questions={questions}
                                        currentQuestion={currentQuestion}
                                        handleAnswerClick={handleAnswerClick}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

