import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Employees from "@/models/employees/Employees";
import Driver from "@/models/Driver";
import { Employee } from "@/type";

/**
 * Handles GET requests to retrieve an employee by ID.
 * 
 * Connects to the database, fetches the employee document by the provided ID,
 * and returns the employee data as a JSON response. If the employee is not found,
 * responds with a 404 error. If the employee's position is "Driver", also fetches
 * and includes additional driver information in the response.
 * 
 * @param req - The incoming Next.js request object.
 * @param params - An object containing the route parameters, with `id` as a string.
 * @returns A JSON response with the employee data, optionally including driver info,
 *          or an error message if the employee is not found.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const employee = await Employees.findById(id).lean<Employee>();

  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  // Nếu là driver, lấy thêm driver info
  if (employee.position === "Driver") {
    const driver = await Driver.findOne({ employee: employee._id }).lean();
    return NextResponse.json({ ...employee, driverInfo: driver || null });
  }

  return NextResponse.json(employee);
}

/**
 * Handles updating an employee record by ID.
 *
 * This function connects to the database, retrieves the employee by the given ID,
 * updates the employee with the provided request body, and manages related driver records.
 * If the employee's position changes from "Driver" to another role, the associated driver record is deleted.
 * If the position is set to "Driver" and driver information is provided, the driver record is upserted.
 *
 * @param req - The incoming Next.js request object containing the update data.
 * @param params - An object containing the employee ID as a promise.
 * @returns A JSON response with the updated employee record.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();

  const prevEmployee = await Employees.findById(id);
  const updated = await Employees.findByIdAndUpdate(id, body, { new: true });

  const wasDriver = prevEmployee.position === "Driver";
  const isDriver = body.position === "Driver";

  if (wasDriver && !isDriver) {
    await Driver.findOneAndDelete({ employee: id });
  } else if (isDriver && body.driverInfo) {
    await Driver.findOneAndUpdate(
      { employee: id },
      { employee: id, ...body.driverInfo },
      { upsert: true, new: true }
    );
  }
  return NextResponse.json(updated);
}

/**
 * Handles the DELETE HTTP request for removing an employee and their associated driver record.
 *
 * Connects to the database, deletes the employee by the provided `id`, and also deletes
 * the corresponding driver document linked to that employee. Returns a JSON response
 * indicating successful deletion.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing a promise that resolves to route parameters, including the employee `id`.
 * @returns A JSON response with a success message upon deletion.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  await Employees.findByIdAndDelete(id);
  await Driver.findOneAndDelete({ employee: id });
  return NextResponse.json({ message: "Deleted" });
}
