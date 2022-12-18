import React, { useState, useMemo, useCallback } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

const columns = [
  { key: "FECMOV", name: "FECMOV", resizable: true, sortable: true },
  { key: "NOENVIO", name: "NO ENVIO", resizable: true, sortable: true },
  { key: "FINCA", name: "FINCA", resizable: true, sortable: true },
  { key: "NOMLOTE", name: "NOMLOTE", resizable: true, sortable: true },
  { key: "TM", name: "TM", resizable: true, sortable: true },
  { key: "POLCAL", name: "POL CAL", resizable: true, sortable: true },
  { key: "REN", name: "REN. KG/TM", resizable: true, sortable: true },
  { key: "HUMEDAD", name: "HUMEDAD %", resizable: true, sortable: true },
  { key: "HORASQUEMA", name: "HORAS QUEMA H", resizable: true, sortable: true },
  { key: "CORTE", name: "CORTE", resizable: true, sortable: true },
  { key: "ESTADOCORTE", name: "ESTADO CORTE", resizable: true, sortable: true },
];

const Table = ({ entregasList }) => {
  const [sortColumns, setSortColumns] = useState([]);

  const onSortColumnsChange = useCallback((sortColumns) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return entregasList;
    const { columnKey, direction } = sortColumns[0];

    let sortedRows = [...entregasList];

    switch (columnKey) {
      case "FECMOV":
        sortedRows.sort((a, b) => a.FECMOV - b.FECMOV);
        break;
      case "NOENVIO":
        sortedRows.sort((a, b) => a.NOENVIO - b.NOENVIO);
        break;
      case "FINCA":
        sortedRows.sort((a, b) => a.FINCA - b.FINCA);
        break;
      case "NOMLOTE":
        sortedRows.sort((a, b) => a.NOMLOTE - b.NOMLOTE);
        break;
      case "TM":
        sortedRows.sort((a, b) => a.TM - b.TM);
        break;
      case "POLCAL":
        sortedRows.sort((a, b) => a.POLCAL - b.POLCAL);
        break;
      case "REN":
        sortedRows.sort((a, b) => a.REN - b.REN);
        break;
      case "HUMEDAD":
        sortedRows.sort((a, b) => a.HUMEDAD - b.HUMEDAD);
        break;
      case "HORASQUEMA":
        sortedRows.sort((a, b) => a.HORASQUEMA - b.HORASQUEMA);
        break;
      case "CORTE":
        sortedRows.sort((a, b) => a.CORTE - b.CORTE);
        break;
      case "ESTADOCORTE":
        //usar localeCompare para ordenar strings
        sortedRows.sort((a, b) => a.ESTADOCORTE.localeCompare(b.ESTADOCORTE));
        break;
      default:
        break;
    }
    return direction === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [entregasList, sortColumns]);

  return (
    <DataGrid
      columns={columns}
      rows={sortedRows}
      sortColumns={sortColumns}
      onSortColumnsChange={onSortColumnsChange}
      rowHeight={30}
      headerRowHeight={30}
      minHeight={500}
      direction="ltr"
    />
  );
};

export default Table;
