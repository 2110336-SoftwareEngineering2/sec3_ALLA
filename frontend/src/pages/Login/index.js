import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import Welcome from "../../assets/logo/welcome_logo.png";
import {useSelector,useDispatch} from 'react-redux';

export default function Login() {
  //const dispatch = useDispatch()
  const data= useSelector(state => state.Auth);
  //const dispatch = useDispatch();
  console.log('before test')
  //dispatch({type:"TEST"})
  console.log('username',data)
  console.log('after test')
  const initFormData = {
    username: "",
    password: "",
    stayLogin: false,
  };
  const [formData, setFormData] = useState(initFormData);
  //console.log("form obj", formData);
  
  return (
    <div>
      Login
      <div className="form-container border border-dark Login_backgroud">
        <div className="p-5">
          <header class="d-flex justify-content-center pb-2 font-header">
            
            <img src={Welcome} alt="Logo" className="photo_size"></img>
          </header>
          <form>
            <div class="form-group">
              <label for="inputEmail4">Username</label>
              <input
                type="email"
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
              <label for="inputPassword4">Password</label>
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
                <label class="form-check-label" for="gridCheck">
                  Keep me sign in
                </label>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center pb-5">
              <button type="submit" class="btn btn-primary">
                Sign in
              </button>
            </div>
            <div class="d-flex justify-content-center pt-5  font-newhere">
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
