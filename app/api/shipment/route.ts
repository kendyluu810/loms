import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Shipment from "@/models/load_board/Shipment";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("Creating shipment:", body);

    const newShipment = new Shipment(body);
    await newShipment.save();

    return NextResponse.json(newShipment, { status: 201 });
  } catch (error) {
    console.error("POST /api/shipment error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
