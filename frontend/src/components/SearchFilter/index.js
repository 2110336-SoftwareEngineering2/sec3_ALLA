import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './style.scss'
export default function SearchFilter(props) {// receive props from parent sending search querry
    const history = useHistory();
    //console.log(props.param)
    const initialFilterParam = {
        jobTag: props.param.tag||'',
        timeFilter: props.param.t||'',
        salaryMin: props.param.smin||'',
        salaryMax: props.param.smax||'',
        location:props.param.l||''
    }
    const [filterParam, setfilterParam] = useState(initialFilterParam)

    const initialFilterOptions = {
        jobTag: ['All job', 'engineering', 'marketing', 'accounting', 'business development'],
        timeFilter: ['Posted Anytime', 'last 24hrs', 'last week', 'last two week', 'last month'],
        salaryMin: '',
        salaryMax: '',
        location:''
    }
    const [filterOptions, setFilterOptions] = useState(initialFilterOptions)
    //console.log('filterparam from searchFilter',filterParam)
    const filterSubmitHandler = (e) => {//get search querry and push to home with search and filter querry(ต้องเรียก controller รวม)
        e.preventDefault();
        history.push(`/?q=${props.param.q||""}&tag=${filterParam.jobTag}&t=${filterParam.timeFilter}&smin=${filterParam.salaryMin}&smax=${filterParam.salaryMax}`)

    }
    return (
        <div className="filter-container">
            <form className="filter-form d-flex justify-content-around " onSubmit={filterSubmitHandler}>

                <div className="filter-input select-dropdown">
                    <select
                        value={filterParam.jobTag}
                        onChange={(e) => { setfilterParam({ ...filterParam, jobTag: e.target.value }) }}
                    >
                        <option selected disabled>Choose an option</option>
                        {filterOptions.jobTag.map((job, index) => (
                            <option selected>{job}</option>
                        ))}

                    </select>
                </div>
                <div className="filter-input select-dropdown ">
                    <select
                        value={filterParam.timeFilter}
                        onChange={(e) => { setfilterParam({ ...filterParam, timeFilter: e.target.value }) }}
                    >
                        <option selected disabled>Choose an option</option>
                        {filterOptions.timeFilter.map((time, index) => (
                            <option selected>{time}</option>
                        ))}

                    </select>
                </div>
                <input
                    className="filter-input form-control"
                    onChange={(e) => {
                        setfilterParam({ ...filterParam, salaryMin: e.target.value });
                    }}
                    type="number"
                    placeholder="min salary"
                    aria-label="min salary"
                    value={filterParam.salaryMin}
                ></input>
                <input
                    className="filter-input form-control"
                    onChange={(e) => {
                        setfilterParam({ ...filterParam, salaryMax: e.target.value });
                    }}
                    type="number"
                    placeholder="max salary"
                    aria-label="min salary"
                    value={filterParam.salaryMax}
                ></input>
                <button className="btn btn-primary" type="submit">
                    Filter
          </button>
            </form>

        </div>
    )
}
