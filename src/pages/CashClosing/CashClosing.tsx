import { FormEvent, useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import CreditsForm from "../../components/credits/CreditsForm";
import BillsForm from "../../components/bills/BillsForm";
import CashOpeningForm from "../../components/cashOpening/CashOpeningForm";
import CoinsForm from "../../components/coins/CoinsForm";
import ServicesForm from "../../components/services/ServicesForm";
import TotalAmounts from "../../components/totalAmounts/TotalAmounts";
import "animate.css";
import { addTotalAmounts, addParentDocument } from "../../api/addFirebaseDoc";
import { getCierreCaja, getDocument } from "../../api/getFirebaseDoc";

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
  super: number;
  usuario: string;
  caja: number;
  efectivoTotal: number;
  monedasTotal: number;
  creditosTotal: number;
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
  super: 2,
  usuario: "yo",
  caja: 1,
};

export const CashClosing = () => {
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
    }));
  };

  const [data, setData] = useState(initialData);
  //const [animation, setAnimation] = useState<string>("animate__fadeIn");
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
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
      if (currentStepIndex == 2) {
        //alert("Creditos cerrando...");
        console.log("creditos cerrando...");
      }
      return next();
    } else {
      // const closingModal = ClosingModal();
      // closingModal.show()
    }
  }
  return (
    <div>
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
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className="btn btn-light shadow"
            >
              Retroceder
            </button>
          )}
          {
            <button
              type="submit"
              className="btn btn-light shadow"
              onClick={() => {
                if (isLastStep) {
                  addParentDocument("cierresCaja", data);
                }
              }}
            >
              {isLastStep ? "Finalizar" : "Siguiente"}
            </button>
          }
          <button
          type="button"
          className="btn btn-light shadow"
            onClick={() => {
              
              console.log(data);
              
            }}
          >
            aaa
          </button>
        </div>
      </form>
    </div>
  );
};
