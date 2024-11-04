
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale, 
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  LinearScale,
  CategoryScale, 
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RevenueChart = ({ revenueData }) => {
  const data = {
    labels: revenueData.map(item => item.month), 
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.map(item => item.revenue),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.3, 
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, 
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue ($)',
        },
        ticks: {
          padding: 5, 
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
        ticks: {
          padding: 5,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          padding: 5, 
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}> 
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
