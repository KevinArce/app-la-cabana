import create from "zustand";

const useZafraStore = create((set) => ({
  zafra: "",
  setZafra: (zafra) => set({ zafra }),
}));

export default useZafraStore;
