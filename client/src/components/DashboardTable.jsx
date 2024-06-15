import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import { format, parse } from "date-fns";

const DashboardTable = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch("/sample-data-v2.csv")
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const data = results.data;
            const transformedData = transformData(data);
            setColumns(generateColumns());
            setRows(transformedData);
          },
        });
      })
      .catch((error) => console.error("Error fetching csv:", error));
  }, []);

  const transformData = (data) => {
    let idCounter = 1;
    const groupedData = data.reduce((acc, curr) => {
      const dateStr = curr.timestamp;
      let date;
      console.log("DateStr:", dateStr);
      try {
        if (dateStr) {
          date = format(
            parse(dateStr, "dd-MM-yyyy HH:mm", new Date()),
            "MMM dd, yyyy"
          );
        } else {
          throw new Error("Invalid date string");
        }
      } catch (error) {
        console.error("Error parsing date:", error);
        date = "Invalid Date";
      }
      //   date = dateStr;
      const type = curr.condition;

      let price = 0;

      // Check if curr.price is defined and not empty
      if (curr.price && typeof curr.price === "string") {
        // Remove ' USD' and any leading/trailing whitespace
        const priceStr = curr.price.replace(" USD", "").trim();
        // Parse the price as a float
        price = parseFloat(priceStr) || 0;
      }
      console.log("Date:", date);

      if (!acc[date]) acc[date] = { date };
      if (!acc[date][type]) acc[date][type] = { count: 0, totalPrice: 0 };

      acc[date][type].count += 1;
      acc[date][type].totalPrice += price;

      return acc;
    }, {});

    return Object.values(groupedData).map((item) => {
      const newPrice = item.new ? item.new.totalPrice : 0;
      const newCount = item.new ? item.new.count : 0;
      const newAvgPrice = newCount > 0 ? (newPrice / newCount).toFixed(2) : 0;

      const usedPrice = item.used ? item.used.totalPrice : 0;
      const usedCount = item.used ? item.used.count : 0;
      const usedAvgPrice =
        usedCount > 0 ? (usedPrice / usedCount).toFixed(2) : 0;

      const cpoPrice = item.cpo ? item.cpo.totalPrice : 0;
      const cpoCount = item.cpo ? item.cpo.count : 0;
      const cpoAvgPrice = cpoCount > 0 ? (cpoPrice / cpoCount).toFixed(2) : 0;

      const id = idCounter++;
      return {
        id,
        date: item.date,
        newCount,
        newPrice: `$${newPrice.toFixed(2)}`,
        newAvgPrice: `$${newAvgPrice}`,
        usedCount,
        usedPrice: `$${usedPrice.toFixed(2)}`,
        usedAvgPrice: `$${usedAvgPrice}`,
        cpoCount,
        cpoPrice: `$${cpoPrice.toFixed(2)}`,
        cpoAvgPrice: `$${cpoAvgPrice}`,
      };
    });
  };

  const generateColumns = () => [
    { field: "date", headerName: "DATE", width: 120 },
    { field: "newCount", headerName: "NEW INVENTORY", width: 120 },
    { field: "newPrice", headerName: "NEW TOTAL MSRP", width: 120 },
    { field: "newAvgPrice", headerName: "NEW AVERAGE MSRP", width: 120 },
    { field: "usedCount", headerName: "USED INVENTORY", width: 120 },
    { field: "usedPrice", headerName: "USED TOTAL MSRP", width: 120 },
    { field: "usedAvgPrice", headerName: "USED AVERAGE MSRP", width: 120 },
    { field: "cpoCount", headerName: "CPO INVENTORY", width: 120 },
    { field: "cpoPrice", headerName: "CPO TOTAL MSRP", width: 120 },
    { field: "cpoAvgPrice", headerName: "CPO AVERAGE MSRP", width: 90 },
  ];

  return (
    <div className="dashboardTableContainer">
      <div className="dashboardTableHeader">
        <p className="dashboardTableHeaderText">History log</p>
      </div>
      <div className="dashboardTableBody">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          sx={{
            border: "none",
            fontSize: "14px",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
          }}
          pageSizeOptions={[5, 10, 50, { value: 100, label: "100" }]}
        />
      </div>
    </div>
  );
};

export default DashboardTable;
