import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const load = await Load.findById(params.id)
      .populate("route")
      .populate("shipment")
      .populate("customer");
    if (!load) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(load);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const data = await req.json();
    const updated = await Load.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await Load.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}
