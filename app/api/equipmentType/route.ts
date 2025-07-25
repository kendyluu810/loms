import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import EquipmentType from "@/models/load_board/EquipmentType";

export async function GET() {
  await dbConnect();
  const data = await EquipmentType.find().lean();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  const exists = await EquipmentType.findOne({ name });
  if (exists) return NextResponse.json({ message: "Exists" }, { status: 409 });
  const newItem = await EquipmentType.create({ name });
  return NextResponse.json(newItem);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  await EquipmentType.deleteOne({ name });
  return NextResponse.json({ message: "Deleted" });
}
