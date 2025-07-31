import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import { NextRequest, NextResponse } from "next/server";

// GET all vehicles
export async function GET() {
  await dbConnect();

  try {
    const vehicles = await Vehicle.find().populate("assignedDriver");
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

// POST new vehicle
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const newVehicle = await Vehicle.create(body);
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error) {
    console.error("Create vehicle error:", error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
