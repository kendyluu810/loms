import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/customer/Customers";

// CREATE
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    //console.log("Creating customer:", body);

    const newCustomer = new Customer(body);
    await newCustomer.save();

    return NextResponse.json(
      { message: "Customer created", customer: newCustomer },
      { status: 201 }
    );
  } catch (error) {
    //console.error("POST /api/customers error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET ALL or SEARCH
export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const query = search
    ? {
        $or: [
          { companyName: { $regex: search, $options: "i" } },
          { companyEmail: { $regex: search, $options: "i" } },
          { contactPerson: { $regex: search, $options: "i" } },
          { contactEmail: { $regex: search, $options: "i" } },
          { cusID: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const customers = await Customer.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 });

  const total = await Customer.countDocuments(query);

  return NextResponse.json({ customers, total });
}
