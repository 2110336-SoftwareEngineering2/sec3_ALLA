import React from 'react';
import JobCard from '../JobCard';
import ResultCard from '../ResultCard';
import ResponseCard from '../ResponseCard';
import StudentCard from '../StudentCard';
import './style.scss'
const JobPane = (props) => {

    

    const getJobList = () => {
        let jobArray = [];
        props.jobList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <JobCard
                        rid={job.rid}
                        isinManagepage={props.isinManagepage}
                        jobObj={job}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getAvailableList = (availableList) => {
        let jobArray = [];
        console.log(availableList)
        availableList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <JobCard
                        rid={job.rid}
                        isinManagepage={props.isinManagepage}
                        jobObj={job}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getPendingList = (pendingList) => {
        let jobArray = [];
        pendingList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <JobCard
                        rid={job.rid}
                        isinManagepage={true}
                        jobObj={job.job}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getResultList = (resultList) => {
        let jobArray = [];
        resultList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <ResultCard
                        rid={job.rid}
                        isAccepted={job.yesFlag}
                        jobObj={job.job}
                    />

                </div>
            )
        })
        return jobArray
    }

    //contract ยังไม่ได้ job มา
    const getOnProgressList = (onProgressList) => {
        let jobArray = [];
        onProgressList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <StudentCard
                        rid={job.rid}
                        isOnprogresspage={true}
                        jobObj={job.job}
                        studentObj={job.student}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getRequestList = (requestList) => {
        let jobArray = [];
        requestList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <StudentCard
                        rid={job.rid}
                        isOnprogresspage={false}
                        jobObj={job.job}
                        studentObj={job.student}
                    />

                </div>
            )
        })
        return jobArray
    }

    //ยังไม่ได้ handle ว่า student รับ offer มั้ย
    const getResponseList = (responseList) => {
        
        let jobArray = [];
        responseList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <ResponseCard
                        rid={job.rid}
                        isAccepted={job.yesFlag}
                        jobObj={job.job}
                        studentObj={job.student}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getList = () => {
        
        if (props.type === "STUDENT-PENDING") return getPendingList(props.pendingList);
        else if (props.type == "STUDENT-RESULT") return getResultList(props.resultList);
        else if (props.type == "ONPROGRESS") return getOnProgressList(props.onProgressList);
        else if (props.type == "EMPLOYER-REQUEST") return getRequestList(props.requestList);
        else if (props.type == "EMPLOYER-RESPONSE") return getResponseList(props.responseList);
        else if (props.type == "EMPLOYER-AVAILABLE") return getAvailableList(props.availableList);
        else return getJobList();
    }
    const list = getList()

    return (
        <div className="jobpane-container ">
            {list}
        </div>
    )
}

export default JobPane;