import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ItemCategory from "@/models/load_board/ItemCategory";

export async function GET() {
  await dbConnect();
  const data = await ItemCategory.find().lean();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  const exists = await ItemCategory.findOne({ name });
  if (exists) return NextResponse.json({ message: "Exists" }, { status: 409 });
  const newItem = await ItemCategory.create({ name });
  return NextResponse.json(newItem);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  await ItemCategory.deleteOne({ name });
  return NextResponse.json({ message: "Deleted" });
}
