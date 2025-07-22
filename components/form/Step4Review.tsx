import { EllipsisVertical, SquarePen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { useLoadStore } from "@/store/useLoadStore";

export default function Step4Review() {
  const { route, shipment, owner } = useLoadStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto mt-10">
      <div className="space-y-10">
        {/* Route */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold text-[#022f7e]">
              Route
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Origin</Label>
                <span>{route.origin}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Pickup Number
                </Label>
                <span>{route.pickupNumber}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Shipper Schedule
                </Label>
                <span>{route.shipperSchedule}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Pickup Date
                </Label>
                <span>{route.pickupDate}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Pickup Time
                </Label>
                <span>{route.pickupTime}</span>
              </div>
            </CardContent>

            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Destination
                </Label>
                <span>{route.destination}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Delivery Number
                </Label>
                <span>{route.deliveryNumber}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Receiver Schedule
                </Label>
                <span>{route.receiverSchedule}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Delivery Date
                </Label>
                <span>{route.deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Delivery Time
                </Label>
                <span>{route.deliveryTime}</span>
              </div>
            </CardContent>
          </div>
        </Card>
        <Card className="border rounded-lg shadow-sm">
          {/* Additional Stop */}
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold text-[#022f7e]">
              Additional Stop
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Origin</Label>
                <span>{route.additionalStop}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Warehouse Number
                </Label>
                <span>{route.warehouseNumber}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Warehouse Schedule
                </Label>
                <span>{route.warehouseSchedule}</span>
              </div>
            </CardContent>
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Destination
                </Label>
                <span>{route.destination}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Date</Label>
                <span>{route.deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Time</Label>
                <span>{route.deliveryTime}</span>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
      <div className="space-y-3">
        {/* Shipments */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold text-[#022f7e]">
              Shipments
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Item Category
                </Label>
                <span>{shipment.itemCategory}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Equipment Type
                </Label>
                <span>{shipment.equipmentType}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Truck Load
                </Label>
                <span>{shipment.truckLoad}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Dangerous Goods
                </Label>
                <span>{shipment.dangerousGoods ? "Yes" : "No"}</span>
              </div>
            </CardContent>
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Weight (lbs)
                </Label>
                <span>{shipment.weight}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Length (Foot)
                </Label>
                <span>{shipment.length}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Rate</Label>
                <span>{shipment.rate}</span>
              </div>
              {/* <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Insure Cargo
                </Label>
                <span>Yes</span>
              </div> */}
            </CardContent>
          </div>
        </Card>
        {/* Owner */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Owner</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Customer</Label>
                <span>{owner.name}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Company Email
                </Label>
                <span>{owner.email}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Company Phone
                </Label>
                <span>{owner.phone}</span>
              </div>
              {/* <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Cargo Instructions
                </Label>
                <span>Yes</span>
              </div> */}
            </CardContent>
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Contact Person
                </Label>
                <span>{owner.contactName}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Contact Email
                </Label>
                <span>{owner.contactEmail}</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Contact Phone
                </Label>
                <span>{owner.contactPhone}</span>
              </div>
            </CardContent>
          </div>
        </Card>{" "}
      </div>
    </div>
  );
}
