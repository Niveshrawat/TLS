import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // Display the legend on the right sideR
        labels: {
          generateLabels: function (chart) {
            const data = chart.data.datasets[0].data;
            const labels = chart.data.labels;
            return labels.map((label, index) => ({
              text: `${label}: ${data[index]}`, // Display label and data value
              fillStyle: chart.data.datasets[0].backgroundColor[index],
              strokeStyle: chart.data.datasets[0].borderColor[index],
              lineWidth: chart.data.datasets[0].borderWidth,
              hidden: isNaN(data[index]) || data[index] === 0,
              index: index,
            }));
          },
        },
      },
      title: {
        display: true,
        text: 'Pie Chart',
      },
    },
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
