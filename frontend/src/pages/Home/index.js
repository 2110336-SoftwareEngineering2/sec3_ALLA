import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import JobPane from "../../components/JobPane";
import SearchFilter from "../../components/SearchFilter";
import "./style.scss";

export default function Home() {
    //เอา path มา ยิง api ตาม search and filters
    //dispatch to set querry param in navigationbar
    const location = useLocation();
    const dispatch = useDispatch();

    const [jobList, setJobList] = useState()
    const AuthState = useSelector((state) => state.Auth)

    const getParamObj = () => {
        const spilttedParam = location.search.slice(1).split("&")
        var retObj = {}
        spilttedParam.forEach((i, idx) => {
            const a = i.split('=')
            retObj[a[0]] = decodeURI(a[1])
        })

        return retObj
    }
    const searchApi = async (searchStr, tagList, date, salaryMin, salaryMax) => {
        await axios
            .get(`http://127.0.0.1:8300/job/search/all?q=${searchStr || ''}&tag=${tagList || ''}&t=${date || ''}&smin=${salaryMin || 0}&smax=${salaryMax || 100000}
        ` , {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                },
            })
            .then((response) => {
                console.log("searchAPIresponse", response);
                setJobList(response.data)
                dispatch({ type: 'SET_JOBLIST', payload: { jobList: response.data } })
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }


    const paramObj = getParamObj()
    dispatch({ type: 'SET_PARAMOBJ', payload: { paramObj: paramObj } })

    useEffect(() => {
        console.log('param in useEffect', paramObj)
        searchApi(paramObj.q, paramObj.tag, paramObj.t, paramObj.smin, paramObj.smax)
    }, [])

    //const JobState = useSelector((state) => state.Job);
    console.log('JOB LIST ', jobList)
    // console.log('param from home', JobState.paramObj)
    const getJobPane = () => {
        if (jobList && jobList.length === 0) return <div>Sorry we can't find any matching results :( </div>
        else if (jobList) return <JobPane isinManagepage={false} jobList={jobList} />
    }
    
    return (
        <div className="home-container d-flex justify-content-center">
            <div className="d-flex flex-column col-sm-10 col-md-8 col-lg-8">
                <div className="d-flex justify-content-center ">
                    <SearchFilter param={getParamObj()} />
                </div>
                <div className="pane-container">
                    {getJobPane()}
                </div>
            </div>
        </div>
    )
}
