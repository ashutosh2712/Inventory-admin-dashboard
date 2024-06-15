import React from "react";
import leftArrow from "../assets/arrowLeft.png";
import cross from "../assets/icon-right.png";
import { Checkbox } from "@mui/material";
const FilterData = () => {
  return (
    <div className="filterContainer">
      <div className="filterHeader">
        <img src={leftArrow} alt="left Arrow" />
        <p className="filterHeaderText">Filter Data By</p>
      </div>
      <div className="filterUpper">
        <p className="filterUpperHeader">Make</p>
        <div className="filterUpperHeaderField">
          <Checkbox />
          Ford
        </div>
        <div className="filterUpperHeaderField">
          <Checkbox />
          Cardilic
        </div>
        <div className="filterUpperHeaderField">
          <Checkbox />
          Jeep
        </div>
      </div>
      <div className="filterMid">
        {" "}
        <p className="filterUpperHeader">Duration</p>
        <div className="filterUpperHeaderField">
          <Checkbox />
          Last Month
        </div>
        <div className="filterUpperHeaderField">
          <Checkbox />
          This Month
        </div>
        <div className="filterUpperHeaderField">
          <Checkbox />
          Last 3 Months
        </div>
        <div className="filterUpperHeaderField">
          <Checkbox />
          Last 6 Months
        </div>
        <div className="filterUpperHeaderField">
          <Checkbox />
          This Year
        </div>
        <div className="filterUpperHeaderField">
          <Checkbox />
          Last Year
        </div>
      </div>
      <div className="filterFooter">
        <button className="applyFilterBtn">Apply Filter</button>
        <button className="removeFilterBtn">
          <img src={cross} alt="cross" />
          <p className="removeBtntext">Remove All Filters</p>
        </button>
      </div>
    </div>
  );
};

export default FilterData;
