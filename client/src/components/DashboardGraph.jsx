import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false, // Show grid lines for x-axis
      },
    },
    y: {
      grid: {
        display: true, // Hide grid lines for y-axis
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#ff9926",
      barThickness: 52,
    },
  ],
};
const DashboardGraph = () => {
  return (
    <div className="dashboardGraphContainer">
      <div className="inventoryGraph">
        <div className="inventoryGraphHeader">
          <p className="graphHeaderText">Inventory Count</p>
          <button className="graphBtn btn-active">new</button>
          <button className="graphBtn">used</button>
          <button className="graphBtn">cpo</button>
        </div>
        <div className="inventoryGraphPlot">
          <Bar options={options} data={data} />
        </div>
      </div>
      <div className="moneyData">
        <div className="moneyDataHeader">
          <p className="graphHeaderText">Average MSRP in USD</p>
          <button className="graphBtn btn-active">new</button>
          <button className="graphBtn">used</button>
          <button className="graphBtn">cpo</button>
        </div>
        <div className="moneyDataGraphPlot">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
