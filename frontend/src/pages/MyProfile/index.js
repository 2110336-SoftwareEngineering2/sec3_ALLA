import "./style.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {useHistory} from "react-router-dom";


export default function MyProfile() {


  const userState = useSelector(state => state.Auth);
  const uid = userState.id;
  const token = userState.token;
  const history = useHistory();

  const initProfile = {
    firstName: "supawit",
    lastName: "Sutthiboriban",
    department: "Computer Engineering",
    faculty: "Engineering",
    university: "Chulalongkorn University",
    email: "ssutthiboriban@yahoo.com",
    phoneNumber: "+66862778800",
    resume: "portfolio_url",
    img: "https://picsum.photos/200",
    fields_of_work: "",
    degree: "",
    id: 1,
    sid: 1,
    birthDate: "2021-02-20T18:59:20.255Z",
    type: "STUDENT"

  };

  //   
  // firstName: ""
  // lastName: ""
  // department: ""
  // faculty: ""
  // university: ""
  // email: ""
  // phoneNumber: ""

  // fields_of_work: ""
  // degree: ""
  // id: 1
  // sid: 1
  // birthDate: "2021-02-20T18:59:20.255Z"
  // type: "STUDENT"

  const [profile, setProfile] = useState(initProfile);

  async function onLoadHandler(id, token) {
    await axios.get(`http://127.0.0.1:8300/user/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log('response', response)
        setProfile({
          ...response.data,
          resume: initProfile.resume,
          img: initProfile.img,
          fields_of_work: initProfile.fields_of_work
        })
        return response
      })
      .catch(error => {
        console.log(error)
        return error
      });
  }

  useEffect(() => {
    onLoadHandler(uid, token);
    //set state something
  }, []);


  return (
    <div className="d-flex justify-content-around">
      <div class="form-row">
        <div className="d-flex justify-content-between">
          <form class="md-form p-5">
            <img src={profile.img} class="rounded-circle image-style p-3"></img>

            <div class="d-flex justify-content-center">
              <input type="file" name="file" id="file" class="inputfile" />
              <label for="file" className="addPhoto-style">
                Add or Edit Photo
              </label>
            </div>
          </form>
        </div>
        <form className="p-5">
          <div className="d-flex justify-content-center p-2 name_font-style">
            <text>
              {profile.firstName} {profile.lastName}
            </text>
          </div>
          <div className="d-flex justify-content-left p-2">
            <text>
              <span className="font-weight-bold"> Department : </span>{" "}
              {profile.department}
            </text>
          </div>
          <div className="d-flex justify-content-left p-2">
            <text>
              <span className="font-weight-bold"> Faculty : </span>{" "}
              {profile.faculty}
            </text>
          </div>
          <div className="d-flex justify-content-left p-2">
            <text>
              <span className="font-weight-bold"> University : </span>{" "}
              {profile.university}
            </text>
          </div>
          <div className="d-flex justify-content-left p-2">
            <text>
              <span className="font-weight-bold"> Email : </span>{" "}
              {profile.email}
            </text>
          </div>
          <div className="d-flex justify-content-left p-2">
            <text>
              <span className="font-weight-bold"> Tel : </span>{" "}
              {profile.phoneNumber}
            </text>
          </div>
          <div className="d-flex justify-content-left p-2">
            <button type="button" class="btn btn-primary" onClick = {()=>{history.push("/editprofile")}}>
              {" "}
              Edit Profile{" "}
            </button>
          </div>
        </form>

        {/* <form className="p-5">
          <div className="d-flex justify-content-center">
            <text>
              {profile.firstName} {profile.lastName}
            </text>
          </div>
          <div className="d-flex justify-content-center">
            <text>
              Facalty : {profile.department} {profile.faculty}
            </text>
          </div>
          <div className="d-flex justify-content-center">
            <text>{profile.university}</text>
          </div>
        </form> */}
      </div>
    </div>
  );
}
