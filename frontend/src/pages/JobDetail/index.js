import "./style.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function JobDetail(props) {
    const userState = useSelector((state) => state.Auth);
    const uid = userState.id;
    const token = userState.token;
    const history = useHistory();
    const AuthState = useSelector((state) => state.Auth);
    const initJobData = { // format from GET JOB API
        "jid": 1,
        "companyPicUrl": "",
        "companyName": "",
        "jobTitle": "BBBBBB",
        "location": "Bangkok",
        "minimumEducation": "highschool",
        "workingHours": "8-10hours/week",
        "salaryMin": 50,
        "salaryMax": 100,
        "positionLeft": 1,
        "description": "asdsadasdasdasdasdasasdasdasdasdasdasdasdasdasd",
        "responsibility": "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda",
        "requirement": "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas",
        "status": "OPEN",
        "createdDate": "2021-03-15",
        "tagList": [
            "a",
            "b",
            "c"
        ],
        "employer": {
            "id": 3,
            "username": "Test12345678",
            "password": "$2a$10$3p8tue/hFQv24fYQPtdFiebBjOw2yI1o3Je2Sg9894KFWz5vC6N/W",
            "type": "EMPLOYER",
            "email": "mac@gmail.co.th",
            "firstName": "mac",
            "lastName": "mac",
            "phoneNumber": "012-345-4567",
            "verified": false,
            "birthDate": "2021-02-27"
        }
    }
    // const initJobData = {
    //     jid: 8,
    //     companyPicUrl : "https://picsum.photos/202",
    //     companyName: "Nisiter",
    //     jobTitle: "Frontend",
    //     location: "Bangkok",
    //     minimumEducation: "undergrad",
    //     workingHours: "8:00-16:00",
    //     salaryMin: 50,
    //     salaryMax: 100,
    //     positionLeft: 1,
    //     description: "description",
    //     responsibility: "responsibility"
    // }

    const [jobData, setJobData] = useState(initJobData);
    const getJobDetail = async (jid) => {
        await axios
            .get(`http://127.0.0.1:8300/job/${jid}`, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                },
            })
            .then((response) => {
                console.log("GET jobAPIresponse", response);
                setJobData(response.data)
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }
    useEffect(() => {
        getJobDetail(props.match.params.Jid)
    }, [])

    const applyBtnHandler = async () => {
        await axios
            .post(`http://127.0.0.1:8300/application-record`, {
                sid: uid,
                jid: props.match.params.Jid
            }, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                }
            })
            .then((response) => {
                console.log("POST apply job", response);
                //setJobData(response)
                alert("Job Applied!")
                return response;
            })
            .catch((error) => {
                console.log(error);
                alert("You have already applied for this job")
                return error;
            });
    }
    
    return (
        <div className="col-sm-10 col-md-8 col-lg-8 main-container">
            <div className="d-flex justify-content-around ">
                <div className="d-flex justify-content-around ">
                    <div class="form-row">
                        <div className="d-flex justify-content-between">
                            <form class="md-form p-1">
                                <a href={`/profile/${jobData.employer.id}`}>
                                <img
                                    src={`https://picsum.photos/200`}//jobData.companyPicUrl ||
                                    class="rounded-circle image-style p-1"
                                ></img></a>
                            </form>
                        </div>
                        <form className="p-2">
                            <div className="d-flex justify-content-left p-1">
                                <text>
                                    {jobData.companyName}
                                </text>
                            </div>
                            <div className="d-flex justify-content-left p-1 bold">
                                <text>
                                    {/* <span className="font-weight-bold"> Department : </span>{" "} */}
                                    {jobData.jobTitle}
                                </text>
                            </div>
                            <div className="d-flex justify-content-left p-1">
                                <text>
                                    {/* <span className="font-weight-bold"> Faculty : </span>{" "} */}
                                    {jobData.location}
                                </text>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <div className="d-flex justify-content-right num_left-style p-1">
                        <text>
                            <span className=""> Required : </span>{" "}
                            {jobData.positionLeft || 'Fulfilled'}
                        </text>
                    </div>
                    <div className="d-flex justify-content-right num_left-style p-1">
                        <text>
                            {jobData.positionLeft?'left':''}
                        </text>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center description-container-style p-1 ">
                <div className="d-flex justify-content-left p-1 topic-style">
                    <text>
                        Description :
                    </text>
                </div>
                <div className="d-flex justify-content-left p-1 body-style">
                    <text>
                        {jobData.description}
                    </text>
                </div>
                <div className="d-flex justify-content-left p-1 topic-style">
                    <text>
                        Responsibility :
                    </text>
                </div>
                <div className=" p-1 body-style">
                    <text>
                        {jobData.responsibility}
                    </text>
                </div>
                <div className="d-flex justify-content-left p-1 topic-style">
                    <text>
                        Requirement :
                    </text>
                </div>
                <div className="p-1 body-style">
                    <text>
                        {jobData.requirement}
                    </text>
                </div>
                <div className="d-flex justify-content-left p-1 body-style">
                    <text>
                        <span className="topic-style"> time period :  </span>{" "}
                        {jobData.workingHours}
                    </text>
                </div>
                <div className="d-flex justify-content-left p-1 body-style">
                    <text>
                        <span className="topic-style"> salary range :  </span>{" "}
                        {jobData.salaryMin}
                        {" - "}
                        {jobData.salaryMax}
                        {" "}baht/hour
                    </text>
                </div>
            </div>
            {AuthState.login_type === 'STUDENT' && jobData.positionLeft !== 0  ? <div className="d-flex justify-content-start p-2 col-sm-10 col-md-8 col-lg-8 ">
                <button onClick={applyBtnHandler} class="btn btn-success pl-3 pr-3">
                    Apply
                </button>
            </div> :
                <></>}
        </div>
    )
}
