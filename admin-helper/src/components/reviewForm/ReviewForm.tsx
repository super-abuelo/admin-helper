import React from "react";

function ReviewForm() {
  return (
    <div className="my-2">
      <h3 className="my-3">Revisión de Datos</h3>
      <div className="container">
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Apertura:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Créditos:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Facturas Procesadas:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Retiros de Caja:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Reintegros:</label>
          </div>
          <div className="col-2">
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
            <label>Facturas Pagadas:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Diferencia:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Notas de Crédito:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Servicios BAC:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total Bruto:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Depósitos BAC:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Efectivo:</label>
          </div>
          <div className="col-2">
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
            <label>Monedas:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Avance BAC:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Dólares:</label>
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
            <label>Datáfonos BAC:</label>
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
            <label>Datáfonos BCR:</label>
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
            <label>Pago Proveedores:</label>
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
      </div>
    </div>
  );
}

export default ReviewForm;
