
'use client'
import React, { createContext, useState, ReactNode } from 'react';

interface DataProviderProps {
  children: ReactNode;
}

interface DataContextType {
  bot: any;
  isChatOpen: any;
  setBot: React.Dispatch<React.SetStateAction<any>>;
  setChatOpen: React.Dispatch<React.SetStateAction<any>>;
}

export const DataContext = createContext<DataContextType | null>(null);

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [bot, setBot] = useState<any>(null);
  const [isChatOpen, setChatOpen] = useState<any>(false);

  return (
    <DataContext.Provider value={{ bot, setBot, isChatOpen, setChatOpen }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
