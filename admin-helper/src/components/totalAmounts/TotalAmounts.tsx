import React from 'react'

function TotalAmounts() {
  return (
    <div>
        <h1 className="my-4">2 / 3</h1>
      <div className="container">
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Efectivo:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Datáfonos BCR:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center"/>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Monedas:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center"/>
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Pago Proveedores:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center"/>
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Dólares:</label>
          </div>
          <div className="col-2 d-flex">
            <input type="number" className="form-control text-center w-50" placeholder="$"/>
            <input type="number" className="form-control text-center w-50" placeholder="₡"/>
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Créditos:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center"/>
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Datáfonos BAC:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Retiros de Caja:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center"/>
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Diferencia:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center" />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total:</label>
          </div>
          <div className="col-2">
            <input type="number" className="form-control text-center readonly"/>
          </div>
        </div>
        <div className="row my-3 justify-content-center">
          <div className="col">
            <label> Total Bruto: -</label>
          </div>
       </div>
      </div>
    </div>
  )
}

export default TotalAmounts