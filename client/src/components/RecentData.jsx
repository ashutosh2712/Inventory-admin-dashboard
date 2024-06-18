import axios from "axios";
import React, { useEffect, useState } from "react";

const RecentData = () => {
  const [recentData, setRecentData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/inventory/recent`
        );

        if (response.data) {
          setRecentData(response.data);
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
    fetchRecentData();
  }, []);
  return (
    <>
      <div className="recentWrapper">
        <p className="recentText">Recent Gathered Data {recentData[0].date}</p>
      </div>
      <div className="dataNumberContainer">
        <div className="databox">
          <p className="dataBoxHeader">{recentData[0].newCount}</p>
          <p className="dataBoxFooter"># New Units</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">{recentData[0].newPrice}</p>
          <p className="dataBoxFooter">New MSRP</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">{recentData[0].newAvgPrice}</p>
          <p className="dataBoxFooter">New Avg. MSRP</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">{recentData[0].usedCount}</p>
          <p className="dataBoxFooter"># Used Units</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">{recentData[0].usedPrice}</p>
          <p className="dataBoxFooter">Used MSRP</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">{recentData[0].usedAvgPrice}</p>
          <p className="dataBoxFooter">Used Avg. MSRP</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">{recentData[0].cpoCount}</p>
          <p className="dataBoxFooter"># CPO Units</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">{recentData[0].cpoPrice}</p>
          <p className="dataBoxFooter">CPO MSRP</p>
        </div>
      </div>
    </>
  );
};

export default RecentData;
