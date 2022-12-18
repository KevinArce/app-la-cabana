import create from "zustand";

const getDetails = () => {
  const details = localStorage.getItem("details");
  return details
    ? JSON.parse(details)
    : { usuario: "", nombre: "", codProv: "", nomProv: "", tipo: "" };
};

const useDetailsStore = create((set) => ({
  details: getDetails(),
  setDetails: (details) => set({ details }),
}));

export default useDetailsStore;
