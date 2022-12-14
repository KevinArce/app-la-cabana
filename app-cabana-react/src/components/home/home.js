import React, { useState, useEffect } from "react";
import "./assets/home.css";
import carbonuserAvatarFi from "./assets/carbonuserAvatarFi.svg";
import group1 from "./assets/group1.svg";
import serviceApi from "../../services/services";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const urlBase = "http://localhost:8080/api/v1";

const nombre = localStorage.getItem("nombre");
const usuario = localStorage.getItem("usuario");
const codProv = localStorage.getItem("codProv");
const nomProv = localStorage.getItem("nomProv");
const tipo = localStorage.getItem("tipo");

function ZafraIndex() {
  const [data, setData] = useState([]);

  useEffect(() => {
    serviceApi.get("getIndex").then((response) => {
      const { data } = response;
      console.log(data);
      setData(data.data);
    });
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <span>{item.Zafra}</span>
          </div>
        ))
      ) : (
        <span>No hay datos</span>
      )}
    </div>
  );
}

function ToneladasTotales() {
  const [data, setData] = useState([]);

  const usuario = localStorage.getItem("usuario");
  axios.post(urlBase + "/getToneladasTotales", {
    client: usuario,
  });

  useEffect(() => {
    serviceApi
      .post("getToneladasTotales", { client: usuario })
      .then((response) => {
        const { data } = response;
        console.log(data);
        setData(data.data);
      });
  }, [usuario]);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <span>{item.TONAN}</span>
          </div>
        ))
      ) : (
        <span>No hay datos</span>
      )}
    </div>
  );
}

const Home = () => {
  return (
    <div className="portada">
      <div className="container-user">
        <img
          className="carbonuser-avatar-fi"
          src={carbonuserAvatarFi}
          alt="group"
        />
        <span className="txt-user-profile">{nombre}</span>
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

        <button
          onClick={() => {
            serviceApi.get("getLiquidacion").then((response) => {
              console.log(response);
              return response;
            });
          }}
          className="mt-2 rectangle-193"
        >
          <span className="ver-liquidaciones">Ver liquidaciones</span>
        </button>
      </div>

      <div className="mt-4 stats-container">
        <div className="flex-container-3">
          <span className="title-stat">Zafra</span>
          <ZafraIndex />
        </div>
        <div className="flex-container-3">
          <span className="title-stat">Toneladas totales</span>
          <ToneladasTotales />
        </div>
      </div>
    </div>
  );
};

export default Home;
