// app/api/load_board/tracking/[loadId]/route.ts
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { loadId: string } }
) {
  await dbConnect();

  const { loadId } = params;

  // 1. Tìm Load theo load_id
  const load = await Load.findOne({ load_id: loadId })
    .populate({
      path: "shipment",
      select: "pickupLocation deliveryLocation pickupDate deliveryDate",
    })
    .populate({
      path: "customer",
      select: "name phone email",
    });

  if (!load) {
    return NextResponse.json(
      { success: false, message: "No tracking data found" },
      { status: 404 }
    );
  }

  // 2. Trả về dữ liệu tracking
  return NextResponse.json({
    success: true,
    data: {
      customer: load.customer,
      shipment: load.shipment,
      currentStatus: load.currentStatus || load.status,
      statusHistory: load.statusHistory || [], // 👈 thêm history để tab History hiển thị
    },
  });
}
