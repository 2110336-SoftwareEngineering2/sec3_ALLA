import React from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from "axios";
export default function JobCard(props) {
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
    async function deleteApplication(e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

        await axios
            .delete(`http://127.0.0.1:8300/application-record/` + rid.toString()
                , {
                })
            .then((response) => {
                //do nothing
                alert("Application is cancelled");
                history.push("/managejob");
                return (response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="card-container d-flex p-2 justify-content-between" onClick={cardClickedHandler}>
            <div><img src={jobObj.companyPic_url || 'https://picsum.photos/201'} className="rounded-circle job-card-pic p-2" ></img></div>
            <div className="job-text-col ">
                <div> <h6>{jobObj.companyName}</h6></div>
                <div> <h4>{jobObj.jobTitle}</h4></div>
                <div> <h6>{jobObj.location}</h6></div>
            </div>

            <div className="job-text-col ">
                <div >{jobObj.minimumEducation}</div>
                <div> {jobObj.workingHours}</div>
                <div> THB {jobObj.salaryMin}-{jobObj.salaryMax}</div>
            </div>

            <div className="job-text-col "><small >{jobObj.positionLeft} position(s)</small></div>

            {isinManagepage ?
                <div>
                    <button
                        onClick={(e) => {
                            deleteApplication(e)
                        }}
                    >
                        Cancel
                </button>
                </div> :
                <></>
            }

        </div>
    )
}
