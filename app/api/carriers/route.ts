import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Carrier from "@/models/Carrier";

/**
 * Handles GET requests to fetch a paginated list of carriers from the database.
 *
 * Connects to the database, parses query parameters for search, page, and pageSize,
 * and retrieves carriers matching the search criteria. Supports searching by name,
 * email, phone, MC number, or DOT number using case-insensitive partial matches.
 * Returns the list of carriers and the total count in a JSON response.
 *
 * @param req - The incoming Next.js request object.
 * @returns A JSON response containing the array of carriers and the total count,
 *          or an error message with status 500 if the operation fails.
 */
export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  try {
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { mcNumber: { $regex: search, $options: "i" } },
            { dotNumber: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await Carrier.countDocuments(query);

    const carriers = await Carrier.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return NextResponse.json({ carriers, total }, { status: 200 });
  } catch (error) {
    console.error("GET carriers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch carriers" },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to create a new carrier in the database.
 *
 * - Connects to the database.
 * - Parses the request body for carrier data.
 * - Checks if a carrier with the provided `mcNumber` already exists.
 *   - If it exists, returns a 400 error response.
 * - If not, creates a new carrier document with the provided data.
 * - Returns the created carrier with a 201 status on success.
 * - Returns a 500 error response if an error occurs during the process.
 *
 * @param req - The incoming Next.js request object containing carrier data in JSON format.
 * @returns A Next.js response object with the created carrier or an error message.
 */
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    if (body.mcNumber) {
      const exists = await Carrier.findOne({ mcNumber: body.mcNumber });
      if (exists) {
        return NextResponse.json(
          { error: "Carrier with this MC Number already exists." },
          { status: 400 }
        );
      }
    }
    const carrier = await Carrier.create(body);
    return NextResponse.json(carrier, { status: 201 });
  } catch (err) {
    //console.log("Create Carrier Error:", err);
    return NextResponse.json(
      { error: "Failed to create carrier", details: err },
      { status: 500 }
    );
  }
}
