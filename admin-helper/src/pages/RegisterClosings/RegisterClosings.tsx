import React, { useState } from "react";
import ReviewForm from "../../components/reviewForm/ReviewForm";
import { Login } from "../Login-Sign In/Login";

export const RegisterClosings = () => {
  const [selectedRow, setSelectedRow] = useState<null | {
    id: number;
    name: string;
    age: number;
  }>(null);
  const [showForm, setShowForm] = useState(false);

  const handleRowClick = (row: { id: number; name: string; age: number }) => {
    setSelectedRow(row);
    console.log("Fila seleccionada:", row);
  };

  const handleBack = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setSelectedRow(null);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Login></Login>
      <h1 className="my-3">Cierres de Caja Realizados</h1>
      {!selectedRow && !showForm && (
        <div className="d-flex justify-content-center">
          <table className="table table-striped table-bordered w-75">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Retiros Adicionales</th>
                <th>Efectivo</th>
                <th>Dólares</th>
                <th>RapiBAC</th>
                <th>Tucan</th>
                <th>Ver Más</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleRowClick({ id: 1, name: "Nombre 1", age: 30 })
                    }
                  >
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tabla Secundaria */}
      {selectedRow && !showForm && (
        <div>
          <h4 className="my-2">Detalles de la fila seleccionada</h4>
          <div className="d-flex justify-content-center">
            <table className="table table-striped table-bordered w-75">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Detalles</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedRow.id}</td>
                  <td>{selectedRow.name}</td>
                  <td>{selectedRow.age}</td>
                  <td>Detalles adicionales</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={handleShowForm}
                    >
                      Ver Formulario
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="btn btn-secondary mt-2" onClick={handleBack}>
            Volver
          </button>
        </div>
      )}
      {showForm && (
        <div>
          <ReviewForm />
          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3"
              onClick={handleBack}
            >
              Volver
            </button>
          </div>

          {/* <form className="border p-4 rounded">
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Fecha:</label>
                <input
                  type="date"
                  className="form-control"
                  defaultValue="2023-12-20"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Cajero:</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Josué"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Caja:</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue="1"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Apertura:</label>
                <input type="text" className="form-control" defaultValue="-" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Créditos:</label>
                <input type="text" className="form-control" defaultValue="-" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3"
              onClick={handleBack}
            >
              Volver
            </button>
          </form> */}
        </div>
      )}
    </div>
  );
};
