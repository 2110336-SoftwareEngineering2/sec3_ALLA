import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import inbox_image from "../../assets/nav_photo/inbox.png";
import profile_image from "../../assets/nav_photo/profile.png";
import nisiter_logo from "../../assets/nav_photo/N.png";
import nisiter_logo_1 from "../../assets/nav_photo/N_1.png";
import inbox_image_1 from "../../assets/nav_photo/profile_arrow.png";
import arrow from "../../assets/nav_photo/arrow.png";

export default function Navigation() {
  //return <div><div className="nav-container">NAV</div><div className="nav-spacer"></div></div>;

  const [dropDown, setDropdown] = useState(false);

  return (
    <nav class="navbar navbar-dark  justify-content-space-between position-sticky nav-style">
      <div className="d-flex justify-content-between align-items-center nav-container ">
        <div className="d-flex pr-10">
          <a className="navbar-brand" href="/">
            <img src={nisiter_logo} width="35" />
            <span className="pl-2">
              <img src={nisiter_logo_1} width="50" />{" "}
            </span>
          </a>
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
          {/* <a href="myprofile">
            <button class="btn btn-default">
              <img src={profile_image} width="30" />
            </button>
          </a> */}
          <div className="dropdown-container ">
            <div>
              <button
                class="btn btn-default"
                onClick={() => setDropdown(!dropDown)}
              >
                <span><img src={profile_image} width="33" className = "pr-1" /><img src={arrow} width="15" /></span>
              </button>
            </div>
            <div className="dropdown-item-container position-relative d-flex flex-row-reverse">
              {dropDown ? (
                <div
                  className="dropdown-item position-absolute mt-2 p-3 "

                >
                  <ul className='menu-list d-flex flex-column'>
                    <li><a href="/myprofile" >my profile</a></li>
                    <li><a href="/managejob" >job management</a></li>
                    <li><a href="/login" >log out</a></li>
                  </ul>
                </div>
              ) : (
                  <></>
                )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
