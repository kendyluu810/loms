import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Routes from "@/models/load_board/Routes";

/**
 * Handles HTTP PUT requests to update a route by its ID.
 *
 * Connects to the database, parses the request body for update data,
 * and updates the route document identified by the provided ID.
 * Returns the updated route as a JSON response.
 *
 * @param req - The incoming Next.js request object containing the update data.
 * @param params - An object containing a Promise that resolves to the route ID parameter.
 * @returns A JSON response containing the updated route document.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const data = await req.json();
  const updated = await Routes.findByIdAndUpdate((await params).id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

/**
 * Handles HTTP DELETE requests to remove a route by its ID.
 *
 * Connects to the database, extracts the route ID from the request parameters,
 * deletes the corresponding route document from the database, and returns the deleted document as a JSON response.
 *
 * @param _ - The incoming Next.js request object (unused).
 * @param params - An object containing a Promise that resolves to the route parameters, including the route ID.
 * @returns A JSON response containing the deleted route document.
 */
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const deleted = await Routes.findByIdAndDelete(id);
  return NextResponse.json(deleted);
}
