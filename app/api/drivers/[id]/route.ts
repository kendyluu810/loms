import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the HTTP PUT request to update a driver's information by ID.
 *
 * Connects to the database, parses the request body, and updates the specified driver's
 * employee, driver license, license type, and license expiry fields. The updated driver
 * document is populated with the related employee data and returned as a JSON response.
 *
 * @param req - The incoming Next.js request object containing the update data in JSON format.
 * @param params - An object containing the route parameters, specifically the driver's ID as a promise.
 * @returns A JSON response containing the updated driver document with populated employee information.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();

  const updated = await Driver.findByIdAndUpdate(
    id,
    {
      employee: body.Eid,
      driverlicense: body.driverlicense,
      licensetype: body.licensetype,
      licenseexpiry: body.licenseexpiry,
    },
    { new: true }
  ).populate("employee");

  return NextResponse.json(updated);
}

/**
 * Handles HTTP DELETE requests to remove a driver by ID.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a promise that resolves to route parameters, including the driver's `id`.
 * @returns A JSON response indicating successful deletion.
 *
 * @async
 * @throws Will throw an error if the database connection fails or the deletion operation encounters an issue.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  await Driver.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
