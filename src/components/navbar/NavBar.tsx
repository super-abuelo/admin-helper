import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { User } from "../../App";

export const NavBar = ({
  user,
  setUser,
}: {
  user: User | null;
  setUser: (user: User | null) => void;
}) => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="container-fluid">
          <img src="src/assets/logo.png" alt="" height={70} />
          <div className="tabs">
            {/* <NavLink to={"/home"}>Inicio</NavLink> */}

            {user?.role === "1" && (
              <>
                <NavLink to={"/cierrecaja"}>Cierre de Caja</NavLink>
              </>
            )}
            {user?.role === "0" && (
              <>
                <NavLink to={"/cierrecaja"}>Cierre de Caja</NavLink>
                <NavLink to={"/cierresrealizados"}>Cierres Realizados</NavLink>
              </>
            )}
            {/* <NavLink to={"/home"}></NavLink> */}
          </div>
        </div>
      </nav>
    </div>
  );
};
