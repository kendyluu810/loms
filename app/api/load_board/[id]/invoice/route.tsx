import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to retrieve an invoice by load ID.
 *
 * Connects to the database, fetches the invoice associated with the provided load ID,
 * and populates the related customer and carrier information.
 * Returns the invoice data as a JSON response if found, otherwise returns a 404 error.
 * In case of any server error, responds with a 500 status and the error details.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing route parameters, specifically a Promise resolving to an object with the `id` of the load.
 * @returns A JSON response containing the invoice data, or an error message with the appropriate HTTP status code.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const invoice = await Invoice.findOne({ loadId: id })
      .populate("customerId")
      .populate("carrierId");

    if (!invoice) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(invoice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

/**
 * Handles the POST request to create a new invoice for a specific load.
 *
 * - Connects to the database.
 * - Extracts the load ID from the route parameters.
 * - Parses the request body for invoice data.
 * - Checks if an invoice already exists for the given load ID.
 *   - If it exists, returns a 400 response with an error message.
 *   - If not, creates a new invoice with the provided data and load ID.
 * - Returns the created invoice with a 201 status on success.
 * - Returns a 500 response with error details if an exception occurs.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing the route parameters, including the load ID.
 * @returns A NextResponse containing the result of the invoice creation or an error message.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const data = await req.json();

  try {
    const existing = await Invoice.findOne({ loadId: id });
    if (existing) {
      return NextResponse.json(
        { message: "Invoice already exists" },
        { status: 400 }
      );
    }

    const newInvoice = await Invoice.create({
      loadId: id,
      ...data,
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

/**
 * Handles HTTP PUT requests to update or create an invoice associated with a specific load.
 *
 * Connects to the database, extracts the load ID from the request context, and parses the request body for invoice data.
 * Attempts to find and update an existing invoice by `loadId`, or creates a new one if it does not exist (upsert).
 * Returns the updated or created invoice as a JSON response with status 200 on success.
 * Returns a JSON error response with status 500 if an error occurs during the operation.
 *
 * @param req - The incoming Next.js request object containing the invoice data in the body.
 * @param context - The context object containing route parameters, specifically the load ID as a promise.
 * @returns A Next.js JSON response with the updated/created invoice or an error message.
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;

  const data = await req.json();

  try {
    const updated = await Invoice.findOneAndUpdate(
      { loadId: id },
      { ...data },
      { new: true, upsert: true }
    );

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

/**
 * Handles the DELETE request for removing an invoice associated with a specific load.
 *
 * Connects to the database, retrieves the load ID from the request parameters,
 * and attempts to find and delete the corresponding invoice document.
 * 
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a Promise that resolves to route parameters, including the load ID.
 * @returns A JSON response indicating success or failure:
 *   - 200 with a success message and deleted invoice if found and deleted.
 *   - 404 if the invoice is not found.
 *   - 500 if an internal server error occurs.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id: loadId } = await params;
    const deleted = await Invoice.findOneAndDelete({ loadId });
    if (!deleted) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Invoice deleted", deleted });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
