import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";


/**
 * Handles GET requests to retrieve a driver by the associated employee ID.
 *
 * Connects to the database, extracts the `employeeId` from the request parameters,
 * and searches for a driver document linked to that employee. If a driver is found,
 * returns the driver data as a JSON response. If not found, returns a 404 error response.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a promise that resolves to the route parameters, including `employeeId`.
 * @returns A JSON response with the driver data or an error message if not found.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  await dbConnect();
  const { employeeId } = await params;
  const driver = await Driver.findOne({ employee: employeeId });
  if (!driver) {
    return NextResponse.json({ error: "Driver not found" }, { status: 404 });
  }
  return NextResponse.json(driver);
}


/**
 * Handles the DELETE request to remove a driver associated with a specific employee.
 *
 * Connects to the database, retrieves the `employeeId` from the request parameters,
 * and deletes the driver document linked to the given employee. Returns a JSON response
 * indicating successful deletion.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a promise that resolves to the route parameters, including `employeeId`.
 * @returns A JSON response with a success message upon deletion.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  await dbConnect();
  const { employeeId } = await params;
  await Driver.findOneAndDelete({ employee: employeeId });
  return NextResponse.json({ message: "Driver deleted" });
}

/**
 * Handles HTTP PUT requests to update a driver's information by employee ID.
 *
 * Connects to the database, parses the request body for update data, and updates
 * the driver document associated with the specified employee ID. Returns the updated
 * driver document as a JSON response.
 *
 * @param req - The incoming Next.js request object containing the update data in JSON format.
 * @param params - An object containing the `employeeId` parameter extracted from the route.
 * @returns A JSON response containing the updated driver document.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  await dbConnect();
  const data = await req.json();
  const { employeeId } = await params;

  const updated = await Driver.findOneAndUpdate(
    { employee: employeeId },
    data,
    { new: true }
  );

  return NextResponse.json(updated);
}
