import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactECharts from 'echarts-for-react';
import { fetchSleepDataForLastSevenDays } from '@/services/api';
import { useSleepData } from '@/contexts/SleepDataContext';
import Image from 'next/image';
import logo from '../../public/logo.jpg';
import styles from '../styles/chart.module.css';

const ChartPage: React.FC = () => {
  const router = useRouter();
  const { userId, date, name } = router.query as { userId: string; date: string; name: string};
  // const { sleepData } = useSleepData();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchSleepDataForLastSevenDays(userId)
        .then(data => {
          setChartData(data.map((item: any) => ({
            value: item.sleepTime,
            name: item.date
          })));
        })
        .catch(err => console.error(err));
    }
  }, [userId]);

  const options = {
    title: {
      text: 'Sleep Trend',
      subtext: `Data for ${decodeURIComponent(name)}`,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: chartData.map((item: any) => item.name),
      name: 'Date', 
      nameLocation: 'middle',
      nameGap: 30
    },
    yAxis: {
      type: 'value',
      name: 'Sleep Time (hours)',
      nameLocation: 'middle',
      nameGap: 50  
    },
    series: [
      {
        data: chartData,
        type: 'bar'
      }
    ]
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="Logo" className={styles.logo} onClick={() => router.push('/')}/>
      <h1 className={styles.title}>Sleep Tracker App</h1>
      <ReactECharts option={options} style={{ 
        height: 400, 
        width: '100%',
        }} />
      <button className={styles.button} onClick={() => router.push(`/table?userId=${userId}&name=${encodeURIComponent(name)}`)}>Back To Table</button>
    </div>
  );
};

export default ChartPage;
