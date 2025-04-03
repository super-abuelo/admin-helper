import { ReactNode, useState } from "react";
import { createUser } from "../../api/usersFirebase";
import { useNavigate } from "react-router-dom";

interface Props {
  setShowForm: Function;
  children?: ReactNode;
}

function SignIn({ setShowForm }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center">
      <div className="card mt-3 p-4 w-50 rounded-4">
        <div className="h-50">
          <img src="src/assets/logo.png" alt="" height={100} />
        </div>
        <div className="container">
          <div className="row my-3 align-items-center justify-content-center">
            <h4 className="mb-4">Creación de Cuenta</h4>
            <div className="col-4 d-flex justify-content-start align-items-center">
              <label className="fs-4">Usuario:</label>
            </div>
            <div className="col-4">
              <input
                type="text"
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
              onClick={() => setShowForm(false)}
            >
              Volver
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                createUser(username, password);
                navigate("/cierrecaja")
              }}
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
