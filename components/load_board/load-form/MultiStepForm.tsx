"use client";
import { useState } from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import Step1Route from "./Step1Route";
import Step2Shipments from "./Step2Shipments";
import Step3Owner from "./Step3Owner";
import Step4Review from "./Step4Review";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLoadStore } from "@/store/useLoadStore";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

const steps = ["ROUTE", "SHIPMENTS", "OWNER", "REVIEW"];

export default function MultiStepForm({ onClose }: Props) {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const { route, shipment, customer, reset } = useLoadStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // 1. Tạo route
      const routeRes = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(route),
      });
      const newRoute = await routeRes.json();

      // 2. Tạo shipment
      const shipmentRes = await fetch("/api/shipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shipment),
      });
      const newShipment = await shipmentRes.json();

      // 4. Tạo load với _id đã có
      const res = await fetch("/api/load_board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route: newRoute._id,
          shipment: newShipment._id,
          customer: customer._id,
          status: "posted",
        }),
      });
      if (res.ok) {
        reset();
        setStep(1);
        router.refresh();
        toast.success("Load created successfully!");
        onClose(); // Đóng modal sau khi tạo xong
      } else {
        toast.error("Failed to create load.");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error creating load:", error);
      setIsSubmitting(false);
      toast.error("An error occurred while creating the load.");
    }
  };

  return (
    <div>
      {/* Step Haader */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full mx-auto px-4 mt-10">
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
              {index !== 0 && (
                <div
                  className={cn(
                    "absolute left-0 top-1/2 w-full h-1 -z-10 transform -translate-y-1/2",
                    isCompleted ? "bg-blue-600" : "bg-gray-300"
                  )}
                />
              )}
              <div className="flex flex-col items-center w-full z-10">
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
                <span className="mt-2 text-xs text-center text-[#022f7e] font-semibold">
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Step Body */}
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
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}

          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
