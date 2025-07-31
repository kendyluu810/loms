import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Carrier from "@/models/Carrier";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  try {
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { mcNumber: { $regex: search, $options: "i" } },
            { dotNumber: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await Carrier.countDocuments(query);

    const carriers = await Carrier.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return NextResponse.json({ carriers, total }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch carriers" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    if (body.mcNumber) {
      const exists = await Carrier.findOne({ mcNumber: body.mcNumber });
      if (exists) {
        return NextResponse.json(
          { error: "Carrier with this MC Number already exists." },
          { status: 400 }
        );
      }
    }
    const carrier = await Carrier.create(body);
    return NextResponse.json(carrier, { status: 201 });
  } catch (err) {
    console.log("Create Carrier Error:", err);
    return NextResponse.json(
      { error: "Failed to create carrier", details: err },
      { status: 500 }
    );
  }
}
