import React from "react";

function CreditsForm() {
  return (
    <div>
      <h1 className="my-3">Créditos</h1>
      <div className="d-flex justify-content-center">
        <table className="table table-striped-columns table-bordered w-50 shadow">
          <thead>
            <tr>
              <th className="col-8">Créditos - Nombres</th>
              <th className="col">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="form-control border-0" />
              </td>
              <td>
                <input className="form-control border-0 text-center" />
              </td>
            </tr>{" "}
            <tr>
              <td>
                <input className="form-control border-0" />
              </td>
              <td>
                <input className="form-control border-0 text-center" />
              </td>
            </tr>{" "}
            <tr>
              <td>
                <input className="form-control border-0" />
              </td>
              <td>
                <input className="form-control border-0 text-center" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreditsForm;
