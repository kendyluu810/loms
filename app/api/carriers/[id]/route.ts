import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Carrier from "@/models/Carrier";

/**
 * Handles GET requests to retrieve a carrier by its ID, including its associated customer.
 *
 * @param _ - The incoming Next.js request object (unused).
 * @param params - An object containing a Promise that resolves to the route parameters, including the carrier ID.
 * @returns A JSON response with the carrier data and status 200 if found, or an error message with appropriate status code if not found or on failure.
 *
 * @async
 */
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const carrier = await Carrier.findById(id).populate("customer");
    if (!carrier)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(carrier, { status: 200 });
  } catch (error) {
    console.error("GET carrier error:", error);
    return NextResponse.json(
      { error: "Failed to fetch carrier" },
      { status: 500 }
    );
  }
}

/**
 * Handles HTTP PUT requests to update a carrier by its ID.
 *
 * @param req - The incoming Next.js request object containing the update data in JSON format.
 * @param params - An object containing the route parameters, specifically the carrier's `id`.
 * @returns A JSON response with the updated carrier object and a 200 status code if successful,
 *          a 404 status code if the carrier is not found, or a 500 status code if an error occurs.
 *
 * @async
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const body = await req.json();
  const { id } = await params;

  try {
    const updated = await Carrier.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT carrier error:", error);
    return NextResponse.json(
      { error: "Failed to update carrier" },
      { status: 500 }
    );
  }
}

/**
 * Handles the DELETE request for removing a carrier by its ID.
 *
 * Connects to the database, retrieves the carrier ID from the route parameters,
 * deletes the corresponding carrier document, and returns a JSON response indicating
 * the result of the operation.
 *
 * @param _ - The incoming Next.js request object (unused).
 * @param params - An object containing a Promise that resolves to the route parameters, including the carrier ID.
 * @returns A JSON response with a success message and status 200 if deletion is successful,
 *          or an error message and status 500 if an error occurs.
 */
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    await Carrier.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE carrier error:", error);
    return NextResponse.json(
      { error: "Failed to delete carrier" },
      { status: 500 }
    );
  }
}
