import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { loadId: string } }
) {
  await dbConnect();

  const { loadId } = context.params;

  // 1. Find Load by load_id
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

  // 2. Return tracking data
  return NextResponse.json({
    success: true,
    data: {
      customer: load.customer,
      shipment: load.shipment,
      currentStatus: load.currentStatus || load.status,
      statusHistory: load.statusHistory || [], // 👈 add history so the History tab displays
    },
  });
}
