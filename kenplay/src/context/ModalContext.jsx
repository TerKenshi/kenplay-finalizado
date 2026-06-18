import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  // null | 'welcome' | 'login' | 'register'
  const [modal, setModal] = useState(null);

  const openWelcome  = () => setModal('welcome');
  const openLogin    = () => setModal('login');
  const openRegister = () => setModal('register');
  const closeAll     = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, openWelcome, openLogin, openRegister, closeAll }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
