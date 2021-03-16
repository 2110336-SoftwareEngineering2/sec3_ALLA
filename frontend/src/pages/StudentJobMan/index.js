import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.scss";
import JobPane from "../../components/JobPane";


export default function StudentJobMan() {
  const [currentTab, setCurrentTab] = useState("Pending");
  const history = useHistory();
  const location = useLocation();
    const getParamObj = () => {

        const l = location.search.slice(1).split("&")
        var retObj = {}
        l.forEach((i, idx) => {
            const a = i.split('=')
            retObj[a[0]] = decodeURI(a[1])
        })
        return retObj
    }

  const JobState = useSelector((state) => state.Job);
  
  //ยังไม่ได้ ้handle การดึงข้อมูลใหม่หลังเปลี่ยน tab

  const display = () => {
    switch(currentTab) {

      case "Pending":   
        return 
        <div className="list-container d-flex justify-content-center">
            <div className="d-flex flex-column col-sm-10 col-md-8 col-lg-8">
                {JobState.jobList ? 
                    <div className="d-flex justify-content-center ">
                        <JobPane type={"STUDENT-PENDING"} isjobList={JobState.jobList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
            </div>
        </div>;
      case "Result":   
        return 
        <div className="list-container d-flex justify-content-center">
            <div className="d-flex flex-column col-sm-10 col-md-8 col-lg-8">
                {JobState.jobList ? 
                    <div className="d-flex justify-content-center ">
                        <JobPane type={"STUDENT-RESULT"} jobList={JobState.resultList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
            </div>
        </div>;
      case "On-progress": 
        return 
        <div className="list-container d-flex justify-content-center">
            <div className="d-flex flex-column col-sm-10 col-md-8 col-lg-8">
                {JobState.jobList ? 
                    <div className="d-flex justify-content-center ">
                        <JobPane type="STUDENT-ONPROGRESS" jobList={JobState.jobList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
            </div>
        </div>;
      default:      
        return <h1> Error </h1>
        
    }
  }
  return (
    <div>

      <div className="d-flex justify-content-left">
        <header className=" pb-2">
          <h2 className="font-login"> Job Management </h2>
        </header>
      </div>

      <ul className="nav nav-pills mb-3">
        <li className="list-item">
          <a
            className={`nav-link ${
                currentTab=="Pending" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("Pending")}
          >
            Pending
          </a>
        </li>
        <li className="list-item">
          <a
            className={`nav-link ${
                currentTab=="Result" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("Result")}
          >
            Result
          </a>
        </li>
        <li className="list-item">
          <a
            className={`nav-link ${
                currentTab=="On-progress" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("On-progress")}
          >
            On-progress
          </a>
        </li>
      </ul>

      <div> {display()} </div>
    </div>
  );
}
