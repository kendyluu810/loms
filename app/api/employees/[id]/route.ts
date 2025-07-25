import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Employees from "@/models/employees/Employees";

export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();

  const updated = await Employees.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: any) {
  await dbConnect();
  const { id } = params;

  await Employees.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
