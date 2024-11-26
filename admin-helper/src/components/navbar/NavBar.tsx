import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="container-fluid">
          <img src="src/assets/logo.png" alt="" height={70} />
          <div className="tabs">
            <NavLink to={"/home"}>Inicio</NavLink>
            <NavLink to={"/cierrecaja"}>Cierre de Caja</NavLink>
            <NavLink to={"/cierresrealizados"}>Cierres Realizados</NavLink>
            {/* <NavLink to={"/home"}></NavLink> */}
            <a>Inicio Sesión</a>
          </div>
        </div>
      </nav>
    </div>
  );
};
