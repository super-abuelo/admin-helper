import React from "react";
type ServicesData = {
  serviciosBAC: number; // Servicios BAC
  depositosBAC: number; // Depósitos BAC
  totalBAC: number; // Total BAC
  avanceBAC: number; // Avance BAC
  serviciosTucan: number; // Servicios Tucan
  depositosTucan: number; // Depósitos Tucan
  totalTucan: number; // Total Tucan
  avanceBCR: number; // Avance BCR
  notas: string; // Notas
};

type ServicesProps = ServicesData & {
  updateFields: (fields: Partial<ServicesData>) => void;
};

function ServicesForm({
  serviciosBAC,
  depositosBAC,
  totalBAC,
  avanceBAC,
  serviciosTucan,
  depositosTucan,
  totalTucan,
  avanceBCR,
  notas,
  updateFields,
}: ServicesProps) {
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
              onChange={(e) =>
                updateFields({ serviciosBAC: Number.parseInt(e.target.value) })
              }
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
              onChange={(e) =>
                updateFields({
                  serviciosTucan: Number.parseInt(e.target.value),
                })
              }
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
              onChange={(e) =>
                updateFields({ depositosBAC: Number.parseInt(e.target.value) })
              }
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
              onChange={(e) =>
                updateFields({
                  depositosTucan: Number.parseInt(e.target.value),
                })
              }
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
              onChange={(e) =>
                updateFields({ avanceBAC: Number.parseInt(e.target.value) })
              }
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
              onChange={(e) =>
                updateFields({ avanceBCR: Number.parseInt(e.target.value) })
              }
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
