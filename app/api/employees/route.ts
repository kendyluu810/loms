import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Employees from "@/models/employees/Employees";
import Driver from "@/models/Driver";

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
