import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Route from "@/models/load_board/Routes";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("Creating route:", body);

    const newRoute = new Route(body);
    await newRoute.save();

    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    console.error("POST /api/route error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
