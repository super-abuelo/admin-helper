import React from "react";

type TotalAmountsData = {
  efectivo: number; // Efectivo
  monedas: number; // Monedas
  dolares: number; // Dólares ($)
  colones: number; // Dólares (¢)
  datafonosBAC: number; // Datáfonos BAC
  datafonosBCR: number; // Datáfonos BCR
  total: number; // Total
  pagoProveedores: number; // Pago Proveedores
  creditosTotal: number; // Créditos
  retirosDeCaja: number; // Retiros de Caja
  diferencia: number; // Diferencia
};

type TotalAmountsProps = TotalAmountsData & {
  updateFields: (fields: Partial<TotalAmountsData>) => void;
};

function TotalAmounts({
  efectivo,
  monedas,
  dolares,
  colones,
  datafonosBAC,
  datafonosBCR,
  total,
  pagoProveedores,
  creditosTotal,
  retirosDeCaja,
  diferencia,
  updateFields,
}: TotalAmountsProps) {
  return (
    <div>
      <h1 className="my-4">2 / 3</h1>
      <div className="container">
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Efectivo:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={efectivo}
              onChange={(e) =>
                updateFields({ efectivo: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Datáfonos BCR:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={datafonosBCR}
              onChange={(e) =>
                updateFields({ datafonosBCR: Number.parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Monedas:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={monedas}
              onChange={(e) =>
                updateFields({ monedas: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Pago Proveedores:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={pagoProveedores}
              onChange={(e) =>
                updateFields({
                  pagoProveedores: Number.parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Dólares:</label>
          </div>
          <div className="col-2 d-flex">
            <input
              type="number"
              className="form-control text-center w-50"
              placeholder="$"
              value={dolares}
              onChange={(e) =>
                updateFields({ dolares: Number.parseInt(e.target.value) })
              }
            />
            <input
              type="number"
              className="form-control text-center w-50"
              placeholder="₡"
              value={colones}
              onChange={(e) =>
                updateFields({ colones: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Créditos:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={creditosTotal}
              onChange={(e) =>
                updateFields({ creditosTotal: Number.parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Datáfonos BAC:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={datafonosBAC}
              onChange={(e) =>
                updateFields({ datafonosBAC: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Retiros de Caja:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={retirosDeCaja}
              onChange={(e) =>
                updateFields({ retirosDeCaja: Number.parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              readOnly
              value={total}
              onChange={(e) =>
                updateFields({ total: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Diferencia:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              readOnly
              value={diferencia}
              onChange={(e) =>
                updateFields({ diferencia: Number.parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="row my-3 justify-content-center">
          <div className="col">
            <label> Total Bruto: -</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalAmounts;
