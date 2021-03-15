import React from 'react'
import './style.scss'
export default function JobCard(props) {
    let jobObj = {}
    if (props.jobObj) jobObj = props.jobObj

    return (
        <div className="card-container d-flex p-2 justify-content-between">
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

            
        </div>
    )
}
