import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const loads = await Load.find()
      .populate("customer")
      .populate("route")
      .populate("shipment")
      .sort({ createdAt: -1 });

    return NextResponse.json(loads, { status: 200 });
  } catch (error) {
    console.error("Error fetching loads:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const lastLoad = await Load.findOne().sort({ createdAt: -1 });
    let newLoadNumber = "LOAD0001";
    if (lastLoad && lastLoad.loadNumber) {
      const lastLoadNumber = parseInt(lastLoad.loadNumber.slice(4));
      const nextNumber = lastLoadNumber + 1;
      newLoadNumber = `LOAD${nextNumber.toString().padStart(4, "0")}`;
    }

    const newLoad = new Load({
      loadNumber: newLoadNumber,
      customer: body.customer,
      route: body.route,
      shipment: body.shipment,
      miles: body.miles,
      stop: body.stop,
      status: body.status || "Available",
    });

    await newLoad.save();
    return new Response(JSON.stringify(newLoad), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create load" },
      { status: 500 }
    );
  }
}
