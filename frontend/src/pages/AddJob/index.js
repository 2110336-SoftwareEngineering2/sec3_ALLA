import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-phone-number-input/style.css";
import "./style.scss";
import axios from "axios";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function AddJob() {
    const location = useLocation();
    const history = useHistory();
    const AuthState = useSelector((state) => state.Auth);
    const EducationList = ["Not required","High School","Associate","Bachelor","Master","Doctor"];
    const jobTag = ['All job', 'engineering', 'marketing', 'accounting', 'business development'];
    const initJobData = {
        id : AuthState.id,
        companyName : "",
        jobTitle : "",
        logoFile : "a",
        location : "",
        minimumEducation : "",
        workingHours : "",
        salaryMin : "",
        salaryMax : "",
        positionLeft : "",
        description : "",
        responsibility : "",
        requirement : "",
        status:"OPEN",
        duration:"",
        tagList:[]
    }
    

    //ยังไม่ได้แก้ให้เป็น multi select dropdown list
    
    const [JobData, setJobData] = useState(initJobData);

    function validateForm(map) {
        for (var key in map){
            if (map[key]=="") {console.log(map);return false;}
        }
        return true;
    }
    
    useEffect(() => {
        console.log(JobData)
    }, [JobData])
    async function createJobHandler(e){
        e.preventDefault();
        if (!validateForm(JobData)) {
            alert("Please fill the missing information!");
            return;
        }
        const {logoFile,...newJobData} = JobData
        console.log(newJobData)
        await axios
            .post("http://127.0.0.1:8300/job", {
                //Post input
                ...newJobData
            },{
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                },
            })
            .then((response) => {
        
                if (response.status === 201) {
                    
                    //create job success
                    alert("Create Job Success!")
                    history.push('/managejob')
                }
                return response;
            })
            .catch((error) => {
                alert(error.response.data.message);
                console.log(error.response);
            return error;
            });
    
    }


    return (
        <div className="addJob-div-container col-sm-10 col-md-8 col-lg-8 ">
            <div className="d-flex  ">
            <form classname="addJob-form-container" onSubmit={createJobHandler}>

                <div className="d-flex justify-content-left">
                    <header className=" pb-2 fontt-login">
                        <h1> Create a new job </h1>
                    </header>
                </div>

                <div class="form-group">

                    <label className="d-block" className="fontt-login">Attach your logo</label>
                    <div class="input-group">
                        <input
                            type="file"
                            onChange={(e) =>
                                setJobData({ ...JobData, logoFile: e.target.files })
                            }
                        ></input>
                    </div>

                </div>

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Company Name</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setJobData({ ...JobData, companyName: e.target.value })
                            }
                            value = {JobData.companyName}
                            placeholder="enter your company name"
                        ></input>
                    </div>
                </div>

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Job Name</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setJobData({ ...JobData, jobTitle: e.target.value })
                            }
                            value = {JobData.jobTitle}
                            placeholder="please enter job title"
                        ></input>
                    </div>
                </div>
                
                <div class="form-group">
                    <label className="d-block" className="fontt-login">Province</label>
                    <div>
                        <RegionDropdown
                            blankOptionLabel="Please select your province"
                            defaultOptionLabel="Please select your province"
                            country="Thailand"
                            onChange={(selectRegion) =>
                                setJobData({ ...JobData, location: selectRegion })
                            }
                            value={JobData.location}
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Job Description</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setJobData({ ...JobData, description: e.target.value })
                            }
                            placeholder="please enter job description"
                            value={JobData.description}
                        ></input>
                    </div>
                </div>

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Responsibility</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setJobData({ ...JobData, responsibility: e.target.value })
                            }
                            placeholder="please enter job responsibility"
                            value={JobData.responsibility}
                        ></input>
                    </div>
                </div>

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Requirement</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setJobData({ ...JobData, requirement: e.target.value })
                            }
                            placeholder="please enter job responsibility"
                            value={JobData.requirement}
                        ></input>
                    </div>
                </div>


                <div class="form-group">
                    <label className="d-block" className="fontt-login">Education Requirement</label>
                    <div className="filter-input select-dropdown">
                    <select
                        value={JobData.minimumEducation}
                        onChange={(e) => { setJobData({ ...JobData, minimumEducation: e.target.value }) }}
                    >
                        <option selected disabled>Choose an option</option>
                        {EducationList.map((job, index) => (
                            <option selected>{job}</option>
                        ))}

                    </select>
                    </div>
                </div>

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Available Position(s)</label>
                    <div className="price-slider">
                        <input value={JobData.positionLeft} type="number" min="0" onChange={(e) => setJobData({...JobData, positionLeft: e.target.value})} ></input>
                    </div>
                </div> 

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Time Period</label>
                    <div className="price-slider">
                        <input value={JobData.workingHours} type="text" onChange={(e) => setJobData({...JobData, workingHours: e.target.value})} ></input>
                    </div>
                </div>  

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Duration (days)</label>
                    <div className="price-slider">
                        <input value={JobData.duration} type="text" onChange={(e) => setJobData({...JobData, duration: e.target.value})} ></input>
                    </div>
                </div>              

                <div class="form-group">
                    <label className="d-block" className="fontt-login">Salary Range</label>
                    <div className="price-slider">
                        <input value={JobData.salaryMin} type="number" min="0" onChange={(e) => setJobData({...JobData, salaryMin: e.target.value})} placeholder="min"></input>
                        <input value={JobData.salaryMax} type="number" min={JobData.min} onChange={(e) => setJobData({...JobData, salaryMax: e.target.value})} placeholder="max"></input>
                    </div>
                </div>

                
                <div class="form-group">
                    <label className="d-block" className="fontt-login">Job Tag</label>
                    <div className="filter-input select-dropdown">
                    <select
                        value={JobData.tagList}
                        onChange={(e) => { setJobData({ ...JobData, tagList: [...JobData.tagList,e.target.value] }) }}
                    >
                        <option selected disabled>Choose an option</option>
                        {jobTag.map((job, index) => (
                            <option selected>{job}</option>
                        ))}

                    </select>
                    </div>
                </div>

                <button type="submit" class="btn btn-success">
                    Create Job
                </button>

                
            </form>
            </div>
        </div>
    );

}