import { useState } from "react";
import SignIn from "./SignIn";
import "./Login.css";
import LoginForm from "./LoginForm";
import { fetchUsers, testFirestoreWrite } from "../../api/Firebase";

export const Login = () => {
  const [showForm, setShowForm] = useState(false);

  //testFirestoreWrite();
  fetchUsers();

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
