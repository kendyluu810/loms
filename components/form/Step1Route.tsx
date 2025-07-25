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
import countries from "world-countries";
import { useLoadStore } from "@/store/useLoadStore";

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
}));

export default function Step1Route() {
  const { route, updateRoute } = useLoadStore();
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#022f7e]">Route</h3>
      </div>
      <div className="space-y-3">
        {/* 1st row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border rounded-md p-4">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Origin</Label>
            <Select
              onValueChange={(value) => updateRoute({ origin: value })}
              value={route.origin}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map((country) => (
                  <SelectItem key={country.value} value={country.label}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Pickup Number
            </Label>
            <Input
              placeholder="#123456789"
              value={route.pickupNumber || ""}
              onChange={(e) => updateRoute({ pickupNumber: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Pickup Address
            </Label>
            <Input
              placeholder="Enter pickup address"
              value={route.addressPickup || ""}
              onChange={(e) => updateRoute({ addressPickup: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Shipper Schedule
            </Label>
            <Input
              type="time"
              value={route.shipperSchedule || ""}
              onChange={(e) => updateRoute({ shipperSchedule: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full text-left border rounded-md px-3 py-2 text-sm",
                    !date && "text-muted-foreground"
                  )}
                >
                  {pickupDate ? (
                    format(pickupDate, "dd/MM/yyyy")
                  ) : (
                    <span>Select date</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="single"
                  selected={pickupDate}
                  onSelect={(date) => {
                    setPickupDate(date);
                    if (date) updateRoute({ pickupDate: date.toISOString() });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Pickup Time</Label>
            <Input
              type="time"
              value={route.pickupTime || ""}
              onChange={(e) => updateRoute({ pickupTime: e.target.value })}
            />
          </div>
        </div>
        {/* 2nd row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border rounded-md p-4">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Destination</Label>
            <Select
              onValueChange={(value) => updateRoute({ destination: value })}
              value={route.destination}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map((country) => (
                  <SelectItem key={country.value} value={country.label}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Delivery Number
            </Label>
            <Input
              placeholder="#123456789"
              value={route.deliveryNumber || ""}
              onChange={(e) => updateRoute({ deliveryNumber: e.target.value })}
            />
          </div>
      
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Delivery Address
            </Label>
            <Input
              placeholder="Enter Address here"
              value={route.addressDelivery || ""}
              onChange={(e) => updateRoute({ addressDelivery: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Receive Schedule
            </Label>
            <Input
              type="time"
              value={route.receiverSchedule || ""}
              onChange={(e) =>
                updateRoute({ receiverSchedule: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Delivery Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full text-left border rounded-md px-3 py-2 text-sm",
                    !date && "text-muted-foreground"
                  )}
                >
                  {deliveryDate ? (
                    format(deliveryDate, "dd/MM/yyyy")
                  ) : (
                    <span>Select date</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={(date) => {
                    setDeliveryDate(date);
                    if (date) updateRoute({ deliveryDate: date.toISOString() });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Delivery Time
            </Label>
            <Input
              type="time"
              value={route.deliveryTime || ""}
              onChange={(e) => updateRoute({ deliveryTime: e.target.value })}
            />
          </div>
        </div>
        {/* 3rd row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 border rounded-md p-4">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Additional Stop
            </Label>
            <Select
              onValueChange={(value) => updateRoute({ additionalStop: value })}
              value={route.additionalStop}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map((country) => (
                  <SelectItem key={country.value} value={country.label}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Warehouse Number
            </Label>
            <Input
              placeholder="#123456789"
              value={route.warehouseNumber || ""}
              onChange={(e) => updateRoute({ warehouseNumber: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Warehouse Schedule
            </Label>
            <Input
              type="time"
              value={route.warehouseSchedule || ""}
              onChange={(e) =>
                updateRoute({ warehouseSchedule: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Date</Label>
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
                  onSelect={(date) => {
                    setDate(date);
                    if (date) updateRoute({ date: date.toISOString() });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Time</Label>
            <Input
              type="time"
              value={route.time || ""}
              onChange={(e) => updateRoute({ time: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
