import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Routes from "@/models/load_board/Routes";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const data = await req.json();
  const updated = await Routes.findByIdAndUpdate((await params).id, data, {
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
  const deleted = await Routes.findByIdAndDelete(id);
  return NextResponse.json(deleted);
}
