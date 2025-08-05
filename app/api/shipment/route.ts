import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Shipment from "@/models/load_board/Shipment";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    //console.log("Creating shipment:", body);

    if (!body.pickupPoint) {
      body.pickupPoint = {
        type: "pickup",
        code: body.pickupNumber || "AUTO",
        locationName: body.origin || "",
        eta: body.pickupDate || "",
        status: "pending",
      };
    }

    if (!body.deliveryPoint) {
      body.deliveryPoint = {
        type: "delivery",
        code: body.deliveryNumber || "AUTO",
        locationName: body.destination || "",
        eta: body.deliveryDate || "",
        status: "pending",
      };
    }

    // Gán stopPoint nếu thiếu
    if (!body.stopPoint) {
      body.stopPoint = {
        type: "stop",
        code: body.warehouseNumber || "AUTO",
        locationName: body.additionalStop ,
        eta: "",
        status: "planned",
      };
    }

    const newShipment = new Shipment(body);
    await newShipment.save();

    return NextResponse.json(newShipment, { status: 201 });
  } catch (error) {
    //console.error("POST /api/shipment error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
