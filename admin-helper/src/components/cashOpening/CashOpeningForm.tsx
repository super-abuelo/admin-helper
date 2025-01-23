import React from "react";

type CashOpeningData = {
  apertura: number;
  facturasPagadas: number;
  facturasProcesadas: number;
  notasCredito: number;
  reintegros: number;
  totalBruto: number;
};

type CashOpeningProps = CashOpeningData & {
  updateFields: (fields: Partial<CashOpeningData>) => void;
};

function CashOpeningForm({
  apertura,
  facturasPagadas,
  facturasProcesadas,
  notasCredito,
  reintegros,
  totalBruto,
  updateFields,
}: CashOpeningProps) {
  return (
    <div>
      <h1 className="my-4">1 / 3</h1>
      <div className="container">
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label className="">Apertura:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control"
              value={apertura}
              onChange={(e) =>
                updateFields({ apertura: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Facturas Pagadas:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control"
              value={facturasPagadas}
              onChange={(e) =>
                updateFields({
                  facturasPagadas: Number.parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Facturas Procesadas:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control"
              value={facturasProcesadas}
              onChange={(e) =>
                updateFields({
                  facturasProcesadas: Number.parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Notas de Crédito (-):</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control"
              value={notasCredito}
              onChange={(e) =>
                updateFields({ notasCredito: Number.parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Reintegros:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control"
              value={reintegros}
              onChange={(e) =>
                updateFields({ reintegros: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total Bruto:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control"
              readOnly
              value={totalBruto}
              onChange={(e) =>
                updateFields({ totalBruto: Number.parseInt(e.target.value) })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashOpeningForm;
