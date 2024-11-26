import React from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import CreditsForm from "../../components/credits/CreditsForm";
import BillsForm from "../../components/bills/BillsForm";

export const CashClosing = () => {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([<CreditsForm />, <BillsForm />]);
  return (
    <div>
      <form>
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
            <button type="button" onClick={next}>
              {isLastStep ? "Finalizar" : "Siguiente"}
            </button>
          }
        </div>
      </form>
    </div>
  );
};
