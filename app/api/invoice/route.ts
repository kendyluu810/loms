import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import Load from "@/models/load_board/Load";
import { NextRequest, NextResponse } from "next/server";

// GET - Lấy tất cả hoặc theo loadId
export async function GET(req: NextRequest) {
  await dbConnect();
  const loadId = req.nextUrl.searchParams.get("load_id");

  try {
    const query = loadId ? { loadId } : {};
    const invoices = await Invoice.find(query).populate("carrier customer");
    return NextResponse.json(invoices);
  } catch (error) {
    //console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

// POST - Tạo mới invoice, gắn vào load
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  try {
    // 1. Tìm Load theo load_id string (ví dụ: "LOAD202507301142")
    const load = await Load.findOne({ load_id: body.loadId });
    if (!load) {
      return NextResponse.json(
        { error: "Load not found with load_id: " + body.loadId },
        { status: 404 }
      );
    }

    // 2. Chuẩn bị dữ liệu Invoice
    const invoiceData = {
      ...body,
      loadId: load._id,
      customerId: load.customer,
      carrierId: load.carrier,
    };

    // 3. Tạo invoice mới
    const invoice = await Invoice.create(invoiceData);

    // 4. Gắn vào Load
    await Load.findByIdAndUpdate(load._id, { invoice: invoice._id });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    //console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
