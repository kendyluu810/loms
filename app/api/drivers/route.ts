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

    const pipeline: any[] = [
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
  const total = await Driver.aggregate([
    ...pipeline.slice(0, 3),
    { $count: "total" },
  ]);

  return NextResponse.json({
    drivers,
    total: total[0]?.total || 0,
  });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const driver = new Driver({
    employee: body.Eid,
    driverlicense: body.driverlicense,
    licensetype: body.licensetype,
    licenseexpiry: body.licenseexpiry,
  });
  await driver.save();

  return NextResponse.json(driver);
}
