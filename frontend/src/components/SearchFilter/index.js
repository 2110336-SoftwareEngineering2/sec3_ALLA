import React, { useState } from 'react'


export default function SearchFilter() {
    const initialFilterParam = {
        jobType: '',
        timeFilter: '',
        salaryMin: 0,
        salaryMax: 0,
    }
    const [filterParam, setfilterParam] = useState(initialFilterParam)
    const initialFilterOptions = {
        jobType: ['All job', 'a', 'b', 'c', 'd'],
        timeFilter: ['Posted Anytime', 'last 24hr', 'last week', 'last two week', 'last month'],
        salaryMin: 0,
        salaryMax: 0,
    }
    const [filterOptions, setFilterOptions] = useState(initialFilterOptions)
    console.log(filterParam)
    const filterSubmitHandler = () =>{
        
    }
    return (
        <div>
            <form onSubmit={filterSubmitHandler}>
                <div class="select-dropdown">
                    <select
                        value={filterParam.jobType}
                        onChange={(e) => { setfilterParam({ ...filterParam, jobType: e.target.value }) }}
                    >
                        <option selected disabled>Choose an option</option>
                        {filterOptions.jobType.map((job, index) => (
                            <option selected>{job}</option>
                        ))}

                    </select>
                </div>
                <div class="select-dropdown">
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
            </form>

        </div>
    )
}
