import React, {useEffect, useState} from 'react';
import {fetchUserData, fetchWorkDays, fetchWorkHours, selectWorkDays} from '../../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../../redux/authActions";
import {loadState, saveState} from "../../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../../DashboardNav";
import {jwtDecode} from "jwt-decode";
import SideBarAdmin from "../../SideBars/SideBarAdmin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {getTrackBackground, Range} from "react-range";
const getRefreshToken = () => {
    const token = localStorage.getItem('REFRESH_TOKEN');

    if (!token || token==="null") {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        return null;
    } else {
        return token;
    }
}
const getAccessToken = () => {
    const token = localStorage.getItem('USER_KEY');

    if (!token || token==="null") {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        return null;
    } else {
        return token;
    }
}
let editTherapistWorkDaysFullName = null
function EditTherapistWorkDays({loading,error,...props}){

    const STEP = 1;
    const MIN = 0;
    const MAX = 23;
    const [rangeValues, setRangeValues] = useState([MIN, MAX]);
    const history = useNavigate ();
    const [userData,setUserData]=useState({});
    const [values, setValues] = useState({
        therapistId: 0,
        days: [],
        workhours: [],
        startTime: '',
        endTime: ''
    });

    useEffect(() => {
        let editTherapistId = loadState("editTherapistId", 0);
        editTherapistWorkDaysFullName = loadState("editTherapistWorkDaysFullName", null);
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                    setUserData(response.data);
                    saveState("role",'ROLE_ADMIN')

                    fetchWorkDays({therapistId: editTherapistId}).then((response) => {
                        if (response.data.length > 0) {
                            const workDays = response.data

                            fetchWorkHours({therapistId: editTherapistId}).then((response) => {
                                if (response.data.length > 0) {

                                    setValues({
                                        startTime: response.data[0].hour,
                                        endTime: response.data[response.data.length - 1].hour,
                                        therapistId: editTherapistId,
                                        days: workDays,
                                        workhours: response.data
                                    })

                                    setRangeValues([response.data[0].hour[0],response.data[response.data.length - 1].hour[0]])
                                }
                            }).catch((e) => {
                                localStorage.clear();
                                history('/loginBoot');
                            })
                        }
                    }).catch((e) => {
                        localStorage.clear();
                        history('/loginBoot');
                    })
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                localStorage.clear();
                history('/loginBoot');
            })
        }else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                    setUserData(response.data);
                    saveState("role",'ROLE_ADMIN')

                    fetchWorkDays({therapistId: editTherapistId}).then((response) => {
                        if (response.data.length > 0) {
                            const workDays = response.data

                            fetchWorkHours({therapistId: editTherapistId}).then((response) => {
                                if (response.data.length > 0) {

                                    setValues({
                                        startTime: response.data[0].hour,
                                        endTime: response.data[response.data.length - 1].hour,
                                        therapistId: editTherapistId,
                                        days: workDays,
                                        workhours: response.data
                                    })

                                    setRangeValues([response.data[0].hour[0],response.data[response.data.length - 1].hour[0]])
                                }
                            }).catch((e) => {
                                localStorage.clear();
                                history('/loginBoot');
                            })
                        }
                    }).catch((e) => {
                        localStorage.clear();
                        history('/loginBoot');
                    })
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                localStorage.clear();
                history('/loginBoot');
            })
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);


    const dayToNumber = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    };


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        if (type === 'checkbox') {
            // Create a new array from the current day values
            let newDaysArray = [...values.days];

            // Find the index of the day object in the array
            const dayIndex = newDaysArray.findIndex(day => day.day === value);

            if (checked && dayIndex === -1) {
                // If the checkbox is checked and the day isn't in the array, add the new day object
                newDaysArray.push({ id: dayToNumber[value], day: value });
            } else if (!checked && dayIndex !== -1) {
                // If the checkbox is unchecked and the day is in the array, remove the day object
                newDaysArray = newDaysArray.filter(day => day.day !== value);
            }

            // Update the state with the new array
            setValues(values => ({ ...values, [name]: newDaysArray }));
        } else {
            // Handle other inputs like before
            setValues(values => ({ ...values, [name]: value }));
        }
    };

    React.useEffect(() => {
        console.log("VALUESSSSSSSSS",values)
    }, [values])

    function handleSubmit(evt) {
        evt.preventDefault();

        selectWorkDays(values).then((response) => {
            window.location.reload();
        }).catch((err) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something BABAAAAAA!Please Try Again');

                }
            } else {
                console.log("ERROR: ", err)
                props.loginFailure('Something NaNAAAAA!Please Try Again');
            }
        });
    }

    const formatTime = (timeArray) => {
        const hours = timeArray[0];
        const mins = timeArray[1];
        return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
    };

    return (
        <main id="page-top" style={{height: '100%'}}>
            <div id="wrapper">
                <SideBarAdmin/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <DashboardNav data={userData} setUser={props.setUser}/>
                        <div
                            style={{marginLeft: "10px", display: "flex", flexDirection: "column", alignItems: "start"}}>
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/adminDashboard/therapists"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Therapists
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>{editTherapistWorkDaysFullName}'s Work Days</h1>
                            </div>
                        </div>

                        <div style={{
                            marginBottom: '100px', display: "flex",
                            justifyContent: "space-evenly", textAlign: "center"
                        }}>
                            {/*{workDays.length > 0 && <div style={{marginBottom: '100px'}}>*/}
                            {/*    <h4>Work Days:</h4>*/}
                            {/*    {workDays.length > 0 && workDays.map((workDay, index) => {*/}
                            {/*        // Access the day property from the workDay object*/}
                            {/*        const day = workDay.day;*/}

                            {/*        // Return a paragraph element with the day*/}
                            {/*        return (*/}
                            {/*            <p key={index}>{day}</p>*/}
                            {/*        );*/}
                            {/*    })}*/}
                            {/*    <br/>*/}
                            {/*    <h4>From:</h4>*/}
                            {/*    <p>{formatTime(workHours.startTime)}</p>*/}

                            {/*    <br/>*/}
                            {/*    <h4>To:</h4>*/}
                            {/*    <p>{formatTime(workHours.endTime)}</p>*/}
                            {/*</div>}*/}
                            <div className={"card shadow"} style={{
                                height: "550px",
                                width: "550px",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "left",
                                padding: "10px"
                            }}>
                                <label htmlFor="days" style={{
                                    fontSize: "25px",
                                    color: "#5a5c69",
                                    paddingTop: "5px",
                                    paddingLeft: "10px"
                                }}>Update work days and
                                    hours</label>
                                <form onSubmit={handleSubmit}
                                      style={{display: "flex", flexDirection: "column", padding: "30px"}}>
                                    <input type="hidden" name="therapistId" value={values.therapistId}/>

                                    <div style={{display: "flex", textAlign: "left", color: "#5a5c69"}}>
                                        <label>Days of Week</label>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                                            <div key={day} className="checkbox-container">
                                                <input
                                                    type="checkbox"
                                                    id={day}
                                                    name="days"
                                                    value={day}
                                                    checked={values.days.some(dayObj => dayObj.day === day)}
                                                    onChange={handleChange}
                                                    className="checkbox-custom"
                                                />
                                                <label htmlFor={day} className="checkbox-label">{day[0]}</label>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="time-picker-container">
                                        <div style={{
                                            display: "flex",
                                            textAlign: "left",
                                            color: "#5a5c69",
                                            paddingTop: "30px"
                                        }}>
                                            <label>Time of day</label>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
                                                margin: '2em'
                                            }}
                                        >
                                            <output style={{
                                                fontFamily: 'Arial, sans-serif',
                                                fontSize: '16px',
                                                color: "#0d6efd",
                                                marginBottom: "10px",
                                                marginTop: "-10px"
                                            }}>
                                                <span style={{
                                                    border: "1px solid grey",
                                                    padding: "5px",
                                                    borderRadius: "5px"
                                                }}>
                                                    {formatTime(values.startTime)}
                                                </span>
                                                <span> - </span>
                                                <span style={{
                                                    border: "1px solid grey",
                                                    padding: "5px",
                                                    borderRadius: "5px"
                                                }}>
                                                    {formatTime(values.endTime)}
                                                </span>
                                            </output>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                alignItems: "center"
                                            }}>
                                                <span style={{
                                                    marginRight: "21px",
                                                    marginLeft: "-35px",
                                                    color: "#5a5c69"
                                                }}>00:00</span>
                                                <Range
                                                    values={rangeValues}
                                                    step={STEP}
                                                    min={MIN}
                                                    max={MAX}
                                                    onChange={(newRangeValues) => {
                                                        setRangeValues(newRangeValues);
                                                        const [start, end] = newRangeValues;
                                                        const startTime = [start, 0]; // Assuming start is the hour and 0 is the minute
                                                        const endTime = [end, 0];
                                                        const workhours = [];

                                                        for (let i = startTime[0]; i <= endTime[0]; i++) {
                                                            const hourArray = i < 10 ? [i, 0] : [i, 0]; // Format as array [hour, minute]
                                                            workhours.push({id: i, hour: hourArray});
                                                        }

                                                        setValues(values => ({
                                                            ...values,
                                                            'workhours': workhours,
                                                            startTime,
                                                            endTime
                                                        }));
                                                    }}
                                                    renderTrack={({props, children}) => (
                                                        <div
                                                            onMouseDown={props.onMouseDown}
                                                            onTouchStart={props.onTouchStart}
                                                            style={{
                                                                ...props.style,
                                                                height: '36px',
                                                                display: 'flex',
                                                                width: '100%'
                                                            }}
                                                        >
                                                            <div
                                                                ref={props.ref}
                                                                style={{
                                                                    height: '8px',
                                                                    width: '100%',
                                                                    borderRadius: '4px',
                                                                    background: getTrackBackground({
                                                                        values: rangeValues,
                                                                        colors: ['#ccc', '#548BF4', '#ccc'],
                                                                        min: MIN,
                                                                        max: MAX
                                                                    }),
                                                                    alignSelf: 'center'
                                                                }}
                                                            >
                                                                {children}
                                                            </div>
                                                        </div>
                                                    )}
                                                    renderThumb={({props, isDragged}) => (
                                                        <div
                                                            {...props}
                                                            style={{
                                                                ...props.style,
                                                                height: '30px',
                                                                width: '40px',
                                                                borderRadius: '4px',
                                                                backgroundColor: '#FFF',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                boxShadow: '0px 2px 6px #AAA'
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    height: '16px',
                                                                    width: '5px',
                                                                    backgroundColor: isDragged ? '#548BF4' : '#CCC'
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                <span style={{
                                                    marginLeft: "21px",
                                                    marginRight: "-35px",
                                                    color: "#5a5c69"
                                                }}>23:00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingTop: "80px"
                                    }}>
                                        <button type="submit" className="btn btn-primary btn-user btn-block"
                                                style={{width: '20%'}}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTherapistWorkDays);