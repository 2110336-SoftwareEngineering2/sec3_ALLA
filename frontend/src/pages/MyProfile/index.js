import "./style.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

async function onLoadHandler(id, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://192.168.1.120:8300/user/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

export default function MyProfile() {

  const userState = useSelector(state => state.Auth);
  const uid = userState.id;
  const token = userState.token;

 /*  useEffect(async () => {
    const data = await onLoadHandler(uid, token);
    console.log("data is: ", data);

    //set state something
  }); */

  const initProfile = {
    fname: "Supawit",
    lname: "Sutthiboriban",
    department: "Computer Engineering",
    faculty: "Engineering",
    university: "Chulalongkorn University",
    email: "ssutthiboriban@yahoo.com",
    phone: "+66862778800",
    resume: "portfolio_url",
    img: "https://picsum.photos/200",
  };

  const [profile, setProfile] = useState(initProfile);
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
              {profile.fname} {profile.lname}
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
              <span className="font-weight-bold"> Phone Number : </span>{" "}
              {profile.phone}
            </text>
          </div>
          <div className="d-flex justify-content-left p-2">
            <button type="button" class="btn btn-primary">
              {" "}
              Edit Profile{" "}
            </button>
          </div>
        </form>

        {/* <form className="p-5">
          <div className="d-flex justify-content-center">
            <text>
              {profile.fname} {profile.lname}
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
