import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { EllipsisVertical, Plus, SquarePen } from "lucide-react";

type RouteSectionProps = {
  title: string;
  locationOptions: string[];
  defaultLocation?: string;
  numberLabel: string;
  scheduleLabel: string;
  timeLabel: string;
  dateLabel?: string;
};

const RouteSection = ({
  title,
  locationOptions,
  numberLabel,
  scheduleLabel,
  timeLabel,
  dateLabel,
}: RouteSectionProps) => {
  const [date, setDate] = useState<Date>();
  return (
    <div className="border p-4 rounded-md space-y-4">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <Label>{title}</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{numberLabel}</Label>
          <Input placeholder={`#123456789`} />
        </div>

        <div>
          <Label>{scheduleLabel}</Label>
          <Input type="time" />
        </div>

        <div>
          <Label>{dateLabel}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full text-left border rounded-md px-3 py-2 text-sm",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "dd/MM/yyyy") : <span>Select date</span>}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>{timeLabel}</Label>
          <Input type="time" />
        </div>
      </div>
    </div>
  );
};

export default function Step1Route() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Route</h3>
        <div className="flex items-center space-x-6">
          <Plus />
          <SquarePen />
          <EllipsisVertical />
        </div>
      </div>
      <RouteSection
        title="Origin"
        locationOptions={["Hanover, VA", "Los Angeles, CA"]}
        numberLabel="Pickup Number"
        scheduleLabel="Shipper Schedule"
        dateLabel="Pickup Date"
        timeLabel="Pickup Time"
      />
      <RouteSection
        title="Destination"
        locationOptions={["Joliet, IL", "Chicago, IL"]}
        numberLabel="Delivery Number"
        scheduleLabel="Receiver Schedule"
        dateLabel="Delivery Date"
        timeLabel="Delivery Time"
      />
      <RouteSection
        title="Additional Stop"
        locationOptions={["Fort Wayne, IN", "Dallas, TX"]}
        numberLabel="Warehouse Number"
        scheduleLabel="Warehouse Schedule"
        dateLabel="Date"
        timeLabel="Time"
      />
    </div>
  );
}
