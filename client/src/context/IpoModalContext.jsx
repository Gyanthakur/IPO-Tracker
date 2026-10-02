import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import IpoFormModal from '../components/IpoFormModal';

const Ctx = createContext({ openAdd: () => {}, openEdit: () => {} });
export const useIpoModal = () => useContext(Ctx);

export function IpoModalProvider({ children }) {
  const [state, setState] = useState({ open: false, ipo: null });

  const openAdd = useCallback(() => setState({ open: true, ipo: null }), []);
  const openEdit = useCallback((ipo) => setState({ open: true, ipo }), []);
  const close = useCallback(() => setState({ open: false, ipo: null }), []);
  const value = useMemo(() => ({ openAdd, openEdit }), [openAdd, openEdit]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {state.open && <IpoFormModal ipo={state.ipo} onClose={close} />}
    </Ctx.Provider>
  );
}