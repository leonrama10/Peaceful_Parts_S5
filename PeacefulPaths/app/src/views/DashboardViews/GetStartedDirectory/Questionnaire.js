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

       {questions[currentQuestion].answerMethod === "dropdown" && (
                   <div className="answer">
                       <select onChange={(event) => handleAnswerClick(event.target.value)}>
                           <option value="">Select an answer</option>
                           {questions[currentQuestion].answers.map(({ text }) => (
                               <option key={text} value={text}>{text}</option>
                           ))}
                       </select>
                   </div>
               )}

               {questions[currentQuestion].answerMethod === "button" && (
                   <div className="answer">
                       {questions[currentQuestion].answers.map(({ text, isCorrect }) => (
                           <button key={text} onClick={() => handleAnswerClick(isCorrect)}>
                               {text}
                           </button>
                       ))}
                   </div>
               )}
                </>
    );
};

export default Questionnaire;