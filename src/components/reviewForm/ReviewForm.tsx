import { useEffect, useState } from "react";
import "./ReviewForm.css";
import { getCierreCaja } from "../../api/getFirebaseDoc";
import loadingGif from "../../assets/loading.gif";

function ReviewForm({
  closingData,
  cierreId,
}: {
  closingData: any;
  cierreId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const cierreData = await getCierreCaja(cierreId); // Await the data fetch
        setData(cierreData); // Set the retrieved data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, [cierreId]);

  return (
    <div className="my-2">
      {loading ? (
        <div>
          <div className="d-flex justify-content-center mt-5">
            <img src={loadingGif} alt="Loading..." width="75" />
          </div>
          <h6 className="my-3">Cargando datos...</h6>
        </div>
      ) : (
        <div>
          <div className="revision-container">
            <h3 className="my-3">Revisión de Datos</h3>
            <button
              className="btn btn-success shadow "
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Editar
            </button>
          </div>
          <div className="container">
            <div className="row my-2 justify-content-center">
              <div className="mb-3 d-flex justify-content-evenly">
                <h5>Fecha: {closingData.fecha}</h5>
                <h5>Cajero: {closingData.usuario}</h5>
                <h5>Súper: {closingData.super}</h5>
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Apertura:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.cashOpening.apertura}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Créditos:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.creditosTotal}
                />
              </div>
            </div>
            <div className="row my-2 justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Facturas Procesadas:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.cashOpening.facturasProcesadas}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Retiros de Caja:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.totalAmounts.retirosDeCaja}
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
                  readOnly={!isEditing}
                  value={data.cashOpening.reintegros}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label className="fw-semibold">Total:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.totalAmounts.total}
                />
              </div>
            </div>
            <div className="row my-2 justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Facturas Pagadas:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.cashOpening.facturasPagadas}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Diferencia:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.totalAmounts.total - data.cashOpening.totalBruto}
                />
              </div>
            </div>
            <div className="row my-2 justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Notas de Crédito:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.cashOpening.notasCredito}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Servicios BAC:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.services.serviciosBAC}
                />
              </div>
            </div>
            <div className="row my-2 justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label className="fw-semibold">Total Bruto:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.cashOpening.totalBruto}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Depósitos BAC:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.services.depositosBAC}
                />
              </div>
            </div>
            <div className="row my-2 justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Efectivo:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.efectivoTotal}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label className="fw-semibold">Total BAC:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.services.totalBAC}
                />
              </div>
            </div>
            <div className="row my-2 justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Monedas:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.monedasTotal}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Avance BAC:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.services.avanceBAC}
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
                  readOnly={!isEditing}
                  value={data.totalAmounts.dolares}
                />
                <input
                  type="number"
                  className="form-control text-center w-50"
                  readOnly={!isEditing}
                  value={data.totalAmounts.colones}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Servicios Tucan:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.services.serviciosTucan}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Datáfonos BAC:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.totalAmounts.datafonosBAC}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Depósitos Tucan:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  
                  value={data.services.depositosTucan}
                />
              </div>
            </div>
            <div className="row my-2 justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Datáfonos BCR:</label>
              </div>
              <div className="col-2 d-flex">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  
                  value={data.totalAmounts.datafonosBCR}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label className="fw-semibold">Total BCR:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  
                  value={data.services.totalTucan}
                />
              </div>
            </div>
            <div className="row my-2 justify-content-center">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Pago Proveedores:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.totalAmounts.pagoProveedores}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label>Avance BCR:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.services.avanceBCR}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
