import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.scss";


export default function StudentJobMan() {
  const [currentTab, setCurrentTab] = useState("Pending");
  const display = () => {
    switch(currentTab) {

      case "Pending":   
        return <div> Pending </div>;
      case "Result":   
        return <div> Result </div>;
      case "On-Progress": 
        return <div> On-Progress </div>;
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
