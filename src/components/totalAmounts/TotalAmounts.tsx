import { allData } from "../../pages/CashClosing/CashClosing";

type TotalAmountsProps = {
  totalAmounts: allData["totalAmounts"];
  creditosTotal: allData["creditosTotal"];
  efectivoTotal: allData["efectivoTotal"];
  monedasTotal: allData["monedasTotal"];
  cashOpening: allData["cashOpening"];
  updateFields: (
    fields: Partial<allData["totalAmounts"]> &
      Partial<Pick<allData, "creditosTotal" | "efectivoTotal" | "monedasTotal">>
  ) => void;
};

function TotalAmounts({
  totalAmounts: {
    dolares,
    colones,
    datafonosBAC,
    datafonosBCR,
    total,
    pagoProveedores,
    retirosDeCaja,
  },
  cashOpening: { totalBruto },
  creditosTotal,
  efectivoTotal,
  monedasTotal,

  updateFields,
}: TotalAmountsProps) {
  const calculateTotal = (
    newValues: Partial<TotalAmountsProps["totalAmounts"]>
  ) => {
    // Ensure updated values are used if provided
    const updatedColones = newValues.colones ?? colones ?? 0; // We only sum colones, not dólares
    const updatedDatafonosBAC = newValues.datafonosBAC ?? datafonosBAC ?? 0;
    const updatedDatafonosBCR = newValues.datafonosBCR ?? datafonosBCR ?? 0;
    const updatedPagoProveedores =
      newValues.pagoProveedores ?? pagoProveedores ?? 0;
    const updatedRetirosDeCaja = newValues.retirosDeCaja ?? retirosDeCaja ?? 0;

    // Calculate new total (only adding colones, not dólares)
    const newTotal =
      parseFloat((efectivoTotal +
      monedasTotal +
      creditosTotal +
      updatedColones + // ✅ Use colones (which was calculated from dólares)
      updatedDatafonosBAC +
      updatedDatafonosBCR +
      updatedPagoProveedores +
      updatedRetirosDeCaja).toFixed(2));

    // Calculate diferencia after total is updated
    const newDiferencia = parseFloat((newTotal - (totalBruto ?? 0)).toFixed(2));

    // Update all at once to prevent async state issues
    updateFields({
      ...newValues,
      total: newTotal,
      diferencia: newDiferencia,
    });
  };

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
              readOnly
              value={efectivoTotal}
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
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  datafonosBCR:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
                calculateTotal({
                  datafonosBCR: Number(e.target.value) || 0,
                });
              }}
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
              value={monedasTotal}
              readOnly
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
              onChange={(e) => {
                const inputValue = e.target.value;
                calculateTotal({
                  pagoProveedores: Number(e.target.value) || 0,
                });
                updateFields({
                  pagoProveedores:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
              }}
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Dólares ($/₡):</label>
          </div>
          <div className="col-2 d-flex">
            <input
              type="number"
              className="form-control text-center w-50"
              placeholder="$"
              value={dolares}
              onChange={(e) => {
                const inputValue =
                  e.target.value === "" ? 0 : Number.parseInt(e.target.value);
                // Calculate colones based on updated dólares
                const convertedColones = inputValue * 490;

                // Update both dólares and colones
                updateFields({
                  dolares: inputValue,
                  colones: convertedColones,
                });

                // Recalculate total with the new colones value
                calculateTotal({ colones: convertedColones });
              }}
            />
            <input
              type="number"
              className="form-control text-center w-50"
              placeholder="₡"
              readOnly
              value={colones}
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
              readOnly
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
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  datafonosBAC:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
                calculateTotal({
                  datafonosBAC: Number(e.target.value) || 0,
                });
                
              }}
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
              onChange={(e) => {
                const inputValue = e.target.value;
                calculateTotal({
                  retirosDeCaja: Number(e.target.value) || 0,
                });
                updateFields({
                  retirosDeCaja:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
              }}
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label className="fw-semibold">Total:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              readOnly
              value={
                (efectivoTotal +
                monedasTotal +
                colones! +
                datafonosBAC! +
                datafonosBCR! +
                pagoProveedores! +
                creditosTotal +
                retirosDeCaja!).toFixed(2)
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label className="fw-semibold">Diferencia:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              readOnly
              value={(total! - totalBruto!).toFixed(2)}
              onChange={(e) => {
                updateFields({ diferencia: Number.parseInt(e.target.value) });
              }}
            />
          </div>
        </div>
        <div className="row my-3 justify-content-center">
          <div className="col">
            <label className="fw-semibold"> Total Bruto: {totalBruto}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalAmounts;
