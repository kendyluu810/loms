import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";

// GET: Lấy thông tin Driver theo employeeId
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  await dbConnect();
  const { employeeId } = await params;
  const driver = await Driver.findOne({ employee: employeeId });
  if (!driver) {
    return NextResponse.json({ error: "Driver not found" }, { status: 404 });
  }
  return NextResponse.json(driver);
}

// DELETE: Xoá driver khi đổi sang vị trí khác
export async function DELETE(
  req: NextRequest,
  { params }: { params: { employeeId: string } }
) {
  await dbConnect();
  await Driver.findOneAndDelete({ employee: params.employeeId });
  return NextResponse.json({ message: "Driver deleted" });
}

// PUT: Cập nhật driver theo employeeId
export async function PUT(
  req: NextRequest,
  { params }: { params: { employeeId: string } }
) {
  await dbConnect();
  const data = await req.json();

  const updated = await Driver.findOneAndUpdate(
    { employee: params.employeeId },
    data,
    { new: true }
  );

  return NextResponse.json(updated);
}
