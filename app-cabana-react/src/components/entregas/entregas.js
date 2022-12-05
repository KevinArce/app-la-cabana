import React from "react";

import "./entregas.css";
import vector35 from "./assets/vector35.svg";
import eparrowUp from "./assets/eparrowUp.svg";
import group8 from "./assets/group8.svg";

const Entregas = () => {
  return (
    <div className="entregas">
      <div className="flex-container"></div>
      <div className="flex-container-1">
        <span>Entregas de envios</span>
        <img className="group-8" src={group8} alt="group" />
      </div>
      <div className="rectangle-20">
        <div className="flex-container-2">
          <span className="zafra">Zafra</span>
          <span className="num-2021-2022">2021 - 2022</span>
        </div>
        <img className="eparrow-up" src={eparrowUp} alt="group" />
      </div>
      <span className="chart-subtitle">Nota</span>
      <span className="chart-subtitle-1">
        *Datos iniciales a eficienta al 85% se actualizarán a eficiencia de
        fabrica al cierre de cada corte.
      </span>
      <span className="detalles-de-envio">Detalles de envio</span>
      <div className="flex-container-3">
        <div className="rectangle-21">
          <span className="copy">Copy</span>
        </div>
        <button className="rectangle-209">Excel</button>
        <button className="rectangle-210">
          <span className="pdf">PDF</span>
        </button>
      </div>
      <div className="rectangle-211">
        <span className="fecmov">FECMOV</span>
        <span>NOENVIO</span>
        <span className="finca">FINCA</span>
        <span className="nomlote">NOMLOTE</span>
      </div>
      <div className="flex-container-4">
        <span className="num-2021-12-22">2021-12-22</span>
        <span className="num-898136">898136</span>
        <span className="la-cabaa">LA CABAÑA</span>
        <span>LA PISTA</span>
      </div>
      <img className="vector-35" src={vector35} alt="group" />
      <div className="flex-container-5">
        <span className="num-2021-12-22-1">2021-12-22</span>
        <span className="num-898135">898135</span>
        <span className="la-cabaa-1">LA CABAÑA</span>
        <span className="la-pista">LA PISTA</span>
      </div>
      <img className="vector-36" src={vector35} alt="group" />
      <div className="flex-container-6">
        <span className="num-2021-12-26">2021-12-26</span>
        <span className="num-1016140">1016140</span>
        <span className="la-cabaa-2">LA CABAÑA</span>
        <span>TINTERAL #4</span>
      </div>
      <img className="vector-37" src={vector35} alt="group" />
      <div className="flex-container-7">
        <span className="num-2021-12-26-1">2021-12-26</span>
        <span className="num-1016139">1016139</span>
        <span className="la-cabaa-3">LA CABAÑA</span>
        <span>TINTERAL #4</span>
      </div>
      <img className="vector-38" src={vector35} alt="group" />
      <div className="flex-container-8">
        <span className="num-2021-12-26-2">2021-12-26</span>
        <span className="num-1016138">1016138</span>
        <span className="la-cabaa-4">LA CABAÑA</span>
        <span>TINTERAL #4</span>
      </div>
      <img className="vector-40" src={vector35} alt="group" />
      <div className="flex-container-9">
        <span className="num-2021-12-26-3">2021-12-26</span>
        <span className="num-1016137">1016137</span>
        <span className="la-cabaa-5">LA CABAÑA</span>
        <span>TINTERAL #4</span>
      </div>
      <img className="vector-39" src={vector35} alt="group" />
      <div className="flex-container-10">
        <span className="num-2021-12-27">2021-12-27</span>
        <span className="num-1016144">1016144</span>
        <span className="la-cabaa-6">LA CABAÑA</span>
        <span>TINTERAL #4</span>
      </div>
    </div>
  );
};

export default Entregas;
