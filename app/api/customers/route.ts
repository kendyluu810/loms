import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/customer/Customers";

/**
 * Handles HTTP POST requests to create a new customer.
 *
 * This function connects to the database, parses the request body to create a new
 * customer document, saves it, and returns a JSON response with the created customer.
 * If an error occurs during the process, it logs the error and returns a 500 Internal Server Error response.
 *
 * @param req - The incoming Next.js request object containing the customer data in JSON format.
 * @returns A Next.js JSON response with a success message and the created customer on success,
 * or an error message with status 500 on failure.
 */
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
    console.error("POST /api/customers error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Handles GET requests to retrieve a paginated and searchable list of customers.
 *
 * Connects to the database, parses query parameters for search, page, and pageSize,
 * constructs a MongoDB query to filter customers by company name, company email,
 * contact person, contact email, or customer ID using a case-insensitive search.
 * Returns a paginated list of customers sorted by creation date (descending)
 * along with the total count of matching documents.
 *
 * @param req - The incoming Next.js request object.
 * @returns A JSON response containing the array of customers and the total count.
 */
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
