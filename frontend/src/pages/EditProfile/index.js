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
import RequireAuth from "../../components/RequireAuth";

export default function Register() {
  // const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.Auth);
  const uid = AuthState.id;
  const token = AuthState.token;
  console.log(AuthState.login_type);

  const initStudent = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    birthDate: "",
    university: "",
    degree: "",
    faculty: "",
    department: "",
    fields_of_work: "",
    resume: "",
    img: "",
  };

  const initEmployer = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    birthDate: "",
    company: "",
    fields_of_work: "",
    position: "",
    img: "",
  };

  const [student, setStudent] = useState(initStudent);
  const [employer, setEmployer] = useState(initEmployer);
  const [isStudent, setisStudent] = useState(true);

  async function sendUpdateProfile(e) {
    console.log(AuthState.token);
    e.preventDefault();
    let differnt = {};
    if (isStudent) {
      differnt = {
        firstName: student.firstName,
        lastName: student.lastName,
        phoneNumber: student.phoneNumber,
        birthDate: student.birthDate,
        university: student.university,
        faculty: student.faculty,
        degree: student.degree,
        department: student.department,
        fields_of_work: student.fields_of_work,
      };
    } else if (!isStudent) {
      differnt = {
        firstName: employer.firstName,
        lastName: employer.lastName,
        phoneNumber: employer.phoneNumber,
        birthDate: employer.birthDate,
        company: employer.company,
        position: employer.position,
        fields_of_work: employer.fields_of_work,
      };
    }
    await axios
      .patch("http://127.0.0.1:8300/user/" + uid, differnt, {
        headers: {
          Authorization: "Bearer " + AuthState.token,
        },
      })
      .then((response) => {
        history.push("/myprofile")
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onLoadHandler(id, token) {
    if (id) {
      await axios
        .get(`http://127.0.0.1:8300/user/${id}`, {
          headers: {
            Authorization: "Bearer " + AuthState.token,
          },
        })
        .then((response) => {
          console.log("response", response);
          if (AuthState.login_type == "STUDENT") {
            setStudent({
              ...response.data,
              resume: initStudent.resume,
              img: initStudent.img,
            });
            setisStudent(true);
          } else if (AuthState.login_type == "EMPLOYER") {
            setEmployer({
              ...response.data,
              img: initEmployer.img,
            });
            setisStudent(false);
          }
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    }
  }
  useEffect(() => {
    onLoadHandler(uid, token);
    //set state something
  }, [uid]);
  return (
    <div>
      {isStudent ? (
        <div>
          <form
            className="register-form-container"
            onSubmit={sendUpdateProfile}
          >
            <div className="d-flex justify-content-left">
              <header className=" pb-2 font-login">
                <h1> Edit your profile </h1>
              </header>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 font-login">
                <label for="inputPassword4">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) =>
                    setStudent({ ...student, firstName: e.target.value })
                  }
                  value={student.firstName}
                  placeholder="First Name"
                ></input>
              </div>

              <div class="form-group col-md-6 font-login">
                <label for="inputAddress">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) =>
                    setStudent({ ...student, lastName: e.target.value })
                  }
                  value={student.lastName}
                  placeholder="Last Name"
                ></input>
              </div>
            </div>

            <div class="form-group">
              <label for="inputAddress" className="font-login">
                Mobile Number
              </label>
              <small className="font-login"> (Format: xxx-xxx-xxxx) </small>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Tel</div>
                </div>
                <input
                  type="tel"
                  required
                  //id="telNo"
                  //name="telNo"
                  class="form"
                  placeholder="091-234-5678"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={student.phoneNumber}
                  onChange={(e) =>
                    setStudent({ ...student, phoneNumber: e.target.value })
                  }
                ></input>
                <span></span>
              </div>
            </div>

            <div class="form-group">
              <label className="d-block" className="font-login">
                Date of Birth
              </label>
              <div class="input-group">
                {/* <div class="input-group-prepend">
                        <i class="fa fa-calendar input-group-text" aria-hidden="true"></i>
                    </div> */}
                <input
                  type="date"
                  value={student.birthDate}
                  onChange={(e) =>
                    setStudent({ ...student, birthDate: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="font-login">Degree</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      setStudent({ ...student, degree: e.target.value });
                      console.log(student);
                    }}
                    value={student.degree}
                    placeholder="Degree"
                  ></input>
                </div>
                <div class="form-group col-md-6">
                  <label className="font-login">University</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) =>
                      setStudent({ ...student, university: e.target.value })
                    }
                    value={student.university}
                    placeholder="University"
                  ></input>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="font-login">Faculty</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      setStudent({ ...student, faculty: e.target.value });
                      console.log(student);
                    }}
                    value={student.faculty}
                    placeholder="Faculty"
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label className="font-login">Department</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      setStudent({ ...student, department: e.target.value });
                      console.log(student);
                    }}
                    value={student.department}
                    placeholder="Department"
                  ></input>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="font-login">Fields of work</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) =>
                      setStudent({ ...student, fields_of_work: e.target.value })
                    }
                    value={student.fields_of_work}
                    placeholder="Fields of work"
                  ></input>
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input type="file" class="custom-file-input"></input>
                  <label class="custom-file-label" for="inputGroupFile01">
                    Edit Resume
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-success">
              Confirm Change
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form
            className="register-form-container"
            onSubmit={sendUpdateProfile}
          >
            <div className="d-flex justify-content-left">
              <header className=" pb-2 font-login">
                <h1> Edit your profile </h1>
              </header>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 font-login">
                <label for="inputPassword4">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) =>
                    setEmployer({ ...employer, firstName: e.target.value })
                  }
                  value={employer.firstName}
                  placeholder="First Name"
                ></input>
              </div>

              <div class="form-group col-md-6 font-login">
                <label for="inputAddress">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) =>
                    setEmployer({ ...employer, lastName: e.target.value })
                  }
                  value={employer.lastName}
                  placeholder="Last Name"
                ></input>
              </div>
            </div>

            <div class="form-group">
              <label for="inputAddress" className="font-login">
                Mobile Number
              </label>
              <small className="font-login"> (Format: xxx-xxx-xxxx) </small>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Tel</div>
                </div>
                <input
                  type="tel"
                  required
                  //id="telNo"
                  //name="telNo"
                  class="form"
                  placeholder="091-234-5678"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={employer.phoneNumber}
                  onChange={(e) =>
                    setEmployer({ ...employer, phoneNumber: e.target.value })
                  }
                ></input>
                <span></span>
              </div>
            </div>

            <div class="form-group">
              <label className="d-block" className="font-login">
                Date of Birth
              </label>
              <div class="input-group">
                {/* <div class="input-group-prepend">
                        <i class="fa fa-calendar input-group-text" aria-hidden="true"></i>
                    </div> */}
                <input
                  type="date"
                  value={employer.birthDate}
                  onChange={(e) =>
                    setEmployer({ ...employer, birthDate: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="font-login">Company</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      setEmployer({ ...employer, company: e.target.value });
                    }}
                    value={employer.company}
                    placeholder="Company"
                  ></input>
                </div>
                <div class="form-group col-md-6">
                  <label className="font-login">Position</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) =>
                      setEmployer({ ...employer, position: e.target.value })
                    }
                    value={employer.position}
                    placeholder="Position"
                  ></input>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="font-login">Fields of work</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) =>
                      setEmployer({
                        ...employer,
                        fields_of_work: e.target.value,
                      })
                    }
                    value={employer.fields_of_work}
                    placeholder="Fields of work"
                  ></input>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-success">
              Confirm Change
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
