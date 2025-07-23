import { ScrollArea } from "../ui/scroll-area";
import TrackingListItem from "./TrackingListItem";

export default function TrackingList({ loads, onSelect }: any) {
  return (
    <ScrollArea className="p-2 bg-white rounded-md shadow-md border">
      <h3 className="text-lg font-semibold mb-2 text-[#022f7e]">
        Available Tracking
      </h3>
      <div className="space-y-2">
        {loads.length === 0 ? (
        <p className="text-sm text-gray-500">No loads found.</p>
      ) : (
        loads.map((load: any) => (
          <TrackingListItem key={load._id} load={load} onSelect={onSelect} />
        ))
      )}
      </div>
    </ScrollArea>
  );
}
