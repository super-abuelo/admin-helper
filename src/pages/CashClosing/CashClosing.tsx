import { FormEvent, useEffect, useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import CreditsForm from "../../components/credits/CreditsForm";
import BillsForm from "../../components/bills/BillsForm";
import CashOpeningForm from "../../components/cashOpening/CashOpeningForm";
import CoinsForm from "../../components/coins/CoinsForm";
import ServicesForm from "../../components/services/ServicesForm";
import TotalAmounts from "../../components/totalAmounts/TotalAmounts";
import { addParentDocument } from "../../api/addFirebaseDoc";
import SuperMarketSelect from "../../components/superMarketSelect/SuperMarketSelect";
import { User } from "../../App";
import Toast from "../../components/toast/Toast";
import { useLocation } from "react-router-dom";

const getFormattedDate = (): string => {
  const today = new Date();
  return today.toLocaleDateString("es-CR"); // "es-CR" ensures dd/MM/yyyy format
};

export type allData = {
  cashOpening: {
    apertura?: number;
    facturasPagadas?: number;
    facturasProcesadas?: number;
    notasCredito?: number;
    reintegros?: number;
    totalBruto?: number;
  };
  totalAmounts: {
    dolares?: number; // Dólares ($)
    colones?: number; // Dólares (¢)
    datafonosBAC?: number; // Datáfonos BAC
    datafonosBCR?: number; // Datáfonos BCR
    total?: number; // Total
    pagoProveedores?: number; // Pago Proveedores
    retirosDeCaja?: number; // Retiros de Caja
    diferencia?: number;
  };
  services: {
    serviciosBAC?: number; // Servicios BAC
    depositosBAC?: number; // Depósitos BAC
    totalBAC?: number; // Total BAC
    avanceBAC?: number; // Avance BAC
    serviciosTucan?: number; // Servicios Tucan
    depositosTucan?: number; // Depósitos Tucan
    totalTucan?: number; // Total Tucan
    avanceBCR?: number; // Avance BCR
    notas?: string; // Notas
  };
  denominaciones: {
    cincuentaMil?: number;
    veinteMil?: number;
    diezMil?: number;
    cincoMil?: number;
    dosMil?: number;
    mil?: number;
  };
  denominacionesMonedas: {
    quinientos?: number;
    cien?: number;
    cincuenta?: number;
    veinticinco?: number;
    diez?: number;
    cinco?: number;
  };
  creditosData: {
    id: number; // Unique identifier for each credit
    name: string; // Name of the credit
    amount: number; // Amount of the credit
  }[];
  fecha: string;
  superMercado: number;
  usuario: string;
  caja: number;
  efectivoTotal: number;
  monedasTotal: number;
  creditosTotal: number;
};

const getDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Returns "yyyy-MM-dd"
};
export const initialData: allData = {
  cashOpening: {
    apertura: 0,
    facturasPagadas: 0,
    facturasProcesadas: 0,
    notasCredito: 0,
    reintegros: 0,
    totalBruto: 0,
  },
  totalAmounts: {
    dolares: 0,
    colones: 0,
    datafonosBAC: 0,
    datafonosBCR: 0,
    total: 0,
    pagoProveedores: 0,
    retirosDeCaja: 0,
    diferencia: 0,
  },
  services: {
    serviciosBAC: 0,
    depositosBAC: 0,
    totalBAC: 0,
    avanceBAC: 0,
    serviciosTucan: 0,
    depositosTucan: 0,
    totalTucan: 0,
    avanceBCR: 0,
    notas: "",
  },
  denominaciones: {
    cincuentaMil: 0,
    veinteMil: 0,
    diezMil: 0,
    cincoMil: 0,
    dosMil: 0,
    mil: 0,
  },
  denominacionesMonedas: {
    quinientos: 0,
    cien: 0,
    cincuenta: 0,
    veinticinco: 0,
    diez: 0,
    cinco: 0,
  },
  creditosData: [],
  efectivoTotal: 0,
  monedasTotal: 0,
  creditosTotal: 0,
  fecha: getFormattedDate(),
  superMercado: 0,
  usuario: "",
  caja: 0,
};
interface Props {
  user: User | null;
}
export const CashClosing = ({ user }: Props) => {
  const updateFields = (fields: Partial<allData>) => {
    setData((prev) => ({
      ...prev,
      cashOpening: {
        ...prev.cashOpening,
        ...fields.cashOpening,
      },
      totalAmounts: {
        ...prev.totalAmounts,
        ...fields.totalAmounts,
      },
      services: {
        ...prev.services,
        ...fields.services,
      },
      denominaciones: {
        ...prev.denominaciones,
        ...fields.denominaciones,
      },
      denominacionesMonedas: {
        ...prev.denominacionesMonedas,
        ...fields.denominacionesMonedas,
      },
      creditosData: fields.creditosData || prev.creditosData,
      efectivoTotal: fields.efectivoTotal ?? prev.efectivoTotal,
      monedasTotal: fields.monedasTotal ?? prev.monedasTotal,
      creditosTotal: fields.creditosTotal ?? prev.creditosTotal,
      superMercado: fields.superMercado ?? prev.superMercado,
      caja: fields.caja ?? prev.caja,
    }));
  };

  const location = useLocation();
  const [data, setData] = useState(initialData);
  const [showToast, setShowToast] = useState(false); // State to control toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State to control toast message

  useEffect(() => {
    // Check if a message was passed via navigate state
    if (location.state?.message) {
      setToastMessage(location.state.message);
      setShowToast(true);

      // Hide the toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  }, [location.state]);

  //const [animation, setAnimation] = useState<string>("animate__fadeIn");
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      <SuperMarketSelect
        usuario={(data.usuario = user?.username || "")}
        fecha={data.fecha}
        superMercado={data.superMercado}
        caja={data.caja}
        updateFields={updateFields}
      />,
      <CreditsForm {...data} updateFields={updateFields} />,
      <BillsForm {...data} updateFields={updateFields} />,
      <CoinsForm {...data} updateFields={updateFields} />,
      <CashOpeningForm
        cashOpening={data.cashOpening || {}}
        updateFields={(fields) => updateFields({ cashOpening: { ...fields } })}
      />,
      <TotalAmounts
        totalAmounts={data.totalAmounts}
        creditosTotal={data.creditosTotal}
        efectivoTotal={data.efectivoTotal}
        monedasTotal={data.monedasTotal}
        cashOpening={data.cashOpening}
        updateFields={(fields) => updateFields({ totalAmounts: { ...fields } })}
      />,
      <ServicesForm
        cashOpening={data.cashOpening}
        totalAmounts={data.totalAmounts}
        servicesData={data.services}
        updateFields={(fields) => updateFields({ services: { ...fields } })}
      />,
    ]);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      if (currentStepIndex == 3) {
        const confirmed = window.confirm(
          "¿Desea continuar? Una vez terminada esta parte no podrá modificar esta información."
        );
        if (!confirmed) return;
      }
      next();
    } else {
      const confirmacion = window.confirm(
        "¿Desea finalizar? Una vez enviado no podrá modificar la información."
      );
      if (confirmacion) {
        addParentDocument("cierresCaja", data)
          .then(() => {
            setToastMessage("✅ Cierre finalizado correctamente.");
            setShowToast(true);
            setData(initialData);
            goTo(0);
          })
          .catch((error) => {
            console.error("❌ Error al finalizar el cierre:", error);
            setToastMessage("❌ Error al finalizar el cierre.");
            setShowToast(true);
          });
      }
    }
  }

  return (
    <div>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        duration={3000} // Optional: Auto-hide after 5 seconds
      />
      <form onSubmit={onSubmit}>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifySelf: "center",
          }}
        >
          {!isFirstStep && currentStepIndex !== 4 && (
            <button
              type="button"
              onClick={back}
              className="btn btn-light shadow"
            >
              Retroceder
            </button>
          )}
          {
            <button type="submit" className="btn btn-light shadow">
              {isLastStep ? "Finalizar" : "Siguiente"}
            </button>
          }
          <button
            onClick={() => {
              console.log(data);
              const fechaString = data.fecha; // "14/4/2025"
              const [day, month, year] = fechaString.split("/");
              const formattedDate = `${year}-${month}-${day}`; // Convert to "2025-04-14"
              const fecha = new Date(formattedDate);
              console.log("Processed fecha value:", fecha.toISOString());
            }}
          >
            aaa
          </button>
        </div>
      </form>
    </div>
  );
};
