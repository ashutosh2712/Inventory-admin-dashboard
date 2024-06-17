import React, { useEffect, useMemo, useState } from "react";
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
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

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
  const [inventoryGraphData, setInventoryGraphData] = useState([]);
  const [MSRPchartGraphData, setMSRPchartGraphData] = useState([]);
  const [filteredType, setFilteredType] = useState("new");

  const [error, setError] = useState("");

  const fetchInventoryGraphData = async () => {
    try {
      const inventoryDataResponse = await axios.get(
        `http://localhost:3000/api/inventory/chart`
      );
      if (inventoryDataResponse.data) {
        setInventoryGraphData(inventoryDataResponse.data);
        // console.log(inventoryDataResponse.data);
      } else {
        console.error("Response is Empty");
        setError("Response is Empty");
      }
    } catch (error) {
      console.error("Error loading table data", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : error.message;
      setError(errorMessage);
    }
  };

  const fetchMSRPGraphData = async () => {
    try {
      const MSRPchartDataResponse = await axios.get(
        `http://localhost:3000/api/inventory/MSRPchart`
      );
      if (MSRPchartDataResponse.data) {
        setMSRPchartGraphData(MSRPchartDataResponse.data);
        // console.log(inventoryDataResponse.data);
      } else {
        console.error("Response is Empty");
        setError("Response is Empty");
      }
    } catch (error) {
      console.error("Error loading table data", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : error.message;
      setError(errorMessage);
    }
  };

  useEffect(() => {
    fetchInventoryGraphData();
    fetchMSRPGraphData();
  }, []);

  const handleFilterChange = (event) => {
    console.log("Event:", event);
    setFilteredType(event);

    console.log("Filtered Data", filteredType);
  };

  const processDataForChart = () => {
    if (!inventoryGraphData) return null;

    const filteredData = inventoryGraphData.filter((item) => {
      return item.inventory[filteredType] && item.inventory[filteredType] > 0;
    });
    const labels = filteredData.map((item) => item.date);
    const dataSets = {};

    filteredData.forEach((item) => {
      Object.keys(item.inventory).forEach((type) => {
        if (filteredType && filteredType !== type) return;

        if (!dataSets[type]) {
          dataSets[type] = {
            data: [],
            backgroundColor: "#ff9926",
            barThickness: 52,
          };
        }

        dataSets[type].data.push(item.inventory[type]);
      });
    });

    return {
      labels,
      datasets: Object.values(dataSets),
    };
  };

  const options = {
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

  // const chartDataProcessed = processInventoryChartData();
  const chartDataProcessed = processDataForChart();
  return (
    <div className="dashboardGraphContainer">
      <div className="inventoryGraph">
        <div className="inventoryGraphHeader">
          <p className="graphHeaderText">Inventory Count</p>
          <button
            // className="graphBtn"
            className={`graphBtn ${filteredType === "new" ? "btn-active" : ""}`}
            onClick={() => handleFilterChange("new")}
          >
            new
          </button>
          <button
            // className="graphBtn"
            className={`graphBtn ${
              filteredType === "used" ? "btn-active" : ""
            }`}
            onClick={() => handleFilterChange("used")}
          >
            used
          </button>
          <button
            // className="graphBtn"
            className={`graphBtn ${filteredType === "cpo" ? "btn-active" : ""}`}
            onClick={() => handleFilterChange("cpo")}
          >
            cpo
          </button>
        </div>
        <div className="inventoryGraphPlot">
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <Bar options={options} data={chartDataProcessed} />
          )}
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
