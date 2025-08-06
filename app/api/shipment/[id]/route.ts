import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Shipment from "@/models/load_board/Shipment";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const data = await req.json();
  const updated = await Shipment.findByIdAndUpdate((await params).id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const deleted = await Shipment.findByIdAndDelete(id);
  return NextResponse.json(deleted);
}
