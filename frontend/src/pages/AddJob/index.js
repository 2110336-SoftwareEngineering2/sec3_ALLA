import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-phone-number-input/style.css";
import "./style.scss";
import axios from "axios";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import SearchFilter from "../../components/SearchFilter";

export default function AddJob() {
    const initFormData = {
        uid : 12,
        companyName : "",
        jobTitle : "",
        logoFile : "",
        location : "",
        minimumEducation : "",
        workingHours : "",
        salaryMin : 50,
        salaryMax : 100,
        positionLeft : 1,
        description : "",
        responsibility : "",
        requirement : ""
    }
    const getParamObj = () => {
        const l = location.search.slice(1).split("&")
        var retObj = {}
        l.forEach((i, idx) => {
            const a = i.split('=')
            retObj[a[0]] = decodeURI(a[1])
        })
        if (!retObj) return {
            not: '',
            smax: '',
            smin: '',
            t: '',
            tag: ''
        }
        else return retObj
    }
    const [formData, setFormData] = useState(initFormData);


    return (
        <div classname="addJob-div-container">
            <div classname="addJob-form-container">
                <div className="d-flex justify-content-left">
                    <header className=" pb-2 font-login">
                        <h1> Create a new job </h1>
                    </header>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Attach your logo</label>
                    <div class="input-group">
                        <input
                            type="file"
                            onChange={(e) =>
                                setFormData({ ...formData, logoFile: e.target.files })
                            }
                        ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Company Name</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setFormData({ ...formData, companyName: e.target.value })
                            }
                            placeholder="enter your company name"
                        ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Job Name</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setFormData({ ...formData, jobTitle: e.target.value })
                            }
                            placeholder="please enter job title"
                        ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Province</label>
                    <div>
                        <RegionDropdown
                            blankOptionLabel="Please select your province"
                            defaultOptionLabel="Please select your province"
                            country="Thailand"
                            value={formData.location}
                            onChange={(selectRegion) =>
                                setFormData({ ...formData, location: selectRegion })
                            }
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Job Description</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="please enter job description"
                        ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Responsibility</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setFormData({ ...formData, responsibility: e.target.value })
                            }
                            placeholder="please enter job responsibility"
                        ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Education Requirement</label>
                    <div class="input-group">
                        <SearchFilter param={getParamObj()} />
                    </div>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Amount</label>
                    <div className="price-slider">
                        <input value={this.state.val1} min="0" max="100" step="0.5" type="range" onChange={(e) => setFormData({...formData, min: e.target.value})}></input>
                        <input value={this.state.val2} min="0" max="100" step="0.5" type="range" onChange={(e) => setFormData({...formData, max: e.target.value})}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label className="d-block" className="font-login">Company Name</label>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                                setFormData({ ...formData, companyName: e.target.value })
                            }
                            placeholder="enter your company name"
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    );

}