import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import EquipmentType from "@/models/load_board/EquipmentType";

/**
 * Handles GET requests to retrieve all equipment types from the database.
 * 
 * Establishes a connection to the database, fetches all documents from the
 * EquipmentType collection, and returns the results as a JSON response.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing the equipment types.
 */
export async function GET() {
  await dbConnect();
  const data = await EquipmentType.find().lean();
  return NextResponse.json(data);
}

/**
 * Handles HTTP POST requests to create a new equipment type.
 *
 * - Connects to the database.
 * - Parses the request body to extract the `name` of the equipment type.
 * - Checks if an equipment type with the given name already exists.
 *   - If it exists, responds with a 409 Conflict status and a message.
 *   - If it does not exist, creates a new equipment type and returns it in the response.
 *
 * @param req - The incoming HTTP request object.
 * @returns A JSON response containing the created equipment type or an error message.
 */
export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  const exists = await EquipmentType.findOne({ name });
  if (exists) return NextResponse.json({ message: "Exists" }, { status: 409 });
  const newItem = await EquipmentType.create({ name });
  return NextResponse.json(newItem);
}

/**
 * Handles DELETE requests to remove an equipment type by its name.
 *
 * Connects to the database, parses the request body to extract the equipment type name,
 * deletes the corresponding equipment type document from the database, and returns a JSON response
 * indicating successful deletion.
 *
 * @param req - The incoming HTTP request containing the equipment type name in the JSON body.
 * @returns A JSON response with a message confirming deletion.
 */
export async function DELETE(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  await EquipmentType.deleteOne({ name });
  return NextResponse.json({ message: "Deleted" });
}
