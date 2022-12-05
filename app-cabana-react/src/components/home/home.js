import React from "react";
import "./assets/home.css";
import carbonuserAvatarFi from "./assets/carbonuserAvatarFi.svg";
import group1 from "./assets/group1.svg";
import serviceApi from "../../services/services";
import Dropdown from "react-bootstrap/Dropdown";

const Home = () => {
  // const nomProv = localStorage.getItem("nomProv");

  //Use serviceApi to get the data from the server and display it in the class num-2021-2022
  serviceApi.get("index").then((response) => {
    localStorage.setItem("data", JSON.stringify(response.data));
    console.log(response);
    if (response.data.error === 0) {
      return response.data;
    } else {
      return "No data";
    }
  });

  return (
    <div className="portada">
      <div className="container-user">
        <img
          className="carbonuser-avatar-fi"
          src={carbonuserAvatarFi}
          alt="group"
        />
        <span className="txt-user-profile">Maria Rosales</span>
      </div>

      <div className="mt-3 flex-container-2">
        <div className="mb-0">
          <span className="txt-custom01">Sección informativa</span>
          <img className="group-1" src={group1} alt="group" />
        </div>

        <span className="mb-2 actualizada">Actualizada</span>
      </div>

      <div className="mt-2 container-drop">
        <span className="consulta-liquidacin">
          Consulta Liquidación, Corte:
        </span>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Seleccionar Corte
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <button className="mt-2 rectangle-193">
          <span className="ver-liquidaciones">Ver liquidaciones</span>
        </button>
      </div>

      <div className="mt-4 stats-container">
        <div className="flex-container-3">
          <span className="title-stat">Zafra</span>
          <span className="num-stat">2021 - 2022</span>
        </div>
        <div className="flex-container-3">
          <span className="title-stat">Toneladas totales</span>
          <span className="num-stat">370.57 TM</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
