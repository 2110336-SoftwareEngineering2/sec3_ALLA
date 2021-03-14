import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import "./style.scss";
import Nisiter from "../../assets/nav_photo/Nisiter.png";
import axios from 'axios';

export default function Login() {
  const location = useLocation();
  console.log(location)
  const history = useHistory();

  const dispatch = useDispatch();
  const AuthState = useSelector(state => state.Auth);

  const initFormData = {
    username: "",
    password: "",
    stayLogin: false,
  };

  const [formData, setFormData] = useState(initFormData);
  //console.log("form obj", formData);

  async function onLoginHandler(e) {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8300/auth/login', {
      "username": formData.username,
      "password": formData.password
    })
      .then(response => {
        console.log('response', response)
        if (response.status === 201) {
          console.log('Auth State', AuthState)
          //dispatch({ type: "LOGIN_SUCCESS", payload: { "id": response.data.id } })
          dispatch({ type: "SET_UID", payload: { "id": response.data.id } })
          dispatch({ type: "SET_ACCESS_TOKEN", payload: { "token": response.data.token } })
          dispatch({ type: "SET_LOGIN_TYPE", payload: { "type": AuthState.login_type } })
          history.push('/')
        return response }
      })
      .catch(error => {
        if(error.response)alert(error.response.data.message)
        console.log(error.response)
        return error
      });
  }


  // useEffect(() => {
  //   console.log('Auth State in useEffect', AuthState)
  //   if (AuthState.isLogin === true) {
  //     history.push('/')
  //   }
  // }, [AuthState.isLogin])



  return (
    <div className="login-container">
      <div className="form-container  Login_backgroud">
        <div className="p-5">
          <header class="d-flex justify-content-center pb-2 font-header">

            <img src={Nisiter} alt="Logo" className="photo_size"></img>
          </header>
          <form onSubmit={onLoginHandler}>
            <div class="form-group">
              <label for="inputEmail4" className="font-login">Username</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder={"username"}
              ></input>
            </div>
            <div class="form-group ">
              <label for="inputPassword4" className="font-login">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder={"password"}
              ></input>
            </div>

            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                ></input>
                <label class="form-check-label font-login" for="gridCheck">
                  Keep me sign in
                </label>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center pb-5">
              <button type="submit" class="btn btn-success">
                Sign in
              </button>
            </div>
            <div class="d-flex justify-content-center pt-5 font-newhere">
              {" "}
              New Here?
              <a href="/register" class="pl-2 font-signup">
                {" "}
                Sign Up{" "}
              </a>
            </div>

            {/* <div class="d-flex flex-column justify-content-center pb-1">
              <button type="submit" class="btn btn-info">
                Student
              </button>
            </div>

            <div class="d-flex flex-column justify-content-center pb-3">
              <button type="submit" class="btn btn-danger">
                Employer
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
