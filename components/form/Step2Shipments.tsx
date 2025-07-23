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
import { useLoadStore } from "@/store/useLoadStore";

export default function Step2Shipments() {
  const { shipment, updateShipment } = useLoadStore();

  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#022f7e]">Shipments</h3>
      </div>

      <div className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border p-4 rounded-md">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Item Category
            </Label>
            <Input
              type="text"
              placeholder="Enter Item Category"
              value={shipment.itemCategory}
              onChange={(e) => updateShipment({ itemCategory: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Weight (lbs)</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter Weight"
                className="pr-10"
                value={shipment.weight}
                onChange={(e) =>
                  updateShipment({ weight: parseFloat(e.target.value) || 0 })
                }
              />
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
            <Input
              type="number"
              placeholder="Enter Length"
              value={shipment.length}
              onChange={(e) =>
                updateShipment({ length: parseFloat(e.target.value) || 0 })
              }
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Rate</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="3,500"
                value={shipment.rate}
                onChange={(e) =>
                  updateShipment({ rate: parseFloat(e.target.value) || 0 })
                }
              />
              <Select
                value={shipment.rateUnit}
                onValueChange={(value) => updateShipment({ rateUnit: value })}
              >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border p-4 rounded-md">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Equipment Type
            </Label>
            <Input
              type="text"
              placeholder="Enter Equipment Type"
              value={shipment.equipmentType}
              onChange={(e) =>
                updateShipment({ equipmentType: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Truck Load (F/P)
            </Label>
            <Input
              type="text"
              placeholder="Enter Truck Load"
              value={shipment.truckLoad}
              onChange={(e) => updateShipment({ truckLoad: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Dangerous Goods
            </Label>
            <Select
              value={shipment.dangerousGoods ? "yes" : "no"}
              onValueChange={(value) =>
                updateShipment({ dangerousGoods: value === "yes" })
              }
            >
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
            <Input
              type="text"
              placeholder="Enter Danger Type"
              value={shipment.dangerType}
              onChange={(e) => updateShipment({ dangerType: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
