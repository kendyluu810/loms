import { Weight } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function Step2Shipments() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#022f7e]">Shipments</h3>
      </div>

      <div className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Item Category
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Item Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Weight (lbs)</Label>
            <div className="relative">
              <Input placeholder="Enter Weight" className="pr-10" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full"
              >
                <Weight className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Length (Foot)
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="53">53 Ft</SelectItem>
                <SelectItem value="48">48 Ft</SelectItem>
                <SelectItem value="40">40 Ft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Rate</Label>
            <div className="flex space-x-2">
              <Input placeholder="3,500" />
              <Select>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="vnd">VND</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Equipment Type
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Equipment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="container">Container</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Truck Load (F/P)
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Truck Load" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Dangerous Goods
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Dangerous Goods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Danger Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Danger Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="explosive">Explosive</SelectItem>
                <SelectItem value="flammable">Flammable</SelectItem>
                <SelectItem value="toxic">Toxic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
