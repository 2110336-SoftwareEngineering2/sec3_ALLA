import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./style.scss";
import axios from "axios";

import inbox_image from "../../assets/nav_photo/inbox.png";
import profile_image from "../../assets/nav_photo/profile.png";
import nisiter_logo from "../../assets/nav_photo/N.png";
import nisiter_logo_1 from "../../assets/nav_photo/N_1.png";
import inbox_image_1 from "../../assets/nav_photo/profile_arrow.png";
import arrow from "../../assets/nav_photo/arrow.png";
import noti_image from "../../assets/nav_photo/noti_icon.png";
import NotificationPane from "../../components/NotificationPane";

export default function Navigation() {

  const [profileDropDown, setProfileDropdown] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => { dispatch({ type: "LOGOUT" }) }
  const AuthState = useSelector((state) => state.Auth)
  const JobState = useSelector((state) => state.Job);
  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    setSearchInput(JobState.paramObj.q)
  }, [JobState.paramObj.q])
  const searchSubmitHandler = () => {
    history.push(`/?q=${searchInput}`)
  }

  function resetDropDown() {
    setNotificationDropDown(false);
    setProfileDropdown(false);
  }

  const [notificationList,setNotificationList] = useState([]);
  const [checkNotiList,setCheckNotiList] = useState([]);


  async function getUserEventlistWhenClick() {
    await axios
      .get(`http://127.0.0.1:8300/event-log/user/` + AuthState.id, {
        headers: {
          Authorization: "Bearer " + AuthState.token,
        },
      })
      .then((response) => {
        console.log("response for noti", response.data);
        setNotificationList(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  const notificationDisplay = () => {
    // console.log("function",notificationList); 
    return <div className="list-container d-flex justify-content-center">
      <div>
        <NotificationPane list={notificationList} />
      </div>
    </div>
  }

  useEffect(() => {
    //join socket
    //create Chat
    setInterval(() => {
      // console.log("check noti len",checkNotiList.length)
      getUserEventlistWhenClick()
    }, 1000);
  }, [])
 
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
        <div>
          <form className="d-flex  justify-content-around " onSubmit={searchSubmitHandler}>
            <input
              class="form-control"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
            ></input>
            <button className="btn btn-success" type="submit">
              Search
          </button>
          </form>
        </div>
        <div className="d-flex ">
          <button class="btn btn-default" onClick={() => history.push(`/chat/${AuthState.id}`)}>
            <img src={inbox_image} width="33" className="pr-1" />
          </button>
          {/* for Notification Icon */}
          <div className="dropdown-container ">
            <div>
              <button
                class="btn btn-default"
                onClick={() => {
                  resetDropDown();
                  setNotificationDropDown(!notificationDropDown);
                }}
              >
                <img src={noti_image} width="33" className="" /><img src={arrow} width="15" />
              </button>
            </div>
            <div className="dropdown-item-container position-relative d-flex flex-row-reverse">
              {notificationDropDown ? (
                <div className="dropdown-item position-absolute p-3 justify-content-left notification-scrolling-style">
                  <div className="justify-content-left border-bottom border-dark">
                    <text className="text-weight-bold">
                      Notification
                    </text>
                  </div>
                  <div>
                    {notificationDisplay()}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* <button class="btn btn-default" onClick={() => history.push('/')}> 
            <img src={noti_image} width="30" />
          </button> */}
          <div className="dropdown-container ">
            <div>
              <button
                class="btn btn-default"
                onClick={() => {
                  resetDropDown();
                  setProfileDropdown(!profileDropDown)
                }}
              >
                <span><img src={profile_image} width="33" className="pr-1" /><img src={arrow} width="15" /></span>
              </button>
            </div>
            <div className="dropdown-item-container position-relative d-flex flex-row-reverse">
              {profileDropDown ? (
                <div
                  className="dropdown-item position-absolute mt-2 p-3 "

                >
                  <ul className='menu-list d-flex flex-column'>
                    <li><a href="/myprofile" >my profile</a></li>
                    <li><a href="/managejob" >job management</a></li>
                    <li><a href="/login" onClick={logoutHandler}>log out</a></li>
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
