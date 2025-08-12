import dbConnect from "@/lib/mongodb";
import Positions from "@/models/employees/Positions";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles HTTP GET requests to retrieve all position records from the database.
 * 
 * This function establishes a database connection, fetches all documents from the
 * `Positions` collection, and returns them as a JSON response.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing all positions.
 */
export async function GET() {
  await dbConnect();
  const positions = await Positions.find();
  return NextResponse.json(positions);
}

/**
 * Handles HTTP POST requests to create a new position.
 *
 * - Connects to the database.
 * - Parses the request body for position data.
 * - Checks if a position with the same name already exists.
 *   - If it exists, responds with a 400 status and an error message.
 * - If not, creates and saves a new position document.
 * - Returns the created position as a JSON response.
 *
 * @param req - The incoming Next.js request object containing position data in JSON format.
 * @returns A JSON response with the created position or an error message if the position already exists.
 */
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const exist = await Positions.findOne({ name: body.name });
  if (exist)
    return NextResponse.json(
      { message: "Position already exists" },
      { status: 400 }
    );
  const position = new Positions(body);
  await position.save();
  return NextResponse.json(position);
}
