import React from 'react';
import JobCard from '../JobCard';

const JobPane = (props) => {
    let jobArray = [];
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
        <div className="jobpane-container bg-primary m-2 col-sm-10 col-md-8 col-lg-8">
            {jobArray}
        </div>
    )
}

export default JobPane;