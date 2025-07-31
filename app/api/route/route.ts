import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Route from "@/models/load_board/Routes";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("Creating route:", body);

    // Gán mặc định pickupPoint & deliveryPoint nếu chưa có
    if (!body.pickupPoint) {
      body.pickupPoint = {
        type: "pickup",
        locationName: body.origin || "",
        cityState: body.origin || "",
        address: body.pickupAddress || "",
        timezone: "UTC+7",
        date: body.pickupDate || "",
        localTime: body.pickupTime || "",
        early: body.shipperSchedule?.from || "",
        late: body.shipperSchedule?.to || "",
        status: "pending",
        eta: body.createdAt || "",
      };
    }

    if (!body.deliveryPoint) {
      body.deliveryPoint = {
        type: "delivery",
        locationName: body.destination || "",
        cityState: body.destination || "",
        address: body.deliveryAddress || "",
        timezone: "UTC+7",
        date: body.deliveryDate || "",
        localTime: body.deliveryTime || "",
        early: body.receiverSchedule?.from || "",
        late: body.receiverSchedule?.to || "",
        status: "pending",
        eta: body.createdAt || "",
      };
    }

    if (!body.stopPoints || body.stopPoints.length === 0) {
      body.stopPoints = [
        {
          type: "stop",
          locationName: body.additionalStop || "",
          cityState: "",
          address: "N/A",
          timezone: "UTC+7",
          date: body.date || "",
          localTime: body.time || "",
          early: body.warehouseSchedule?.from || "",
          late: body.warehouseSchedule?.to || "",
          status: "planned",
          eta: body.createdAt || "",
        },
      ];
    }

    const newRoute = new Route(body);
    await newRoute.save();

    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    console.error("POST /api/route error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
