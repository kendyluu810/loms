import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExtendedLoadRow } from "@/type";

type TrackingListItemProps = {
  load: ExtendedLoadRow;
  onSelect: (load: ExtendedLoadRow) => void;
};

export default function TrackingListItem({
  load,
  onSelect,
}: TrackingListItemProps) {
  return (
    <Card
      onClick={() => onSelect(load)}
      className="cursor-pointer transition-shadow hover:shadow-lg mb-4"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-bold text-[#022f7e]">
          #{load.load_id}
        </CardTitle>
        <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
          {load.status || "In Delivery"}
        </Badge>
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
