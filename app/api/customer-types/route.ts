import dbConnect from "@/lib/mongodb";
import CustomerType from "@/models/customer/CustomerType";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const customerTypes = await CustomerType.find();
  return NextResponse.json(customerTypes);
}

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
