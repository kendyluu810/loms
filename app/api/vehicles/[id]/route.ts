import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";

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

  const { id } = await params;
  const body = await req.json();
  const updated = await Vehicle.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(updated);
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
