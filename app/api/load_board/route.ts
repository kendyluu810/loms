import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

import Load from "@/models/load_board/Load";
import Route from "@/models/load_board/Routes";
import Shipment from "@/models/load_board/Shipment";
import "@/models/Customers";

function generateLoadNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 900 + 100);
  return `LOAD-${date}-${random}`;
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    const { loadNumber, customer, route, shipment, miles, stop, status } = body;

    // Convert time strings (e.g., "14:00") into Date format using a base date
    const parseTime = (timeStr: string): Date => {
      return new Date(`2025-01-01T${timeStr}:00Z`);
    };

    // Create Route document
    const newRoute = await Route.create({
      ...route,
      shipperSchedule: parseTime(route.shipperSchedule),
      receiverSchedule: parseTime(route.receiverSchedule),
      warehouseSchedule: parseTime(route.warehouseSchedule),
      pickupTime: parseTime(route.pickupTime),
      deliveryTime: parseTime(route.deliveryTime),
      time: parseTime(route.time),
      pickupDate: new Date(route.pickupDate),
      deliveryDate: new Date(route.deliveryDate),
      date: new Date(route.date),
    });

    // Create Shipment document
    const newShipment = await Shipment.create({
      ...shipment,
    });

    // Create Load with references to route and shipment
    const newLoad = await Load.create({
      loadNumber: loadNumber || generateLoadNumber(),
      customer: body.customer, // must be valid ObjectId
      route: newRoute._id,
      shipment: newShipment._id,
      miles,
      stop,
      status,
    });

    return NextResponse.json(newLoad, { status: 201 });
  } catch (error: any) {
    console.error("Create load error:", error);
    return NextResponse.json(
      {
        error: "Failed to create load",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const loads = await Load.find()
      .populate("customer")
      .populate("route")
      .populate("shipment")
      .sort({ createdAt: -1 }); // sắp xếp mới nhất trước

    return NextResponse.json(loads, { status: 200 });
  } catch (error: any) {
    console.error("Fetch load error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
