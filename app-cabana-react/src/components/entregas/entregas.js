import React from "react";
import "./entregas.css";
import vector35 from "./assets/vector35.svg";
import eparrowUp from "./assets/eparrowUp.svg";
import group8 from "./assets/group8.svg";
import ZafraIndex from "../home/home";

const Entregas = () => {
  return (
    <div className="entregas">
      <div className="mt-3 flex-container-2">
        <div className="mb-0">
          <span className="txt-custom01">Entregas de envios</span>
          <img className="group-1" src={group8} alt="group" />
        </div>

        <select className="dropdown-custom">
          <option value="volvo">Zafra</option>
          <option value="saab">Saab</option>
        </select>
      </div>
      <div className="mt-4 padding-custom">
        <p className="txt-note-desc-2">Nota</p>
        <p className="txt-note-desc">
          *Datos iniciales a eficienta al 85% se actualizarán a eficiencia de
          fabrica al cierre de cada corte.
        </p>
      </div>
      <div className="mt-3 flex-container-2">
        <div className="mb-0">
          <span className="txt-custom01">Detalles de envio</span>
        </div>

        <div className="container-multi-btn">
          <button className="btn-action">Copy</button>
          <button className="btn-action">Excel</button>
          <button className="btn-action">PDF</button>
        </div>
      </div>
      
      
    </div>
  );
};

export default Entregas;
