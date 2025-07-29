"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ExtendedLoadRow, LoadRow } from "@/type";
import { format } from "date-fns";
import { MoreVertical, Pencil } from "lucide-react";

export default function GeneralTabs({ load }: { load: ExtendedLoadRow }) {
  const routePoints = load.route?.points ?? [];
  const shipmentPoints = load.shipment?.points ?? [];
  const customer = load.customer;

  return (
    <div className="space-y-4">
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#022f7e]">
            Route
          </CardTitle>
          <div className="flex items-center space-x-2 ">
            <Pencil className="text-[#022f7e] cursor-pointer w-4 h-4" />
            <MoreVertical className="text-[#022f7e] cursor-pointer w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-2 text-sm">
            <Label>Timezone</Label>
            <Label>Early / Late</Label>
            <Label>Location</Label>
            <Label>Address</Label>
            <Label>Condition</Label>
            <Label>ETA</Label>
          </div>
          {routePoints?.map((point, index) => (
            <div
              key={point._id || index}
              className="grid grid-cols-6 gap-4 py-2 text-sm border-b"
            >
              <span>
                {point.type}
                <br />
                {point.timezone || "--"}
              </span>
              <span>
                {format(new Date(point.date), "dd/MM/yy")}
                <br />
                {point.early} - {point.late}
              </span>
              <span>
                {point.locationName}
                <br />
                {point.cityState}
              </span>
              <span>{point.address}</span>
              <span>
                <Badge
                  variant="outline"
                  className={
                    point.status === "Completed"
                      ? "border-green-600 text-green-600"
                      : point.status === "In Transit"
                      ? "border-yellow-500 text-yellow-500"
                      : "border-blue-500 text-blue-500"
                  }
                >
                  {point.status}
                </Badge>
              </span>
              <span className="text-blue-600">{point.eta}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#022f7e]">
            Shipment
          </CardTitle>
          <div className="flex items-center space-x-2 ">
            <Pencil className="text-[#022f7e] cursor-pointer w-4 h-4" />
            <MoreVertical className="text-[#022f7e] cursor-pointer w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-2 text-sm">
            <Label>Pickup</Label>
            <Label>Delivery</Label>
            <Label>Stop</Label>
            <Label>Weight (lbs)</Label>
            <Label>Pallets</Label>
            <Label>Rate</Label>
          </div>
          {shipmentPoints.length > 0 && (
            <div className="grid grid-cols-6 gap-4 py-2 text-sm">
              <span>
                {shipmentPoints.find((p) => p.type === "pickup")?.code || "--"}
              </span>
              <span>
                {shipmentPoints.find((p) => p.type === "delivery")?.code ||
                  "--"}
              </span>
              <span>
                {shipmentPoints.find((p) => p.type === "stop")?.code || "--"}
              </span>
              <span>{load.shipment?.weight || "--"}</span>
              <span>{load.shipment?.pallets || "--"}</span>
              <span>${load.shipment?.rate?.toLocaleString() || "--"}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CONTACTS CARD */}
      <Card className="border rounded-lg shadow-sm h-fitx">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#022f7e]">
            Customer
          </CardTitle>
          <div className="flex items-center space-x-2 ">
            <Pencil className="text-[#022f7e] cursor-pointer w-4 h-4" />
            <MoreVertical className="text-[#022f7e] cursor-pointer w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-semibold text-gray-600">Company Contact</div>
              <div className="text-blue-700">@{customer.companyName}</div>
              <div>{customer.companyPhone}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-600">Contact Person</div>
              <div className="text-blue-700">{customer.contactPerson}</div>
              <div>{customer.contactPhone}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
