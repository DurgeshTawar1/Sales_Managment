import React from 'react';
import { Chart } from 'react-google-charts';

// Define the data for the pie chart
const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

// Define options for the pie chart
const options = {
  title: "My Daily Activities",
  pieHole: 0.4, // Use a hole to make it a donut chart
  is3D: false, // Set to true for a 3D effect
};

const PieChartComponent: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto' }}>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default PieChartComponent;
