"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ExtendedLoadRow } from "@/type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShipmentCardProps {
  load: ExtendedLoadRow;
  setLoad: (load: ExtendedLoadRow) => void;
}

export default function ShipmentCard({ load, setLoad }: ShipmentCardProps) {
  const [editShipment, setEditShipment] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      pickupCode: load.shipment?.pickupPoint?.code || "",
      deliveryCode: load.shipment?.deliveryPoint?.code || "",
      stopCode: load.shipment?.stopPoint?.code || "",
      weight: load.shipment?.weight || 0,
      pallets: load.shipment?.pallets || 0,
      rate: load.shipment?.rate || 0,
    },
  });

  useEffect(() => {
    reset({
      pickupCode: load.shipment?.pickupPoint?.code || "",
      deliveryCode: load.shipment?.deliveryPoint?.code || "",
      stopCode: load.shipment?.stopPoint?.code || "",
      weight: load.shipment?.weight || 0,
      pallets: load.shipment?.pallets || 0,
      rate: load.shipment?.rate || 0,
    });
  }, [load, reset]);

  const onSubmitShipment = async (data: any) => {
    try {
      const res = await fetch(`/api/load_board/${load.load_id}`, {
        method: "PUT",
        body: JSON.stringify({
          shipment: {
            pickupPoint: { code: data.pickupCode },
            deliveryPoint: { code: data.deliveryCode },
            stopPoint: { code: data.stopCode },
            weight: data.weight,
            pallets: data.pallets,
            rate: data.rate,
          },
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const updatedLoad = await res.json();
        setLoad(updatedLoad);
        toast.success("Shipment updated successfully");
        setEditShipment(false);
      }
    } catch (err) {
      //console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitShipment)}>
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#022f7e]">
            Shipment
          </CardTitle>
          <div className="flex items-center space-x-2 ">
            {editShipment ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 p-1"
                onClick={handleSubmit(onSubmitShipment)}
              >
                <Save className="w-4 h-4" />
              </Button>
            ) : (
              <Pencil
                className="text-[#022f7e] cursor-pointer w-4 h-4"
                onClick={() => setEditShipment(true)}
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-2 text-sm">
            <Label>Pickup</Label>
            <Label>Delivery</Label>
            <Label>Stop</Label>
            <Label>Weight (lbs)</Label>
            <Label>Pallets</Label>
            <Label>Rate</Label>
          </div>
          <div className="grid grid-cols-6 gap-4 py-2 text-sm">
            {editShipment ? (
              <>
                <Input {...register("pickupCode")} />
                <Input {...register("deliveryCode")} />
                <Input {...register("stopCode")} />
                <Input type="number" {...register("weight")} />
                <Input type="number" {...register("pallets")} />
                <Input type="number" {...register("rate")} />
              </>
            ) : (
              <>
                <span>{load.shipment?.pickupPoint?.code || "--"}</span>
                <span>{load.shipment?.deliveryPoint?.code || "--"}</span>
                <span>{load.shipment?.stopPoint?.code || "--"}</span>
                <span>{load.shipment?.weight || "--"}</span>
                <span>{load.shipment?.pallets || "--"}</span>
                <span>${load.shipment?.rate?.toLocaleString() || "--"}</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
