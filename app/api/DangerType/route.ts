import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DangerType from "@/models/load_board/DangerType";

/**
 * Handles HTTP GET requests to retrieve all danger types from the database.
 * 
 * Establishes a connection to the database, fetches all documents from the
 * `DangerType` collection, and returns the results as a JSON response.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing all danger types.
 */
export async function GET() {
  await dbConnect();
  const data = await DangerType.find().lean();
  return NextResponse.json(data);
}

/**
 * Handles HTTP POST requests to create a new DangerType entry.
 *
 * - Connects to the database.
 * - Parses the request body to extract the `name` property.
 * - Checks if a DangerType with the given name already exists.
 *   - If it exists, responds with a 409 Conflict status and a message.
 *   - If it does not exist, creates a new DangerType entry and returns it in the response.
 *
 * @param req - The incoming HTTP request object containing the DangerType data in JSON format.
 * @returns A JSON response with the created DangerType object or a conflict message.
 */
export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  const exists = await DangerType.findOne({ name });
  if (exists) return NextResponse.json({ message: "Exists" }, { status: 409 });
  const newItem = await DangerType.create({ name });
  return NextResponse.json(newItem);
}

/**
 * Handles HTTP DELETE requests to remove a DangerType document from the database.
 *
 * Connects to the database, extracts the `name` property from the request body,
 * deletes the corresponding DangerType entry, and returns a JSON response indicating success.
 *
 * @param req - The incoming HTTP request containing the JSON body with the `name` of the DangerType to delete.
 * @returns A JSON response with a success message upon successful deletion.
 */
export async function DELETE(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  await DangerType.deleteOne({ name });
  return NextResponse.json({ message: "Deleted" });
}
