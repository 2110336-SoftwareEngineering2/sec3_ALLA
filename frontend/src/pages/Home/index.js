import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

import JobPane from "../../components/JobPane";
import SearchFilter from "../../components/SearchFilter";
import "./style.scss";

export default function Home() {
    //เอา path มา ยิง api ตาม search and filters
    //dispatch to set querry param in navigationbar
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
    console.log('location from home page', location)
    console.log('JOB LIST ', JobState.jobList)
    return (
        <div className="home-container d-flex justify-content-center">
            <div className="d-flex flex-column col-sm-10 col-md-8 col-lg-8">
                <div className="d-flex justify-content-center ">
                    <SearchFilter param={getParamObj()} />
                </div>
                {JobState.jobList ? <div className="d-flex justify-content-center ">
                    <JobPane jobList={JobState.jobList} />
                </div> 
                :
                    <div>Sorry we cant find matching result</div>
                }
            </div>
        </div>
    )
}
