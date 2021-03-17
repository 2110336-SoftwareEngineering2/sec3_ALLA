import React from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
export default function ResponseCard(props) {
    const AuthState = useSelector((state) => state.Auth);
    const history = useHistory()
    let jobObj = {}
    if (props.jobObj) jobObj = props.jobObj
    const cardClickedHandler = () => {
        history.push(`/job/${jobObj.Jid}`)
    }
    //Golf
    const rid = props.rid;
    const isAccepted = props.isAccepted;
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
                alert("Clicked")
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

            {isAccepted ? <div>Accepted by</div> : <div>Rejected by</div>}

            <a href={URL}>{props.studentObj.firstName} {props.studentObj.lastName}</a>

            <button
                onClick={(e) => {
                    nextRecordState(e)
                }}
            >
                OK
            </button>
        </div>
    )
}
