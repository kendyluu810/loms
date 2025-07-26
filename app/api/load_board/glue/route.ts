import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { loadId } = await req.json();

  // Check if already glued
  const exists = await Load.findOne({ load_id: loadId });
  if (exists) {
    return NextResponse.json(
      { message: "Load already exists in LoadBoard." },
      { status: 400 }
    );
  }

  // Fetch from Load table
  const load = await Load.findOne({ load_id: loadId })
    .populate("route")
    .populate("shipment")
    .populate("customer");

  if (!load) {
    return NextResponse.json({ message: "Load not found." }, { status: 404 });
  }

  // Add to LoadBoard
  const boardLoad = await Load.create({
    load_id: load.load_id,
    route: load.route._id,
    shipment: load.shipment._id,
    customer: load.customer._id,
    status: "Pending",
  });

  const populated = await boardLoad
    .populate("route")
    .populate("shipment")
    .populate("customer")
    .execPopulate?.(); // optional chaining for Mongoose 5 vs 6+ compatibility

  return NextResponse.json(
    { message: "Glued", data: populated },
    { status: 200 }
  );
}
