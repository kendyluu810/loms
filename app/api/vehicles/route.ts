import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";

/**
 * Handles GET requests to retrieve a paginated list of vehicles from the database.
 *
 * Connects to the database, applies an optional search filter on the `truckNumber` field,
 * and supports pagination via `page` and `pageSize` query parameters.
 * Populates the `assignedDriver` field for each vehicle.
 *
 * @param req - The incoming Next.js request object containing query parameters:
 *   - `search`: (optional) A string to filter vehicles by truck number (case-insensitive).
 *   - `page`: (optional) The page number for pagination (defaults to 1).
 *   - `pageSize`: (optional) The number of vehicles per page (defaults to 10).
 * @returns A JSON response containing:
 *   - `vehicles`: The array of vehicle documents for the current page.
 *   - `total`: The total number of vehicles matching the filter.
 */
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

/**
 * Handles HTTP POST requests to create a new vehicle entry in the database.
 *
 * @param req - The incoming Next.js request object containing the vehicle data in JSON format.
 * @returns A JSON response containing the newly created vehicle object.
 *
 * @async
 * @throws Will throw an error if database connection or vehicle creation fails.
 */
export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const vehicle = await Vehicle.create(body);

  return NextResponse.json(vehicle);
}
