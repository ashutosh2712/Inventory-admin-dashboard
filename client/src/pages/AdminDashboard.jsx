import React from "react";
import Vector from "../assets/Vector.png";
import Filter from "../assets/filter.png";
const AdminDashboard = () => {
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
          <div className="headerFilterContianer">
            <img src={Filter} alt="filter" />
            <p className="filterText">Filter Data By</p>
          </div>
        </div>
      </div>
      <div className="recentWrapper">
        <p className="recentText">Recent Gathered Data 04/01/24</p>
      </div>
      <div className="dataNumberContainer">
        <div className="databox">
          <p className="dataBoxHeader">379</p>
          <p className="dataBoxFooter"># New Units</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">$13,023,46</p>
          <p className="dataBoxFooter">New MSRP</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">$52,882</p>
          <p className="dataBoxFooter">New Avg. MSRP</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">67</p>
          <p className="dataBoxFooter"># Used Units</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">$1,576,456</p>
          <p className="dataBoxFooter">Used MSRP</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">$23,351</p>
          <p className="dataBoxFooter">Used Avg. MSRP</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">1</p>
          <p className="dataBoxFooter"># CPO Units</p>
        </div>
        <div className="databox">
          <p className="dataBoxHeader">$31,200</p>
          <p className="dataBoxFooter">CPO MSRP</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
