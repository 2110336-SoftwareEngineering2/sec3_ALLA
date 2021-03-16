import React from 'react'
import './style.scss'
import {useHistory} from 'react-router-dom'
export default function ResultCard(props) {
    const history= useHistory()
    let jobObj = {}
    if (props.jobObj) jobObj = props.jobObj
    const cardClickedHandler=()=>{
        history.push(`/job/${jobObj.Jid}`)
    }
    //Golf
    const isAccepted = props.isAccepted; //how?

    function deleteCard(){
        //??
    }
    function acceptOffer(){
        //call accept offer api
        deleteCard();
    }
    function rejectOffer(){
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

            <div className="job-text-col ">
                <div>{jobObj.minEducation}</div>
                <div> {jobObj.workingHours}</div>
                <div> {jobObj.salaryMin}-{jobObj.salaryMax}</div>
            </div>

            {isAccepted?
            <div>
                <div>Congratulations</div>
                <button
                    onClick={() => {
                      acceptOffer()
                    }}
                  >
                    Accept
                </button>
                <button
                    onClick={() => {
                      rejectOffer()
                    }}
                  >
                    reject
                </button>
            </div>:
            <div>
            <div>Reject</div>
            <button
                onClick={() => {
                  deleteCard()
                }}
              >
                OK
            </button>
        </div>
            }
            
        </div>
    )
}
