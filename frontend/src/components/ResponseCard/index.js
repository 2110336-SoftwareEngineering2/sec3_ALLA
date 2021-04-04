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
        history.push(`/job/${jobObj.jid}`)
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
                console.log("Clicked");
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="card-container d-flex p-2 justify-content-between" onClick={cardClickedHandler}>
            <div><img src={jobObj.companyPic_url || `https://picsum.photos/${(200+(jobObj.jid %30)).toString()}`} className="rounded-circle job-card-pic p-2" ></img></div>
            <div className="job-text-col ">
                <div> <h6>{jobObj.companyName}</h6></div>
                <div> <h4>{jobObj.jobTitle}</h4></div>
                <div> <h6>{jobObj.location}</h6></div>
            </div>
            
            {isAccepted ? <div className="p-3">Accepted by</div> : <div className="p-2">Rejected by</div>}
            <div className="job-text-col p-2">
            <h6 className="p-2"><a href={URL}>{props.studentObj.firstName} {props.studentObj.lastName}</a></h6>
            <button className="float-right"
                onClick={(e) => {
                    nextRecordState(e)
                }}
            >
                OK
            </button>
            </div>
        </div>
    )
}
