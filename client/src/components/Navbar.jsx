import React from "react";
import NavLogo from "../assets/navLogo.png";
import SupportLogo from "../assets/Support.png";
import Profile from "../assets/profile.png";
import arrowDown from "../assets/arrowDown.png";
const Navbar = () => {
  return (
    <nav className="navContainer">
      <div className="navLeft">
        <img src={NavLogo} alt="navLogo" />
        <p className="dasboardTitle">Admin Console</p>
        <div className="logoTag">
          <p>ADMIN VIEW</p>
        </div>
      </div>

      <div className="navRight">
        <div className="supportText">
          <img src={SupportLogo} alt="support" />
          <p className="supportFont">Support</p>
        </div>
        <div className="adminProfile">
          <img src={Profile} alt="profile" />
          <p className="profileText">John</p>
          <img src={arrowDown} alt="arrowDown" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
