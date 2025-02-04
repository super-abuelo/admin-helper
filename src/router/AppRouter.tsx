import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login-Sign In/Login";
import { Home } from "../pages/Home/Home";
import { CashClosing } from "../pages/CashClosing/CashClosing";
import { RegisterClosings } from "../pages/RegisterClosings/RegisterClosings";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cierrecaja" element={<CashClosing />} />
      <Route path="/cierresrealizados" element={<RegisterClosings />} />
    </Routes>
  );
};
