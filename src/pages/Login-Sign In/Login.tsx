import { useState } from "react";
import SignIn from "./SignIn";
import "./Login.css";
import LoginForm from "./LoginForm";  
import { User } from "../../App";

interface Props {
  user: User,
  setUser: (user: User | null) => void;
}

export const Login = ({user, setUser}: Props) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {showForm ? (
        <SignIn setShowForm={setShowForm} />
      ) : (
        <LoginForm setShowForm={setShowForm} user={user} setUser={setUser}/>
      )}
    </div>
  );
};
