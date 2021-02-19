import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import Nisiter from "../../assets/nav_photo/Nisiter.png";
import { useSelector, useDispatch } from 'react-redux';

const Login =   () => {
  const d = useSelector(state => state.Auth);
  console.log('USERNAME',d)
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
            
            <img src={Nisiter} alt="Logo" className="photo_size"></img>
          </header>
          <form>
            <div class="form-group">
              <label for="inputEmail4" className = "font-login">Username</label>
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
              <label for="inputPassword4" className = "font-login">Password</label>
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
export default Login;