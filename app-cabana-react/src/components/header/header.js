import React from "react";
import logo from "./assets/img/logo.png";
import "./assets/header.css";

const Header = (props) => {
  return (
    <div className="header-bg p-0 m-0">
      <div className="d-flex flex-column justify-content-center align-items-center login-header">
        <img className="logo-home" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Header;