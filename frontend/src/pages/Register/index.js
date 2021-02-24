import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-phone-number-input/style.css";
import "./style.scss";
import axios from "axios";

//import PhoneInput from "react-phone-number-input";
//import DatePicker from "react-datepicker";
//import Select from "react-dropdown-select";

import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
  // const location = useLocation();
  const history = useHistory();
  // const dispatch = useDispatch();
  // const AuthState = useSelector((state) => state.Auth);

  const initFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    birthDate: "",
  };
  const initStudent = {
    university: "",
    degree: "",
    faculty: "",
    department: "",
    fields_of_work: "",
    //resume: "",
  };

  const initEmployer = {
    company: "",
    fields_of_work: "",
    position: "",
  };

  const [student, setStudent] = useState(initStudent);
  const [formData, setFormData] = useState(initFormData);
  const [employer, setEmployer] = useState(initEmployer);
  const [isStudent, setisStudent] = useState(true)

  function toggle() {
    var x = document.getElementById("myPW");
    if (x.type == "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    console.log(x.type);
  }

  function validateForm() {
    if (
      formData.username == "" ||
      formData.password == "" ||
      formData.firstName == "" ||
      formData.lastName == "" ||
      formData.phoneNumber == "" ||
      formData.email == "" ||
      formData.birthDate == ""
    )
      return false;
    if (isStudent) {
      return (
        student.university == "" ||
        student.degree == "" ||
        student.faculty == "" ||
        student.department == "" ||
        student.fields_of_work == ""
      );
    } else {
      return (
        employer.company == "" ||
        employer.fields_of_work == "" ||
        employer.position == ""
      );
    }
  }
  const [invalidStatus, setinvalidStatus] = useState({ 'username': false, 'email': false })

  useEffect(() => {
    checkUsername()
  }, [formData.username])
  useEffect(() => {
    checkEmail()
  }, [formData.email])

  async function checkUsername() {
    await axios
      .post("http://127.0.0.1:8300/user/check-username", {
        username: formData.username,
      })
      .then((response) => {
        setinvalidStatus({ ...invalidStatus, username: response.data }) //response data is true if invalid

        return (response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function checkEmail() {
    await axios
      .post("http://127.0.0.1:8300/user/check-email", {
        email: formData.email,
      })
      .then((response) => {
        setinvalidStatus({ ...invalidStatus, email: response.data }) //response data is true if invalid
        console.log('mail ver', response)
        return (response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function sendVerificationMail(id) {
    await axios
      .get(`http://127.0.0.1:8300/auth/email/send-verification/${id}`)
      .then((response) => {
        console.log("response send-verification", response);
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error;
      });
  }

  async function onRegisterHandler(e) {
    e.preventDefault();
    if (!validateForm) {
      alert("every blanks must be filled out");
      return;
    }
    //if (!validInput) return;

    if (isStudent) {
      await axios
        .post("http://127.0.0.1:8300/user", {
          ...formData,
          ...student,
          type: "STUDENT",
        })
        .then((response) => {
          //console.log("response", response);
          if (response.status === 201) {
            // console.log("response", response);
            sendVerificationMail(response.data.id)
            alert("A verification link has been sent to your email account!   If you do not find the email, please check your spam folder");
            history.push('/login')
          }
          return response;
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error.response);
          return error;
        });
    } else {
      await axios
        .post("http://127.0.0.1:8300/user", {
          ...formData,
          ...employer,
          type: "EMPLOYER",
        })
        .then((response) => {
          if (response.status === 201) {
            console.log('response', response)
            sendVerificationMail(response.data.id)
            alert("A verification link has been sent to your email account!   If you do not find the email, please check your spam folder");
            history.push('/login')
          }
          return response;
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error.response);
          return error;
        });
    }



  }



  return (
    <form className="register-form-container" onSubmit={onRegisterHandler}>
      <div className="d-flex justify-content-left">
        <header className=" pb-2">
          <h1> Register </h1>
        </header>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            pattern=".{8,}"
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            placeholder="Username"
          ></input>
          {invalidStatus.username ? <small>this username is already taken</small> : <></>}
        </div>
        <div class="form-group col-md-6">

          <label for="inputPassword4">Password</label>
          <small> ( {">"}=8 lowercase uppercase) </small>

          <div className="d-flex flex-row position-relative justify-content-end align-items-center">
            <input
              type="password"
              class="form-control"
              id="myPW"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            ></input>
            <input className="position-absolute mr-2" type="checkbox" onClick={toggle}></input>
          </div>
          <span class="validity"></span>
          <br></br>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPassword4">First Name</label>
          <input
            type="text"
            class="form-control"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            value={formData.firstName}
            placeholder="First Name"
          ></input>
        </div>

        <div class="form-group col-md-6">
          <label for="inputAddress">Last Name</label>
          <input
            type="text"
            class="form-control"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            placeholder="Last Name"
          ></input>
        </div>
      </div>

      <div class="form-group">
        <label for="inputAddress">Mobile Number</label>
        <small> (Format: xxx-xxx-xxxx) </small>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Tel</div>
          </div>
          <input
            type="tel"
            required
            id="telNo"
            name="telNo"
            class="form"
            placeholder="091-234-5678"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          ></input>
          <span class="validity"></span>
        </div>
      </div>
      <div class="form-group">
        <label for="inputAddress">E-mail</label>
        <input
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          class="form-control"
          placeholder="example@email.com"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        ></input>
        {invalidStatus.email ? <small>this email is already taken</small> : <></>}
        <span class="validity"></span><br></br>
      </div>
      <div class="form-group">
        <label className="d-block">Date of Birth</label>
        <div class="input-group">
          {/* <div class="input-group-prepend">
                        <i class="fa fa-calendar input-group-text" aria-hidden="true"></i>
                    </div> */}
          <input
            type="date"
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
          ></input>
        </div>
      </div>
      <div className="d-flex justify-content-left">
        <header className=" pb-2">
          <h2> Tell us who you are? </h2>
        </header>
      </div>
      <ul className="nav nav-pills mb-3">
        <li className="list-item">
          <a
            className={`nav-link ${isStudent ? "active" : ""}`}
            onClick={(e) => setisStudent(true)}
          >
            Student
          </a>
        </li>
        <li className="list-item">
          <a
            className={`nav-link ${!isStudent ? "active" : ""}`}
            onClick={(e) => setisStudent(false)}
          >
            Employer
          </a>
        </li>
      </ul>
      {isStudent ? (
        <div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Degree</label>
              <input
                type="text"
                class="form-control"
                onChange={(e) =>
                  setStudent({ ...student, degree: e.target.value })
                }
                placeholder="Degree"
              ></input>
            </div>
            <div class="form-group col-md-6">
              <label>University</label>
              <input
                type="text"
                class="form-control"
                onChange={(e) =>
                  setStudent({ ...student, university: e.target.value })
                }
                placeholder="University"
              ></input>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputFaculty4">Faculty</label>
              <input
                type="text"
                class="form-control"
                onChange={(e) =>
                  setStudent({ ...student, faculty: e.target.value })
                }
                placeholder="Faculty"
              ></input>
            </div>

            <div class="form-group col-md-6">
              <label for="inputAddress">Department</label>
              <input
                type="text"
                class="form-control"
                onChange={(e) =>
                  setStudent({ ...student, department: e.target.value })
                }
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
                onChange={(e) =>
                  setStudent({ ...student, fields_of_work: e.target.value })
                }
                placeholder="Field of work"
              ></input>
            </div>
          </div>
          <div class="input-group mb-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input"></input>
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
                  onChange={(e) =>
                    setEmployer({ ...formData, company: e.target.value })
                  }
                  placeholder="Company"
                ></input>
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Position</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) =>
                    setEmployer({ ...formData, position: e.target.value })
                  }
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
                  onChange={(e) =>
                    setEmployer({ ...formData, fields_of_work: e.target.value })
                  }
                  placeholder="Field of works"
                ></input>
              </div>
            </div>
          </div>
        )}
      <button type="submit" class="btn btn-success">
        Create account
      </button>
    </form>
  );
}
