import React from "react";

function BillsForm() {
  return (
    <div>
      <h1 className="my-3">Billetes</h1>
      <div className="d-flex justify-content-center text-center">
        <table className="table table-striped-columns table-bordered w-50 shadow">
          <thead>
            <tr>
              <th className="col-4">Denominación</th>
              <th className="col-4">Cantidad</th>
              <th className="col-4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label className="my-2">20 000</label>
              </td>
              <td>
                <input type="number" className="form-control border-0 text-center" />
              </td>
              <td>
                <label className="my-2">-</label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="my-2">10 000</label>
              </td>
              <td>
                <input className="form-control border-0 text-center" />
              </td>
              <td>
                <label className="my-2">-</label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="my-2">5 000</label>
              </td>
              <td>
                <input className="form-control border-0 text-center" />
              </td>
              <td>
                <label className="my-2">-</label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="my-2">2 000</label>
              </td>
              <td>
                <input className="form-control border-0 text-center" />
              </td>
              <td>
                <label className="my-2">-</label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="my-2">1 000</label>
              </td>
              <td>
                <input className="form-control border-0 text-center" />
              </td>
              <td>
                <label className="my-2">-</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BillsForm;
