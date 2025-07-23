import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import "@/models/load_board/Routes"; // Ensure Routes model is imported to populate correctly
import "@/models/load_board/Shipment"; // Ensure Shipment model is imported to populate correctly
import "@/models/Driver"; // Ensure Driver model is imported to populate correctly
import "@/models/Customers"; // Ensure Customer model is imported to populate correctly
import "@/models/Employees"; // Ensure Employee model is imported to populate correctly

export async function GET() {
  await dbConnect();
  try {
    const loads = await Load.find()
      .populate("customer")
      .populate("shipment")
      .populate("route")
      // .populate("driver");

    return NextResponse.json({ data: loads });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch loads" },
      { status: 500 }
    );
  }
}
