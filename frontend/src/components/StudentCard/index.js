import React, { useState } from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
export default function JobCard(props) {
    const history = useHistory()
    let jobObj = {}
    if (props.jobObj) jobObj = props.jobObj
    const cardClickedHandler = () => {
        history.push(`/job/${jobObj.jid}`)
    }
    const AuthState = useSelector((state) => state.Auth);
    const cid = props.cid;
    var rating = ""

    //NEED API!!!!!!!!!!!!!!!
    const startDate = props.startDate
    const timeLeft = props.timeLeft
    const status = props.status
    function ratingHandler(e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        var popup = prompt("Please rate the student's performance (0-5)", "Rating (number range 0-5)");
        if (popup != null) {
            popup = parseFloat(popup);
            //console.log(typeof popup,popup,isNaN(popup) || popup<0 || popup>5,"isNaN(popup) || popup<0 || popup>5")
            if (isNaN(popup) || popup < 0 || popup > 5) alert("Incorrect format (must be a number from 0 to 5)");
            else {
                rating = popup;
                jobSubmithandler(e, true, rating);
            }
        }
    }

    function showOntab(){
        return (status=="DOING" || status=="SUBMITTED" || status=="RESIGN_REQ")
    }

    async function submitresignJobapi(e, request) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        await axios
            .post(`http://localhost:8300/contract/navigate/` + cid.toString(), {
                "request": request
            }, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                }
            })
            .then((response) => {
                alert("Request sent!")
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function jobSubmithandler(e, answer, rating) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        await axios
            .post(`http://localhost:8300/contract/navigate/` + cid.toString(), {
                "cid":cid,
                "yesFlag": answer,
                "rate": rating,
                "comment": "aa"
            }, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                }
            })
            .then((response) => {
                if (answer) alert("Submission accepted!")
                else alert("Submission rejected!")
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function jobResignhandler(e, answer) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        await axios
            .post(`http://localhost:8300/contract/navigate/` + cid.toString(), {
                "yesFlag": answer
            }, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                }
            })
            .then((response) => {
                if (answer) alert("Resignation completed!")
                else alert("Resignation cancelled!")
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //Golf On-progress & request
    const isOnprogresspage = props.isOnprogresspage;
    const isStudent = props.isStudent;
    const rid = props.rid;
    async function answerRecordState(e, answer) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        await axios
            .post(`http://127.0.0.1:8300/application-record/navigate/` + rid.toString(), {
                "yesFlag": answer
            }, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                }
            })
            .then((response) => {
                alert("Sending answer")
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    function getJobStatus() {
        switch (status){
            case "DOING":
                return(
                    <div> status : WORKING </div>
                )
            case "DONE":
                return(
                    <div> status : FINISHED </div>
                )
            case "RESIGNED":
                return(
                    <div> status : RESIGNED </div>
                )
            case "TIMEOUT":
                return(
                    <div> status : TIMEOUT </div>
                )
            case "SUBMITTED":
                return(
                    <div> status : SUBMITTED </div>
                )
            case "RESIGN_REQ":
                return(
                    <div> status : RESIGN REQUEST </div>
                )
            default:
                return
                    <div> status : undefined </div>;
        }
       
    }

    const getStudentButton = () => {
        switch (status) {
            case "DOING":
                return <div className="job-text-col">
                    <button
                        onClick={(e) => {
                            submitresignJobapi(e, "resign")
                        }}
                    >
                        Resign
                    </button>
                    <text> {" "} </text>
                    <button
                        onClick={(e) => {
                            submitresignJobapi(e, "submit")
                        }}
                    >
                        Submit
                    </button>
                </div>
            default:
                return <div>
                </div>;
        }
    }
    const getEmployerButton = () => {
        switch (status) {
            case "SUBMITTED":
                return <div className="d-flex justify-content-between">
                    {/* <input 
                        type="number" 
                        min="0" 
                        max="5"
                        onChange={(e) => setRating(e.target.value)}
                        placeholder={rating}
                    >
                    </input> */}
                    <button
                        onClick={(e) => {
                            ratingHandler(e)
                        }}
                    >
                        Accept
                    </button>
                    <text> {" "} </text>
                    <button
                        onClick={(e) => {
                            jobSubmithandler(e, false,"")
                        }}
                    >
                        Reject
                    </button>
                </div>
            case "RESIGN_REQ":
                return <div>
                    <button
                        onClick={(e) => {
                            jobResignhandler(e, true)
                        }}
                    >
                        Accept
                    </button>
                    <text> {" "} </text>
                    <button
                        onClick={(e) => {
                            jobResignhandler(e, false)
                        }}
                    >
                        Reject
                    </button>
                </div>
            default:
                return <div>
                </div>;
        }
    }

    const showOnOnprogressTab = isOnprogresspage && showOntab()

    if (showOntab()) return (
        <div className="card-container d-flex p-2 justify-content-between" onClick={cardClickedHandler}>
            <div><img src={jobObj.companyPic_url || `https://picsum.photos/${(200 + (jobObj.jid % 30)).toString()}`} className="rounded-circle job-card-pic p-2"></img></div>
            <div className="job-text-col p-2 ">
                <div> <h6>{jobObj.companyName}</h6></div>
                <div> <h4>{jobObj.jobTitle}</h4></div>
                <div> <h6>{jobObj.location}</h6></div>
            </div>

            {isOnprogresspage ?
                <div className="job-text-col p-2">
                    <div> start date: <h6>{startDate}</h6></div>
                    <div> time left: <h6>{timeLeft} day(s)</h6></div>
                </div> : <></>
            }

            {(isOnprogresspage)? 
                <div className="d-flex justify-content-between">
                    <div className="job-text-col">
                        <div className="d-flex justify-content-between">
                            <div className="p-2"> by </div>
                            <h6 className="p-2"><a href={`/profile/${props.studentObj.id}`}>{props.studentObj.firstName} {props.studentObj.lastName}</a></h6>
                        </div>
                        {getJobStatus()}
                        {/* {showOntab() ? <>yes</>:<>no</>} */}
                        <div className="mt-1">
                            {isStudent ?
                                <>{getStudentButton()}</> :
                                <>{getEmployerButton()}</>
                            }
                        </div>
                    </div>
                </div> :
                <div className="d-flex justify-content-between">
                    <div className="d-flex" >
                        <div className="p-2"> Requested by </div>
                        <h6 className="p-2"><a href={`/profile/${props.studentObj.id}`}>{props.studentObj.firstName} {props.studentObj.lastName}</a></h6>
                    </div>
                    <div className="job-text-col">
                        <button
                            onClick={(e) => {
                                answerRecordState(e, true)
                            }}
                        >
                            Accept
                        </button>
                        <text> {" "} </text>
                        <button
                            onClick={(e) => {
                                answerRecordState(e, false)
                            }}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            }

        </div>
    )
    else return <></>
}
