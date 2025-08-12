import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to fetch a driver by the associated employee ID.
 *
 * Connects to the database, retrieves the driver document whose `employee` field matches
 * the provided `id` parameter, and returns the driver data as a JSON response.
 * If no driver is found, responds with a 404 status and an error message.
 * Handles and logs any internal errors, responding with a 500 status if necessary.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing the route parameters, with `id` representing the employee ID.
 * @returns A JSON response containing the driver data, or an error message with the appropriate HTTP status code.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const driver = await Driver.findOne({ employee: id });

    if (!driver) {
      return NextResponse.json(
        { message: "Driver not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(driver);
  } catch (error) {
    console.error("Error fetching driver by employee ID:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
