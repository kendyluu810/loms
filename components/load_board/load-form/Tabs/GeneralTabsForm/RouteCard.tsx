"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ExtendedLoadRow } from "@/type";
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

      const routePayload = {
        pickupPoint: {
          ...currentRoute.pickupPoint, // giữ lại các field cũ như timezone, locationName
          early: data.pickup.early,
          late: data.pickup.late,
          address: data.pickup.address,
          status: data.pickup.condition,
          eta: calculateETA(data.pickup.early, data.pickup.late),
          type: "pickup",
        },
        deliveryPoint: {
          ...currentRoute.deliveryPoint,
          early: data.delivery.early,
          late: data.delivery.late,
          address: data.delivery.address,
          status: data.delivery.condition,
          eta: calculateETA(data.delivery.early, data.delivery.late),
          type: "delivery",
        },
        stopPoints: data.stop?.map((s: StopPoint, idx: number) => {
          const existingStop = currentRoute.stopPoints?.[idx] ?? {};
          return {
            ...existingStop,
            early: s.early,
            late: s.late,
            address: s.address,
            status: s.condition,
            eta: calculateETA(s.early, s.late),
            type: "stop",
          };
        }),
      } as ExtendedLoadRow["route"];

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
        <CardContent>
          <div className="grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-2 text-sm">
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
                <div className="grid grid-cols-6 gap-4 py-2 text-sm">
                  <span>
                    {load?.route?.pickupPoint?.type} <br />
                    {load.route?.pickupPoint?.timezone || "--"}
                  </span>
                  <span>
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
                  </span>
                  <span>{load.route?.pickupPoint?.locationName || "--"}</span>
                  <Controller
                    name="pickup.address"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Address..." {...field} />
                    )}
                  />
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
                  <span>{load.route?.pickupPoint?.eta || "--"}</span>
                </div>
                {/* Delivery Point */}
                <div className="grid grid-cols-6 gap-4 py-2 text-sm">
                  <span>
                    {load?.route?.deliveryPoint?.type} <br />
                    {load.route?.deliveryPoint?.timezone || "--"}
                  </span>
                  <span>
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
                  </span>
                  <span>{load.route?.deliveryPoint?.locationName || "--"}</span>
                  <Controller
                    name="delivery.address"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Address..." {...field} />
                    )}
                  />
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
                  <span>{load.route?.deliveryPoint?.eta || "--"}</span>
                </div>
                {/* Stop Points */}
                {(load.route?.stopPoints?.length ?? 0) > 0 && (
                  <>
                    {load.route?.stopPoints?.map((point, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-6 gap-4 py-2 text-sm border-b"
                      >
                        <span>
                          {point.type} <br />
                          {point.timezone || "--"}
                        </span>
                        <span>
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
                        </span>
                        <span>{point.locationName || "--"}</span>
                        <Controller
                          name={`stop.${index}.address`}
                          control={control}
                          render={({ field }) => (
                            <Input placeholder="Address..." {...field} />
                          )}
                        />
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
                        <span>{point.eta || "--"}</span>
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
              <div className="grid grid-cols-6 gap-4 py-2 text-sm">
                <span>
                  {load?.route?.pickupPoint?.type} <br />
                  {load.route?.pickupPoint?.timezone || "--"}
                </span>
                <span>
                  {load.route?.pickupPoint?.date}
                  <br />
                  {load.route?.pickupPoint?.early || "--"} /{" "}
                  {load.route?.pickupPoint?.late || "--"}
                </span>
                <span>{load.route?.pickupPoint?.locationName || "--"}</span>
                <span>{load.route?.pickupPoint?.address || "--"}</span>
                <span>
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${getStatusStyle(
                      load.route?.pickupPoint?.status || "Unknown"
                    )}`}
                  >
                    {formatStatus(load.route?.pickupPoint?.status || "Unknown")}
                  </span>
                </span>
                <span>
                  <span>{load.route?.pickupPoint?.eta || "--"}</span>
                </span>
              </div>
              {/* Delivery Point */}
              <div className="grid grid-cols-6 gap-4 py-2 text-sm">
                <span>
                  {load?.route?.deliveryPoint?.type} <br />
                  {load.route?.deliveryPoint?.timezone || "--"}
                </span>
                <span>
                  {load.route?.deliveryPoint?.date}
                  <br />
                  {load.route?.deliveryPoint?.early || "--"} /{" "}
                  {load.route?.deliveryPoint?.late || "--"}
                </span>
                <span>{load.route?.deliveryPoint?.locationName || "--"}</span>
                <span>{load.route?.deliveryPoint?.address || "--"}</span>
                <span>
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${getStatusStyle(
                      load.route?.deliveryPoint?.status || "Unknown"
                    )}`}
                  >
                    {formatStatus(
                      load.route?.deliveryPoint?.status || "Unknown"
                    )}
                  </span>
                </span>
                <span>{load.route?.deliveryPoint?.eta || "--"}</span>
              </div>
              {/* Stop Points */}
              {(load.route?.stopPoints?.length ?? 0) > 0 && (
                <>
                  {load.route?.stopPoints?.map((point, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 py-2 text-sm border-b"
                    >
                      <span>
                        {point.type} <br />
                        {point.timezone || "--"}
                      </span>
                      <span>
                        {point.date}
                        <br />
                        {point.early || "--"} / {point.late || "--"}
                      </span>
                      <span>{point.locationName || "--"}</span>
                      <span>{point.address || "--"}</span>
                      <span>
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${getStatusStyle(
                            point.status || "Unknown"
                          )}`}
                        >
                          {formatStatus(point.status || "Unknown")}
                        </span>
                      </span>
                      <span>{point.eta || "--"}</span>
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
