import React, { useCallback, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./style.scss";
import DatePicker from "react-datepicker";
import Select from "react-dropdown-select";

import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
    const initFormData = {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        phone_no: "",
        email: "",
        birthdate: "",
        isStudent: true,
        startDate: new Date()
    };

    const initStudent = {
        university: "",
        degree: "",
        faculty: "",
        department: "",
        fieldofwork: "",
        resume: "",
    };

    const initEmployer = {
        company: "",
        fieldofwork: "",
        position: "",
    };


    const [student, setStudent] = useState(initStudent);
    const [formData, setFormData] = useState(initFormData);

    useEffect(() => {
        console.log(formData);
    }, [formData])
    return (
        <form className="form-container">
            <div className="d-flex justify-content-left">
                <header className=" pb-2"><h1> Register </h1></header>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Username</label>
                    <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Username"
                    ></input>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Password"
                    ></input>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputPassword4">First Name</label>
                    <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                        value={formData.fname}
                        placeholder="First Name"
                        disabled={true}
                    ></input>
                </div>

                <div class="form-group col-md-6">
                    <label for="inputAddress">Last Name</label>
                    <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                        placeholder="Last Name"
                    ></input>
                </div>
            </div>

            <div class="form-group">

                <label for="inputAddress">Mobile Number</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Tel</div>
                    </div>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="+6691234567"
                        value={formData.phone_no}
                        onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
                    ></input>
                </div></div>
            <div class="form-group">
                <label for="inputAddress">E-mail</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="example@email.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                ></input>
            </div>
            <div class="form-group">

                <label className="d-block">Date of Birth</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <i class="fa fa-calendar input-group-text" aria-hidden="true"></i>
                    </div>
                    <DatePicker
                        className="d-block form-control"
                        selected={formData.birthdate}
                        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                        placeholder="dd/mm/yyyy"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-left">
                <header className=" pb-2"><h2> Tell us who you are? </h2></header>
            </div>
            <ul className="nav nav-pills mb-3">
                <li className="list-item">
                    <a
                        className={`nav-link ${formData.isStudent ? "active" : ""}`}
                        onClick={(e) => setFormData({ ...formData, isStudent: true })}
                    >
                        Student
          </a>
                </li>
                <li className="list-item">
                    <a
                        className={`nav-link ${!formData.isStudent ? "bg-success text-white" : ""}`}
                        onClick={(e) => setFormData({ ...formData, isStudent: false })}
                    >
                        Employer
          </a>
                </li>
            </ul>
            {formData.isStudent ? (
                <div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Degree</label>
                            <input
                                type="email"
                                class="form-control"
                                onChange={(e) => setStudent({ ...student, degree: e.target.value })}
                                placeholder="Degree"
                            ></input>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">University</label>
                            <input
                                type="password"
                                class="form-control"
                                onChange={(e) => setStudent({ ...student, university: e.target.value })}
                                placeholder="University"
                            ></input>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputFaculty4">Faculty</label>
                            <input
                                type="text"
                                value=""
                                class="form-control"
                                onChange={(e) => setStudent({ ...student, faculty: e.target.value })}
                                placeholder="Faculty"
                            ></input>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputAddress">Department</label>
                            <input
                                type="text"
                                class="form-control"
                                onChange={(e) => setStudent({ ...student, department: e.target.value })}
                                placeholder="Department"
                            ></input>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputAddress">Field of work</label>
                            <input
                                type="text"
                                class="form-control"
                                onChange={(e) => setStudent({ ...student, fieldofwork: e.target.value })}
                                placeholder="Field of work"
                            ></input>

                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="custom-file">
                            <input
                                type="file"
                                class="custom-file-input"

                            ></input>
                            <label class="custom-file-label" for="inputGroupFile01">
                                Upload Resume
              </label>
                        </div>
                    </div>
                </div>
            ) : (
                    <div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Company</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="Company"
                                ></input>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">Position</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    placeholder="Position"
                                ></input>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputPassword4">Field of works</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    onChange={(e) => setFormData({ ...formData, fieldofwor: e.target.value })}
                                    placeholder="Field of works"
                                ></input>
                            </div>

                        </div>
                    </div>
                )}
            <button type="submit" class="btn btn-primary">
                Sign in
      </button>
        </form>
    );
}
