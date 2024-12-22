import React from "react";

function ServicesForm() {
  return (
    <div>
      <h1 className="my-4">3 / 3</h1>
      <div className="container">
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Servicios BAC:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Servicios Tucan:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Depósitos BAC:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Depósitos Tucan:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total:</label>
          </div>
          <div className="col-2 d-flex">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Avance BAC</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Avance BCR:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
            <label className="my-2">Notas:</label>
            <textarea className="form-control my-1 w-50"></textarea>
        </div>
        <div className="row my-3 justify-content-center">
          <div className="col-2">
            <label> Total Bruto: -</label>
          </div>
          <div className="col-2">
            <label> Total: -</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesForm;
