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
  const [filteredMSRPType, setFilteredMSRPType] = useState("new");

  const [error, setError] = useState("");
  const [errorMSRP, setErrorMSRP] = useState("");

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
        setErrorMSRP("Response is Empty");
      }
    } catch (error) {
      console.error("Error loading table data", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : error.message;
      setErrorMSRP(errorMessage);
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

  const handleFilterChangeMSRP = (event) => {
    console.log("Event:", event);
    setFilteredMSRPType(event);

    console.log("Filtered Data", filteredMSRPType);
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

  const processDataForMSRPChart = () => {
    if (!MSRPchartGraphData) return null;

    const filteredData = MSRPchartGraphData.filter((item) => {
      return (
        item.inventory[filteredMSRPType] && item.inventory[filteredMSRPType] > 0
      );
    });

    const labels = filteredData.map((item) => item.date);
    const dataSets = {};

    filteredData.forEach((item) => {
      Object.keys(item.inventory).forEach((type) => {
        if (filteredMSRPType && filteredMSRPType !== type) return;

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
  const chartMSRPDataProcessed = processDataForMSRPChart();
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
          <button
            // className="graphBtn"
            className={`graphBtn ${
              filteredMSRPType === "new" ? "btn-active" : ""
            }`}
            onClick={() => handleFilterChangeMSRP("new")}
          >
            new
          </button>
          <button
            // className="graphBtn"
            className={`graphBtn ${
              filteredMSRPType === "used" ? "btn-active" : ""
            }`}
            onClick={() => handleFilterChangeMSRP("used")}
          >
            used
          </button>
          <button
            // className="graphBtn"
            className={`graphBtn ${
              filteredMSRPType === "cpo" ? "btn-active" : ""
            }`}
            onClick={() => handleFilterChangeMSRP("cpo")}
          >
            cpo
          </button>
        </div>
        <div className="moneyDataGraphPlot">
          {errorMSRP ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <Bar options={options} data={chartMSRPDataProcessed} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
