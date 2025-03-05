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
    const updatedDolares = newValues.dolares ?? dolares;
    const updatedDatafonosBAC = newValues.datafonosBAC ?? datafonosBAC;
    const updatedDatafonosBCR = newValues.datafonosBCR ?? datafonosBCR;
    const updatedPagoProveedores = newValues.pagoProveedores ?? pagoProveedores;
    const updatedRetirosDeCaja = newValues.retirosDeCaja ?? retirosDeCaja;

    const newTotal =
      efectivoTotal +
      monedasTotal +
      creditosTotal +
      updatedDolares! * 490 +
      updatedDatafonosBAC! +
      updatedDatafonosBCR! +
      updatedPagoProveedores! +
      updatedRetirosDeCaja!;

    updateFields({ ...newValues, total: newTotal });
    updateFields({ diferencia: totalBruto! - total! });
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
                calculateTotal({
                  datafonosBCR: Number(e.target.value) || 0,
                });
                updateFields({
                  datafonosBCR:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
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
                const inputValue = e.target.value;
                updateFields({
                  dolares: inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
                updateFields({
                  colones:
                    inputValue === "" ? 0 : Number.parseInt(inputValue) * 490,
                });
                calculateTotal({
                  colones: Number(e.target.value) || 0,
                });
              }}
            />
            <input
              type="number"
              className="form-control text-center w-50"
              placeholder="₡"
              readOnly
              value={dolares! * 490}
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
                calculateTotal({
                  datafonosBAC: Number(e.target.value) || 0,
                });
                updateFields({
                  datafonosBAC:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
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
            <label>Total:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              readOnly
              value={
                efectivoTotal +
                monedasTotal +
                colones! +
                datafonosBAC! +
                datafonosBCR! +
                pagoProveedores! +
                creditosTotal +
                retirosDeCaja!
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
              value={total! - totalBruto!}
              onChange={(e) =>
                updateFields({ diferencia: Number.parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="row my-3 justify-content-center">
          <div className="col">
            <label> Total Bruto: {totalBruto}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalAmounts;
