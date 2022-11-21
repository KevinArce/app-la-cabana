import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/home";
import Comparativo from "../components/comparativo/comparativo";


const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparativo" element={<Comparativo />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
