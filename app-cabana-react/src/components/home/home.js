import React from "react";
import "./assets/home.css";
import cisettingsFilled from "./assets/cisettingsFilled.svg";
import carbonuserAvatarFi from "./assets/carbonuserAvatarFi.svg";
import group1 from "./assets/group1.svg";
import eparrowUp from "./assets/eparrowUp.svg";
const Home = () => {
  return (
    <div className="portada">
      <div className="flex-container"></div>
      <img className="carbonuser-avatar-fi" src={carbonuserAvatarFi} />
      <div className="flex-container-1">
        <span className="maria-rosales">Maria Rosales</span>
        <img className="cisettings-filled" src={cisettingsFilled} />
      </div>
      <div className="flex-container-2">
        <span>Sección informativa</span>
        <img className="group-1" src={group1} />
      </div>
      <span className="actualizada">Actualizada</span>
      <span className="consulta-liquidacin">Consulta Liquidación, Corte:</span>
      <div className="rectangle-20">
        <span className="corte-3-desde-16-12">
          Corte: 3 Desde: 16-12-2022 Hasta: 31-12-2022
        </span>
        <img className="eparrow-up" src={eparrowUp} />
      </div>
      <button className="rectangle-193">
        <span className="ver-liquidaciones">Ver liquidaciones</span>
      </button>
      <div className="flex-container-3">
        <span className="zafra">Zafra</span>
        <span className="chart-title">Toneladas totales</span>
      </div>
      <div className="flex-container-4">
        <span className="num-2021-2022">2021 - 2022</span>
        <span className="metric">370.57 TM</span>
      </div>
    </div>
  );
};

export default Home;
