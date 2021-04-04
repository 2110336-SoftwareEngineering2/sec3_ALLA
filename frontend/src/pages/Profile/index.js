import "./style.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import JobPane from "../../components/JobPane";

export default function Profile(props) {
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
    const [contractList, setContractList] = useState([])
    ////////
    const [pendingList, setpendingList] = useState([]);
    const [resultList, setresultList] = useState([]);
    const [onProgressList, setonProgressList] = useState([]);
  
  
    //ยังไม่ได้ ้handle การดึงข้อมูลใหม่หลังเปลี่ยน tab
    
  
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
            .get(`http://127.0.0.1:8300/user/` + props.match.params.uid, {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                },
            })
            .then((response) => {
                console.log("response", response);
                if (response.data.type == "STUDENT") {
                    setStudent({
                        ...response.data,
                        resume: initStudent.resume,
                        img: initStudent.img,
                    });
                    setisStudent(true);
                } else if (response.data.type == "EMPLOYER") {
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

            // await axios
            // .get(`http://127.0.0.1:8300/user/` + props.match.params.uid, {
            //     headers: {
            //         Authorization: "Bearer " + AuthState.token,
            //     },
            // })
            // .then((response) => {
            //     console.log("response", response);
            //     if (response.data.type == "STUDENT") {
            //         setStudent({
            //             ...response.data,
            //             resume: initStudent.resume,
            //             img: initStudent.img,
            //         });
            //         setisStudent(true);
            //     } else if (response.data.type == "EMPLOYER") {
            //         setEmployer({
            //             ...response.data,
            //             img: initEmployer.img,
            //         });
            //         setisStudent(false);
            //     }
            //     return response;
            // })
            // .catch((error) => {
            //     console.log(error);
            //     return error;
            // });
    }

    useEffect(() => {
        onLoadHandler(uid, token);
        //set state something
        getStudentJoblistHandler();
    }, []);

    return (
        <div>
            {isStudent ? (
                <div>
                    <div className="d-flex justify-content-around">
                        <div class="form-row">
                            <div className="d-flex justify-content-between">
                                <form class="md-form p-5">
                                    <img
                                        src={student.img}
                                        class="rounded-circle image-style "
                                    ></img>

                                    <div class="d-flex justify-content-center mt-3">
                                        <button className="btn btn-primary" type="button" >
                                            <a>

                                                go to chat
                                        </a>
                                        </button>

                                    </div>
                                </form>
                            </div>
                            <form className="p-5">
                                <div className="d-flex justify-content-center p-2 name_font-style">
                                    <text>
                                        {student.firstName} {student.lastName}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Department : </span>{" "}
                                        {student.department}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Faculty : </span>{" "}
                                        {student.faculty}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> University : </span>{" "}
                                        {student.university}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Email : </span>{" "}
                                        {student.email}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Tel : </span>{" "}
                                        {student.phoneNumber}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Field of works : </span>{" "}
                                        {student.fields_of_work}
                                    </text>
                                </div>
                                {/* <div className="d-flex justify-content-left p-2">
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
                            </div> */}
                            </form>
                        </div>
                    </div>
                    <h3>Working Record</h3>
                </div>
            ) : (
                <div className="d-flex justify-content-around">
                    <div className="d-flex justify-content-around">
                        <div class="form-row">
                            <div className="d-flex justify-content-between">
                                <form class="md-form p-5">
                                    <img
                                        src={employer.img}
                                        class="rounded-circle image-style "
                                    ></img>

                                    <div class="d-flex justify-content-center mt-3">
                                        <button className="btn btn-primary" type="button" >
                                            <a>

                                                go to chat
                                        </a>
                                        </button>

                                    </div>
                                </form>
                            </div>
                            <form className="p-5">
                                <div className="d-flex justify-content-center p-2 name_font-style">
                                    <text>
                                        {employer.firstName} {employer.lastName}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Company : </span>{" "}
                                        {employer.company}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Position : </span>{" "}
                                        {employer.position}
                                    </text>
                                </div>
                                {/* <div className="d-flex justify-content-left p-2">
                <text>
                  <span className="font-weight-bold"> University : </span>{" "}
                  {employer.university}
                </text>
              </div> */}
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Email : </span>{" "}
                                        {employer.email}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Tel : </span>{" "}
                                        {employer.phoneNumber}
                                    </text>
                                </div>
                                <div className="d-flex justify-content-left p-2">
                                    <text>
                                        <span className="font-weight-bold"> Field of works : </span>{" "}
                                        {employer.fields_of_work}
                                    </text>
                                </div>
                                {/* <div className="d-flex justify-content-left p-2">
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
                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            )
            }

            <JobPane type="STUDENT-ONPROGRESS" onProgressList={onProgressList} />
        
        </div >
    );
}
