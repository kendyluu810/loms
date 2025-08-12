import dbConnect from "@/lib/mongodb";
import CustomerType from "@/models/customer/CustomerType";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles HTTP GET requests to retrieve all customer types from the database.
 *
 * Connects to the database, fetches all records from the `CustomerType` collection,
 * and returns them as a JSON response.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing the list of customer types.
 */
export async function GET() {
  await dbConnect();
  const customerTypes = await CustomerType.find();
  return NextResponse.json(customerTypes);
}

/**
 * Handles HTTP POST requests to create a new customer type.
 *
 * - Connects to the database.
 * - Parses the request body for customer type data.
 * - Checks if a customer type with the same name already exists.
 *   - If it exists, responds with a 400 status and an error message.
 * - If not, creates and saves a new customer type document.
 * - Returns the created customer type as a JSON response.
 *
 * @param req - The incoming Next.js request object.
 * @returns A JSON response containing the created customer type or an error message.
 */
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const exist = await CustomerType.findOne({ name: body.name });
  if (exist)
    return NextResponse.json(
      { message: "Customer type already exists" },
      { status: 400 }
    );
  const customerType = new CustomerType(body);
  await customerType.save();
  return NextResponse.json(customerType);
}
