import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Vehicle from "@/models/Vehicle";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();

  try {
    const newLoad = await Load.create(data);
    await Vehicle.findByIdAndUpdate(data.vehicle, { isEmpty: false });
    return NextResponse.json({ success: true, data: newLoad });
  } catch (err) {
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}
