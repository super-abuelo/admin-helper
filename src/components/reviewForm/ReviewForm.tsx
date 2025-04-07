import { useEffect, useState } from "react";
import "./ReviewForm.css";
import { getCierreCaja } from "../../api/getFirebaseDoc";
import loadingGif from "../../assets/loading.gif";
import { allData } from "../../pages/CashClosing/CashClosing";

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

  const calculateTotalBruto = (newValues: Partial<any>) => {
    // Ensure updated values are used if provided
    const updatedApertura = newValues.apertura ?? 0;
    const updatedFacturasProcesadas = newValues.facturasProcesadas ?? 0;
    const updatedReintegros = newValues.reintegros ?? 0;
    const updatedFacturasPagadas = newValues.facturasPagadas ?? 0;
    const updatedNotasCredito = newValues.notasCredito ?? 0;

    console.log();

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

    console.log(`Colones: ${updatedColones}`);
    console.log(`datafonosBAC: ${updatedDatafonosBAC}`);
    console.log(`datafonosBCR: ${updatedDatafonosBCR}`);
    console.log(`pagoProveedores: ${updatedPagoProveedores}`);
    console.log(`retirosCaja: ${updatedRetirosDeCaja}`);
    console.log(`efectivoTotal: ${efectivoTotal}`);
    console.log(`monedasTotal: ${monedasTotal}`);
    console.log(`creditos: ${creditos}`);
    console.log(`total: ${data.totalAmounts.total}`);

    // Calculate total (only adding colones, not dólares)
    const newTotal =
      efectivoTotal +
      monedasTotal +
      updatedColones +
      updatedDatafonosBAC +
      updatedDatafonosBCR +
      updatedPagoProveedores +
      creditos +
      updatedRetirosDeCaja;

    return newTotal;
  };

  const recalculateDiferencia = (total: number, totalBruto: number) => {
    return total - totalBruto;
  };

  const handleChange = (section: string, field: string, value: number) => {
    console.log(field + " : " + value);

    setData((prevData: any) => {
      const updatedData = {
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value, // dynamically update the field within the section
        },
      };

      // Recalculate totals after each change
      const { cashOpening, totalAmounts } = updatedData;

      const totalBruto = calculateTotalBruto(cashOpening);
      const total = calculateTotal(
        totalAmounts,
        updatedData.creditosTotal,
        updatedData.efectivoTotal,
        updatedData.monedasTotal
      );
      const diferencia = recalculateDiferencia(
        data.totalAmounts.total,
        totalBruto
      );

      console.log(
        `totalbruto: ${totalBruto} total: ${data.totalAmounts.total} diferencia: ${diferencia}`
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
      };
    });
  };

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
              {!isEditing ? "Editar" : "Editando"}
            </button>
            <button
              onClick={() => {
                console.log(data);
              }}
            >
              {" "}
              aaa
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
                  //hacer lo del boton y tabla
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
                      // handleChange(
                      //   "services",
                      //   "serviciosBAC",
                      //   Number(e.target.value)
                      // );
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
                  onChange={(e) => {
                    if (isEditing) {
                      handleChange(
                        "totalAmounts",
                        "dolares",
                        Number(e.target.value)
                      );
                      handleChange(
                        "totalAmounts",
                        "colones",
                        Number(e.target.value) * 490
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
