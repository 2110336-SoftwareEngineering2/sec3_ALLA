import React from 'react'
import './style.scss'
import {useHistory} from 'react-router-dom'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
export default function ResultCard(props) {
    const AuthState = useSelector((state) => state.Auth);
    const history= useHistory()
    let jobObj = {}
    if (props.jobObj) jobObj = props.jobObj
    const cardClickedHandler=()=>{
        console.log(jobObj)
        history.push(`/job/${jobObj.jid}`)
    }
    //Golf
    const isAccepted = props.isAccepted; //how?
    const rid = props.rid;
    async function answerRecordState(e, answer) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        await axios
            // .post(`http://127.0.0.1:8300/application-record`, {
            //         "yesFlag": answer
            //     }, {
            //         headers: {
            //             Authorization: "Bearer " + AuthState.token,
            //         }
            //     })
            .post(`http://127.0.0.1:8300/application-record/navigate/` + rid.toString(), {
                "yesFlag": answer 
            }, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                }
            })
            .then((response) => {
                alert("Sent Answer")
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function nextRecordState(e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        await axios
            
            .post(`http://127.0.0.1:8300/application-record/navigate/` + rid.toString(), {
            }, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                }
            })
            .then((response) => {
                alert("Sent Answer")
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    
    return (
        <div className="card-container d-flex p-2 justify-content-between" onClick={cardClickedHandler}>
            <div><img src={jobObj.companyPic_url || 'https://picsum.photos/201'} className="rounded-circle job-card-pic p-2" ></img></div>
            <div className="job-text-col ">
                <div> <h6>{jobObj.companyName}</h6></div>
                <div> <h4>{jobObj.jobTitle}</h4></div>
                <div> <h6>{jobObj.location}</h6></div>
            </div>

            <div className="job-text-col ">
                <div>{jobObj.minimumEducation}</div>
                <div> {jobObj.workingHours}</div>
                <div> {jobObj.salaryMin}-{jobObj.salaryMax}</div>
            </div>

            {isAccepted?
            <div>
                <div className="p-2"><h5>Congratulations</h5></div>
                <button 
                    onClick={(e) => {
                        answerRecordState(e,true)
                    }}
                  >
                    Accept
                </button>
                <text> {" "} </text>
                <button 
                    onClick={(e) => {
                        answerRecordState(e,false)
                    }}
                  >
                    Reject
                </button>
            </div>:
            <div>
            <div>Reject</div>
            <button
                onClick={(e) => {
                    nextRecordState(e)
                }}
              >
                OK
            </button>
        </div>
            }
            
        </div>
    )
}
