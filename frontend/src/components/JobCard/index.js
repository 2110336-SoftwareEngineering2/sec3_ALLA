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
    isinManagepage = false; //how?

    function deleteApplication(){
        //call delete api function
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
            
            <div>{jobObj.positionLeft}</div>

            {isinManagepage?
            <div>
                <button
                    onClick={() => {
                      deleteApplication()
                    }}
                  >
                    Cancel
                </button>
            </div>:
            <></>
            }
            
        </div>
    )
}
