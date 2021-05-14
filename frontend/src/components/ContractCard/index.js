import React from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from "axios";
export default function ContractCard(props) {
    const history = useHistory()
    let jobObj = {}
    if (props.jobObj) jobObj = props.jobObj
    const cardClickedHandler = () => {
        //console.log(jobObj)
        history.push(`/job/${jobObj.jid}`)
    }
    //Golf
    const isinManagepage = props.isinManagepage;
    const rid = props.rid
    const student = props.student;
    const job = props.job;
    console.log(student,job)

    return (
        <div className="ccard-container d-flex p-2 justify-content-between" onClick={cardClickedHandler}>
            
            <div>
                {/* <a href={`/profile/${jobObj.employer.id}`}> */}
                    <img src={jobObj.companyPic_url || `https://picsum.photos/${(200 + (jobObj.jid % 30)).toString()}`} className="rounded-circle job-card-pic p-2" >
                    </img>
                {/* </a> */}
            </div>
            <div className="job-text-col ">
                <div> <h6>{jobObj.companyName}</h6></div>
                <div> <h4>{jobObj.jobTitle}</h4></div>
                <div> <h6>{jobObj.location}</h6></div>
            </div>

            <div className="job-text-col p-2">
                    <div> finish date: <h6>{props.finishDate}</h6></div>
                    <div> time used: <h6>{props.timeUsed} day(s)</h6></div>
            </div> 

            <div className="job-text-col p-2">
                    <div> rating <h4>{props.rating}<small>/5</small></h4> </div>
                    <div> status : <h6>FINISHED</h6></div>
            </div> 


        </div>
    )
}
