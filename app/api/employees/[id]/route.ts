import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Employees from "@/models/employees/Employees";
import Driver from "@/models/Driver";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();

  const prevEmployee = await Employees.findById(id);
  const updated = await Employees.findByIdAndUpdate(id, body, { new: true });

  const wasDriver = prevEmployee.position === "Driver";
  const isDriver = body.position === "Driver";

  if (wasDriver && !isDriver) {
    await Driver.findOneAndDelete({ employee: id });
  } else if (isDriver && body.driverInfo) {
    await Driver.findOneAndUpdate(
      { employee: id },
      { employee: id, ...body.driverInfo },
      { upsert: true, new: true }
    );
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  await Employees.findByIdAndDelete(id);
  await Driver.findOneAndDelete({ employee: id });
  return NextResponse.json({ message: "Deleted" });
}
