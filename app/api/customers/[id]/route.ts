import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customers from "@/models/customer/Customers";

//Get by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const customer = await Customers.findById(params.id);
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

// Update Customer
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await req.json();
    const updated = await Customers.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (_) {
    //console.error("PUT Customer Error:", error);
    return NextResponse.json(
      { message: "Failed to update customer" },
      { status: 500 }
    );
  }
}

//  Delete Customer
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deleted = await Customers.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (_) {
    //console.error("DELETE Customer Error:", error);
    return NextResponse.json(
      { message: "Failed to delete customer" },
      { status: 500 }
    );
  }
}
