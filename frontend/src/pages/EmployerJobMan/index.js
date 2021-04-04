import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.scss";
import JobPane from "../../components/JobPane";


export default function EmployerJobMan() {
  const [currentTab, setCurrentTab] = useState("Available");
  const userState = useSelector((state) => state.Auth);
  const uid = userState.id;
  const token = userState.token;
  const history = useHistory();
  const AuthState = useSelector((state) => state.Auth);
  

  const [AvailableList,setavailableList] = useState([]);
  const [RequestList,setrequestList] = useState([]);
  const [ResponseList,setresponseList] = useState([]);
  const [onProgressList,setonProgressList] = useState([]);

  
  
  //ยังไม่ได้ ้handle การดึงข้อมูลใหม่หลังเปลี่ยน tab
  

  async function getEmployerJoblistHandler() {
    await axios
      .get(`http://127.0.0.1:8300/user/jobManagement/` + AuthState.id, {
        headers: {
          Authorization: "Bearer " + AuthState.token,
        },
      })
      .then((response) => {
        console.log("response from employer man", response);
        setavailableList(response.data.job);
        setrequestList(response.data.record.applied);
        setresponseList(response.data.record.responded)
        setonProgressList(response.data.contract);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  useEffect(() => {
    getEmployerJoblistHandler();
  }, []);

  const display = () => {
    switch (currentTab) {
      case "Available": 
        return  <div className="list-container d-flex justify-content-center">
                {AvailableList.length!==0 ? 
                    <div className="w-100">
                        <JobPane type="EMPLOYER-AVAILABLE" availableList={AvailableList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
        </div>;
      case "Request":
        return  <div className="list-container d-flex justify-content-center">
                {RequestList.length!==0 ? 
                    <div className="w-100">
                        <JobPane type="EMPLOYER-REQUEST" requestList={RequestList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
        </div>;
      case "Response":
        return  <div className="list-container d-flex justify-content-center">
                {ResponseList.length!==0 ? 
                    <div className="w-100">
                        <JobPane type="EMPLOYER-RESPONSE" responseList={ResponseList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
          
        </div>;
      case "On-progress":
        return <div className="list-container d-flex justify-content-center">
            
                {onProgressList.length!==0 ? 
                    <div className="w-100">
                        <JobPane type="EMPLOYER-ONPROGRESS" onProgressList={onProgressList} />
                    </div> 
                :
                    <div>Nothing to show here..</div>
                }
            
        </div>;
      default:
        return <h1> Error </h1>;
    }
  };
  return (
    <div className= "managejob-div-container col-sm-10 col-md-8 col-lg-8">

      <div className="d-flex justify-content-left">
        <header className=" pb-2">
          <h2 className="font-login"> Job Management </h2>
        </header>
        <div className="d-flex justify-content-left p-2">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            history.push("/add-job");
          }}
        >
          <span STYLE="font-size:15px">+</span> Add Job
        </button>
      </div>
      </div>

      <div className="d-flex">
      <ul className="nav nav-pills ">
        <li className="list-item ">
          <a
            className={`nav-link ${
              currentTab == "Available" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("Available")}
          >
            Open
          </a>
        </li>
        <li className="list-item ">
          <a
            className={`nav-link ${
              currentTab == "Request" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("Request")}
          >
            Request
          </a>
        </li>
        <li className="list-item ">
          <a
            className={`nav-link ${
              currentTab == "Response" ? "active font-login" : "font-login"
            }`}
            onClick={(e) => setCurrentTab("Response")}
          >
            Response
          </a>
        </li>
        <li className="list-item ">
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
      </div>
         
      <div className="pane-area-container border border-solid"> {display()}</div>
      
      

    </div>
  );
}
