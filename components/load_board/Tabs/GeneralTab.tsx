import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MoreVertical, Pen } from "lucide-react";

export default function GeneralTabs() {
  return (
    <div>
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between ">
            <CardTitle className="text-lg font-semibold text-[#022f7e]">
              Route
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Pen className="text-[#022f7e] cursor-pointer" />
              <MoreVertical className="text-[#022f7e] cursor-pointer" />
            </div>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <CardContent className="space-y-3 p-4">
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">Origin</Label>
              <span></span>
            </div>
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Pickup Number
              </Label>
              <span></span>
            </div>
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Shipper Schedule
              </Label>
              <span></span>
            </div>
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Pickup Date
              </Label>
              <span></span>
            </div>
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Pickup Time
              </Label>
              <span></span>
            </div>
          </CardContent>

          <CardContent className="space-y-3 p-4">
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Destination
              </Label>
              <span></span>
            </div>
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Delivery Number
              </Label>
              <span></span>
            </div>
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Receiver Schedule
              </Label>
              <span></span>
            </div>
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Delivery Date
              </Label>
              <span></span>
            </div>
            <div className="flex justify-between">
              <Label className="text-[#022f7e] font-semibold">
                Delivery Time
              </Label>
              <span></span>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
