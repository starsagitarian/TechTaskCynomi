import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { fetchSleepDataForLastSevenDays } from '@/services/api';

const ChartPage: React.FC = () => {
  const router = useRouter();
  const { userId, date } = router.query as { userId: string; date: string };
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
      subtext: `Data for ${userId}`,
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
    <div>
      <ReactECharts option={options} style={{ height: 400 }} />
        <button onClick={() => router.push('/')}>Home</button>
        <button onClick={() => router.push('/table?userId=${userId}')}>Back To Table</button>
    </div>
  );
};

export default ChartPage;
