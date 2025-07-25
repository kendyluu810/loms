import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DangerType from "@/models/load_board/DangerType";

export async function GET() {
  await dbConnect();
  const data = await DangerType.find().lean();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  const exists = await DangerType.findOne({ name });
  if (exists) return NextResponse.json({ message: "Exists" }, { status: 409 });
  const newItem = await DangerType.create({ name });
  return NextResponse.json(newItem);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  await DangerType.deleteOne({ name });
  return NextResponse.json({ message: "Deleted" });
}
