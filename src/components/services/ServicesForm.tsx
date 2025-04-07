import { allData } from "../../pages/CashClosing/CashClosing";

type ServicesProps = {
  servicesData: allData["services"];
  cashOpening: allData["cashOpening"];
  totalAmounts: allData["totalAmounts"];
  updateFields: (fields: Partial<allData["services"]>) => void;
};

function ServicesForm({
  servicesData: {
    serviciosBAC,
    depositosBAC,
    totalBAC,
    avanceBAC,
    serviciosTucan,
    depositosTucan,
    totalTucan,
    avanceBCR,
    notas,
  },
  totalAmounts: { total },
  cashOpening: { totalBruto },
  totalAmounts: {diferencia},
  updateFields,
}: ServicesProps) {
  const calculateDifferenceBac = (
    newValues: Partial<ServicesProps>["servicesData"]
  ) => {
    const updatedDeposito = newValues!.depositosBAC ?? depositosBAC;
    const updatedServices = newValues!.serviciosBAC ?? serviciosBAC;

    const newTotalBac = updatedDeposito! + updatedServices!;

    updateFields({ ...newValues, totalBAC: newTotalBac });
  };

  const calculateDifferenceBcr = (
    newValues: Partial<ServicesProps>["servicesData"]
  ) => {
    const updatedDeposito = newValues!.depositosTucan ?? depositosTucan;
    const updatedServices = newValues!.serviciosTucan ?? serviciosTucan;

    const newTotalBcr = updatedDeposito! + updatedServices!;

    updateFields({ ...newValues, totalTucan: newTotalBcr });
  };

  return (
    <div>
      <h1 className="my-4">3 / 3</h1>
      <div className="container">
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Servicios BAC:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={serviciosBAC}
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({ serviciosBAC: Number.parseInt(e.target.value) });
                calculateDifferenceBac({
                  serviciosBAC:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
              }}
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Servicios Tucán:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={serviciosTucan}
              onChange={(e) => {
                const inputValue = e.target.value;
                calculateDifferenceBcr({
                  serviciosTucan:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
                updateFields({
                  serviciosTucan: Number.parseInt(e.target.value),
                });
              }}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Depósitos BAC:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={depositosBAC}
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  depositosBAC:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });

                calculateDifferenceBac({
                  depositosBAC:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
              }}
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Depósitos Tucán:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={depositosTucan}
              onChange={(e) => {
                const inputValue = e.target.value;
                calculateDifferenceBcr({
                  depositosTucan:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
                updateFields({
                  depositosTucan: Number.parseInt(e.target.value),
                });
              }}
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total BAC:</label>
          </div>
          <div className="col-2 d-flex">
            <input
              type="number"
              className="form-control text-center"
              value={totalBAC}
              readOnly
              onChange={(e) =>
                updateFields({ totalBAC: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Total Tucán:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={totalTucan}
              readOnly
              onChange={(e) =>
                updateFields({ totalTucan: Number.parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Avance BAC</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              
              value={avanceBAC}
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  avanceBAC:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
              }}
            />
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center">
            <label>Avance BCR:</label>
          </div>
          <div className="col-2">
            <input
              type="number"
              className="form-control text-center"
              value={avanceBCR}
              onChange={(e) => {
                const inputValue = e.target.value;
                updateFields({
                  avanceBCR:
                    inputValue === "" ? 0 : Number.parseInt(inputValue),
                });
              }}
            />
          </div>
        </div>
        <div className="row my-2 justify-content-center">
          <label className="my-2">Notas:</label>
          <textarea
            className="form-control my-1 w-50"
            value={notas}
            onChange={(e) => updateFields({ notas: e.target.value })}
          ></textarea>
        </div>
        <div className="row my-2 justify-content-center">
          <div className="col-2">
            <label> Total B: {totalBruto}</label>
          </div>
          <div className="col-2">
            <label> Total: {total}</label>
          </div>
          <div className="col-2">
            <label> Diferencia: {diferencia}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesForm;
