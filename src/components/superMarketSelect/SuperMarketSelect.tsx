import React, { useState } from "react";
import { allData } from "../../pages/CashClosing/CashClosing";

type marketSelectProps = {
  usuario: allData["usuario"];
  fecha: allData["fecha"];
  superMercado: allData["superMercado"];
  caja: allData["caja"];
  updateFields: (
    fields: Partial<Pick<allData, "superMercado" | "caja">>
  ) => void;
};

function SuperMarketSelect({
  usuario,
  fecha,
  superMercado,
  caja,
  updateFields,
}: marketSelectProps) {
  const [selectedSuper, setSelectedSuper] = useState("");
  const [selectedCaja, setSelectedCaja] = useState("");
  return (
    <div>
      <h1 className="my-3">Seleccione la información solicitada:</h1>
      <div className="d-flex justify-content-center">
        <h4 className="me-3 fw-normal">Usuario: {usuario}</h4>
        <h4 className="fw-normal">Fecha: {fecha}</h4>
      </div>
      <div className="d-flex flex-column align-items-center my-3">
        <select
          className="form-select w-25 mb-4"
          value={selectedSuper}
          onChange={(e) => {
            const superValue = e.target.value;

            setSelectedSuper(superValue);
            console.log(superValue);
            
            updateFields({ superMercado: Number.parseInt(e.target.value) });
          }}
        >
          <option value="" disabled>
            Seleccione un supermercado
          </option>
          <option value="1">Super El Abuelo 1 (El Burrito)</option>
          <option value="2">Super El Abuelo 2 (La Perla)</option>
        </select>
        <select
          className="form-select w-25"
          value={selectedCaja}
          onChange={(e) => {
            setSelectedCaja(e.target.value);
            updateFields({ caja: Number.parseInt(e.target.value) });
          }}
        >
          <option value="" disabled>
            Seleccione el número de caja
          </option>
          <option value="1">Caja Principal (1)</option>
          <option value="2">Caja Secundaria (2)</option>
        </select>
      </div>
    </div>
  );
}

export default SuperMarketSelect;
