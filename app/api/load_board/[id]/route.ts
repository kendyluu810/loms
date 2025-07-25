import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Route from "@/models/load_board/Routes";
import Shipment from "@/models/load_board/Shipment";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const id = params.id;
  const load =
    (await Load.findOne({ loadNumber: id })) ||
    (await Load.findById(id)
      .populate("customer")
      .populate("route")
      .populate("shipment")
      .populate("customer"));
  if (!load)
    return NextResponse.json({ message: "Load not found" }, { status: 404 });
  return NextResponse.json(load);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await req.json();
    const { route, shipment } = body;

    const id = params.id;
    const load =
      (await Load.findOne({ loadNumber: id })) || (await Load.findById(id));
    if (!load)
      return NextResponse.json({ message: "Load not found" }, { status: 404 });

    if (route) {
      await Route.findByIdAndUpdate(load.route, route);
    }

    if (shipment) {
      await Shipment.findByIdAndUpdate(load.shipment, shipment);
    }

    await load.save();
    return NextResponse.json({ message: "Load updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to update", details: error.message },
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
    const id = params.id;
    const load =
      (await Load.findOne({ loadNumber: id })) || (await Load.findById(id));
    if (!load)
      return NextResponse.json({ message: "Load not found" }, { status: 404 });

    await Route.findByIdAndDelete(load.route);
    await Shipment.findByIdAndDelete(load.shipment);
    await load.deleteOne();

    return NextResponse.json({ message: "Load deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete", details: error.message },
      { status: 500 }
    );
  }
}
