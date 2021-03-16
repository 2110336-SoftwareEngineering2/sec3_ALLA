import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.scss";
import JobPane from "../../components/JobPane";


export default function EmployerJobMan() {
  const [currentTab, setCurrentTab] = useState("Available");
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
    switch (currentTab) {
      case "Available": 
        return 
        <div className="list-container d-flex justify-content-center">
            <div className="d-flex flex-column col-sm-10 col-md-8 col-lg-8">
                {JobState.jobList ? 
                    <div className="d-flex justify-content-center ">
                        <JobPane jobList={JobState.jobList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
            </div>
        </div>;
      case "Request":
        return 
        <div className="list-container d-flex justify-content-center">
            <div className="d-flex flex-column col-sm-10 col-md-8 col-lg-8">
                {JobState.jobList ? 
                    <div className="d-flex justify-content-center ">
                        <JobPane type="EMPLOYER-REQUEST" jobList={JobState.jobList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
            </div>
        </div>;
      case "Response":
        return 
        <div className="list-container d-flex justify-content-center">
            <div className="d-flex flex-column col-sm-10 col-md-8 col-lg-8">
                {JobState.jobList ? 
                    <div className="d-flex justify-content-center ">
                        <JobPane type="EMPLOYER-RESPONSE" jobList={JobState.jobList} />
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
                        <JobPane jobList={JobState.jobList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
            </div>
        </div>;
      default:
        return <h1> Error </h1>;
    }
  };
  return (
    <div className= "managejob-div-container">

      <div className="d-flex justify-content-left">
        <header className=" pb-2">
          <h2 className="font-login"> Job Management </h2>
        </header>
      </div>

      <ul className="nav nav-pills mb-3">
        <li className="list-item">
          <a
            className={`nav-link ${
              currentTab == "Available" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("Available")}
          >
            Available
          </a>
        </li>
        <li className="list-item">
          <a
            className={`nav-link ${
              currentTab == "Request" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("Request")}
          >
            Request
          </a>
        </li>
        <li className="list-item">
          <a
            className={`nav-link ${
              currentTab == "Response" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("Response")}
          >
            Response
          </a>
        </li>
        <li className="list-item">
          <a
            className={`nav-link ${
              currentTab == "On-progress" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("On-progress")}
          >
            On-progress
          </a>
        </li>
      </ul>

         
      <div> {display()}</div>
      
      <div className="d-flex justify-content-left p-2">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            history.push("/addjob");
          }}
        >
          Add Job
        </button>
      </div>

    </div>
  );
}
