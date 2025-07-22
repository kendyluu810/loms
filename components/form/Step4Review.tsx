import { EllipsisVertical, SquarePen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

export default function Step4Review() {
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
                <span>Hanover, VA</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Pickup Number
                </Label>
                <span>#87422500167</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Shipper Schedule
                </Label>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Pickup Date
                </Label>
                <span>14/05/22</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Pickup Time
                </Label>
                <span>09:00</span>
              </div>
            </CardContent>

            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Destination
                </Label>
                <span>Joliet, IL</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Delivery Number
                </Label>
                <span>#7660022371</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Receiver Schedule
                </Label>
                <span>09:00 - 19:00</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Delivery Date
                </Label>
                <span>15/05/22</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Delivery Time
                </Label>
                <span>12:00</span>
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
                <span>Fort Wayne, IN</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Warehouse Number
                </Label>
                <span>#31428833167</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Warehouse Schedule
                </Label>
                <span>10:00 - 19:00</span>
              </div>
            </CardContent>
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Destination
                </Label>
                <span>Joliet, IL</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Date</Label>
                <span>15/05/22</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Time</Label>
                <span>Undefined</span>
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
                <span>Electronics</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Equipment Type
                </Label>
                <span>Van</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Truck Load
                </Label>
                <span>Full</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Dangerous Goods
                </Label>
                <span>No</span>
              </div>
            </CardContent>
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Weight (lbs)
                </Label>
                <span>11287</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Length (Foot)
                </Label>
                <span>53 Ft</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Rate</Label>
                <span>3,500$</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Insure Cargo
                </Label>
                <span>Yes</span>
              </div>
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
                <span>LG Electronics USA</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Company Email
                </Label>
                <span>@lgussupport</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Company Phone
                </Label>
                <span>(123) 855-1066</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">
                  Cargo Instructions
                </Label>
                <span>Yes</span>
              </div>
            </CardContent>
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Contact Person</Label>
                <span>John Taylor</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Contact Email</Label>
                <span>john.taylor@lge.com</span>
              </div>
              <div className="flex justify-between">
                <Label className="text-[#022f7e] font-semibold">Contact Phone</Label>
                <span>(888) 865-3026</span>
              </div>
            </CardContent>
          </div>
        </Card>{" "}
      </div>
    </div>
  );
}
