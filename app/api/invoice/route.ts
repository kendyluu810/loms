import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import Load from "@/models/load_board/Load";
import { NextRequest, NextResponse } from "next/server";


/**
 * Handles GET requests to fetch invoices from the database.
 *
 * Connects to the database, retrieves invoices based on the optional `load_id`
 * query parameter, and populates the `carrier` and `customer` fields.
 * Returns the list of invoices as a JSON response.
 *
 * @param req - The incoming Next.js request object.
 * @returns A JSON response containing the invoices or an error message with status 500.
 */
export async function GET(req: NextRequest) {
  await dbConnect();
  const loadId = req.nextUrl.searchParams.get("load_id");

  try {
    const query = loadId ? { loadId } : {};
    const invoices = await Invoice.find(query).populate("carrier customer");
    return NextResponse.json(invoices);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}


/**
 * Handles the creation of a new invoice associated with a specific load.
 *
 * This POST handler performs the following steps:
 * 1. Connects to the database.
 * 2. Parses the request body to extract invoice and load information.
 * 3. Finds the corresponding Load document by its `load_id` from the request body.
 *    - Returns a 404 error if the load is not found.
 * 4. Prepares the invoice data, linking it to the found Load, customer, and carrier.
 * 5. Creates a new Invoice document in the database.
 * 6. Updates the Load document to reference the newly created Invoice.
 * 7. Returns the created Invoice as a JSON response with status 201.
 * 
 * If any error occurs during the process, logs the error and returns a 500 error response.
 *
 * @param req - The Next.js API request object containing invoice and load data in JSON format.
 * @returns A NextResponse containing the created invoice or an error message.
 */
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  try {
    // 1. Find Load by load_id string (e.g., "LOAD202507301142")
    const load = await Load.findOne({ load_id: body.loadId });
    if (!load) {
      return NextResponse.json(
        { error: "Load not found with load_id: " + body.loadId },
        { status: 404 }
      );
    }

    // 2. Prepare Invoice data
    const invoiceData = {
      ...body,
      loadId: load._id,
      customerId: load.customer,
      carrierId: load.carrier,
    };

    // 3. Create new invoice
    const invoice = await Invoice.create(invoiceData);

    // 4. Attach invoice to Load
    await Load.findByIdAndUpdate(load._id, { invoice: invoice._id });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
