import dbConnect from "@/lib/mongodb";
import Customers from "@/models/Customers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();

  const updated = await Customers.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: any) {
  await dbConnect();
  const { id } = params;

  await Customers.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
