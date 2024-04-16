import React from "react";
import "../../../css/Questionnaire.css";

const Questionnaire = ({ questions, currentQuestion, handleAnswerClick }) => {
    return (
        <>
            <div className="question">
                <div className="question-number">
          <span>
            Question {currentQuestion + 1} / {questions.length}
          </span>
                </div>
                <div className="question-text">
                    {questions[currentQuestion].question}
                </div>
            </div>

            <div className="answer">
                {questions[currentQuestion].answers.map(({ text, isCorrect }) => (
                    <button key={text} onClick={() => handleAnswerClick(isCorrect)}>
                        {text}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Questionnaire;