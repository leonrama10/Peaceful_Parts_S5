import React from "react";
import "../../../css/ScoreView.css";

const ScoreView = ({ handleResetClick, score }) => {
    return (
        <div>
//            <p>You scored {score} out of 5</p>
              <p>You have to register</p>
            <button onClick={handleResetClick}>Register</button>
        </div>
    );
};

export default ScoreView;