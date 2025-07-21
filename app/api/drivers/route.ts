import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") === "desc" ? -1 : 1;

  const query = {
    $or: [
      { driverlicense: { $regex: search, $options: "i" } },
      { licensetype: { $regex: search, $options: "i" } },
      { vehicleType: { $regex: search, $options: "i" } },
      { vehicleNumber: { $regex: search, $options: "i" } },
    ],
  };

  const drivers = await Driver.find(query)
    .populate("employee")
    .sort({ [sort]: order })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const total = await Driver.countDocuments(query);

  return NextResponse.json({ drivers, total });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const driver = new Driver({
    employee: body.Eid,
    driverlicense: body.driverlicense,
    licensetype: body.licensetype,
    licenseexpiry: body.licenseexpiry,
    vehicleid: body.vehicleid,
    vehicleType: body.vehicleType,
    vehicleNumber: body.vehicleNumber,
  });
  await driver.save();

  return NextResponse.json(driver);
}
