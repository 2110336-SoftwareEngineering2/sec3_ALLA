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
            <div><img src={jobObj.companyPic_url} className="rounded-circle job-card-pic p-2"></img></div>
            <div className="job-text-col ">
                <div>{jobObj.jobTitle}</div>
                <div> {jobObj.companyName}</div>
                <div> {jobObj.location}</div>
            </div>

            <div className="job-text-col ">
                <div>{jobObj.minEducation}</div>
                <div> {jobObj.workingHours}</div>
                <div> {jobObj.salaryMin}-{jobObj.salaryMax}</div>
            </div>

            {isAccepted?
            <div>
                <div>Congratulations</div>
                <button
                    onClick={(e) => {
                        answerRecordState(e,true)
                    }}
                  >
                    Accept
                </button>
                <button
                    onClick={(e) => {
                        answerRecordState(e,false)
                    }}
                  >
                    reject
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
