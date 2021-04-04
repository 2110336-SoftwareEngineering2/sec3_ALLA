import "./style.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import JobPane from "../../components/JobPane";

export default function MyProfile() {
  const userState = useSelector((state) => state.Auth);
  const uid = userState.id;
  const token = userState.token;
  const history = useHistory();
  const AuthState = useSelector((state) => state.Auth);

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
    img: "https://picsum.photos/202",
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
    img: "https://picsum.photos/202",
  };

  const [student, setStudent] = useState(initStudent);
  const [employer, setEmployer] = useState(initEmployer);
  const [isStudent, setisStudent] = useState(true);

  const [pendingList, setpendingList] = useState([]);
  const [resultList, setresultList] = useState([]);
  const [onProgressList, setonProgressList] = useState([]);

  async function getStudentJoblistHandler() {
    await axios
      .get(`http://127.0.0.1:8300/user/jobManagement/` + AuthState.id, {
        headers: {
          Authorization: "Bearer " + AuthState.token,
        },
      })
      .then((response) => {
        console.log("response", response);
        setpendingList(response.data.record.pending);
        setresultList(response.data.record.waiting);
        setonProgressList(response.data.contract);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  async function onLoadHandler(id, token) {
    await axios
      .get(`http://127.0.0.1:8300/user/` + AuthState.id, {
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
  const getEmployerProfile = () => {
    return (
      <div className="d-flex justify-content-around">
        <div className="d-flex justify-content-around">
          <div class="form-row">
            <div className="d-flex justify-content-between">
              <form class="md-form p-5">
                <img
                  src={employer.img}
                  class="rounded-circle image-style"
                ></img>
                <div class="d-flex justify-content-center">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    class="inputfile"
                  />
                  <label for="file" className="addPhoto-style">
                    Add or Edit Photo
                  </label>
                </div>
              </form>
            </div>
            <div className="p-5">
              <div className="d-flex justify-content-center p-2 name_font-style ">
                {employer.firstName} {employer.lastName}
              </div>
              <div className="d-flex justify-content-left p-2">
                <span className="font-weight-bold"> Company : </span>{" "}
                {employer.company}
              </div>
              <div className="d-flex justify-content-left p-2">
                <span className="font-weight-bold"> Position : </span>{" "}
                {employer.position}
              </div>
              <div className="d-flex justify-content-left p-2">
                <span className="font-weight-bold"> Email : </span>{" "}
                {employer.email}
              </div>
              <div className="d-flex justify-content-left p-2">
                <span className="font-weight-bold"> Tel : </span>{" "}
                {employer.phoneNumber}
              </div>
              <div className="d-flex justify-content-left p-2">
                <span className="font-weight-bold"> Field of works : </span>{" "}
                {employer.fields_of_work}
              </div>
              <div className="d-flex justify-content-left p-2">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    history.push("/editprofile");
                  }}
                >
                  {" "}
                  Edit Profile{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const getStudentProfile = () => {
    return (
      <div className="d-flex flex-column ">
        <div className="detail-container d-flex flex-column justify-content-left ">
          <div className="d-flex justify-content-center ">
            <form class="md-form  ">
              <div class="d-flex justify-content-center pb-3">
                <img
                  src={student.img}
                  class="rounded-circle image-style m-3"
                ></img>
              </div>
              <div class="d-flex justify-content-center">
                <input type="file" name="file" id="file" class="inputfile" />
                <label for="file" className="addPhoto-style">
                  Add or Edit Photo
                </label>
              </div>
            </form>
          </div>
          <div className="d-flex justify-content-left p-2 name_font-style">
            {student.firstName} {student.lastName}
          </div>
          <div className="d-flex justify-content-left p-2">
            <span className="font-weight-bold"> Department : </span>{" "}
            {student.department}
          </div>
          <div className="d-flex justify-content-left p-2">
            <span className="font-weight-bold"> Faculty : </span>{" "}
            {student.faculty}
          </div>
          <div className="d-flex justify-content-left p-2">
            <span className="font-weight-bold"> University : </span>{" "}
            {student.university}
          </div>
          <div className="d-flex justify-content-left p-2">
            <span className="font-weight-bold"> Email : </span>{" "}
            {student.email}
          </div>
          <div className="d-flex justify-content-left p-2">
            <span className="font-weight-bold"> Tel : </span>{" "}
            {student.phoneNumber}
          </div>
          <div className="d-flex justify-content-left p-2">
            <span className="font-weight-bold"> Field of works : </span>{" "}
            {student.fields_of_work}
          </div>
          <div className="d-flex justify-content-left p-2 mt-3">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                history.push("/editprofile");
              }}
            >
              {" "}
                Edit Profile{" "}
            </button>
          </div>
        </div>

      </div>
    )
  }
  useEffect(() => {
    onLoadHandler(uid, token);
    //set state something
    getStudentJoblistHandler();
  }, []);

  return (
    <div className=" d-flex flex-column">
      {isStudent ? getStudentProfile() : getEmployerProfile()}
      <div className="cardpane-container d-flex flex-column col-sm-10 col-md-8 col-lg-8">
        <h4>Working History</h4>
        <div className="d-flex">
          <JobPane type="STUDENT-ONPROGRESS" onProgressList={onProgressList} />
        </div>
      </div>

    </div>
  );
}
