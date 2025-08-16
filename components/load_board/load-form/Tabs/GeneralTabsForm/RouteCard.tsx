"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ExtendedLoadRow, RoutePoint } from "@/type";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface RouteFormData {
  pickup: {
    early: string;
    late: string;
    address: string;
    condition: string;
  };
  delivery: {
    early: string;
    late: string;
    address: string;
    condition: string;
  };
  stop: {
    early: string;
    late: string;
    address: string;
    condition: string;
  }[];
}

interface StopPoint {
  early: string;
  late: string;
  address: string;
  condition: string;
}

interface RouteCardProps {
  load: ExtendedLoadRow;
  onUpdateLoad: (updatedLoad: ExtendedLoadRow) => void;
}

export default function RouteCard({ load, onUpdateLoad }: RouteCardProps) {
  const [editRoute, setEditRoute] = useState(false);

  const statusOptions = ["Pending", "In Progress", "Completed", "Cancelled"];

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      pickup: {
        early: load.route?.pickupPoint?.early || "",
        late: load.route?.pickupPoint?.late || "",
        address: load.route?.pickupPoint?.address || "",
        condition: load.route?.pickupPoint?.status || "",
      },
      delivery: {
        early: load.route?.deliveryPoint?.early || "",
        late: load.route?.deliveryPoint?.late || "",
        address: load.route?.deliveryPoint?.address || "",
        condition: load.route?.deliveryPoint?.status || "",
      },
      stop:
        load.route?.stopPoints?.map((stop) => ({
          early: stop.early || "",
          late: stop.late || "",
          address: stop.address || "",
          condition: stop.status || "",
        })) || [],
    },
  });

  useEffect(() => {
    reset({
      pickup: {
        early: load.route?.pickupPoint?.early || "",
        late: load.route?.pickupPoint?.late || "",
        address: load.route?.pickupPoint?.address || "",
        condition: load.route?.pickupPoint?.status || "",
      },
      delivery: {
        early: load.route?.deliveryPoint?.early || "",
        late: load.route?.deliveryPoint?.late || "",
        address: load.route?.deliveryPoint?.address || "",
        condition: load.route?.deliveryPoint?.status || "",
      },
      stop:
        load.route?.stopPoints?.map((stop) => ({
          early: stop.early || "",
          late: stop.late || "",
          address: stop.address || "",
          condition: stop.status || "",
        })) || [],
    });
  }, [load, reset]);

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "in progress":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const formatStatus = (status: string) =>
    status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const calculateETA = (early: string, late: string) => {
    if (!early || !late) return "";
    const [eh, em] = early.split(":").map(Number);
    const [lh, lm] = late.split(":").map(Number);
    const earlyMinutes = eh * 60 + em;
    const lateMinutes = lh * 60 + lm;
    const avgMinutes = Math.floor((earlyMinutes + lateMinutes) / 2);
    const hours = String(Math.floor(avgMinutes / 60)).padStart(2, "0");
    const minutes = String(avgMinutes % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const onSubmitRoute = async (data: RouteFormData) => {
    try {
      const currentRoute = load.route;

      const routePayload: ExtendedLoadRow["route"] = {
        pickupTime: data.pickup.early,
        deliveryTime: data.delivery.late,
        pickupPoint: {
          ...(currentRoute.pickupPoint || {}),
          early: data.pickup.early,
          late: data.pickup.late,
          address: data.pickup.address,
          status: data.pickup.condition,
          eta: calculateETA(data.pickup.early, data.pickup.late),
          type: "pickup",
          timestamp: new Date().toISOString(),
        } as RoutePoint & { timestamp?: string },

        deliveryPoint: {
          ...currentRoute.deliveryPoint,
          early: data.delivery.early,
          late: data.delivery.late,
          address: data.delivery.address,
          status: data.delivery.condition,
          eta: calculateETA(data.delivery.early, data.delivery.late),
          type: "delivery",
          timestamp: new Date().toISOString(),
        } as RoutePoint & { timestamp?: string },

        stopPoints: data.stop?.map(
          (s, idx) =>
            ({
              ...(currentRoute.stopPoints?.[idx] || {}),
              early: s.early,
              late: s.late,
              address: s.address,
              status: s.condition,
              eta: calculateETA(s.early, s.late),
              type: "stop",
              timestamp: new Date().toISOString(),
            } as RoutePoint & { timestamp?: string })
        ),
      };

      const res = await fetch(`/api/load_board/${load.load_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route: routePayload }),
      });

      if (!res.ok) throw new Error("Failed to update route");

      onUpdateLoad({ ...load, route: routePayload });
      toast.success("Route updated successfully");
      setEditRoute(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Update failed");
      } else {
        toast.error("Update failed: Unknown error");
      }
    }
  };

  return (
    <>
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#022f7e]">
            Route
          </CardTitle>
          <div className="flex items-center space-x-2 ">
            {!editRoute && (
              <Pencil
                className="text-[#022f7e] cursor-pointer w-4 h-4"
                onClick={() => setEditRoute(true)}
              />
            )}

            <MoreVertical className="text-[#022f7e] cursor-pointer w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto md:overflow-visible">
          <div className="hidden md:grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-2 text-sm">
            <Label>Timezone</Label>
            <Label>Early / Late</Label>
            <Label>Location</Label>
            <Label>Address</Label>
            <Label>Condition</Label>
            <Label>ETA</Label>
          </div>
          {editRoute ? (
            <form onSubmit={handleSubmit(onSubmitRoute)}>
              <div className="space-y-2">
                {/* Pickup Point */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 py-2 text-sm">
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Timezone
                    </span>
                    {load?.route?.pickupPoint?.type} <br />
                    {load.route?.pickupPoint?.timezone || "--"}
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Early/Late
                    </span>
                    <Controller
                      name="pickup.early"
                      control={control}
                      render={({ field }) => <Input type="time" {...field} />}
                    />
                    <Controller
                      name="pickup.late"
                      control={control}
                      render={({ field }) => <Input type="time" {...field} />}
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Location Name
                    </span>
                    {load.route?.pickupPoint?.locationName || "--"}
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Address
                    </span>
                    <Controller
                      name="pickup.address"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Address..." {...field} />
                      )}
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Condition
                    </span>
                    <Controller
                      name="pickup.condition"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      ETA
                    </span>
                    {load.route?.pickupPoint?.eta || "--"}
                  </div>
                </div>
                {/* Delivery Point */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 py-2 text-sm">
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Timezone
                    </span>
                    {load?.route?.deliveryPoint?.type} <br />
                    {load.route?.deliveryPoint?.timezone || "--"}
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Early/Late
                    </span>
                    <Controller
                      name="delivery.early"
                      control={control}
                      render={({ field }) => <Input type="time" {...field} />}
                    />
                    <Controller
                      name="delivery.late"
                      control={control}
                      render={({ field }) => <Input type="time" {...field} />}
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Location
                    </span>
                    {load.route?.deliveryPoint?.locationName || "--"}
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Address
                    </span>
                    <Controller
                      name="delivery.address"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Address..." {...field} />
                      )}
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      Condition
                    </span>
                    <Controller
                      name="delivery.condition"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-500 md:hidden">
                      ETA
                    </span>
                    {load.route?.deliveryPoint?.eta || "--"}
                  </div>
                </div>
                {/* Stop Points */}
                {(load.route?.stopPoints?.length ?? 0) > 0 && (
                  <>
                    {load.route?.stopPoints?.map((point, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 py-2 text-sm"
                      >
                        <div>
                          <span className="block font-medium text-gray-500 md:hidden">
                            Timezone
                          </span>
                          {point.type} <br />
                          {point.timezone || "--"}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-500 md:hidden">
                            Early/Late
                          </span>
                          <Controller
                            name={`stop.${index}.early`}
                            control={control}
                            render={({ field }) => (
                              <Input type="time" {...field} />
                            )}
                          />
                          <Controller
                            name={`stop.${index}.late`}
                            control={control}
                            render={({ field }) => (
                              <Input type="time" {...field} />
                            )}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-500 md:hidden">
                            Location
                          </span>
                          {point.locationName || "--"}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-500 md:hidden">
                            Address
                          </span>
                          <Controller
                            name={`stop.${index}.address`}
                            control={control}
                            render={({ field }) => (
                              <Input placeholder="Address..." {...field} />
                            )}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-500 md:hidden">
                            Condition
                          </span>

                          <Controller
                            name={`stop.${index}.condition`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                  {statusOptions.map((opt) => (
                                    <SelectItem key={opt} value={opt}>
                                      {opt}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-500 md:hidden">
                            ETA
                          </span>
                          {point.eta || "--"}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    reset(); // reset form về dữ liệu ban đầu
                    setEditRoute(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#022f7e] text-white mt-4">
                  Save
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              {/* Pickup Point */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 py-2 text-sm">
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Timezone
                  </span>
                  {load?.route?.pickupPoint?.type} <br />
                  {load.route?.pickupPoint?.timezone || "--"}
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Early/Late
                  </span>
                  {load.route?.pickupPoint?.date}
                  <br />
                  {load.route?.pickupPoint?.early || "--"} /{" "}
                  {load.route?.pickupPoint?.late || "--"}
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Location Name
                  </span>
                  {load.route?.pickupPoint?.locationName || "--"}
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Address
                  </span>
                  {load.route?.pickupPoint?.address || "--"}
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Status
                  </span>
                  <span>
                    <span
                      className={`text-xs px-1 sm:px-2 py-1 rounded font-medium ${getStatusStyle(
                        load.route?.pickupPoint?.status || "Unknown"
                      )}`}
                    >
                      {formatStatus(
                        load.route?.pickupPoint?.status || "Unknown"
                      )}
                    </span>
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    ETA
                  </span>
                  {load.route?.pickupPoint?.eta || "--"}
                </div>
              </div>
              {/* Delivery Point */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 py-2 text-sm">
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Timezone
                  </span>
                  {load?.route?.deliveryPoint?.type} <br />
                  {load.route?.deliveryPoint?.timezone || "--"}
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Early/Late
                  </span>
                  {load.route?.deliveryPoint?.date}
                  <br />
                  {load.route?.deliveryPoint?.early || "--"} /{" "}
                  {load.route?.deliveryPoint?.late || "--"}
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Location Name
                  </span>
                  {load.route?.deliveryPoint?.locationName || "--"}
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Address
                  </span>
                  {load.route?.deliveryPoint?.address || "--"}
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    Status
                  </span>
                  <span>
                    <span
                      className={`text-xs px-1 sm:px-2 py-1 rounded font-medium ${getStatusStyle(
                        load.route?.deliveryPoint?.status || "Unknown"
                      )}`}
                    >
                      {formatStatus(
                        load.route?.deliveryPoint?.status || "Unknown"
                      )}
                    </span>
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-gray-500 md:hidden">
                    ETA
                  </span>
                  {load.route?.deliveryPoint?.eta || "--"}
                </div>
              </div>
              {/* Stop Points */}
              {(load.route?.stopPoints?.length ?? 0) > 0 && (
                <>
                  {load.route?.stopPoints?.map((point, index) => (
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 py-2 text-sm"
                      key={index}
                    >
                      <div>
                        <span className="block font-medium text-gray-500 md:hidden">
                          Timezone
                        </span>
                        {point.type} <br />
                        {point.timezone || "--"}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-500 md:hidden">
                          Early/Late
                        </span>
                        {point.date}
                        <br />
                        {point.early || "--"} / {point.late || "--"}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-500 md:hidden">
                          Location Name
                        </span>
                        {point.locationName || "--"}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-500 md:hidden">
                          Address
                        </span>
                        {point.address || "--"}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-500 md:hidden">
                          Status
                        </span>
                        <span>
                          <span
                            className={`text-xs px-1 sm:px-2 py-1 rounded font-medium ${getStatusStyle(
                              point.status || "Unknown"
                            )}`}
                          >
                            {formatStatus(point.status || "Unknown")}
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-500 md:hidden">
                          ETA
                        </span>
                        {point.eta || "--"}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
