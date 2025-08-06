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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header + Add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#022f7e]">
          Vehicle Management
        </h2>
        <Button
          onClick={() => setAddOpen(true)}
          className="w-full sm:w-auto bg-[#3461ff] text-white font-semibold hover:bg-white hover:text-[#3461ff] border border-[#3461ff] flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>
      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.truckNumber}>
            <CardHeader className="flex flex-row justify-between items-start sm:items-center">
              <CardTitle className="text-base sm:text-lg">
                {vehicle.truckNumber}
              </CardTitle>
              <div className="flex gap-2 mt-2 sm:mt-0">
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
            <CardContent className="space-y-1 text-sm sm:text-base text-muted-foreground">
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
