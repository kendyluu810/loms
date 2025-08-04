import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import "@/models/employees/Employees";
import "@/models/load_board/Routes";
import "@/models/load_board/Shipment";
import "@/models/customer/Customers";
import "@/models/Carrier";
import "@/models/Invoice";
import "@/models/Vehicle";
import "@/models/Driver";

export async function GET() {
  try {
    await dbConnect();

    const loads = await Load.find()
      .populate("route")
      .populate("shipment")
      .populate("customer")
      .populate("carrier")
      .populate({
        path: "driver",
        populate: {
          path: "employee",
          model: "Employee", // RẤT QUAN TRỌNG!
        },
      })
      .populate("dispatcher")
      .populate("vehicle")
      .populate("invoice")
      .sort({ createdAt: -1 }); // Sort by creation date, most recent first
    // console.log("First load customer:", loads[0]?.customer);

    return NextResponse.json({ success: true, data: loads }, { status: 200 });
  } catch (error) {
    console.error("Error in tracking route:", error); // log chi tiết lỗi
    return NextResponse.json(
      { success: false, message: "Failed to fetch tracking data" },
      { status: 500 }
    );
  }
}
