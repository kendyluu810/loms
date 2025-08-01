import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";

export async function GET(req: NextRequest) {
  await dbConnect();

  const search = req.nextUrl.searchParams.get("search") || "";
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") || "10");

  const filter = {
    truckNumber: { $regex: search, $options: "i" },
  };

  const total = await Vehicle.countDocuments(filter);
  const vehicles = await Vehicle.find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("assignedDriver");

  return NextResponse.json({ vehicles, total });
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const vehicle = await Vehicle.create(body);

  return NextResponse.json(vehicle);
}
