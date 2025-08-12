import { NextRequest, NextResponse } from "next/server";
import Invoice from "@/models/Invoice";
import dbConnect from "@/lib/mongodb";

/**
 * Handles the HTTP PUT request to update an existing invoice by its ID.
 *
 * This function connects to the database, retrieves the invoice by the provided ID,
 * applies the updates from the request body, recalculates all relevant totals,
 * saves the updated invoice, and returns the updated invoice as a JSON response.
 * If the invoice is not found, it returns a 404 error response.
 * If any error occurs during the process, it returns a 500 error response.
 *
 * @param req - The incoming Next.js request object containing the update data in JSON format.
 * @param params - An object containing the route parameters, specifically the invoice ID.
 * @returns A JSON response with the updated invoice, or an error message with the appropriate status code.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  try {
    const updates = await req.json();

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Update fields
    for (const key in updates) {
      invoice[key] = updates[key];
    }

    // Recalculate totals
    invoice.carrierTotal =
      Number(invoice.ratePerMile || 0) * Number(invoice.miles || 0);
    invoice.invoiceTotal =
      invoice.carrierTotal + Number(invoice.fuelSurcharge || 0);
    invoice.customerChargesTotal =
      Number(invoice.loadRate || 0) +
      Number(invoice.fuelSurchargeCustomer || 0);
    invoice.carrierChargesTotal =
      Number(invoice.carrierRate || 0) +
      Number(invoice.fuelSurchargeCarrier || 0);
    invoice.adjustedAmount = invoice.invoiceTotal - invoice.carrierTotal;
    invoice.carrierTotalPay =
      invoice.customerChargesTotal +
      invoice.carrierChargesTotal +
      invoice.adjustedAmount;
    await invoice.save();

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Invoice update error:", error);
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 500 }
    );
  }
}

/**
 * Handles the DELETE request for deleting an invoice by its ID.
 *
 * Connects to the database, retrieves the invoice ID from the request parameters,
 * and attempts to delete the corresponding invoice document from the database.
 * 
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a Promise that resolves to the route parameters, including the invoice ID.
 * @returns A JSON response indicating the result of the deletion operation:
 *   - 200 status with a success message if the invoice was deleted.
 *   - 404 status with an error message if the invoice was not found.
 *   - 500 status with an error message if an internal error occurred.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id: invoiceId } = await params;

  try {
    const deleted = await Invoice.findByIdAndDelete(invoiceId);
    if (!deleted) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE invoice error:", error);
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 }
    );
  }
}
