import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.min.css';
import Questionnaire from "./Questionnaire";
import RegisterBoot from "../Login and register/RegisterBoot";
import "../../../css/QuestionnaireForm.css";
import {questionnaireAnswers} from "../../../api/authService";
import {authenticate, authFailure, authSuccess} from "../../../redux/authActions";
import {connect} from "react-redux";

function GetStarted({loading,error,...props}){

    const history = useNavigate ();
    const [selectedAnswer, setSelectedAnswer] = useState({
        therapyType: '',
        gender: null,
        age: null,
        identityType: '',
        relationshipStatus: '',
        therapyHistory: '',
        medicationHistory: '',
        communication: '',
        therapistGender: '',
        therapistType: '',
        currentPhysicalHealth: '',
        mentalState1: '',
        mentalState2: '',
        location: null,
        language: null
    });

    const questions = [
        {
            question: "What type of therapy are you looking for?",
            answers: [
                { text: "Individual (for myself)" },
                { text: "Couples (for myself and my partner)"},
                { text: "Teen (for my child)" },
            ],
            answerMethod: "button"  // kjo na tregon se jena tu e ba me button jo me drop down
        },
        {
            question: "What is your gender identity?",
            answers: [
                { text: "Man" },
                { text: "Woman"},
                { text: "Prefer not to say"},
            ],
            answerMethod: "button"
        },
        {
           question: "Select your age?",
           answers: [
                { text: "18"},
                { text: "19" },{ text: "20" },{ text: "21" },
                { text: "22" },{ text: "23" }, { text: "24" },
                { text: "25" },{ text: "26" },{ text: "27" },
                { text: "28" },{ text: "29" },{ text: "30" },
                { text: "31" },{ text: "32" },{ text: "33" },
                { text: "34" },{ text: "35" },{ text: "36" },
                { text: "37" },{ text: "38" },{ text: "39" },
                { text: "40" },{ text: "41" },{ text: "42" },
                { text: "43" },{ text: "44" },{ text: "45" },
                { text: "46" },{ text: "47" },{ text: "48" },
                { text: "49" },{ text: "50" },{ text: "51" },
                { text: "52" },{ text: "53" },{ text: "54" },
                { text: "55" },{ text: "56" },{ text: "57" },
                { text: "58" },{ text: "59" },{ text: "60" },
                { text: "61" },{ text: "62" },{ text: "63" },
                { text: "64" },{ text: "65" },{ text: "66" },
                { text: "67" },{ text: "68" },{ text: "69" },
                { text: "70" },{ text: "71" },{ text: "72" },
                { text: "73" },{ text: "74" },{ text: "75" },
                { text: "76" },{ text: "77" },{ text: "78" },
                { text: "79" },{ text: "80" },{ text: "81" },
                { text: "82" },{ text: "83" },{ text: "84" },
                { text: "85" },{ text: "86" },{ text: "87" },
                { text: "88" },{ text: "89" },{ text: "90" },
                { text: "91" },{ text: "92" },{ text: "93" },
                { text: "94" },{ text: "95" },{ text: "96" },
                { text: "97" },{ text: "98" },{ text: "99" },

             ],
             answerMethod: "dropdown"
        },
        {
            question: "How do you identify?",
            answers: [
                { text: "Straight" },
                { text: "Gay"},
                { text: "Lesbian" },
                { text: "Prefer not to say" },
            ],
            answerMethod: "button"
        },
        {
            question: "What is your relationship status?",
            answers: [
                { text: "Single"},
                { text: "In a relationship" },
                { text: "Married" },
                { text: "Divorced" },
            ],
            answerMethod: "button"
        },
        {
            question: "Have you ever been in therapy before?",
            answers: [
                { text: "Yes"},
                { text: "No" }
            ],
            answerMethod: "button"
        },
         {
           question: "Are you currently taking any medication?",
                    answers: [
                        { text: "Yes" },
                        { text: "No"},
                    ],
                    answerMethod: "button"
           },
        {
              question: "How do you prefer to communicate with your therapist?",
              answers: [
                { text: "Mostly via messaging" },
                { text: "Mostly via phone"},
                { text: "Video sessions" },
                { text: "Not sure yet (decide later)" },
               ],
               answerMethod: "button"
        },
                 {
                    question: "Are there any specific preferences for your therapist?",
                    answers: [
                       { text: "Male therapist"},
                       { text: "Female therapist" },
                     ],
                     answerMethod: "button"
                 },
                 {
                    question: "What are your expectations from your therapist? A therapist who...?",
                    answers: [
                        { text: "Listens"},
                        { text: "Explores my past" },
                        { text: "Teaches me new skills" },
                         { text: "I don't know" },
                      ],
                      answerMethod: "button"
                 },
                 {
                      question: "How would you rate your current physical health?",
                      answers: [
                         { text: "Good"},
                         { text: "Fair" },
                         { text: "Poor" },
                      ],
                      answerMethod: "button"
                 },

                 {
                   question: "How would you rate your current eating habits?",
                   answers: [
                       { text: "Good"},
                       { text: "Fair" },
                       { text: "Poor" },
                     ],
                   answerMethod: "button"
                 },

                 {
                   question: "Are you currently experiencing overwhelming sadness, grief, or depression?",
                   answers: [
                       { text: "Yes" },
                       { text: "No"},
                     ],
                   answerMethod: "button"
                 },

            {
               question: "Feeling down, depressed or hopeless.",
               answers: [
                  { text: "Not at all" },
                  { text: "Several days"},
                  { text: "More than half the days" },
                  { text: "Nearly every day" },
             ],
             answerMethod:  "button"
           },

           {
             question: "Are you currently experiencing anxiety, panic attacks or have any phobias?",
             answers: [
                 { text: "Yes" },
                 { text: "No"},
               ],
             answerMethod: "button"
           },

           {
              question: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down.",
                          answers: [
                             { text: "Not at all" },
                             { text: "Several days"},
                             { text: "More than half the days" },
                             { text: "Nearly every day" },
                        ],
              answerMethod:  "button"
           },

           {
              question: "How often do you drink alcohol?",
                          answers: [
                             { text: "Never" },
                             { text: "Infrequently"},
                             { text: "Monthly" },
                             { text: "Weekly" },
                             { text: "Daily" },
                        ],
              answerMethod:  "button"
           },

           {
                question: "Thoughts that you would be better off dead or of hurting yourself in some way.",
                answers: [
                   { text: "Not at all" },
                   { text: "Several days"},
                   { text: "More than half the days" },
                   { text: "Nearly every day" },
               ],
               answerMethod: "button"
           },
           {
               question: "Which country are you in?",
               answers: [
                   { text: "Kosovo"},
                   { text: "Albania" },
                   { text: "Montenegro" },
                   { text: "North Macedonia" },
                   { text: "Serbia" }
                ],
                       answerMethod: "dropdown"
           },
        {
            question: "What is your preferred language?",
            answers: [
                { text: "Albanian" },
                { text: "English"},
                { text: "Serbian" }
            ],
            answerMethod: "checkbox"
        }
    ];

    const genderToId = {
        'Man': 1,
        'Woman': 2,
        'Prefer not to say': 3,
    };

    const therapistGenderToId = {
        'Male therapist': 1,
        'Female therapist': 2
    };

    const locationToId = {
        'Kosovo': 1,
        'Albania': 2,
        'Montenegro': 3,
        'North Macedonia': 4,
        'Serbia': 5
    };

    const languageToId = {
        'Albanian': 1,
        'English': 2,
        'Serbian': 3
    };

    const therapyTypeToId = {
        'Individual (for myself)': 1,
        'Couples (for myself and my partner)': 2,
        'Teen (for my child)': 3
    };

    const identityTypeToId = {
        'Straight': 1,
        'Gay': 2,
        'Lesbian': 3,
        'Prefer not to say': 4
    };

    const therapistTypeToId = {
        'Listens': 1,
        'Explores my past': 2,
        'Teaches me new skills': 3,
        "I don't know": 4
    };

    const relationshipStatusToId = {
        'Single': 1,
        'In a relationship': 2,
        'Married': 3,
        "Divorced": 4
    };

    const therapyHistoryToId = {
        'Yes': 1,
        'No': 2
    };

    const medicationHistoryToId = {
        'Yes': 1,
        'No': 2
    };

    const communicationToId = {
        'Mostly via messaging': 1,
        'Mostly via phone': 2,
        'Video sessions': 3,
        'Not sure yet (decide later)': 4
    };

    const physicalHealthToId = {
        'Good': 1,
        'Fair': 2,
        'Poor': 3
    };

    const mentalState1ToId = {
        'Not at all': 1,
        'Several days': 2,
        'More than half the days': 3,
        'Nearly every day': 4
    };

    const mentalState2ToId = {
        'Not at all': 1,
        'Several days': 2,
        'More than half the days': 3,
        'Nearly every day': 4
    };


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [continueButton , setContinueButton] = useState(false);
    const [questionnaire, setQuestionnaire] = useState({});
    const [getStartedFinished, setGetStartedFinished] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const properties = ['therapyType', 'gender', 'age', 'identityType', 'relationshipStatus', 'therapyHistory', 'medicationHistory', 'communication', 'therapistGender', 'therapistType', 'physicalHealth', 'mentalState1', 'mentalState2', 'location', 'language'];
    // questionIndex >= questions.length
    React.useEffect(() => {
        if (continueButton) {
                questionnaireAnswers(selectedAnswer).then((response)=>{
                    if(response.status===200){
                        setQuestionnaire(response.data);
                        setGetStartedFinished(true)
                        setIsQuizOver(true);
                    }
                    else{
                        console.log('Something LEKAAAAAAA!Please Try Again');
                    }
                }).catch((err)=>{

                    if(err && err.response){

                        switch(err.response.status){
                            case 401:
                                console.log("401 status");
                                console.log("Authentication Failed.Bad Credentials");
                                break;
                            default:
                                console.log('Something BABAAAAAA!Please Try Again');
                        }
                    }
                    else{
                        console.log("ERROR: ",err)
                        console.log('Something NaNAAAAA!Please Try Again');
                    }
                });
        }
    }, [continueButton]);

    const handleAnswerClick = (answer) => {
        const property = properties[questionIndex];
        let value = answer;

        if (property === 'language') {
            setSelectedAnswer(prevAnswers => {
                const existingAnswers = prevAnswers[property] || [];
                const answerIndex = existingAnswers.findIndex(a => a.language === answer);

                if (answerIndex !== -1) {
                    // If the language is already selected, remove it
                    return {
                        ...prevAnswers,
                        [property]: [...existingAnswers.slice(0, answerIndex), ...existingAnswers.slice(answerIndex + 1)]
                    };
                } else {
                    // If the language is not selected, add it
                    return {
                        ...prevAnswers,
                        [property]: [...existingAnswers, { 'id': languageToId[answer], 'language': answer }]
                    };
                }
            });
        } else if (property === 'location') {
            value = { 'id': locationToId[answer], 'location': answer };
        }else if (property === 'gender') {
            value = { 'id': genderToId[answer], 'gender': answer };
        }else if (property === 'therapistGender') {
            value = { 'id': therapistGenderToId[answer], 'therapistGender': answer };
        }else if (property === 'therapyType') {
            value = { 'id': therapyTypeToId[answer], 'therapyType': answer };
        }else if (property === 'identityType') {
            value = { 'id': identityTypeToId[answer], 'identityType': answer };
        }else if (property === 'therapistType') {
            value = { 'id': therapistTypeToId[answer], 'therapistType': answer };
        }else if (property === 'relationshipStatus') {
            value = { 'id': relationshipStatusToId[answer], 'answer': answer };
        }else if (property === 'therapyHistory') {
            value = { 'id': therapyHistoryToId[answer], 'answer': answer };
        }else if (property === 'medicationHistory') {
            value = { 'id': medicationHistoryToId[answer], 'answer': answer };
        }else if (property === 'communication') {
            value = { 'id': communicationToId[answer], 'answer': answer };
        }else if (property === 'physicalHealth') {
            value = { 'id': physicalHealthToId[answer], 'answer': answer };
        }else if (property === 'mentalState1') {
            value = { 'id': mentalState1ToId[answer], 'answer': answer };
        }else if (property === 'mentalState2') {
            value = { 'id': mentalState2ToId[answer], 'answer': answer };
        }
        if (property !== 'language') {
            setSelectedAnswer(prevAnswers => ({...prevAnswers, [property]: value}));
        }

        if (property !== 'language') {
            setQuestionIndex(prevIndex => prevIndex + 1);
            const next = currentQuestion + 1;
            if (next < questions.length){
                setCurrentQuestion(next);
            }
        }
    }

    console.log("VALUESSSSSSSSSSSSSSSS",selectedAnswer)

    return (
        <main className="bg-gradient-primary">
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                                {isQuizOver ? (
                                    <RegisterBoot questionnaire={questionnaire} getStartedFinished={getStartedFinished}/>
                                ) : (
                                    <div className="QuestionnaireForm">
                                    <Questionnaire
                                        questions={questions}
                                        currentQuestion={currentQuestion}
                                        handleAnswerClick={handleAnswerClick}
                                        setContinueButton={setContinueButton}
                                    />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error
    }}
const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(GetStarted);