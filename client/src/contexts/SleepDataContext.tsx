import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SleepData {
    date: string;
    sleepTime: number;
};

interface SleepDataContextType {
  sleepData: SleepData[];
  setSleepData: (data: SleepData[]) => void;
}

const SleepDataContext = createContext<SleepDataContextType | undefined>(undefined);

const SleepDataProvider: React.FC<{children: ReactNode}>  = ({ children }: { children: ReactNode }) => {
  const [sleepData, setSleepData] = useState<SleepData[]>([]);

  return (
    <SleepDataContext.Provider value={{ sleepData, setSleepData }}>
      {children}
    </SleepDataContext.Provider>
  );
};

const useSleepData = () => {
    const context = useContext(SleepDataContext);
    if (context === undefined) {
        throw new Error('useSleepData must be used within a SleepDataProvider');
    }
    return context;
};

export { SleepDataProvider, useSleepData };
