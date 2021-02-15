import React, { useCallback, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./style.scss";
import DatePicker from "react-datepicker";

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
  const [formData, setFormData] = useState(initFormData);
  const [value, setValue] = useState();
  
  console.log(value);
  return (
    <form className="form-container">
      <header> Register</header>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Username</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            placeholder="Username"
          ></input>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword4"
            placeholder="Password"
          ></input>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPassword4">First Name</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword4"
            placeholder="First Name"
          ></input>
        </div>

        <div class="form-group col-md-6">
          <label for="inputAddress">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="Last Name"
          ></input>
        </div>
      </div>

      <div class="form-group">
        <label for="inputAddress2">Mobile Number</label>
        <PhoneInput
          //country="TH"
          placeholder="Enter phone number"
          value={"+66" + value}
          onChange={setValue}
        />
      </div>
      <div class="form-group">
        <label for="inputAddress">E-mail</label>
        <input
          type="text"
          class="form-control"
          id="inputAddress"
          placeholder="example@email.com"
        ></input>
      </div>
      <DatePicker
        selected={formData.birthdate}
        onChange={(date) => setFormData({...formData.birthdate=date})}
      />
      <ul className="nav nav-pills mb-3">
        <li className="list-item">
          <a
            className={`nav-link ${formData.isStudent ? "active" : ""}`}
            onClick={() => setFormData({...formData,isStudent:true})}
          >
            Student
          </a>
        </li>
        <li className="list-item">
          <a
            className={`nav-link ${!formData.isStudent ? "active" : ""}`}
            onClick={() => setFormData({...formData,isStudent:false})}
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
                id="inputEmail4"
                placeholder="Degree"
              ></input>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">University</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
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
                id="inputFaculty4"
                placeholder="Faculty"
              ></input>
            </div>

            <div class="form-group col-md-6">
              <label for="inputAddress">Department</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
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
                id="inputAddress"
                placeholder="Field of work"
              ></input>
            </div>
          </div>
          <div class="input-group mb-3">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile01"
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
              <label for="inputEmail4">Username</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Username"
              ></input>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="Password"
              ></input>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPassword4">First Name</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="First Name"
              ></input>
            </div>

            <div class="form-group col-md-6">
              <label for="inputAddress">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Last Name"
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
