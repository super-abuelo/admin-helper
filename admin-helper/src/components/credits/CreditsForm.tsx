import React from "react";

function CreditsForm() {
  return (
    <div>
      <h1 className="my-2">Créditos</h1>
      <div className="d-flex justify-content-center">
        <table className="table table-striped-columns table-bordered w-50 shadow">
          <thead>
            <tr>
              <th>Créditos - Nombres</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="form-control border-0"/>
              </td>
              <td>
                <input className="form-control border-0 w-50" />
              </td>
            </tr>{" "}
            <tr>
              <td>
                <input className="form-control border-0" />
              </td>
              <td>
                <input className="form-control border-0 w-50" />
              </td>
            </tr>{" "}
            <tr>
              <td>
                <input className="form-control border-0" />
              </td>
              <td>
                <input className="form-control border-0 w-50" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreditsForm;
