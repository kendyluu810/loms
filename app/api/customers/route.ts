import dbConnect from "@/lib/mongodb";
import Customers from "@/models/Customers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") === "desc" ? -1 : 1;

  const query = {
    $or: [
      { Cid: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { contactName: { $regex: search, $options: "i" } },
      { contactEmail: { $regex: search, $options: "i" } },
      { contactPhone: { $regex: search, $options: "i" } },
      { deliveryMethod: { $regex: search, $options: "i" } },
    ],
  };

  const customer = await Customers.find(query)
    .sort({ [sort]: order })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const total = await Customers.countDocuments(query);
  return NextResponse.json({ customers: customer, total });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  // get the last Cid
  const lastCustomer = await Customers.findOne().sort({ createdAt: -1 });
  let newCid = "CUS0001";
  if (lastCustomer && lastCustomer.Cid) {
    const lastNumber = parseInt(lastCustomer.Cid.slice(3));
    const nextNumber = lastNumber + 1;
    newCid = `CUS${nextNumber.toString().padStart(3, "0")}`;
  }

  const customer = new Customers({ ...body, Cid: newCid });
  await customer.save();

  return NextResponse.json(customer);
}
