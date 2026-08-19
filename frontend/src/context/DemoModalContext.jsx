import React from 'react';
import { createContext, useContext, useState } from 'react';

const DemoModalContext = createContext({ open: () => {}, close: () => {}, isOpen: false });

export const DemoModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <DemoModalContext.Provider value={{ open, close, isOpen, setIsOpen }}>
      {children}
    </DemoModalContext.Provider>
  );
};

export const useDemoModal = () => useContext(DemoModalContext);
