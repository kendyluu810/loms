"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Plus, Trash } from "lucide-react";
import { Vehicle } from "@/type";
import AddVehicleModal from "@/components/vehicle/AddVehicleModal";
import EditVehicleModal from "@/components/vehicle/EditVehicleModal";
import { toast } from "sonner";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const fetchVehicles = async () => {
    const res = await fetch("/api/vehicles");
    const data = await res.json();
    setVehicles(data.vehicles);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const deleteVehicle = async (id: string) => {
    const res = await fetch(`/api/vehicles/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete vehicle");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteVehicle(id);
      toast.success("Deleted successfully");
      fetchVehicles(); // reload lại danh sách
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Failed to delete vehicle: ${error.message}`);
      } else {
        toast.error("Failed to delete vehicle: Unknown error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#022f7e]">
          Vehicle Management
        </h1>
        <Button
          onClick={() => setAddOpen(true)}
          className="bg-[#3461ff] text-white font-semibold hover:bg-white hover:text-[#3461ff] border border-[#3461ff] flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.truckNumber}>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>{vehicle.truckNumber}</CardTitle>
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setSelectedVehicle(vehicle);
                    setEditOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(vehicle._id || "")}
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <div>Trailer: {vehicle.trailerNumber}</div>
              <div>Category: {vehicle.category}</div>
              <div>Status: {vehicle.status}</div>
              <div>Empty: {vehicle.isEmpty ? "Yes" : "No"}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddVehicleModal
        open={addOpen}
        setOpen={setAddOpen}
        onCreated={fetchVehicles}
      />

      {selectedVehicle && (
        <EditVehicleModal
          open={editOpen}
          setOpen={setEditOpen}
          vehicle={selectedVehicle}
          onUpdated={fetchVehicles}
        />
      )}
    </div>
  );
}
