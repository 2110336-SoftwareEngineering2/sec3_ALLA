import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.scss";
import JobPane from "../../components/JobPane";


export default function StudentJobMan() {
  const [currentTab, setCurrentTab] = useState("Pending");
  const userState = useSelector((state) => state.Auth);
  const uid = userState.id;
  const token = userState.token;
  const history = useHistory();
  const AuthState = useSelector((state) => state.Auth);


  const [pendingList, setpendingList] = useState([]);
  const [resultList, setresultList] = useState([]);
  const [onProgressList, setonProgressList] = useState([]);


  //ยังไม่ได้ ้handle การดึงข้อมูลใหม่หลังเปลี่ยน tab
  useEffect(() => {
    getStudentJoblistHandler();
  }, []);

  async function getStudentJoblistHandler() {
    await axios
      .get(`http://127.0.0.1:8300/user/jobManagement/` + AuthState.id, {
        headers: {
          Authorization: "Bearer " + AuthState.token,
        },
      })
      .then((response) => {
        console.log("response", response);
        setpendingList(response.data.record.pending);
        setresultList(response.data.record.waiting);
        setonProgressList(response.data.contract);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  const display = (currentTab) => {
    switch (currentTab) {
      case 'Pending':
        console.log('ssssssssssssssssssssssss', pendingList)
        return <div className="list-container d-flex justify-content-center">
          
            {pendingList.length !== 0 ?
              <div className="w-100">
                <JobPane type={"STUDENT-PENDING"} pendingList={pendingList} />
              </div>
              :
              <div>Nothing to show here..</div>
            }
        
        </div>;
      case "Result":
        return <div className="list-container d-flex justify-content-center">
          
            {resultList.length!== 0 ?
              <div className="w-100 ">
                <JobPane type={"STUDENT-RESULT"} resultList={resultList} />
              </div>
              :
              <div>Nothing to show here..</div>
            }
          
        </div>;
      case "On-progress":
        return <div className="list-container d-flex justify-content-center">
      
            {onProgressList.length!== 0 ?
              <div className="w-100 ">
                <JobPane type="STUDENT-ONPROGRESS" onProgressList={onProgressList} />
              </div>
              :
              <div>Nothing to show here..</div>
            }
          
        </div>;
      default:
        return <h1> Error </h1>;

    }
  }
  return (
    <div className= "managejob-div-container col-sm-10 col-md-8 col-lg-8">

      <div className="d-flex justify-content-left">
        <header className=" pb-2">
          <h2 className="font-editprofile"> Job Management </h2>
        </header>
      </div>

      <ul className="nav nav-pills mb-3">
        <li className="list-item">
          <a
            className={`nav-link ${currentTab == "Pending" ? "active font-editprofile" : "font-editprofile"
              }`}
            onClick={(e) => { setCurrentTab("Pending"); getStudentJoblistHandler(); }}
          >
            Pending
          </a>
        </li>
        <li className="list-item">
          <a
            className={`nav-link ${currentTab == "Result" ? "active font-editprofile" : "font-editprofile"
              }`}
            onClick={(e) => { setCurrentTab("Result"); getStudentJoblistHandler(); }}
          >
            Result
          </a>
        </li>
        <li className="list-item ">
          <a
            className={`nav-link ${currentTab == "On-progress" ? "active font-editprofile" : "font-editprofile"
              }`}
            onClick={(e) => { setCurrentTab("On-progress"); getStudentJoblistHandler(); }}
          >
            On-progress
          </a>
        </li>
      </ul>

      <div className="pane-area-container border border-solid"> {display(currentTab)} </div>
    </div>
  );
}
