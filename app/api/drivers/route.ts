import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";
import { PipelineStage } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to retrieve a paginated, searchable, and sortable list of drivers.
 *
 * This function connects to the database, parses query parameters from the request URL
 * (including search, pagination, and sorting options), and performs an aggregation pipeline
 * to fetch driver records joined with their corresponding employee data. It supports searching
 * across driver license, license type, and employee fields (name, email, phone).
 *
 * The response includes the list of drivers for the current page and the total count of matching records.
 *
 * @param req - The incoming Next.js request object.
 * @returns A JSON response containing the paginated list of drivers and the total count.
 */
export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") === "desc" ? -1 : 1;

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: "employees", // collection name
        localField: "employee",
        foreignField: "_id",
        as: "employee",
      },
    },
    { $unwind: "$employee" },
    {
      $match: {
        $or: [
          { driverlicense: { $regex: search, $options: "i" } },
          { licensetype: { $regex: search, $options: "i" } },
          { "employee.name": { $regex: search, $options: "i" } },
          { "employee.email": { $regex: search, $options: "i" } },
          { "employee.phone": { $regex: search, $options: "i" } },
        ],
      },
    },
    {
      $sort: { [sort]: order },
    },
    { $skip: (page - 1) * pageSize },
    { $limit: pageSize },
  ];

  const drivers = await Driver.aggregate(pipeline);
  const totalCount = await Driver.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "employee",
        foreignField: "_id",
        as: "employee",
      },
    },
    { $unwind: "$employee" },
    {
      $match: {
        $or: [
          { driverlicense: { $regex: search, $options: "i" } },
          { licensetype: { $regex: search, $options: "i" } },
          { "employee.name": { $regex: search, $options: "i" } },
          { "employee.email": { $regex: search, $options: "i" } },
          { "employee.phone": { $regex: search, $options: "i" } },
        ],
      },
    },
    { $count: "total" },
  ]);

  const total = totalCount[0]?.total || 0;

  return NextResponse.json({ drivers, total });
}

/**
 * Handles POST requests to create a new driver entry in the database.
 *
 * @param req - The incoming Next.js request object containing driver data in JSON format.
 * @returns A JSON response with the created driver object or an error message if required fields are missing.
 *
 * The function expects the request body to include at least the `employee` field.
 * If the `employee` field is missing, it responds with a 400 status and an error message.
 * Otherwise, it creates a new `Driver` document with the provided data and saves it to the database.
 */
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  
  if (!body.employee) {
    return NextResponse.json(
      { error: "Missing required field: employee" },
      { status: 400 }
    );
  }

  const driver = new Driver({
    employee: body.employee,
    driverlicense: body.driverlicense,
    licensetype: body.licensetype,
    licenseexpiry: body.licenseexpiry,
  });
  await driver.save();

  return NextResponse.json(driver);
}
