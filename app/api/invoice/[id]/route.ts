import { NextRequest, NextResponse } from "next/server";
import Invoice from "@/models/Invoice";
import dbConnect from "@/lib/mongodb";

// Cập nhật 1 invoice theo _id
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
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

// Xóa invoice
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const invoiceId = context.params.id;

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
