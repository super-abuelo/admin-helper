import { ReactNode } from "react";
import { NavBar } from "../navbar/NavBar";
import "./Layout.css";
import { useLocation } from "react-router-dom";
import { User } from "../../App";

interface LayoutProps {
  children: ReactNode;
  user: User | null;
  setUser: (user: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, setUser }) => {
  return (
      <>
          {user && <NavBar user={user} setUser={setUser} />}
          <div className="main-body">{children}</div>
      </>
  );
};

export default Layout;
