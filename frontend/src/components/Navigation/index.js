import React from "react";
import "./style.scss";
import inbox_image from "../../assets/nav_photo/inbox.png";
import profile_image from "../../assets/nav_photo/user.png";

export default function Navigation() {
  //return <div><div className="nav-container">NAV</div><div className="nav-spacer"></div></div>;
  return (
    <nav class="navbar navbar-dark  justify-content-space-between position-sticky nav-style">
      <div className="d-flex justify-content-between align-items-center nav-container ">
        <div className="d-flex pr-10">
          <a className="navbar-brand" href="/">NISITER</a>
        </div>
        <div className="d-flex justify-content-around ">
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button class="btn btn-success" type="submit">
            Search
          </button>
        </div>
        <div className="d-flex ">
          <button class="btn btn-default">
            <img src={inbox_image} width="30" />
          </button>
          <a href="myprofile">
            <button class="btn btn-default">
              <img src={profile_image} width="30" />
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
