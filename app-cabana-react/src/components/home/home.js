import React from "react";
import "./assets/home.css";
import cisettingsFilled from "./assets/cisettingsFilled.svg";
import carbonuserAvatarFi from "./assets/carbonuserAvatarFi.svg";
import group1 from "./assets/group1.svg";
import eparrowUp from "./assets/eparrowUp.svg";
import serviceApi from "../../services/services";
const Home = () => {
  
  const nomProv = localStorage.getItem("nomProv");

  //Use serviceApi to get the data from the server and display it in the class num-2021-2022
  serviceApi.get("index").then((response) => {
    localStorage.setItem("data", JSON.stringify(response.data));
    console.log(response);
    if (response.data.error === 0) {
      return response.data;

    } else {
      return "No data";
    }
  }
  );

  return (
    <div className="portada">
      <div className="flex-container"></div>
      <img className="carbonuser-avatar-fi" src={carbonuserAvatarFi} />
      <div className="flex-container-1">
        <span className="maria-rosales">{localStorage.getItem("nomProv")}</span>
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
        <span className="num-2021-2022">
          {localStorage.getItem("data")} 
        </span>
        <span className="metric">370.57 TM</span>
      </div>
    </div>
  );
};

export default Home;
