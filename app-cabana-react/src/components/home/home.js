import React, { useState, useEffect } from "react";
import "./assets/home.css";
import carbonuserAvatarFi from "./assets/carbonuserAvatarFi.svg";
import group1 from "./assets/group1.svg";
import serviceApi from "../../services/services";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import useZafraStore from "../../store/useZafraStore";
import useDetailsStore from "../../store/useDetailsStore";

const urlBase = "http://localhost:8080/api/v1";

const nombre = localStorage.getItem("nombre");
const usuario = localStorage.getItem("usuario");
const codProv = localStorage.getItem("codProv");
const nomProv = localStorage.getItem("nomProv");
const tipo = localStorage.getItem("tipo");

function ZafraIndex() {
  const [data, setData] = useState([]);

  //const zafra = useZafraStore((state) => state.zafra);
  const setZafra = useZafraStore((state) => state.setZafra);

  useEffect(() => {
    serviceApi.get("getIndex").then((response) => {
      const { data } = response;
      console.log(data);
      setData(data.data);
      //setZafra(data.data[0].Zafra);
      setZafra('2021-2022');
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

  const { usuario } = useDetailsStore((state) => state.details);
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
  }, []);

  return (
    <div>
      {data && data.length > 0 ? (
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

//Portal_Rendi_Cortes_Select send the values zafra and codProv to the API and return the values of the corte, fecini, fecfin and ZAFRA
function Portal_Rendi_Cortes_Select() {
  const [data, setData] = useState([]);
  //const codclie = "JMARI005"; //localStorage.getItem("codProv");
  //const zafra = "2021-2022"; //localStorage.getItem("zafra");
  const zafra = useZafraStore((state) => state.zafra);
  const { codProv } = useDetailsStore((state) => state.details);

  useEffect(() => {
    if (zafra != "" && codProv != "") {
      serviceApi
        .post("getPortal_Rendi_Cortes_Select", {
          zafra: zafra,
          codclie: codProv,
        })
        .then((response) => {
          const { data } = response;
          console.log("Data algo XD", data);
          if (data.data && data.data.length > 0) {
            setData(data.data);
          } else {
            setData([]);
          }
        });
    }
  }, [zafra, codProv]);

  return (
    <div>
      {data.length > 0 ? (
        data.map(
          (item, index) => (
            console.log(item.fecini),
            console.log(item.CORTE),
            console.log(item.fecfin),
            (
              <div key={index}>
                <Dropdown.Item>
                  Desde: {item.fecini} Hasta: {item.fecfin} Corte: {item.CORTE}
                </Dropdown.Item>
              </div>
            )
          )
        )
      ) : (
        <Dropdown.Item>No hay datos</Dropdown.Item>
      )}
    </div>
  );
}

const Home = () => {
  const zafra = useZafraStore((state) => state.zafra);
  //const setZafra = useZafraStore((state) => state.setZafra);
  useEffect(() => {
    console.log(zafra);
  }, [zafra]);
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
            <Portal_Rendi_Cortes_Select />
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
