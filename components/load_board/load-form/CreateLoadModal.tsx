"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import MultiStepForm from "./MultiStepForm";

export default function CreateLoadModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-fit overflow-y-auto p-6 rounded-xl">
        <MultiStepForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
