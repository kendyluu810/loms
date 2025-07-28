"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadRow } from "@/type";
import { MoreVertical, Pencil } from "lucide-react";
import { useState } from "react";

export default function GeneralTabs({ load }: { load: LoadRow }) {


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
          {/* Repeat row for Pickup, Stop, Delivery */}
          <div className="grid grid-cols-6 gap-4 py-2 text-sm border-b">
            <span>
              Pickup
              <br />
              15:19 EDT
            </span>
            <span>
              14/05/22
              <br />
              09:00 - 18:00
            </span>
            <span>
              LG Electronics HK CSA
              <br />
              Hanover, VA
            </span>
            <span>111 Industrial Ave, VA 09312</span>
            <span>
              <Badge
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Completed
              </Badge>
            </span>
            <span className="text-blue-600">9 hours ago</span>
          </div>
          <div className="grid grid-cols-6 gap-4 py-2 text-sm border-b">
            <span>
              Stop
              <br />
              15:40 MST
            </span>
            <span>
              15/05/22
              <br />
              10:00 - 19:00
            </span>
            <span>
              LG Electronics HK CN
              <br />
              Fort Wayne, IN
            </span>
            <span>408 Manticor Ct Ave, IN 51390</span>
            <span>
              <Badge
                variant="outline"
                className="border-yellow-500 text-yellow-500"
              >
                In Transit
              </Badge>
            </span>
            <span className="text-blue-600">15 hours to</span>
          </div>
          <div className="grid grid-cols-6 gap-4 py-2 text-sm">
            <span>
              Delivery
              <br />
              16:05 PDT
            </span>
            <span>
              16/05/22
              <br />
              12:00 - 17:00
            </span>
            <span>
              Southwest Metro WHSE
              <br />
              Joliet, IL
            </span>
            <span>15300 Technology Dr, IL 87544</span>
            <span>
              <Badge
                variant="outline"
                className="border-yellow-500 text-yellow-500"
              >
                Scheduled
              </Badge>
            </span>
            <span className="text-blue-600">28 hours to</span>
          </div>
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
          <div className="grid grid-cols-6 gap-4 py-2 text-sm">
            <span>#87421509987</span>
            <span>#83090002371</span>
            <span>#74388819351</span>
            <span>11,287</span>
            <span>30</span>
            <span>$5,500</span>
          </div>
        </CardContent>
      </Card>

      {/* CONTACTS CARD */}
      <Card className="border rounded-lg shadow-sm h-fitx">
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
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-semibold text-gray-600">
                Contact Customer
              </div>
              <div className="text-blue-700">@lgexport</div>
              <div>+1 210 896 2166</div>
            </div>
            <div>
              <div className="font-semibold text-gray-600">Contact Person</div>
              <div className="text-blue-700">john.taylor@lge.com</div>
              <div>0884 895 6632</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
