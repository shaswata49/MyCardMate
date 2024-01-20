import React, { useState } from "react";
import "./Navbar.css";
// import logo from "../../../images/logo.png";
function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <a href="/" className="nav__brand">
        MyCardMate
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="/" className="nav__link">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="/products" className="nav__link">
            Products
          </a>
        </li>
        <li className="nav__item">
          <a
            href="https://sites.google.com/view/gurubooking"
            className="nav__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            OTP Submit
          </a>
        </li>
        <li className="nav__item">
          <a href="/about" className="nav__link">
            About Us
          </a>
        </li>
        <li className="nav__item">
          <a href="/contact" className="nav__link">
            Contact Us
          </a>
        </li>
        <li className="nav__item">
          <a href="/login" className="nav__link">
            Login/Register
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
