import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Routes from "@/models/load_board/Routes";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await req.json();
  const updated = await Routes.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const deleted = await Routes.findByIdAndDelete(params.id);
  return NextResponse.json(deleted);
}
