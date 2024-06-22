import React from 'react';
import {useNavigate} from "react-router-dom";
import '../../../css/therapistCards.css';
import {loadState, saveState} from "../../../helper/sessionStorage";
import malePhoto from "../../../img/Depositphotos_484354208_S.jpg"
import femalePhoto from "../../../img/person-gray-photo-placeholder-woman-600nw-1241538838.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {removeTherapist, userTherapistConnection} from "../../../api/authService";
let myTherapistInfoId = 0
export default function TherapistCards (props) {
    const history = useNavigate ();
    function learnMore(){
        saveState("therapistInfoId",props.id)
        history('/dashboard/userDashboard/therapistInfo')
    }
    myTherapistInfoId = loadState("myTherapistInfoId",0)

    const handleConnectedConnection = (e) => {
        e.preventDefault();
        myTherapistInfoId = loadState("myTherapistInfoId",0)

        if (!window.confirm("You are already connected with another therapist!\n" +
            "Are you sure you want to connect with another therapist?")) {
            return;  // If user clicks 'Cancel', stop the function here
        }

        removeTherapist(props.userId).then((response)=>{
            if(response.status===200){
                saveState("connected/id:"+myTherapistInfoId,false)
                userTherapistConnection({userId:props.userId,therapistId:props.id}).then((response)=>{
                    if(response.status===201){
                        saveState("connected",true)
                        saveState("connected/id:"+props.id,true)
                        saveState("myTherapistInfoId",props.id)
                        history("/dashboard/userDashboard/myTherapistInfo")
                    }
                    else{
                        props.connectionFailure('Something LEKAAAAAAA!Please Try Again');
                    }

                }).catch((err)=>{

                    if(err && err.response){

                        switch(err.response.status){
                            case 401:
                                console.log("401 status");
                                props.connectionFailure("U cant have two therapists at the same time!!!");
                                break;
                            default:
                                props.connectionFailure('Something BABAAAAAA!Please Try Again');
                        }
                    }
                    else{
                        console.log("ERROR: ",err)
                        props.connectionFailure('Something NaNAAAAA!Please Try Again');
                    }

                });
            } else{
                history('/loginBoot');
            }
        }).catch((err)=>{
            history('/loginBoot');
        });
    };

    const handleConnection = (e) => {
        e.preventDefault();

        userTherapistConnection({userId:props.userId,therapistId:props.id}).then((response)=>{
            if(response.status===201){
                saveState("connected",true)
                saveState("connected/id:"+props.id,true)
                saveState("myTherapistInfoId",props.id)
                history("/dashboard/userDashboard/myTherapistInfo")
            }
            else{
                // props.loginFailure('Something LEKAAAAAAA!Please Try Again');
            }
        }).catch((err)=>{
            if(err && err.response){
                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        // props.loginFailure("U cant have two therapists at the same time!!!");
                        break;
                    default:
                        // props.loginFailure('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                // props.loginFailure('Something NaNAAAAA!Please Try Again');
            }
        });
    };

    return (
        <div className={`therapist-card`}>
            {props.gender.gender === "M" ? <img src={malePhoto} alt={"Photo"}/> :
                <img src={femalePhoto} alt={"Photo"}/>}
            <h3>{props.title}</h3>
            <p>Therapist</p>
            {props.connected && <i style={{textAlign:"center",color:"#d6d6d6"}}>You are already connected with another therapist!!!</i>}
            <div className={"therapistCardButton"}>
                {props.connected ?
                    <button onClick={handleConnectedConnection}
                            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faUserPlus}/>
                        <span>Connect</span>
                    </button> :
                    <button onClick={handleConnection}
                            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faUserPlus}/>
                        <span>Connect</span>
                    </button>
                }
                    <button style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                onClick={learnMore}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                <span>More</span>
            </button>
            </div>
        </div>
    );
};