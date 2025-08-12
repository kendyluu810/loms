import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import "@/models/employees/Employees";
import "@/models/load_board/Routes";
import "@/models/load_board/Shipment";
import "@/models/customer/Customers";
import "@/models/Carrier";
import "@/models/Invoice";
import "@/models/Vehicle";
import "@/models/Driver";

/**
 * Handles GET requests to fetch all load records with related entities populated.
 *
 * Connects to the database, retrieves all loads, and populates related fields such as route, shipment,
 * customer, carrier, driver (with nested employee), dispatcher, vehicle, and invoice. The results are
 * sorted by creation date in descending order (most recent first).
 *
 * @returns {Promise<NextResponse>} A JSON response containing the list of loads and a success flag,
 * or an error message with a 500 status code if the operation fails.
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const loads = await Load.find()
      .populate("route")
      .populate("shipment")
      .populate("customer")
      .populate("carrier")
      .populate({
        path: "driver",
        populate: {
          path: "employee",
          model: "Employee",
        },
      })
      .populate("dispatcher")
      .populate("vehicle")
      .populate("invoice")
      .sort({ createdAt: -1 }); // Sort by creation date, most recent first
    // //console.log("First load customer:", loads[0]?.customer);

    return NextResponse.json({ success: true, data: loads }, { status: 200 });
  } catch (error) {
    console.error("Error in tracking route:", error); 
    return NextResponse.json(
      { success: false, message: "Failed to fetch tracking data" },
      { status: 500 }
    );
  }
}
