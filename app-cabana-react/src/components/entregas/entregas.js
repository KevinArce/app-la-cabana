import React from "react";
import "./entregas.css";
import group8 from "./assets/group8.svg";

function EntregasEnviosStore () {
  const [data, setData] = useState([]);
  const entregasEnvios = useEntregasEnviosStore((state) => state.entregasEnvios);
  const setEntregasEnvios = useEntregasEnviosStore((state) => state.setEntregasEnvios);
}

const Entregas = () => {
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
        <table className="table-default">
          <tr className="header-default">
            <th>FECMOV</th>
            <th>NO ENVIO</th>
            <th>FINCA</th>
            <th>NOMLOTE</th>
            <th>TM</th>
            <th>POL CAL</th>
            <th>REN. KG/TM</th>
            <th>HUMEDAD %</th>
            <th>HORAS QUEMA H</th>
            <th>CORTE</th>
            <th>ESTADO CORTE</th>
          </tr>
          <tr>
            <td>Soleado</td>
            <td>Mayormente soleado</td>
            <td>Parcialmente nublado</td>
            <td>Soleado</td>
            <td>Mayormente soleado</td>
            <td>Parcialmente nublado</td>
            <td>Soleado</td>
            <td>Mayormente soleado</td>
            <td>Parcialmente nublado</td>
            <td>Soleado</td>
            <td>Mayormente soleado</td>
          </tr>
          <tr>
            <td>19°C</td>
            <td>17°C</td>
            <td>12°C</td>
            <td>12°C</td>
            <td>12°C</td>
            <td>12°C</td>
            <td>12°C</td>
            <td>12°C</td>
            <td>12°C</td>
            <td>12°C</td>
            <td>12°C</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
          <tr>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
            <td>S 16 km/h</td>
            <td>E 13 km/h</td>
            <td>E 11 km/h</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Entregas;
