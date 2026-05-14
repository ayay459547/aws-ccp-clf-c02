"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  tabIndex: number;
  setTabIndex: (index: number) => void;
  showChinese: boolean;
  setShowChinese: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [showChinese, setShowChinese] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{ tabIndex, setTabIndex, showChinese, setShowChinese }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
