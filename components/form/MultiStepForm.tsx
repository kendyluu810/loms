"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Step1Route from "./Step1Route";
import Step2Shipments from "./Step2Shipments";
import Step3Owner from "./Step3Owner";
import Step4Review from "./Step4Review";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLoadStore } from "@/store/useLoadStore";
import { toast } from "sonner";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const steps = ["ROUTE", "SHIPMENTS", "OWNER", "REVIEW"];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const { route, shipment, owner, reset } = useLoadStore.getState();

    const res = await fetch("/api/load_board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ route, shipment, customer: owner._id }),
    });

    if (res.ok) {
      reset();
      router.push("/load_board");
      toast.success("Load created successfully");
    } else {
      toast.error("Failed to submit load data");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mt-10">
        <div className="md:w-1/4 pt-2">
          <h2 className="text-2xl font-semibold text-[#022f7e]">
            {steps[step - 1].charAt(0) + steps[step - 1].slice(1).toLowerCase()}
          </h2>
          <span className="text-sm text-gray-500">
            Please complete each step to proceed.
          </span>
        </div>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === step;
          const isCompleted = stepNumber < step;

          return (
            <div key={label} className="md:flex-1 flex items-center relative">
              {/* Line between steps */}
              {index !== 0 && (
                <div
                  className={cn(
                    "absolute left-0 top-1/2 w-full h-1 -z-10 transform -translate-y-1/2",
                    isCompleted ? "bg-blue-600" : "bg-gray-300"
                  )}
                />
              )}

              <div className="flex flex-col items-center w-full z-10">
                {/* Step Number Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium",
                    isActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : isCompleted
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-500 border-gray-300"
                  )}
                >
                  {isCompleted ? <Check size={16} /> : stepNumber}
                </div>
                {/* Step Label */}
                <span className="mt-2 text-xs text-center text-[#022f7e] font-semibold">
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {step === 1 && <Step1Route />}
        {step === 2 && <Step2Shipments />}
        {step === 3 && <Step3Owner />}
        {step === 4 && <Step4Review />}
        <div className="mt-6 flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push("/load_board")}
            >
              Cancel
            </Button>
          )}

          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
