import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import mongoose from "mongoose"; // Add this import

/**
 * Handles GET requests to retrieve a vehicle by its ID from the database.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing the route parameters, with `id` as a Promise.
 * @returns A JSON response containing the vehicle data if found, or an error message with the appropriate HTTP status code.
 *
 * @remarks
 * - Connects to the database before querying.
 * - Populates the `assignedDriver` field of the vehicle document.
 * - Returns a 404 status if the vehicle is not found.
 * - Returns a 500 status if a server error occurs.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const vehicle = await Vehicle.findById(id).populate("assignedDriver");
    if (!vehicle) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("[GET VEHICLE]", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

/**
 * Handles HTTP PUT requests to update a vehicle resource by its ID or truck number.
 *
 * This function connects to the database, parses the request body, and attempts to update
 * a vehicle document in the database. The vehicle can be identified either by a valid MongoDB
 * ObjectId (`id`) or by its `truckNumber` if the `id` is not a valid ObjectId.
 *
 * @param req - The incoming Next.js request object containing the update data in JSON format.
 * @param params - An object containing the route parameters, specifically the vehicle `id`.
 * @returns A JSON response with the updated vehicle document if successful, a 404 error if the vehicle is not found,
 *          or a 500 error if an exception occurs during the update process.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = mongoose.Types.ObjectId.isValid(id)
      ? await Vehicle.findByIdAndUpdate(id, body, { new: true })
      : await Vehicle.findOneAndUpdate({ truckNumber: id }, body, {
          new: true,
        });

    if (!updated) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[UPDATE VEHICLE]", error);
    return NextResponse.json(
      { message: "Failed to update vehicle", error },
      { status: 500 }
    );
  }
}

/**
 * Handles the DELETE HTTP request for deleting a vehicle by its ID.
 *
 * Connects to the database, retrieves the vehicle ID from the request parameters,
 * deletes the corresponding vehicle document, and returns a JSON response indicating
 * the result of the operation.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a Promise that resolves to the route parameters, including the vehicle ID.
 * @returns A JSON response indicating success or failure of the deletion operation.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    await Vehicle.findByIdAndDelete(id);
    return NextResponse.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete vehicle", error },
      { status: 500 }
    );
  }
}
