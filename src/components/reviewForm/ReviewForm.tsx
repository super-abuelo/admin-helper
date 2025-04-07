import { useEffect, useState } from "react";
import "./ReviewForm.css";
import { getCierreCaja } from "../../api/getFirebaseDoc";
import loadingGif from "../../assets/loading.gif";
import {
  updateAllSubcollections,
  updateParentDocument,
} from "../../api/updateFirebaseDoc";
import Toast from "../toast/Toast";

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
  const [showToast, setShowToast] = useState(false); // State to control toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State to control toast message

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

  const calculateTotalBruto = (newValues: Partial<any>) => {
    // Ensure updated values are used if provided
    const updatedApertura = newValues.apertura ?? 0;
    const updatedFacturasProcesadas = newValues.facturasProcesadas ?? 0;
    const updatedReintegros = newValues.reintegros ?? 0;
    const updatedFacturasPagadas = newValues.facturasPagadas ?? 0;
    const updatedNotasCredito = newValues.notasCredito ?? 0;

    // Calculate total bruto
    const totalBruto =
      updatedApertura +
      updatedFacturasProcesadas +
      updatedReintegros +
      updatedFacturasPagadas -
      updatedNotasCredito;

    return totalBruto;
  };

  const calculateTotal = (
    newValues: Partial<any>,
    creditos: number,
    efectivoTotal: number,
    monedasTotal: number
  ) => {
    // Ensure updated values are used if provided
    const updatedColones = newValues.colones ?? 0;
    const updatedDatafonosBAC = newValues.datafonosBAC ?? 0;
    const updatedDatafonosBCR = newValues.datafonosBCR ?? 0;
    const updatedPagoProveedores = newValues.pagoProveedores ?? 0;
    const updatedRetirosDeCaja = newValues.retirosDeCaja ?? 0;
    const updatedMonedas = monedasTotal ?? 0;
    const updatedEfectivo = efectivoTotal ?? 0;
    const updatedCreditos = creditos ?? 0;

    // Calculate total (only adding colones, not dólares)
    const newTotal =
      updatedEfectivo +
      updatedMonedas +
      updatedColones +
      updatedDatafonosBAC +
      updatedDatafonosBCR +
      updatedPagoProveedores +
      updatedCreditos +
      updatedRetirosDeCaja;

    return newTotal;
  };

  const recalculateDiferencia = (total: number, totalBruto: number) => {
    return total - totalBruto;
  };

  const handleChange = (
    section: string | null,
    field: string,
    value: number
  ) => {
    console.log(field + " : " + value);

    setData((prevData: any) => {
      const updatedData = section
        ? {
            ...prevData,
            [section]: {
              ...prevData[section],
              [field]: value, // dynamically update the field within the section
            },
          }
        : {
            ...prevData,
            [field]: value, // update the field directly at the top level
          };

      // Recalculate totals after each change
      const { cashOpening, totalAmounts, services } = updatedData;

      const totalBruto = calculateTotalBruto(cashOpening);
      const total = calculateTotal(
        totalAmounts,
        updatedData.creditosTotal,
        updatedData.efectivoTotal,
        updatedData.monedasTotal
      );

      const diferencia = recalculateDiferencia(total, totalBruto);
      const totalBAC = services.serviciosBAC + services.depositosBAC;
      const totalTucan = services.serviciosTucan + services.depositosTucan;

      console.log(
        `totalbruto: ${totalBruto} total: ${total} diferencia: ${diferencia}`
      );

      return {
        ...updatedData,
        cashOpening: {
          ...updatedData.cashOpening,
          totalBruto,
        },
        totalAmounts: {
          ...updatedData.totalAmounts,
          total,
          diferencia,
        },
        services: {
          ...updatedData.services,
          totalBAC,
          totalTucan,
        },
      };
    });
  };

  const handleSave = async () => {
    const confirmSave = window.confirm(
      "¿Desea guardar los cambios realizados?"
    );
    if (confirmSave) {
      try {
        // Update the parent document
        await updateParentDocument("cierresCaja", cierreId, data);

        // Update all subcollections
        await updateAllSubcollections(cierreId, data);
        //getbootstrap.com/docs/5.3/components/toasts/

        https: setToastMessage("✅ Los cambios se han guardado correctamente.");
        setShowToast(true);

        setIsEditing(false); // Disable editing mode after saving
      } catch (error) {
        console.error("❌ Error al guardar los cambios:", error);

        // Show error toast
        setToastMessage("❌ Ocurrió un error al guardar los cambios.");
        setShowToast(true);
      }
    }
  };

  return (
    <div className="my-2">
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
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
              {!isEditing ? "Editar" : "Editando"}
            </button>
            <button
              className="btn btn-primary shadow ms-3"
              onClick={handleSave} // Call handleSave on click
            >
              Guardar
            </button>
          </div>
          <div className="container">
            <div className="row my-2 justify-content-center">
              <div className="mb-3 d-flex justify-content-evenly">
                <h5>Fecha: {closingData.fecha}</h5>
                <h5>Cajero: {closingData.usuario}</h5>
                <h5>Súper: {closingData.superMercado}</h5>
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "cashOpening",
                        "apertura",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        null,
                        "creditosTotal",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "cashOpening",
                        "facturasProcesadas",
                        Number(e.target.value)
                      );
                    }
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
                  readOnly={!isEditing}
                  value={data.totalAmounts.retirosDeCaja}
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "totalAmounts",
                        "retirosDeCaja",
                        Number(e.target.value)
                      );
                    }
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
                  readOnly={!isEditing}
                  value={data.cashOpening.reintegros}
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "cashOpening",
                        "reintegros",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "cashOpening",
                        "facturasPagadas",
                        Number(e.target.value)
                      );
                    }
                  }}
                />
              </div>
              <div className="col-2 d-flex justify-content-start align-items-center">
                <label className="fw-semibold">Diferencia:</label>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control text-center"
                  readOnly={!isEditing}
                  value={data.totalAmounts.diferencia}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "cashOpening",
                        "notasCredito",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "services",
                        "serviciosBAC",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  readOnly
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "services",
                        "depositosBAC",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        null,
                        "efectivoTotal",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        null,
                        "monedasTotal",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "services",
                        "avanceBAC",
                        Number(e.target.value)
                      );
                    }
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
                  readOnly={!isEditing}
                  value={data.totalAmounts.dolares}
                  onChange={(e) => {
                    if (isEditing) {
                      const dolaresValue = Number(e.target.value);
                      const updatedColones = dolaresValue * 490;
                      handleChange("totalAmounts", "colones", updatedColones);

                      setData((prevData: any) => {
                        const updatedColones = dolaresValue * 490; // Calculate colones based on dolares
                        return {
                          ...prevData,
                          totalAmounts: {
                            ...prevData.totalAmounts,
                            dolares: dolaresValue,
                            colones: updatedColones,
                          },
                        };
                      });
                      console.log(
                        "Updated dolares:",
                        data.totalAmounts.dolares
                      );
                      console.log(
                        "Updated colones:",
                        data.totalAmounts.colones
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "services",
                        "serviciosTucan",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "totalAmounts",
                        "datafonosBAC",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "services",
                        "depositosTucan",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "totalAmounts",
                        "datafonosBCR",
                        Number(e.target.value)
                      );
                    }
                  }}
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "totalAmounts",
                        "pagoProveedores",
                        Number(e.target.value)
                      );
                    }
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
                  readOnly={!isEditing}
                  value={data.services.avanceBCR}
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "services",
                        "avanceBCR",
                        Number(e.target.value)
                      );
                    }
                  }}
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
