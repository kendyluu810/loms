import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Shipment from "@/models/load_board/Shipment";

/**
 * Handles HTTP PUT requests to update a shipment by its ID.
 *
 * Connects to the database, parses the request body for update data,
 * and updates the shipment document with the specified ID using the provided data.
 * Returns the updated shipment as a JSON response.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing the shipment ID as a promise.
 * @returns A JSON response containing the updated shipment document.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const data = await req.json();
  const updated = await Shipment.findByIdAndUpdate((await params).id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

/**
 * Handles the DELETE HTTP request for deleting a shipment by its ID.
 *
 * Connects to the database, extracts the shipment ID from the request parameters,
 * deletes the corresponding shipment document from the database, and returns the deleted
 * shipment as a JSON response.
 *
 * @param _ - The incoming Next.js request object (unused).
 * @param params - An object containing a Promise that resolves to the route parameters, including the shipment ID.
 * @returns A JSON response containing the deleted shipment document.
 */
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const deleted = await Shipment.findByIdAndDelete(id);
  return NextResponse.json(deleted);
}
