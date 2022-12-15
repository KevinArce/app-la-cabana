import create from "zustand/react";

const EntregasEnviosStore = create((set) => ({
  entregasEnvios: {
    fecmov: "",
    numenv: "",
    humeda: "",
    phrsquema: "",
    rendimr: "",
    tonel: "",
    polca: "",
    Ncorte: "",
    codfinca: "",
    lote: "",
    NOMLOTE: "",
    NOMFINCA: "",
    estado: "",
  },
  setEntregasEnvios: (entregasEnvios) => set({ entregasEnvios }),
}));

export default EntregasEnviosStore;
