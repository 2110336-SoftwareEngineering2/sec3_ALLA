import React from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from "axios";
export default function ContractCard2(props) {
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
    const status = props.status;

    function getJobStatus(status) {
        switch (status){
            case "DOING":
                return(
                    <h6> WORKING </h6>
                )
            case "DONE":
                return(
                    <h6> FINISHED </h6>
                )
            case "RESIGNED":
                return(
                    <h6> RESIGNED </h6>
                )
            case "TIMEOUT":
                return(
                    <h6> TIMEOUT </h6>
                )
            case "SUBMITTED":
                return(
                    <h6> SUBMITTED </h6>
                )
            case "RESIGN_REQ":
                return(
                    <h6> RESIGN REQUEST </h6>
                )
            default:
                return
                    <h6> undefined </h6>;
        }
       
    }

    if (status=="RESIGNED") return (
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
                    <div> start date: <h6>{props.startDate}</h6></div>
            </div> 

            <div className="job-text-col p-2">
                    <div> status : {getJobStatus(status)}</div>
            </div> 


        </div>
    )
    else return <></>
}
