import React, { FormEvent, useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import CreditsForm from "../../components/credits/CreditsForm";
import BillsForm from "../../components/bills/BillsForm";
import CashOpeningForm from "../../components/cashOpening/CashOpeningForm";
import CoinsForm from "../../components/coins/CoinsForm";
import ServicesForm from "../../components/services/ServicesForm";
import TotalAmounts from "../../components/totalAmounts/TotalAmounts";

const initialData = {};

export const CashClosing = () => {
  const [data, setData] = useState(initialData);
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([<CreditsForm /> , <BillsForm/>, <CoinsForm/>,<CashOpeningForm/>, <TotalAmounts/>, <ServicesForm/>]);

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
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Retroceder
            </button>
          )}
          {
            <button type="submit">
              {isLastStep ? "Finalizar" : "Siguiente"}
            </button>
          }
        </div>
      </form>
    </div>
  );
};
