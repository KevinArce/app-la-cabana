import React, { useEffect, useState } from "react";
import { useZafraStore, useDetailsStore } from "../../store";
import serviceApi from "../../services/services";
import group8 from "./assets/group8.svg";
import { Loader } from "../generalComponents";
import Table from "./Table";
import "./entregas.css";

const Entregas = () => {
  const [entregasList, setEntregasList] = useState([]);
  const [loading, setLoading] = useState(false);
  const zafra = useZafraStore((state) => state.zafra);
  const details = useDetailsStore((state) => state.details);

  useEffect(() => {
    setLoading(true);
    serviceApi
      .post("getSp_Portal_Rendi_Envios_Select", {
        ZAFRA: zafra,
        codProv: details.codProv,
      })
      .then((response) => {
        // const { data } = response;
        const entregasListArray = [];
        const estados = ['Bueno', 'Regular', 'Malo'];
        //generar fake data
        for (let i = 0; i < 50; i++) {
          const entregasListObject = {
            FECMOV: new Date(
              new Date().setDate(
                new Date().getDate() - Math.floor(Math.random() * 100)
              )
            ).toLocaleDateString(),
            NOENVIO: Math.floor(Math.random() * 100000),
            FINCA: Math.floor(Math.random() * 100000),
            NOMLOTE: Math.floor(Math.random() * 100000),
            TM: Math.floor(Math.random() * 100000),
            POLCAL: Math.floor(Math.random() * 100000),
            REN: Math.floor(Math.random() * 100000),
            HUMEDAD: Math.floor(Math.random() * 100000),
            HORASQUEMA: Math.floor(Math.random() * 100000),
            CORTE: Math.floor(Math.random() * 100000),
            ESTADOCORTE: estados[Math.floor(Math.random() * 3)],
          };
          entregasListArray.push(entregasListObject);
        }

        setEntregasList(entregasListArray);
        setLoading(false);
      });
  }, [zafra, details.codProv]);

  return (
    <div className="padding-init entregas">
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

      <div className="mt-3 container-table">
        {loading ? (
          <div className="col-12 d-flex align-items-center justify-content-center mt-5">
            <Loader height={60} width={60} color="#2f6b35" stroke={3} />
          </div>
        ) : (
          <Table entregasList={entregasList} />
        )}
      </div>
    </div>
  );
};

export default Entregas;
