import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchSleepDataForLastSevenDays  } from '@/services/api';

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
    const [sleepData, setSleepData] = useState([]);

    useEffect(() => {
        if (userId) {
        fetchSleepDataForLastSevenDays(userId)
            .then(data => setSleepData(data))
            .catch(err => console.error(err));
        }
    }, [userId]);

    const handleRowClick = () => {
        router.push('/chart?userId=${userId}');
    };

return (
    <div>
      <h1>Sleep Records for {name}</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours of Sleep</th>
          </tr>
        </thead>
        <tbody>
          {sleepData.map((record: any, index: number) => (
            <tr key={index} onClick={() => router.push(`/chart?userId=${userId}`)}>
              <td>{record.date}</td>
              <td>{record.sleepTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => router.push('/')}>Home</button>
      <button onClick={() => router.push('/form?userId=${userId}')}>Back To Form</button>
    </div>
  );
};

export default TablePage;
