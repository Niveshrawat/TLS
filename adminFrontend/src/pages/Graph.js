import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { pink } from "@mui/material/colors";
import Chart from 'chart.js/auto';


const HorizontalChart = () => {
  const [dateLabels, setDateLabels] = useState([]);
  
  useEffect(() => {
    // Generate date labels dynamically starting from '25Apr' and incrementing daily
    const startDate = new Date('2023-04-25'); // Adjust the starting date as needed
    const numDays = 15; 
    const labels = [];
    for (let i = 0; i < numDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const formattedDate = `${date.getDate()}${date.toLocaleString('default', { month: 'short' })}`;
      labels.push(formattedDate);
    }
    setDateLabels(labels);
  }, []);

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Total Deposits',
        data: [0,0,0,5,100,54,0,100,50,0,50,0,0,0],
        backgroundColor: '#B51B75',
        borderColor: '#B51B75',
        borderWidth: 1,
        borderSkipped: 'bottom', 
      },
      {
        label: 'Expenses',
        data: [0,0,10,14,0,0,33,0,0,0,38,0,0,0,0],
        backgroundColor: '#58A399',
        borderColor: '#58A399',
        borderWidth: 1,
      },
      {
        label: 'Sales',
        data: [11,15,14,14,15,15,16,16,17.5,18,16.8,16.9,17,14,9 ],
        backgroundColor: '#141E46',
        borderColor: '#141E46',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    scales: {
      x: {
        type: 'category',
        labels: dateLabels,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Horizontal Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalChart;
