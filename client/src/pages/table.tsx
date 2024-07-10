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
    // Always fetch new data when the userId is present
    if (userId) {
        fetchSleepDataForLastSevenDays(userId)
            .then(data => setSleepData(data))
            .catch(err => console.error("Error fetching data:", err));
    }
}, [userId, setSleepData]);


    const handleRowClick = (date: string) => {
        router.push(`/chart?userId=${userId}&date=${date}&name=${encodeURIComponent(name)}`);
    };

return (
    <div className={styles.container}>
      <Image src={logo} alt="Logo" className={styles.logo} onClick={() => router.push('/')} />
      <h1 className={styles.title}>Sleep Tracker App</h1>
      <h2 className={styles.label}>Sleep Records for {name}</h2>
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
      <button className={styles.button} onClick={() => router.push('/form?userId=${userId}&date=${date}')}>Back To Form</button>
    </div>
  );
};

export default TablePage;
