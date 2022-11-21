import React from "react";
import { NavLink } from "react-router-dom";
import Home from "./assets/img/home.png";
import Entregas from "./assets/img/entregas.png";
import Credito from "./assets/img/credito.png";
import Comparativo from "./assets/img/comparativo.png";
import Mantenimiento from "./assets/img/mantenimiento.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="nav-link">
        <NavLink className="link-nav" to="">
          <img className="icon-nav" src={Home} alt="logo" />
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink className="link-nav" to="">
          <img className="icon-nav" src={Entregas} alt="logo" />
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink className="link-nav" to="">
          <img className="icon-nav" src={Mantenimiento} alt="logo" />
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink className="link-nav" to="">
          <img className="icon-nav" src={Comparativo} alt="logo" />
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink className="link-nav" to="">
          <img className="icon-nav" src={Credito} alt="logo" />
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
