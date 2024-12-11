import React from "react";

function CashOpeningForm() {
  return (
    <div>
      <h1 className="my-4">1 / 3</h1>
      <div className="container">
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label className="">Apertura:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Facturas Pagadas:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control"/>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Facturas Procesadas:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control"/>
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Notas de Crédito (-):</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control"/>
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Reintegros:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total Bruto:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashOpeningForm;
