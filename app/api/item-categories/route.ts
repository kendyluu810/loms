import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ItemCategory from "@/models/load_board/ItemCategory";

/**
 * Handles HTTP GET requests for item categories.
 *
 * Connects to the database, retrieves all item categories as plain JavaScript objects,
 * and returns them as a JSON response.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing the list of item categories.
 */
export async function GET() {
  await dbConnect();
  const data = await ItemCategory.find().lean();
  return NextResponse.json(data);
}

/**
 * Handles HTTP POST requests to create a new item category.
 *
 * - Connects to the database.
 * - Parses the request body to extract the `name` of the category.
 * - Checks if an item category with the given name already exists.
 *   - If it exists, responds with a 409 Conflict status and a message.
 *   - If it does not exist, creates a new item category and returns it in the response.
 *
 * @param req - The incoming HTTP request containing the category data in JSON format.
 * @returns A JSON response with the created item category or a conflict message.
 */
export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  const exists = await ItemCategory.findOne({ name });
  if (exists) return NextResponse.json({ message: "Exists" }, { status: 409 });
  const newItem = await ItemCategory.create({ name });
  return NextResponse.json(newItem);
}

/**
 * Handles HTTP DELETE requests to remove an item category by its name.
 *
 * Connects to the database, parses the request body to extract the category name,
 * deletes the corresponding item category from the database, and returns a JSON response
 * indicating successful deletion.
 *
 * @param req - The incoming HTTP request containing the category name in the JSON body.
 * @returns A JSON response with a message confirming deletion.
 */
export async function DELETE(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  await ItemCategory.deleteOne({ name });
  return NextResponse.json({ message: "Deleted" });
}
