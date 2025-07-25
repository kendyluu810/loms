import dbConnect from "@/lib/mongodb";
import Positions from "@/models/employees/Positions";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  await dbConnect();
  const positions = await Positions.find();
  return NextResponse.json(positions);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const exist = await Positions.findOne({ name: body.name });
  if (exist)
    return NextResponse.json(
      { message: "Position already exists" },
      { status: 400 }
    );
  const position = new Positions(body);
  await position.save();
  return NextResponse.json(position);
}
