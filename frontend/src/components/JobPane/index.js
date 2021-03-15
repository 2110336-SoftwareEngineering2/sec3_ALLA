import React from 'react';
import JobCard from '../JobCard';
import './style.scss'
const JobPane = (props) => {
    let jobArray = [];

    //ยังไม่ครอบคลุมกรณีของทุก card

    props.jobList.map((job, idx) => {
        jobArray.push(
            <div className=" mb-3" key={idx}>
                <JobCard
                    jobObj={job}
                />
            </div>
        )
    })

    return (
        <div className="jobpane-container ">
            {jobArray}
        </div>
    )
}

export default JobPane;