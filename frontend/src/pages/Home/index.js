import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

import JobPane from "../../components/JobPane";
import SearchFilter from "../../components/SearchFilter";
import "./style.scss";

export default function Home() {
    //เอา path มา ยิง api ตาม search and filters
    const location = useLocation();
    const JobState = useSelector((state) => state.Job);
    console.log('location from home page', location)
    console.log('JOB LIST ', JobState.jobList)
    return (
        <div>
            <div className="d-flex justify-content-center ">
                <SearchFilter></SearchFilter>
            </div>
            <div className="d-flex justify-content-center ">
                
                <JobPane jobList={JobState.jobList}></JobPane>

            </div>
        </div>
    )
}
