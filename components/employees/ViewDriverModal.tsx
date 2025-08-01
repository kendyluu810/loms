"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export function ViewDriverModal({
  employeeId,
  onClose,
}: {
  employeeId: string;
  onClose: () => void;
}) {
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await fetch(`/api/drivers/by-employee/${employeeId}`);
        if (!res.ok) throw new Error("Driver not found");
        const data = await res.json();
        setDriver(data);
      } catch (err) {
        console.error("Error fetching driver:", err);
        setDriver(null);
      }
    };

    if (employeeId) fetchDriver();
  }, [employeeId]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg h-fit">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#022f7e]">
            Driver Details
          </DialogTitle>
        </DialogHeader>
        {driver ? (
          <div className="space-y-2">
            <p>
              <strong>License:</strong> {driver.driverlicense}
            </p>
            <p>
              <strong>Type:</strong> {driver.licensetype}
            </p>
            <p>
              <strong>Expiry:</strong>{" "}
              {new Date(driver.licenseexpiry).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>No driver info found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
