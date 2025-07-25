import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TruckLoad from "@/models/load_board/TruckLoad";

export async function GET() {
  await dbConnect();
  const data = await TruckLoad.find().lean();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  const exists = await TruckLoad.findOne({ name });
  if (exists) return NextResponse.json({ message: "Exists" }, { status: 409 });
  const newItem = await TruckLoad.create({ name });
  return NextResponse.json(newItem);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  await TruckLoad.deleteOne({ name });
  return NextResponse.json({ message: "Deleted" });
}
