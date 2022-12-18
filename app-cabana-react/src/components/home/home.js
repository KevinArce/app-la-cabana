import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import serviceApi from "../../services/services";
import { useZafraStore, useDetailsStore } from "../../store";
import { Loader } from "../generalComponents";
import carbonuserAvatarFi from "./assets/carbonuserAvatarFi.svg";
import group1 from "./assets/group1.svg";
import "./assets/home.css";

/**
 * orden jerarquico de importacion
 * -React
 * -librerias de terceros
 * -servicios o stores
 * -assets o componentes
 */

function PortalRendiCortesSelect({ zafra, codProv }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (zafra !== "" && codProv !== "") {
      setLoading(true);
      serviceApi
        .post("getPortal_Rendi_Cortes_Select", {
          zafra: zafra,
          codclie: codProv,
        })
        .then((response) => {
          const { data } = response;
          if (data.data && data.data.length > 0) {
            setData(data.data);
          } else {
            setData([]);
          }
          setLoading(false);
        });
    }
  }, [zafra, codProv]);

  return (
    <div>
      {loading ? (
        <div className="col-12 d-flex align-items-center justify-content-center">
          <Loader height={30} width={30} color="#2f6b35" stroke={3} />
        </div>
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <Dropdown.Item>
              Desde: {item.fecini} Hasta: {item.fecfin} Corte: {item.CORTE}
            </Dropdown.Item>
          </div>
        ))
      ) : (
        <Dropdown.Item>No hay datos</Dropdown.Item>
      )}
    </div>
  );
}

const Home = () => {
  const [zafraList, setZafraList] = useState([]);
  const [toneladasList, setToneladasList] = useState([]);
  const [loading, setLoading] = useState(false);
  const zafra = useZafraStore((state) => state.zafra);
  const setZafra = useZafraStore((state) => state.setZafra);
  const details = useDetailsStore((state) => state.details);

  useEffect(() => {
    setLoading(true);
    serviceApi.get("getIndex").then((response) => {
      const { data } = response;
      setZafraList(data.data);
      setZafra("2021-2022");
    });

    serviceApi
      .post("getToneladasTotales", { client: details.usuario })
      .then((response) => {
        const { data } = response;
        setToneladasList(data.data);
        setLoading(false);
      });
  }, [details.usuario, setZafra]);

  return (
    <div className="portada">
      <div className="container-user">
        <img
          className="carbonuser-avatar-fi"
          src={carbonuserAvatarFi}
          alt="group"
        />
        <span className="txt-user-profile">{details.nombre}</span>
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
            <PortalRendiCortesSelect zafra={zafra} codProv={details.codProv} />
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

      {loading ? (
        <div className="col-12 d-flex align-items-center justify-content-center mt-5">
          <Loader height={50} width={50} color="#2f6b35" stroke={3} />
        </div>
      ) : (
        <div className="mt-4 stats-container">
          <div className="flex-container-3">
            <span className="title-stat">Zafra</span>
            <div>
              {zafraList.length > 0 ? (
                zafraList.map((item, index) => (
                  <div key={index}>
                    <span>{item.Zafra}</span>
                  </div>
                ))
              ) : (
                <span>No hay datos</span>
              )}
            </div>
          </div>
          <div className="flex-container-3">
            <span className="title-stat">Toneladas totales</span>
            {toneladasList.length > 0 ? (
              toneladasList.map((item, index) => (
                <div key={index}>
                  <span>{item.TONAN}</span>
                </div>
              ))
            ) : (
              <span>No hay datos</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
