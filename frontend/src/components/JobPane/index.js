import React from 'react';
import JobCard from '../JobCard';
import ResultCard from '../ResultCard';
import ResponseCard from '../ResponseCard';
import StudentCard from '../StudentCard';
import './style.scss'
const JobPane = (props) => {
    
    //api
    //ยังไม่ครอบคลุมกรณีของทุก card

    const getJobList = () => {
        let jobArray = [];
        props.jobList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <JobCard
                        isinManagepage={props.isinManagepage}
                        jobObj={job}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getPendingList = () => {
        let jobArray = [];
        props.jobList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <JobCard
                        isinManagepage={true}
                        jobObj={job}
                    />

                </div>
            )
        })
        return jobArray
    }
    
    //ยังไม่ได้ handle วิธีเช็คผลจาก employer ว่ารับมั้ย
    const getResultList = () => {
        let jobArray = [];
        props.jobList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <ResultCard
                        isAccepted={true}
                        jobObj={job}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getOnProgressList = () => {
        let jobArray = [];
        props.jobList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <StudentCard
                        isOnprogresspage={true}
                        jobObj={job}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getRequestList = () => {
        let jobArray = [];
        props.jobList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <StudentCard
                        isOnprogresspage={false}
                        jobObj={job}
                    />

                </div>
            )
        })
        return jobArray
    }

    //ยังไม่ได้ handle ว่า student รับ offer มั้ย
    const getResponseList = () => {
        let jobArray = [];
        props.jobList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <ResponseCard
                        isAccepted={true}
                        jobObj={job}
                    />

                </div>
            )
        })
        return jobArray
    }
    
    function getList(){
        if (props.type=="STUDENT-PENDING") return getPendingList();
        else if (props.type=="STUDENT-RESULT") return getResultList();
        else if (props.type=="ONPROGRESS") return getOnProgressList();
        else if (props.type=="EMPLOYER-REQUEST") return getRequestList();
        else if (props.type=="EMPLOYER-RESPONSE") return getResponseList();
        else return getJobList();
    }
    

    return (
        <div className="jobpane-container ">
            {getList()}
        </div>
    )
}

export default JobPane;