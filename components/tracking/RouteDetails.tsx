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

export default function RouteDetails({ load }: any) {
  if (!load) return <div className="p-4">No load selected</div>;

  const router = useRouter();

  const pickup = load.route?.pickupPoint;
  const delivery = load.route?.deliveryPoint;
  const stops = load.route?.stopPoints || [];

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
      pointType: "auto",
    },
    {
      id: 2,
      title: "At Pick up",
      location: pickup?.cityState,
      time: pickup?.late,
      status: pickupStatus,
      pointType: "pickup",
      _id: pickup?._id,
    },
    ...stops.map((stop: any, index: number) => ({
      id: 3 + index,
      title: "At Stop",
      location: stop.cityState || stop.locationName,
      time: stop.eta,
      status: normalizeStatus(stop.status),
      pointType: "stop",
      _id: stop._id,
    })),
    {
      id: 99,
      title: "At Destination",
      location: delivery?.cityState,
      time: delivery?.early,
      status: deliveryStatus,
      pointType: "delivery",
      _id: delivery?._id,
    },
    {
      id: 100,
      title: "Delivered",
      location: delivery?.cityState,
      time: delivery?.late,
      status: deliveryStatus,
      pointType: "delivery",
      _id: delivery?._id,
    },
  ];

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
                </div>
                <span className="text-xs text-gray-500">
                  {step.time || "Expected"}
                </span>
              </div>

              <p className="text-gray-500 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {step.location || "Unknown"}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
