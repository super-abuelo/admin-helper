import { ReactNode, useState } from "react";
import { loginUser } from "../../api/usersFirebase";
import { useNavigate } from "react-router-dom";
import { User } from "../../App";
import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../../api/Firebase";
import logo from "../../assets/logo.png";

interface Props {
  user: User | null;
  setShowForm: Function;
  children?: ReactNode;
  setUser: (user: User | null) => void;
}

function LoginForm({ setShowForm, setUser }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);
      console.log("Login successful:", user, password);
      if (user) {
        const authUser = user; // Firebase auth user

        // Fetch user role from Firestore
        const userDocRef = doc(dataBase, "usuarios", authUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Create a user object with Firebase auth info + Firestore role
          const user = {  
            uid: authUser.uid,
            username: userData.username,
            role: userData.role, // Default role if not found
          };

          setUser(user); // Now setUser gets a properly typed users
          navigate("/cierrecaja", {
            state: { message: `👋 ¡Bienvenid@, ${user.username}!` },
          }); // Redirect to the home page
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card mt-3 p-4 w-50 rounded-4">
        <div className="h-50">
          <img src={logo} alt="" height={100} />
        </div>
        <div className="container">
          <div className="row my-3 align-items-center justify-content-center">
            <h4 className="mb-4">Inicio de Sesión</h4>
            <div className="col-4 d-flex justify-content-start align-items-center">
              <label className="fs-4">Usuario:</label>
            </div>
            <div className="col-4">
              <input
                type=""
                className="form-control text-center"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="row my-3 align-items-center justify-content-center">
            <div className="col-4 d-flex justify-content-start align-items-center">
              <label className="fs-4">Contraseña:</label>
            </div>
            <div className="col-4">
              <input
                type="password"
                className="form-control text-center"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex my-3 align-items-center justify-content-evenly">
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleLogin();
              }}
            >
              Iniciar Sesión
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(true)}
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
