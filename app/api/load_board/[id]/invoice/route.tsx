import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { NextRequest, NextResponse } from "next/server";

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
