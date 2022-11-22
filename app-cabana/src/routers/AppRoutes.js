import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/home";
import Comparativo from "../components/comparativo/comparativo";
import Credito from "../components/credito/credito";
import Entregas from "../components/entregas/entregas";
import Mantenimiento from "../components/mantenimiento/mantenimiento";


const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparativo" element={<Comparativo />} />
        <Route path="/credito" element={<Credito />} />
        <Route path="/entregas" element={<Entregas />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
