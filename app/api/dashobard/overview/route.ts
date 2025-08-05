// /api/dashboard/overview/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Driver from "@/models/Driver";
import Invoice from "@/models/Invoice";

export async function GET() {
  await dbConnect();

  const [loads, invoices, drivers] = await Promise.all([
    Load.find().lean(),
    Invoice.find().lean(),
    Driver.find().lean(),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const revenueToday = invoices
    .filter(inv => inv.createdAt.toISOString().slice(0, 10) === today)
    .reduce((sum, inv) => sum + inv.invoiceTotal, 0);

  const shipmentsOverTime: { [date: string]: number } = {};
  const statusCount: { [status: string]: number } = {};
  const revenueByMonth: { [month: string]: number } = {};

  for (const load of loads) {
    const date = load.createdAt.toISOString().slice(0, 10);
    shipmentsOverTime[date] = (shipmentsOverTime[date] || 0) + 1;

    statusCount[load.status] = (statusCount[load.status] || 0) + 1;
  }

  for (const inv of invoices) {
    const month = inv.createdAt.toISOString().slice(0, 7);
    revenueByMonth[month] = (revenueByMonth[month] || 0) + inv.invoiceTotal;
  }

  return NextResponse.json({
    totalShipments: loads.length,
    pendingOrders: loads.filter(l => l.status === "posted" || l.status === "booked").length,
    activeDrivers: drivers.length,
    revenueToday,

    shipmentsOverTime: Object.entries(shipmentsOverTime).map(([date, count]) => ({ date, count })),
    activeShipments: statusCount,
    revenueOverview: Object.entries(revenueByMonth).map(([month, total]) => ({ month, total })),
    transactionHistory: invoices.slice(0, 10).map((inv, idx) => ({
      date: inv.createdAt.toISOString().slice(0, 10),
      customer: `Customer ${idx + 1}`,
      amount: inv.invoiceTotal,
    })),
  });
}
