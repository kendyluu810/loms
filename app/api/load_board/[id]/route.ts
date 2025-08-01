import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import "@/models/load_board/Routes";
import "@/models/load_board/Shipment";
import "@/models/customer/Customers";
import "@/models/Carrier";
import "@/models/Invoice";
import { NextRequest, NextResponse } from "next/server";
import Routes from "@/models/load_board/Routes";
import Shipment from "@/models/load_board/Shipment";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await dbConnect();

  try {
    const load = await Load.findOne({ load_id: id })
      .populate("route")
      .populate("shipment")
      .populate("customer")
      .populate("carrier")
      .populate("invoice");

    console.log("ROUTE DATA:", load);

    if (!load) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const route = load.route;
    if (route) {
      const points = [
        { ...(route.pickupPoint?.toObject?.() ?? {}), type: "pickup" },
        ...(route.stopPoints ?? []).map((stop: any) => ({
          ...(stop?.toObject?.() ?? {}),
          type: "stop",
        })),
        { ...(route.deliveryPoint?.toObject?.() ?? {}), type: "delivery" },
      ];
      route.points = points;
    }

    const shipment = load.shipment;
    if (shipment) {
      const shipmentPoints = [
        { ...(shipment.pickupPoint?.toObject?.() ?? {}), type: "pickup" },
        ...(shipment.stopPoint
          ? [{ ...(shipment.stopPoint?.toObject?.() ?? {}), type: "stop" }]
          : []),
        { ...(shipment.deliveryPoint?.toObject?.() ?? {}), type: "delivery" },
      ];
      shipment.points = shipmentPoints;
    }
    return NextResponse.json(load);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  const body = await req.json();

  try {
    const load = await Load.findOne({ load_id: id }).populate("route");
    if (!load || !load.route) {
      return NextResponse.json(
        { message: "Load or Route not found" },
        { status: 404 }
      );
    }
    // === Update Route ===
    if (body.route && load.route) {
      const existingRoute = load.route.toObject();
      await Routes.findByIdAndUpdate(
        existingRoute._id,
        {
          $set: {
            ...existingRoute,
            ...body.route,
          },
        },
        { new: true }
      );
    }

    // === Update Shipment ===
    if (body.shipment && load.shipment) {
      await Shipment.findByIdAndUpdate(
        load.shipment._id ?? load.shipment,
        {
          $set: {
            ...body.shipment,
          },
        },
        { new: true }
      );
    }

    // Update Customer
    // === Update Customer ===
    if (body.customer) {
      load.customer = body.customer;
      await load.save();
    }

    const updatedLoad = await Load.findOne({ load_id: id })
      .populate("route")
      .populate({
        path: "shipment",
        populate: [
          { path: "pickupPoint" },
          { path: "deliveryPoint" },
          { path: "stopPoint" },
        ],
      })
      .populate("carrier")
      .populate("customer");

    return NextResponse.json(updatedLoad, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  try {
    await Load.findOneAndDelete({ load_id: id });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}
