import { Weight } from "lucide-react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { useLoadStore } from "@/store/useLoadStore";
import { ItemCategorySelect } from "../load-form/selects/ItemCategorySelect";
import { EquipmentTypeSelect } from "../load-form/selects/EquipmentTypeSelect";
import { TruckLoadSelect } from "../load-form/selects/TruckLoadSelect";
import { DangerTypeSelect } from "../load-form/selects/DangerTypeSelect";
import { useShipmentOptions } from "@/store/useShipmentOptions";
import { useEffect } from "react";

export default function Step2Shipments() {
  const { shipment, updateShipment } = useLoadStore();
  const fetchOptions = useShipmentOptions((s) => s.fetchOptions);
  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

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
            <ItemCategorySelect
              value={shipment.itemCategory || ""}
              onChange={(value) => updateShipment({ itemCategory: value })}
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
                placeholder="Enter Rate"
                value={shipment.rate}
                onChange={(e) =>
                  updateShipment({ rate: parseFloat(e.target.value) || 0 })
                }
              />
              <Select
                value={shipment.rateUnit}
                onValueChange={(value) =>
                  updateShipment({ rateUnit: value as "USD" | "VND" | "Other" })
                }
              >
                <SelectTrigger className="w-fit">
                  <SelectValue defaultValue="USD " placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="VND">VND</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
            <EquipmentTypeSelect
              value={shipment.equipmentType || ""}
              onChange={(value) => updateShipment({ equipmentType: value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Truck Load (F/P)
            </Label>
            <TruckLoadSelect
              value={shipment.truckLoad || ""}
              onChange={(value) => updateShipment({ truckLoad: value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Dangerous Goods
            </Label>
            <Select
              value={shipment.dangerousGood ? "yes" : "no"}
              onValueChange={(value) =>
                updateShipment({ dangerousGood: value === "yes" })
              }
            >
              <SelectTrigger className="w-full">
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
            <DangerTypeSelect
              value={shipment.dangerType || ""}
              onChange={(value) => updateShipment({ dangerType: value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
