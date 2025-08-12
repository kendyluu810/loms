import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customers from "@/models/customer/Customers";


/**
 * Handles GET requests to retrieve a customer by their ID.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a Promise that resolves to the route parameters, including the customer ID.
 * @returns A JSON response containing the customer data if found, or an error message with the appropriate HTTP status code.
 *
 * @throws Returns a 500 status code with an error message if an unexpected error occurs during database operations.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const customer = await Customers.findById(id);
    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(customer);
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Handles HTTP PUT requests to update a customer by ID.
 *
 * Connects to the database, parses the request body for update data,
 * and updates the customer document with the specified ID.
 * Returns the updated customer data if successful, or an error response
 * if the customer is not found or if an error occurs during the update process.
 *
 * @param req - The incoming Next.js request object containing the update data in JSON format.
 * @param params - An object containing the route parameters, specifically the customer ID as a Promise.
 * @returns A NextResponse object containing the updated customer data, or an error message with the appropriate HTTP status code.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const data = await req.json();
    const { id } = await params;
    const updated = await Customers.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Customer Error:", error);
    return NextResponse.json(
      { message: "Failed to update customer" },
      { status: 500 }
    );
  }
}

/**
 * Handles the DELETE request for removing a customer by ID.
 *
 * Connects to the database, attempts to find and delete a customer document
 * using the provided ID from the request parameters. Returns a JSON response
 * indicating success or failure.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a Promise that resolves to the route parameters, including the customer ID.
 * @returns A JSON response with a success message if the customer is deleted,
 *          a 404 error if the customer is not found, or a 500 error if an exception occurs.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await Customers.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("DELETE Customer Error:", error);
    return NextResponse.json(
      { message: "Failed to delete customer" },
      { status: 500 }
    );
  }
}
