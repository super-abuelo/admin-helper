import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div>
        <nav className='navbar'>
            <div className='container-fluid'>
                <NavLink to={"/home"}>Inicio</NavLink>
                <NavLink to={"/cierrecaja"}>Cierre de Caja</NavLink>
                <NavLink to={"/cierresrealizados"}>Cierres Realizados</NavLink>
                {/* <NavLink to={"/home"}></NavLink> */}
            </div>
        </nav>
    </div>
  )
}
