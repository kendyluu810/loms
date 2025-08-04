import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Route from "@/models/load_board/Routes";

function calculateETA(early: string, late: string) {
  if (!early || !late) return "";
  const [eh, em] = early.split(":").map(Number);
  const [lh, lm] = late.split(":").map(Number);
  const earlyMinutes = eh * 60 + em;
  const lateMinutes = lh * 60 + lm;
  const avgMinutes = Math.floor((earlyMinutes + lateMinutes) / 2);
  const hours = String(Math.floor(avgMinutes / 60)).padStart(2, "0");
  const minutes = String(avgMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

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
        timezone: "GMT+7",
        date: body.pickupDate || "",
        localTime: body.pickupTime || "",
        early: body.shipperSchedule?.from || "",
        late: body.shipperSchedule?.to || "",
        status: "pending",
        eta: calculateETA(
          body.shipperSchedule?.from || "",
          body.shipperSchedule?.to || ""
        ),
      };
    }

    if (!body.deliveryPoint) {
      body.deliveryPoint = {
        type: "delivery",
        locationName: body.destination || "",
        cityState: body.destination || "",
        address: body.deliveryAddress || "",
        timezone: "GMT+7",
        date: body.deliveryDate || "",
        localTime: body.deliveryTime || "",
        early: body.receiverSchedule?.from || "",
        late: body.receiverSchedule?.to || "",
        status: "pending",
        eta: calculateETA(
          body.receiverSchedule?.from || "",
          body.receiverSchedule?.to || ""
        ),
      };
    }

    if (!body.stopPoints || body.stopPoints.length === 0) {
      body.stopPoints = [
        {
          type: "stop",
          locationName: body.additionalStop || "",
          cityState: "",
          address: "N/A",
          timezone: "GMT+7",
          date: body.date || "",
          localTime: body.time || "",
          early: body.warehouseSchedule?.from || "",
          late: body.warehouseSchedule?.to || "",
          status: "planned",
          eta: calculateETA(
            body.warehouseSchedule?.from || "",
            body.warehouseSchedule?.to || ""
          ),
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
