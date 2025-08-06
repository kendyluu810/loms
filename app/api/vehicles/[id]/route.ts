import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import mongoose from "mongoose"; // Add this import

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const vehicle = await Vehicle.findById(id).populate("assignedDriver");
    if (!vehicle) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("[GET VEHICLE]", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = mongoose.Types.ObjectId.isValid(id)
      ? await Vehicle.findByIdAndUpdate(id, body, { new: true })
      : await Vehicle.findOneAndUpdate({ truckNumber: id }, body, {
          new: true,
        });

    if (!updated) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[UPDATE VEHICLE]", error);
    return NextResponse.json(
      { message: "Failed to update vehicle", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    await Vehicle.findByIdAndDelete(id);
    return NextResponse.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete vehicle", error },
      { status: 500 }
    );
  }
}
