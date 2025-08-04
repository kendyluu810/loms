import axios from "axios";
import {
  CheckCircle,
  Circle,
  Clock,
  Clock4,
  MapPin,
  Pencil,
  RefreshCw,
  Save,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const STATUS_OPTIONS = [
  "planned",
  "in_progress",
  "completed",
  "delivered",
  "failed",
];

export default function RouteDetails({ load }: any) {
  if (!load) return <div className="p-4">No load selected</div>;

  const router = useRouter();

  const pickup = load.route?.pickupPoint;
  const delivery = load.route?.deliveryPoint;
  const stops = load.route?.stopPoints || [];

  const [editStepId, setEditStepId] = useState<number | null>(null);
  const [editedStatusMap, setEditedStatusMap] = useState<
    Record<number, string>
  >({});
  const [saving, setSaving] = useState(false);

  const normalizeStatus = (status: string) => {
    if (!status) return "planned";
    const lower = status.toLowerCase();
    if (["completed", "delivered", "picked_up"].includes(lower))
      return "completed";
    if (["in progress", "in_progress"].includes(lower)) return "in_progress";
    return lower;
  };

  const pickupStatus = normalizeStatus(pickup?.status);
  const deliveryStatus = normalizeStatus(delivery?.status);
  const truckStatus =
    pickupStatus === "in_progress" || pickupStatus === "completed"
      ? "completed"
      : normalizeStatus(load.status);

  const timeline = [
    {
      id: 1,
      title: "Truck Assigned",
      location: pickup?.cityState,
      time: pickup?.early,
      status: truckStatus,
      editable: false,
      pointType: "auto",
    },
    {
      id: 2,
      title: "At Pick up",
      location: pickup?.cityState,
      time: pickup?.late,
      status: pickupStatus,
      editable: true,
      pointType: "pickup",
      _id: pickup?._id,
    },
    ...stops.map((stop: any, index: number) => ({
      id: 3 + index,
      title: "At Stop",
      location: stop.cityState || stop.locationName,
      time: stop.eta,
      status: normalizeStatus(stop.status),
      editable: true,
      pointType: "stop",
      _id: stop._id,
    })),
    {
      id: 99,
      title: "At Destination",
      location: delivery?.cityState,
      time: delivery?.early,
      status: deliveryStatus,
      editable: true,
      pointType: "delivery",
      _id: delivery?._id,
    },
    {
      id: 100,
      title: "Delivered",
      location: delivery?.cityState,
      time: delivery?.late,
      status: deliveryStatus,
      editable: true,
      pointType: "delivery",
      _id: delivery?._id,
    },
  ];

  const handleEditClick = (step: any) => {
    setEditStepId(step.id);
    setEditedStatusMap((prev) => ({ ...prev, [step.id]: step.status }));
  };

  const handleStatusChange = (id: number, value: string) => {
    setEditedStatusMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (step: any) => {
    if (!step._id) {
      toast(
        <div className="text-red-600">
          <span className="font-semibold">Unable to update</span>
          <div>This step does not have a valid ID.</div>
        </div>,
        { style: { background: "#fee2e2" } }
      );
      return;
    }
    setSaving(true);
    try {
      const newStatus = editedStatusMap[step.id];

      await axios.patch(`/api/route-points/${step._id}`, {
        status: newStatus,
      });

      toast(
        <>
          <span className="font-semibold">Successfully updated</span>
          <div>Status has been updated to "{newStatus}"</div>
        </>
      );

      setEditStepId(null);
      router.refresh(); // reload lại component chứa data mới
    } catch (err) {
      toast(
        <div className="text-red-600">
          <span className="font-semibold">Update Error</span>
          <div>Unable to update status. Please try again.</div>
        </div>
      );
      console.error("Error saving:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md h-[85vh] overflow-y-auto w-full bg-white">
      <h2 className="text-lg font-semibold mb-6 text-blue-900">
        Route Details
      </h2>
      <ol className="relative border-l border-gray-300 ml-3 space-y-6">
        {timeline.map((step) => (
          <li key={step.id} className="ml-6 relative">
            <span className="absolute -left-6 top-0.5">
              {step.status === "cancelled" ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : step.status === "completed" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : step.status === "pending" ? (
                <Clock className="w-5 h-5 text-yellow-500" />
              ) : step.status === "in_progress" ? (
                <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </span>
            <div className="text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-700">{step.title}</p>
                  {step.canEdit && (
                    <Pencil
                      className="w-4 h-4 text-blue-500 cursor-pointer"
                      onClick={() => handleEditClick(step)}
                    />
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {step.time || "Expected"}
                </span>
              </div>

              <p className="text-gray-500 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {step.location || "Unknown"}
              </p>

              {step._id && editStepId === step.id ? (
                <div className="mt-2 flex items-center space-x-2">
                  <Input
                    className="w-40 h-8"
                    value={editedStatusMap[step.id]}
                    onChange={(e) =>
                      handleStatusChange(step.id, e.target.value)
                    }
                  />
                  <Button
                    size="sm"
                    className="h-8 px-3"
                    onClick={() => handleSave(step)}
                    disabled={saving}
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                </div>
              ) : (
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-blue-600">
                    Status: {step.status}
                  </span>
                  {step._id && (
                    <Pencil
                      className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-500"
                      onClick={() => handleEditClick(step)}
                    />
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
