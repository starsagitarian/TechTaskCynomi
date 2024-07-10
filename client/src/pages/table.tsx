import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchSleepDataForLastSevenDays  } from '@/services/api';
import { useSleepData } from '@/contexts/SleepDataContext'; 
import styles from '../styles/table.module.css';
import Image from 'next/image';
import logo from '../../public/logo.jpg'

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
    <div className={styles.container}>
      <Image src={logo} alt="Logo" className={styles.logo} style={{ width: 150, height: 150, margin: 20 }} />
      <h1 className={styles.title}>Sleep Tracker App</h1>
      <h1 className={styles.title}>Sleep Records for {name}</h1>
      <table className={styles.table}>
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
