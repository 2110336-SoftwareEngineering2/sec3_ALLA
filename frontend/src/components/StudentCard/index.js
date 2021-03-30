import React from 'react'
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
    //Golf On-progress & request
    const isOnprogresspage = props.isOnprogresspage;
    const rid = props.rid;
    function getUserlink() {
        //employers view student's profiles
    }
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
                alert("Sending answer")
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="card-container d-flex p-2 justify-content-between" onClick={cardClickedHandler}>
            <div><img src={jobObj.companyPic_url || 'https://picsum.photos/201'} className="rounded-circle job-card-pic p-2"></img></div>
            <div className="job-text-col p-2 ">
                <div> <h6>{jobObj.companyName}</h6></div>
                <div> <h4>{jobObj.jobTitle}</h4></div>
                <div> <h6>{jobObj.location}</h6></div>
            </div>

            {isOnprogresspage ?
                <div className="d-flex justify-content-between">
                    <div className="p-2"> working by </div>
                    <h6 className="p-2"><a href={URL}>{props.studentObj.firstName} {props.studentObj.lastName}</a></h6>
                </div> :
                <div className="d-flex justify-content-between">
                    <div className="d-flex" >
                        <div className="p-2"> Requested by </div>
                        <h6 className="p-2"><a href={URL}>{props.studentObj.firstName} {props.studentObj.lastName}</a></h6>
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
}
