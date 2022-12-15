import create from 'zustand';

const useDetailsStore = create((set) => ({
    details: {usuario: '', nombre: '', codProv: '', nomProv: '', tipo: ''},
    setDetails: (details) => set({ details }),

}));

export default useDetailsStore;