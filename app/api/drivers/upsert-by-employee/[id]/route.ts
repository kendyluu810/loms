import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";

/**
 * Handles HTTP POST requests to upsert a driver document by employee ID.
 *
 * Connects to the database, then checks if a driver associated with the given employee ID exists.
 * - If the driver exists, updates the existing driver document with the provided data.
 * - If the driver does not exist, creates a new driver document with the provided data.
 *
 * @param req - The incoming Next.js request object containing the driver data in JSON format.
 * @param params - An object containing the route parameters, specifically the employee ID as a promise.
 * @returns A JSON response indicating success, or an error response with status 500 if the operation fails.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id: employeeId } = await params;
  const data = await req.json();

  try {
    const existing = await Driver.findOne({ employee: employeeId });

    if (existing) {
      await Driver.updateOne({ employee: employeeId }, data);
    } else {
      await Driver.create(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[UPSERT DRIVER]", error);
    return NextResponse.json(
      { message: "Failed to upsert driver", error },
      { status: 500 }
    );
  }
}

/**
 * Handles GET requests to retrieve a driver by the associated employee ID.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing route parameters, specifically a Promise resolving to an object with the employee `id`.
 * @returns A JSON response containing the driver data if found, or an error message with the appropriate HTTP status code.
 *
 * @remarks
 * - Connects to the database before querying.
 * - Searches for a driver document where the `employee` field matches the provided `id`.
 * - Returns a 404 status if the driver is not found.
 * - Returns a 500 status in case of server or database errors.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbConnect();

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
    console.error("[GET DRIVER]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
