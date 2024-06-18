import React, { useState } from "react";
import Vector from "../assets/Vector.png";
import Filter from "../assets/filter.png";
import DashboardGraph from "../components/DashboardGraph";
import DashboardTable from "../components/DashboardTable";
import FilterData from "../components/FilterData";
import RecentData from "../components/RecentData";
const AdminDashboard = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  return (
    <div className="adminDashboardContainer">
      <div className="adminDashboardWrapper">
        <div className="header">
          <p className="inventoryText">Inventory</p>
        </div>
        <div className="headerLeft">
          <div className="headerSelectContianer">
            <p className="dealerText">Select Dealer</p>
            <div className="headerInputContainer">
              <input type="select" placeholder="Select" />
              <img src={Vector} alt="upArrow" />
            </div>
          </div>
          <button
            className="headerFilterContianer"
            onClick={toggleFilterVisibility}
          >
            <img src={Filter} alt="filter" />
            <p className="filterText">Filter Data By</p>
          </button>
          <div>{isFilterVisible && <FilterData />}</div>
        </div>
      </div>
      <RecentData />
      <DashboardGraph />
      <DashboardTable />
    </div>
  );
};

export default AdminDashboard;
