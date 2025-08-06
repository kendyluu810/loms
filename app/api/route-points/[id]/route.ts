import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import RoutePoint from "@/models/load_board/RoutePoint";
import Load from "@/models/load_board/Load";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;
  const body = await req.json();
  const { status } = body;

  try {
    // Cập nhật RoutePoint
    const point = await RoutePoint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!point) {
      return NextResponse.json(
        { error: "RoutePoint not found" },
        { status: 404 }
      );
    }

    // Nếu có loadId → đồng bộ Load
    const loadId = point.load_id?.toString(); // Đảm bảo loadId tồn tại và là string
    if (loadId) {
      if (
        point.pointType === "pickup" &&
        ["in_progress", "completed"].includes(status)
      ) {
        await Load.findByIdAndUpdate(loadId, { status: "in_progress" });
      }

      if (point.pointType === "delivery" && status === "delivered") {
        await Load.findByIdAndUpdate(loadId, { status: "delivered" });
      }
    }

    return NextResponse.json(
      { message: "RoutePoint updated", point },
      { status: 200 }
    );
  } catch (_) {
    //console.error("PATCH RoutePoint error:", error);
    return NextResponse.json(
      { error: "Failed to update RoutePoint" },
      { status: 500 }
    );
  }
}
