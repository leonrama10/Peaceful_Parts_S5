import React from "react";
import "../../../css/Questionnaire.css";
import { Dropdown } from 'react-bootstrap';

const Questionnaire = ({ questions, currentQuestion, handleAnswerClick, setContinueButton }) => {
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
               <div className="answer" >
                   <select className={"dropdownGetStarted"}
                           onChange={(event) => handleAnswerClick(event.target.value)}>
                       <option value="">Select an answer</option>
                       {questions[currentQuestion].answers.map(({text}) => (
                           <option key={text} value={text}>{text}</option>
                       ))}
                   </select>
               </div>
           )}

            {questions[currentQuestion].answerMethod === "button" && (
                <div className="answer">
                    {questions[currentQuestion].answers.map(({text}) => (
                        <button key={text} onClick={() => handleAnswerClick(text)}>
                            {text}
                        </button>
                    ))}
                </div>
            )}

            {questions[currentQuestion].answerMethod === "checkbox" && (
                <div className="answer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'self-start', gap: '10px' ,paddingLeft:"220px",paddingRight:"300px"}}>
                    {questions[currentQuestion].answers.map(({text}) => (
                        <div key={text} className="customCheckbox">
                            <input type="checkbox" id={text} name={text} value={text} onChange={(event) => handleAnswerClick(event.target.value)} />
                            <label htmlFor={text} style={{fontSize:"16px"}}>{text}</label>
                        </div>
                    ))}
                    <button onClick={() => {
                        setContinueButton(true);
                    }} style={{ width:"100px"}}>Continue</button>
                </div>
            )}

        </>
    );

};

export default Questionnaire;