import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchSleepDataForLastSevenDays  } from '@/services/api';
import { useSleepData } from '@/contexts/SleepDataContext'; 

interface SleepData {
    date: string;
    sleepTime: number;
}

interface TableProps {
    sleepData: SleepData[];
}

const TablePage: React.FC<TableProps> = () => {
    const router = useRouter();
    const { userId, name } = router.query as { userId: string; name: string };
     const { sleepData, setSleepData } = useSleepData();

  useEffect(() => {
        if (userId && sleepData.length === 0) {
            fetchSleepDataForLastSevenDays(userId)
                .then(data => setSleepData(data))
                .catch(err => console.error("Error fetching data:", err));
        }
    }, [userId, sleepData, setSleepData]);

    const handleRowClick = (date: string) => {
        router.push(`/chart?userId=${userId}&date=${date}&name=${encodeURIComponent(name)}`);
    };

return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sleep Records for {name}</h1>
      <table style={{ tableLayout: 'auto', alignItems: 'center', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours of Sleep</th>
          </tr>
        </thead>
        <tbody>
          {sleepData.map((record: any, index: number) => (
            <tr key={index} onClick={() => handleRowClick(record.date)}>
              <td>{record.date}</td>
              <td>{record.sleepTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => router.push('/')}>Home</button>
      <button onClick={() => router.push('/form?userId=${userId}&date=${date}')}>Back To Form</button>
    </div>
  );
};

export default TablePage;
