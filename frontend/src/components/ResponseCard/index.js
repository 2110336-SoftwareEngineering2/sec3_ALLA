import React from 'react'
import './style.scss'
import {useHistory} from 'react-router-dom'
export default function ResponseCard(props) {
    const history= useHistory()
    let jobObj = {}
    if (props.jobObj) jobObj = props.jobObj
    const cardClickedHandler=()=>{
        history.push(`/job/${jobObj.Jid}`)
    }
    //Golf
    const isOnprogresspage = props.isOnprogresspage; //how??
    isAccepted = props.isAccepted;
    function getUserlink(){
        //api
    }
    function acceptOffer(){
        //call accept offer api
        deleteCard();
    }
    
    return (
        <div className="card-container d-flex p-2 justify-content-between" onClick={cardClickedHandler}>
            <div><img src={jobObj.companyPic_url} className="rounded-circle job-card-pic p-2"></img></div>
            <div className="job-text-col ">
                <div>{jobObj.jobTitle}</div>
                <div> {jobObj.companyName}</div>
                <div> {jobObj.location}</div>
            </div>

            {isAccepted? <div>Accepted by</div>:<div>Rejected by</div>}
            
            <button
                onClick={() => {
                  deleteCard()
                }}
              >
                OK
            </button>
        </div>
    )
}
