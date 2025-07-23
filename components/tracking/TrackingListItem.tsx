import { Badge } from "@/components/ui/badge";

type TrackingListItemProps = {
  load: any;
  onSelect: (load: any) => void;
};

export default function TrackingListItem({
  load,
  onSelect,
}: TrackingListItemProps) {
  return (
    <div
      onClick={() => onSelect(load)}
      className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-md transition-all bg-white mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-bold text-[#022f7e]">
          #{load.loadNumber}
        </h3>
        <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
          {load.status || "In Delivery"}
        </Badge>
      </div>

      <div className="flex flex-col space-y-1 ml-1">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
          <span className="text-sm">
            <strong>Pickup:</strong> {load.route?.origin}
          </span>
        </div>

        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
          <span className="text-sm">
            <strong>Delivery:</strong> {load.route?.destination}
          </span>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <strong>Responsible:</strong> {load.driver?.name || "N/A"}
      </div>
    </div>
  );
}
