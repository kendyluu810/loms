import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Driver from "@/models/Driver";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id: employeeId } = await params;
  const data = await req.json();

  try {
    const existing = await Driver.findOne({ employee: employeeId });

    if (existing) {
      await Driver.updateOne({ employee: employeeId }, data);
    } else {
      await Driver.create(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[UPSERT DRIVER]", error);
    return NextResponse.json(
      { message: "Failed to upsert driver", error },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbConnect();

  try {
    const driver = await Driver.findOne({ employee: id });

    if (!driver) {
      return NextResponse.json(
        { message: "Driver not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(driver);
  } catch (error) {
    console.error("[GET DRIVER]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
