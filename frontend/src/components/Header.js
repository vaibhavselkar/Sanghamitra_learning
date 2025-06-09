// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Nav";

const Header = () => {
  return (
    <header id="header container-xl" class="sticky-top" style={{ width: "100%", backgroundColor: "#f8f9fa" }}>
      <div className="container-xl" >
        <Link to="/" className="">
        </Link>
        <Navbar/>
      </div>
    </header>
  );
};

export default Header;
