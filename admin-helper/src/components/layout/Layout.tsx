import { ReactNode } from "react";
import { NavBar } from "../navbar/NavBar";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="main-body">{children}</div>
    </>
  );
};

export default Layout;
