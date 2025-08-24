import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import "@/models/load_board/Shipment";
import "@/models/customer/Customers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ loadId: string }> }
) {
  await dbConnect();

  const { loadId } = await context.params;
  const key = decodeURIComponent(loadId ?? "").trim();


  const or: Record<string, unknown>[] = [{ load_id: key }, { loadId: key }];
  if (mongoose.Types.ObjectId.isValid(key)) {
    or.push({ _id: new mongoose.Types.ObjectId(key) });
  }

  // 1. Find Load by load_id
  const load = await Load.findOne({ $or: or })
    .populate({
      path: "shipment",
      select: "pickupPoint stopPoint deliveryPoint itemCategory weight rate",
    })
    .populate({
      path: "customer",
      select:
        "companyName companyEmail companyPhone contactPerson contactPhone contactEmail",
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
