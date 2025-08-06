import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Carrier from "@/models/Carrier";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const carrier = await Carrier.findById(params.id).populate("customer");
    if (!carrier)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(carrier, { status: 200 });
  } catch (error) {
    console.error("GET carrier error:", error);
    return NextResponse.json(
      { error: "Failed to fetch carrier" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await req.json();

  try {
    const updated = await Carrier.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT carrier error:", error);
    return NextResponse.json(
      { error: "Failed to update carrier" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await Carrier.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE carrier error:", error);
    return NextResponse.json(
      { error: "Failed to delete carrier" },
      { status: 500 }
    );
  }
}
