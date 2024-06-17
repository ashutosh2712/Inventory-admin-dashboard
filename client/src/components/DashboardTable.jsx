import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import { format, parse } from "date-fns";
import axios from "axios";
const DashboardTable = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchInventoryTableData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/inventory/table`
        );

        if (response.data) {
          setTableData(response.data);
          console.log(response.data);
        } else {
          console.error("Response is Empty");
          setError("Response is Empty");
        }
      } catch (error) {
        console.error("Error loading table data", error);
        setError(error);
      }
    };
    fetchInventoryTableData();
  }, []);

  const columns = [
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
          rows={tableData}
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
