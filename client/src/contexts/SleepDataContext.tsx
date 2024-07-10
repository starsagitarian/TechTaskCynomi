import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface SleepData {
    date: string;
    sleepTime: number;
};

interface SleepDataContextType {
  sleepData: SleepData[];
  setSleepData: (data: SleepData[]) => void;
  clearSleepData: () => void;
}

const SleepDataContext = createContext<SleepDataContextType | undefined>(undefined);

const SleepDataProvider: React.FC<{children: ReactNode}> = React.memo(({ children }) => {
  const [sleepData, setSleepData] = useState<SleepData[]>([]);


  useEffect(() => {
    console.log('SleepData updated:', sleepData);
  }, [sleepData]);

  const handleSetSleepData = useCallback((data: SleepData[]) => {
    console.log('Setting sleep data');
    setSleepData(data);
  }, []);

  const clearSleepData = useCallback(() => {
    setSleepData([]);
  }, []);


  return (
    <SleepDataContext.Provider value={{ sleepData, setSleepData: handleSetSleepData, clearSleepData }}>
      {children}
    </SleepDataContext.Provider>
  );
});

const useSleepData = () => {
    const context = useContext(SleepDataContext);
    if (!context) {
        throw new Error('useSleepData must be used within a SleepDataProvider');
    }
    return context;
};

export { SleepDataProvider, useSleepData };
