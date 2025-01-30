import React, { useEffect } from "react";
import { allData } from "../../pages/CashClosing/CashClosing";

type CashOpeningProps = {
  cashOpening: allData["cashOpening"];
  updateFields: (fields: Partial<allData["cashOpening"]>) => void;
};

function CashOpeningForm({ cashOpening, updateFields }: CashOpeningProps) {
  const {
    apertura = 0,
    facturasPagadas = 0,
    facturasProcesadas = 0,
    notasCredito = 0,
    reintegros = 0,
    totalBruto = 0,
  } = cashOpening;

  const calculateTotalBruto = (newValues: Partial<allData["cashOpening"]>) => {
    const updatedApertura = newValues.apertura ?? apertura;
    const updatedFacturasProcesadas =
      newValues.facturasProcesadas ?? facturasProcesadas;
    const updatedFacturasPagadas = newValues.facturasPagadas ?? facturasPagadas;
    const updatedReintegros = newValues.reintegros ?? reintegros;
    const updatedNotasCredito = newValues.notasCredito ?? notasCredito;

    // Calculate totalBruto dynamically
    const newTotalBruto =
      updatedApertura +
      updatedFacturasProcesadas +
      updatedReintegros +
      updatedFacturasPagadas -
      updatedNotasCredito;

    updateFields({ ...newValues, totalBruto: newTotalBruto });
  };

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
              className="form-control text-center"
              value={apertura}
              required
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  apertura: inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
              }}
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Facturas Pagadas:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={facturasPagadas}
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  facturasPagadas:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
                calculateTotalBruto({
                  facturasPagadas: Number(e.target.value) || 0,
                });
              }}
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
              className="form-control text-center"
              value={facturasProcesadas}
              required
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  facturasProcesadas:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
                calculateTotalBruto({
                  facturasProcesadas: Number(e.target.value) || 0,
                });
              }}
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Notas de Crédito (-):</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={notasCredito}
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  notasCredito:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
                calculateTotalBruto({
                  notasCredito: Number(e.target.value) || 0,
                });
              }}
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
              className="form-control text-center"
              value={reintegros}
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  reintegros:
                    inputValue === "" ? 0 : Number.parseInt(e.target.value),
                });
                calculateTotalBruto({
                  reintegros: Number(e.target.value) || 0,
                });
              }}
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total Bruto:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              readOnly
              value={
                apertura +
                facturasProcesadas +
                reintegros +
                facturasPagadas -
                notasCredito
              }
              onChange={(e) => {
                updateFields({ totalBruto: Number.parseInt(e.target.value) });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashOpeningForm;
