import React from 'react';
import JobCard from '../JobCard';
import ResultCard from '../ResultCard';
import ResponseCard from '../ResponseCard';
import StudentCard from '../StudentCard';
import './style.scss'
import ContractCard from '../ContractCard';
import ContractCard2 from '../ContractCard2';
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
    const getStudentOnProgressList = (onProgressList) => {
        let jobArray = [];
        onProgressList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <StudentCard
                        rid={job.rid}
                        isOnprogresspage={true}
                        isStudent={true}
                        jobObj={job.job}
                        cid={job.cid}
                        studentObj={job.student}
                        status={job.status}
                        startDate={job.start_date}
                        timeLeft={job.time_left}
                    />

                </div>
            )
        })
        return jobArray
    }

    const getEmployerOnProgressList = (onProgressList) => {
        let jobArray = [];
        onProgressList.map((job, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <StudentCard
                        rid={job.rid}
                        isOnprogresspage={true}
                        isStudent={false}
                        jobObj={job.job}
                        cid={job.cid}
                        studentObj={job.student}
                        status={job.status}
                        startDate={job.start_date}
                        timeLeft={job.time_left}
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
                        isOnrequestpage={true}
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

    const getDoneContractList = (contractList,list) => {
        if(contractList){let jobArray = [];
        contractList.map((contract, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <ContractCard
                        cid={contract.cid}
                        isinManagepage={false}
                        jobObj={contract.job}
                        studentObj={contract.student}
                        finishDate={contract.finished_date}
                        timeUsed={contract.time_used}
                        fid={contract.fid}
                        rating={contract.rate}
                    />

                </div>
            )
        })
        list.map((contract, idx) => {
            jobArray.push(
                <div className=" mb-3" key={idx}>
                    <ContractCard2
                        cid={contract.cid}
                        isinManagepage={false}
                        jobObj={contract.job}
                        studentObj={contract.student}
                        finishDate={contract.finished_date}
                        timeUsed={contract.time_used}
                        fid={contract.fid}
                        rating={contract.rate}
                        startDate={contract.start_date}
                        status={contract.status}
                    />

                </div>
            )
        })
        return jobArray
        }
        else return <></>
    }

    const getList = () => {

        if (props.type === "STUDENT-PENDING") return getPendingList(props.pendingList);
        else if (props.type == "STUDENT-RESULT") return getResultList(props.resultList);
        else if (props.type == "STUDENT-ONPROGRESS") return getStudentOnProgressList(props.onProgressList);
        else if (props.type == "EMPLOYER-ONPROGRESS") return getEmployerOnProgressList(props.onProgressList);
        else if (props.type == "EMPLOYER-REQUEST") return getRequestList(props.requestList);
        else if (props.type == "EMPLOYER-RESPONSE") return getResponseList(props.responseList);
        else if (props.type == "EMPLOYER-AVAILABLE") return getAvailableList(props.availableList);
        else if (props.type == "STUDENT-FINISHED-CONTRACT") return getDoneContractList(props.contractList,props.List);
        else return getJobList();
    }
    const list = getList()

    return (
        <div>
            {list}
        </div>
    )
}

export default JobPane;