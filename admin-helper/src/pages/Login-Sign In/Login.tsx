import React from "react";

export const Login = () => {
  return (
    <div className="card w-50">
      <div className="h-50">
        <img src="src/assets/logo.png" alt="" height={100} />
      </div>
      <div className="container">
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Usuario:</label>
          </div>
          <div className="col-2">
            <input type="" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Contraseña:</label>
          </div>
          <div className="col-2">
            <input type="password" className="form-control text-center" />
          </div>
        </div>
      </div>
    </div>
  );
};
