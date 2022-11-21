import React from "react";
import Header from "../header/header";
import NavBar from "../navBar/navBar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
      <NavBar />
    </div>
  );
};


export default Layout;
