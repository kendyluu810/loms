import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Employees from "@/models/employees/Employees";
import Driver from "@/models/Driver";

/**
 * Handles GET requests to retrieve a paginated, searchable, and sortable list of employees.
 *
 * Connects to the database, parses query parameters for search, pagination, sorting, and filtering by position.
 * Constructs a MongoDB query based on the provided parameters, fetches the matching employees,
 * and returns the results along with the total count.
 *
 * @param req - The incoming Next.js request object containing query parameters:
 *   - `search`: (optional) Search term to filter employees by Eid, name, email, phone, or position.
 *   - `page`: (optional) Page number for pagination (default: 1).
 *   - `pageSize`: (optional) Number of employees per page (default: 10).
 *   - `sort`: (optional) Field to sort by (default: "createdAt").
 *   - `order`: (optional) Sort order, either "asc" or "desc" (default: "asc").
 *   - `position`: (optional) Filter employees by position.
 * @returns A JSON response containing:
 *   - `data`: Array of employee objects matching the query.
 *   - `total`: Total number of employees matching the query.
 */
export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") === "desc" ? -1 : 1;
  const position = searchParams.get("position");

  const searchFilter = {
    $or: [
      { Eid: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ],
  };

  const positionFilter = position ? { position } : {};

  const query = position
    ? { $and: [positionFilter, searchFilter] }
    : searchFilter;

  const employees = await Employees.find(query)
    .sort({ [sort]: order })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean();

  const total = await Employees.countDocuments(query);

  return NextResponse.json({ data: employees, total });
}

/**
 * Handles the creation of a new employee record via a POST request.
 *
 * - Connects to the database.
 * - Parses the request body for employee data.
 * - Generates a unique employee ID (`Eid`) by incrementing the last used ID.
 * - Creates and saves a new employee document with the generated `Eid`.
 * - If the new employee's position is "Driver" and driver information is provided,
 *   creates a corresponding driver record linked to the employee.
 * - Returns the created employee as a JSON response.
 *
 * @param req - The incoming Next.js request object containing employee data in JSON format.
 * @returns A JSON response containing the newly created employee document.
 */
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  const lastEmployees = await Employees.findOne().sort({ createdAt: -1 });
  let newEid = "EID0001";
  if (lastEmployees && lastEmployees.Eid) {
    const lastNumber = parseInt(lastEmployees.Eid.slice(3));
    const nextNumber = lastNumber + 1;
    newEid = `EID${nextNumber.toString().padStart(3, "0")}`;
  }

  const employee = new Employees({ ...body, Eid: newEid });
  await employee.save();

  if (body.position == "Driver" && body.driverInfo) {
    await Driver.create({
      employee: employee._id,
      ...body.driverInfo,
    });
  }

  return NextResponse.json(employee);
}
