import { useState } from "react";
import SignIn from "./SignIn";
import "./Login.css";
import LoginForm from "./LoginForm";

export const Login = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="form-container">
      {showForm ? (
        <SignIn setShowForm={setShowForm} />
      ) : (
        <LoginForm setShowForm={setShowForm} />
      )}
    </div>
  );
};
