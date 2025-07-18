import MultiStepForm from "@/components/form/MultiStepForm";

export default function CreatePage({ steps }: { steps: number }) {
  return (
    <div>
      <MultiStepForm currentStep={steps} />
    </div>
  );
}
