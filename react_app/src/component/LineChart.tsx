import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../styles/LineChart.css"; // Ensure this path is correct

// Extract the CanvasJS and CanvasJSChart from CanvasJSReact
const { CanvasJS, CanvasJSChart } = CanvasJSReact;

// Define the options type for TypeScript
interface Options {
  animationEnabled: boolean;
  title: {
    text: string;
  };
  axisY: {
    title: string;
    suffix: string;
  };
  data: {
    type: string;
    xValueFormatString: string;
    yValueFormatString: string;
    showInLegend: boolean;
    legendText: string;
    dataPoints: {
      x: Date;
      y: number;
    }[];
  }[];
}

// Define the options object
const options: Options = {
  animationEnabled: true,
  title: {
    text: "Monthly Sales",
  },
  axisY: {
    title: "Your Progress",
    suffix: " kWh",
  },
  data: [
    {
      type: "spline", // Use spline for smoother curves
      xValueFormatString: "MMM YYYY",
      yValueFormatString: "#0.## kWh",
      showInLegend: true,
      legendText: "kWh = one kilowatt hour",
      dataPoints: [
        { x: new Date(2023, 0), y: 70.735 },
        { x: new Date(2023, 1), y: 74.102 },
        { x: new Date(2023, 2), y: 72.569 },
        { x: new Date(2023, 3), y: 72.743 },
        { x: new Date(2023, 4), y: 72.381 },
        { x: new Date(2023, 5), y: 71.406 },
        { x: new Date(2023, 6), y: 73.163 },
        { x: new Date(2023, 7), y: 74.27 },
        { x: new Date(2023, 8), y: 72.525 },
        { x: new Date(2023, 9), y: 73.121 },
      ],
    },
  ],
};

const LineChart: React.FC = () => {
  return (
    <>
      <CanvasJSChart options={options} />
    </>
  );
};

export default LineChart;
