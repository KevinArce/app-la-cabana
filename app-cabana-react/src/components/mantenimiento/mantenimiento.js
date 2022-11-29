import React from "react";

import "./mantenimiento.css";
import group1 from "./assets/group1.svg";
import eparrowUp1 from "./assets/eparrowUp1.svg";

const Mantenimiento = () => {
  return (
    <div className="mantenimiento">
      <div className="flex-container">
      </div>
      <div className="flex-container-1">
        <span className="mantenimiento-de-lot">Mantenimiento de Lotes</span>
        <img className="group-1" src={group1} />
      </div>
      <select className="rectangle-20">
        <option className="num-2022-2023">2022-2023</option>
      </select>
      <button className="rectangle-193">
        <span className="seleccione-una-finca">Seleccione una finca</span>
        <img className="eparrow-up-1" src={eparrowUp1} />
      </button>
      <span className="lotes">Lotes</span>
    </div>
  );
};

export default Mantenimiento;
