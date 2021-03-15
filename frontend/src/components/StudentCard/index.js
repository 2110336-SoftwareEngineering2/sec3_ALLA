import React from 'react'
import './style.scss'
import {useHistory} from 'react-router-dom'
export default function JobCard(props) {
    const history= useHistory()
    let jobObj = {}
    if (props.jobObj) jobObj = props.jobObj
    const cardClickedHandler=()=>{
        history.push(`/job/${jobObj.Jid}`)
    }
    //Golf
    isOnprogresspage = false; //how??
    function acceptRequesthandler(){
        //api
    }
    function rejectRequesthandler(){
        //api
    }
    
    return (
        <div className="card-container d-flex p-2 justify-content-between" onClick={cardClickedHandler}>
            <div><img src={jobObj.companyPic_url} className="rounded-circle job-card-pic p-2"></img></div>
            <div className="job-text-col ">
                <div>{jobObj.jobTitle}</div>
                <div> {jobObj.companyName}</div>
                <div> {jobObj.location}</div>
            </div>

            {isOnprogresspage?
            <div className="card-container d-flex p-2 justify-content-between">
                <div>
                    working by
                </div>
                
                <a href={URL}>Name Surname</a>
            </div>:
            <div className="card-container d-flex p-2 justify-content-between">
            <div>
                Requested by
            </div>
            <a href={URL}>Name Surname</a>
            <button
                    onClick={() => {
                        acceptRequesthandler()
                    }}
                  >
                    Accept
            </button>
            <button
                    onClick={() => {
                        rejectRequesthandler()
                    }}
                  >
                    Reject
            </button>
            </div>
            }
            
        </div>
    )
}
