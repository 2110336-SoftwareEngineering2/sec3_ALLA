import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.scss";

export default function EmployerJobMan() {
  const [currentTab, setCurrentTab] = useState("Available");
  const history = useHistory();
  const display = () => {
    switch (currentTab) {
      case "Available":
        return <div> Available </div>;
      case "Request":
        return <div> Request </div>;
      case "Response":
        return <div> Response </div>;
      case "On-progress":
        return <div> On-progress </div>;
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
      <div>    
      <div> {display()}</div>
      </div>  
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
