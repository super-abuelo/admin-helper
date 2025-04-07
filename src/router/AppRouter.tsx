import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login-Sign In/Login";

import { CashClosing } from "../pages/CashClosing/CashClosing";
import { RegisterClosings } from "../pages/RegisterClosings/RegisterClosings";
import { User } from "../App";
import NotFound from "../pages/NotFound";

interface Props {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AppRouter = ({ user, setUser }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Login user={user} setUser={setUser} />} />
      <Route path="/cierrecaja" element={<CashClosing user={user} />} />
      <Route path="/cierresrealizados" element={<RegisterClosings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
