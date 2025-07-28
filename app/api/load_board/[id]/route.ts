import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import "@/models/load_board/Routes";
import "@/models/load_board/Shipment";
import "@/models/customer/Customers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await dbConnect();
  try {
    const load = await Load.findOne({ load_id: id })
      .populate("route")
      .populate("shipment")
      .populate("customer");
    if (!load) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(load);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const data = await req.json();

    const load = await Load.findById(params.id);

    if (!load) {
      return NextResponse.json({ message: "Load not found" }, { status: 404 });
    }

    // Cập nhật Route
    if (data.route) {
      await Load.populate(load, { path: "route" });
      if (load.route && typeof load.route === "object" && "_id" in load.route) {
        await load.route.set(data.route).save();
      }
    }

    // Cập nhật Shipment
    if (data.shipment) {
      await Load.populate(load, { path: "shipment" });
      if (
        load.shipment &&
        typeof load.shipment === "object" &&
        "_id" in load.shipment
      ) {
        await load.shipment.set(data.shipment).save();
      }
    }

    // Cập nhật Customer
    if (data.customer) {
      await Load.populate(load, { path: "customer" });
      if (
        load.customer &&
        typeof load.customer === "object" &&
        "_id" in load.customer
      ) {
        await load.customer.set(data.customer).save();
      }
    }

    // Cập nhật các trường còn lại trong Load
    await load.set(data).save();

    // Populate lại trước khi trả về
    const updatedLoad = await Load.findById(params.id)
      .populate("route")
      .populate("shipment")
      .populate("customer");

    return NextResponse.json(updatedLoad);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await Load.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}
