import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();

  const updated = await Driver.findByIdAndUpdate(
    id,
    {
      employee: body.Eid,
      driverlicense: body.driverlicense,
      licensetype: body.licensetype,
      licenseexpiry: body.licenseexpiry,
    },
    { new: true }
  ).populate("employee");

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  await Driver.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
