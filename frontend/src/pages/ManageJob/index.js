import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import EmployerJobMan from "../EmployerJobMan"
import StudentJobMan from "../StudentJobMan";
import "./style.scss";


export default function ManageJob() {
    const AuthState = useSelector((state) => state.Auth);
    console.log(AuthState.login_type);
    const [isStudent, setisStudent] = useState(true);
    useEffect(() => {
        if (AuthState.login_type == "STUDENT") {
            setisStudent(true);
        } else if (AuthState.login_type == "EMPLOYER") {
            setisStudent(false);
        }
      }, [])
    
    
    return (
        <div>
          {isStudent
            ? (<StudentJobMan/>
           ) : (<EmployerJobMan/>
           )}
        </div>
      );
}