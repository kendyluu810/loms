import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Route from "@/models/load_board/Routes";
import Shipment from "@/models/load_board/Shipment";
import Customer from "@/models/customer/Customers";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate if route, shipment, and customer exist
    const { route, shipment, customer: customerId,status } = body;

    const [foundRoute, foundShipment, foundCustomer] = await Promise.all([
      Route.findById(route),
      Shipment.findById(shipment),
      Customer.findById(customerId),
    ]);

    const newLoad = await Load.create({
      route: foundRoute._id,
      shipment: foundShipment._id,
      customer: foundCustomer._id,
      status: status || "posted",
    });

    return NextResponse.json(newLoad, { status: 201 });
  } catch (error: any) {
    console.error("Create Load error:", error);
    return NextResponse.json(
      { message: "Failed to create Load", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const filter: any = {};
    if (search) {
      filter.load_id = { $regex: search, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }

    const loads = await Load.find(filter)
      .populate("route")
      .populate("shipment")
      .populate("customer")
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Load.countDocuments(filter);

    return NextResponse.json({ data: loads, total, page }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch loads", details: error },
      { status: 500 }
    );
  }
}
