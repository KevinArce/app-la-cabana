import create from "zustand";

const useEntregasEnviosStore = create((set) => ({
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

export default useEntregasEnviosStore;
