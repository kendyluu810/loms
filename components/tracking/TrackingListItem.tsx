import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExtendedLoadRow } from "@/type";

type TrackingListItemProps = {
  load: ExtendedLoadRow;
  onSelect: (load: ExtendedLoadRow) => void;
};

export default function TrackingListItem({
  load,
  onSelect,
}: TrackingListItemProps) {
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "delivered":
        return "bg-green-100 text-green-800 border border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };
  return (
    <Card
      onClick={() => onSelect(load)}
      className="cursor-pointer transition-shadow hover:shadow-lg mb-4"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-bold text-[#022f7e]">
          #{load.load_id}
        </CardTitle>
        <span
          className={`text-xs px-2 py-1 rounded font-medium ${getStatusStyle(
            load.status
          )}`}
        >
          {load.status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      </CardHeader>

      <CardContent className="space-y-2 text-sm ml-1">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
          <span>
            <strong>Pickup:</strong>{" "}
            {load.origin || load.route?.pickupPoint?.locationName || "N/A"}
          </span>
        </div>

        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
          <span>
            <strong>Delivery:</strong>{" "}
            {load.destination ||
              load.route?.deliveryPoint?.locationName ||
              "N/A"}
          </span>
        </div>

        <div className="pt-1 text-gray-600 font-medium">
          <strong>Responsible:</strong> {load?.driver?.employee?.name || "N/A"}
        </div>
      </CardContent>
    </Card>
  );
}
