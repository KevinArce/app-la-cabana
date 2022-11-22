import React from "react";
import { NavLink } from "react-router-dom";
import Home from "./assets/img/home.png";
import Entregas from "./assets/img/entregas.png";
import Credito from "./assets/img/credito.png";
import Comparativo from "./assets/img/comparativo.png";
import Mantenimiento from "./assets/img/mantenimiento.png";
import HomeActive from "./assets/img/home-active.png";
import EntregasActive from "./assets/img/entregas-active.png";
import CreditoActive from "./assets/img/credito-active.png";
import ComparativoActive from "./assets/img/comparativo-active.png";
import MantenimientoActive from "./assets/img/mantenimiento-active.png";
import "./assets/navBar.css";

const NavBar = () => {

  

  return (
    <div className="navbar">
      <div className="nav-link">
        <NavLink end className="link-nav" to="/admin">
          <img src={Home} alt="logo" className="icon-nav"/>
          <img src={HomeActive} alt="logo" className="icon-nav-active"/>
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink className="link-nav" to="/admin/entregas">
          <img className="icon-nav" src={Entregas} alt="logo" />
          <img src={EntregasActive} alt="logo" className="icon-nav-active"/>
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink className="link-nav" to="/admin/mantenimiento">
          <img className="icon-nav" src={Mantenimiento} alt="logo" />
          <img src={MantenimientoActive} alt="logo" className="icon-nav-active"/>
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink className="link-nav" to="/admin/comparativo">
          <img className="icon-nav" src={Comparativo} alt="logo" />
          <img src={ComparativoActive} alt="logo" className="icon-nav-active"/>
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink className="link-nav" to="/admin/credito">
          <img className="icon-nav" src={Credito} alt="logo" />
          <img src={CreditoActive} alt="logo" className="icon-nav-active"/>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
