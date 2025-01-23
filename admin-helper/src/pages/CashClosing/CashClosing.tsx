import React, { FormEvent, useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import CreditsForm from "../../components/credits/CreditsForm";
import BillsForm from "../../components/bills/BillsForm";
import CashOpeningForm from "../../components/cashOpening/CashOpeningForm";
import CoinsForm from "../../components/coins/CoinsForm";
import ServicesForm from "../../components/services/ServicesForm";
import TotalAmounts from "../../components/totalAmounts/TotalAmounts";
import "animate.css";

type cashOpeningData = {
  apertura: number;
  facturasPagadas: number;
  facturasProcesadas: number;
  notasCredito: number;
  reintegros: number;
  totalBruto: number;
};

type TotalAmountsData = {
  efectivo: number; // Efectivo
  monedas: number; // Monedas
  dolares: number; // Dólares ($)
  colones: number; // Dólares (¢)
  datafonosBAC: number; // Datáfonos BAC
  datafonosBCR: number; // Datáfonos BCR
  total: number; // Total
  pagoProveedores: number; // Pago Proveedores
  creditos: number; // Créditos
  retirosDeCaja: number; // Retiros de Caja
  diferencia: number; // Diferencia
};


type allData = {
  apertura: number;
  facturasPagadas: number;
  facturasProcesadas: number;
  notasCredito: number;
  reintegros: number;
  totalBruto: number;
  efectivo: number; // Efectivo
  monedas: number; // Monedas
  dolares: number; // Dólares ($)
  colones: number; // Dólares (¢)
  datafonosBAC: number; // Datáfonos BAC
  datafonosBCR: number; // Datáfonos BCR
  total: number; // Total
  pagoProveedores: number; // Pago Proveedores
  creditosTotal: number; // Créditos
  retirosDeCaja: number; // Retiros de Caja
  diferencia: number;
  serviciosBAC: number; // Servicios BAC
  depositosBAC: number; // Depósitos BAC
  totalBAC: number; // Total BAC
  avanceBAC: number; // Avance BAC
  serviciosTucan: number; // Servicios Tucan
  depositosTucan: number; // Depósitos Tucan
  totalTucan: number; // Total Tucan
  avanceBCR: number; // Avance BCR
  notas: string; // Notas
  denominaciones: {
    cincuentaMil: number;
    veinteMil: number;
    diezMil: number;
    cincoMil: number;
    dosMil: number;
    mil: number;
  };
  denominacionesMonedas : {
    quinientos: number;
    cien: number;
    cincuenta: number;
    veinticinco: number;
    diez: number;
    cinco: number;
  }
  efectivoTotal: number;
  monedasTotal: number;
  creditos: {
    id: number; // Unique identifier for each credit
    name: string; // Name of the credit
    amount: number; // Amount of the credit
  }[];
};
const initialData = {
  apertura: 1,
  facturasPagadas: 1,
  facturasProcesadas: 1,
  notasCredito: 1,
  reintegros: 1,
  totalBruto: 1,
  efectivo: 1,
  monedas: 1,
  dolares: 1,
  colones: 1,
  datafonosBAC: 1,
  datafonosBCR: 1,
  total: 1,
  pagoProveedores: 1,
  creditosTotal: 1,
  retirosDeCaja: 1,
  diferencia: 1,
  serviciosBAC: 1,
  depositosBAC: 1,
  totalBAC: 1,
  avanceBAC: 1,
  serviciosTucan: 1,
  depositosTucan: 1,
  totalTucan: 1,
  avanceBCR: 1,
  notas: "hola",
  denominaciones: {
    cincuentaMil: 1,
    veinteMil: 0,
    diezMil: 5,
    cincoMil: 2,
    dosMil: 1,
    mil: 3,
  },
  denominacionesMonedas : {
    quinientos: 1,
    cien: 1,
    cincuenta: 1,
    veinticinco: 1,
    diez: 1,
    cinco: 5,
  },
  efectivoTotal: 1,
  monedasTotal: 1,
  creditosData: [
    { id: 1, name: "Credit 1", amount: 500 },
    { id: 2, name: "Credit 2", amount: 1000 },
    { id: 3, name: "Credit 3", amount: 1500 },
  ],
};

export const CashClosing = () => {
  const [data, setData] = useState(initialData);
  const [animation, setAnimation] = useState<string>("animate__fadeIn");
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <CreditsForm {...data} updateFields={updateFields}/>,
      <BillsForm {...data} updateFields={updateFields} />,
      <CoinsForm {...data} updateFields={updateFields}/>,
      <CashOpeningForm {...data} updateFields={updateFields} />,
      <TotalAmounts {...data} updateFields={updateFields} />,
      <ServicesForm {...data} updateFields={updateFields} />,
    ]);

  function updateFields(fields: Partial<allData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    next();
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
            <button type="submit" className="btn btn-light shadow">
              {isLastStep ? "Finalizar" : "Siguiente"}
            </button>
          }
        </div>
      </form>
    </div>
  );
};
