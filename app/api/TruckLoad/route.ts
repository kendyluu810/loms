import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TruckLoad from "@/models/load_board/TruckLoad";

/**
 * Handles HTTP GET requests to retrieve all TruckLoad records from the database.
 * 
 * Establishes a database connection, fetches all documents from the TruckLoad collection,
 * and returns the results as a JSON response.
 * 
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing all TruckLoad records.
 */
export async function GET() {
  await dbConnect();
  const data = await TruckLoad.find().lean();
  return NextResponse.json(data);
}

/**
 * Handles POST requests to create a new TruckLoad entry.
 *
 * - Connects to the database.
 * - Parses the request body to extract the `name` property.
 * - Checks if a TruckLoad with the given name already exists.
 *   - If it exists, responds with a 409 status and a message indicating existence.
 *   - If not, creates a new TruckLoad entry with the provided name and returns it in the response.
 *
 * @param req - The incoming HTTP request object.
 * @returns A JSON response indicating success or conflict.
 */
export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  const exists = await TruckLoad.findOne({ name });
  if (exists) return NextResponse.json({ message: "Exists" }, { status: 409 });
  const newItem = await TruckLoad.create({ name });
  return NextResponse.json(newItem);
}

/**
 * Handles HTTP DELETE requests to remove a TruckLoad document from the database by name.
 *
 * @param req - The incoming HTTP request containing a JSON body with the `name` of the TruckLoad to delete.
 * @returns A JSON response indicating the deletion status.
 *
 * @async
 */
export async function DELETE(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  await TruckLoad.deleteOne({ name });
  return NextResponse.json({ message: "Deleted" });
}
