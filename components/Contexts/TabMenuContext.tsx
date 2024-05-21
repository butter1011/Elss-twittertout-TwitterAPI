
'use client'
import React, { createContext, useState, ReactNode } from 'react';

interface DataProviderProps {
  children: ReactNode;
}

interface DataContextType {
  isChecked: any;
  setChecked: React.Dispatch<React.SetStateAction<any>>;
}

export const TabMenuContext = createContext<DataContextType | null>(null);

const TabMenuProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [isChecked, setChecked] = useState<any>(false);

  return (
    <TabMenuContext.Provider value={{ isChecked, setChecked }}>
      {children}
    </TabMenuContext.Provider>
  );
};

export default TabMenuProvider;
