import React, { useState } from "react";

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
      <h1 className="my-3">Cierres de Caja Realizados</h1>
      <div className="d-flex justify-content-center">
        {/* Tabla Principal */}
        {!selectedRow && !showForm && (
          <table className="table table-striped w-75 border">
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
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Tabla Secundaria */}
        {selectedRow && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Detalles de la fila seleccionada</h2>
            <table className="table table-striped border">
              <thead>
                <tr>
                  <th>Cajero</th>
                  <th>Retiros Adicionales</th>
                  <th>Efectivo</th>
                  <th>Dólares</th>
                  <th>RapiBAC</th>
                  <th>Tucan</th>
                  <th>Ver más</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedRow.id}</td>
                  <td>{selectedRow.name}</td>
                  <td>{selectedRow.age}</td>
                  <td>Detalles adicionales</td>
                  <td>aaaaa</td>
                  <td>aaaaaaaaaaa</td>
                  <td>aaaa</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-secondary" onClick={handleBack}>
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
