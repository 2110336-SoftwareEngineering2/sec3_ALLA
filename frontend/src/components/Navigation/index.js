import React from "react";
import "./style.scss";

export default function Navigation() {
  //return <div><div className="nav-container">NAV</div><div className="nav-spacer"></div></div>;
  return <nav class="navbar navbar-dark bg-dark justify-content-space-between position-sticky">
    <div className="d-flex justify-content-between align-items-center nav-container ">
      <div className="d-flex pr-15">
        <a className="navbar-brand ">NISITER</a>
      </div>
      <div className="d-flex justify-content-center">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
      <div className="d-flex ">
        <a href="" className="pr-2 font-style"> notification </a>
        <a href="" className="pr-2 font-style"> inbox </a>
        <a href="" className="pr-2 font-style"> profile </a>
      </div>
    </div>
  </nav>
}
