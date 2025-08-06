// ✅ API: /api/dashboard/overview
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Invoice from "@/models/Invoice";
import "@/models/customer/Customers";

type LineChartDataItem = {
  name: string;
  shipment: number;
  delivery: number;
};

type BarChartDataItem = {
  name: string;
  revenue: number;
};

interface PopulatedCustomer {
  companyName: string;
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const rangeShipment = searchParams.get("lineRange") || "7d";
  const rangeRevenue = searchParams.get("barRange") || "1m";
  const rangeTransaction = searchParams.get("txRange") || "7d";

  const now = new Date();

  function getStartDate(range: string): Date {
    const date = new Date(now);
    switch (range) {
      case "1d":
        date.setHours(0, 0, 0, 0);
        break;
      case "30d":
        date.setDate(now.getDate() - 30);
        break;
      case "6m":
        date.setMonth(now.getMonth() - 6);
        break;
      case "1m":
        date.setMonth(now.getMonth() - 1);
        break;
      case "7d":
      default:
        date.setDate(now.getDate() - 7);
        break;
    }
    return date;
  }

  // const startShipment = getStartDate(rangeShipment);
  // const startRevenue = getStartDate(rangeRevenue);
  const startTransaction = getStartDate(rangeTransaction);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const totalShipments = await Load.countDocuments();
  const pendingOrders = await Load.countDocuments({
    status: { $in: ["posted", "booked"] },
  });
  const activeDrivers = await Load.distinct("driver", {
    driver: { $ne: null },
  });

  const revenueTodayAgg = await Invoice.aggregate([
    { $match: { createdAt: { $gte: todayStart, $lte: todayEnd } } },
    { $group: { _id: null, total: { $sum: "$invoiceTotal" } } },
  ]);
  const revenueToday = revenueTodayAgg[0]?.total || 0;

  const lineChartData: LineChartDataItem[] = [];
  const daysBack =
    rangeShipment === "1d" ? 1 : rangeShipment === "30d" ? 30 : 7;

  for (let i = daysBack - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const shipmentCount = await Load.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });
    const deliveryCount = await Load.countDocuments({
      createdAt: { $gte: start, $lte: end },
      status: "delivered",
    });

    lineChartData.push({
      name:
        daysBack > 7
          ? start.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : start.toLocaleDateString("en-US", { weekday: "short" }),
      shipment: shipmentCount,
      delivery: deliveryCount,
    });
  }

  const statuses = ["in_progress", "delivered", "posted", "cancelled"];
  const pieData = await Promise.all(
    statuses.map(async (status) => {
      const count = await Load.countDocuments({ status });
      return { name: status, value: count };
    })
  );

  const barData: BarChartDataItem[] = [];
  const monthsBack = rangeRevenue === "6m" ? 6 : 1;

  for (let i = monthsBack - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const nextMonthStart = new Date(monthStart);
    nextMonthStart.setMonth(monthStart.getMonth() + 1);

    const revenue = await Invoice.aggregate([
      { $match: { createdAt: { $gte: monthStart, $lt: nextMonthStart } } },
      { $group: { _id: null, total: { $sum: "$invoiceTotal" } } },
    ]);

    barData.push({
      name: monthStart.toLocaleString("default", { month: "short" }),
      revenue: revenue[0]?.total || 0,
    });
  }

  const transactions = await Invoice.find({
    createdAt: { $gte: startTransaction },
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("customerId", "companyName");

  const transactionHistory = transactions.map((inv) => ({
    date: inv.createdAt.toISOString().split("T")[0],
    customer:
      typeof inv.customerId === "object" && inv.customerId !== null
        ? (inv.customerId as PopulatedCustomer)
        : "N/A",
    amount: inv.invoiceTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }),
    status: inv.invoiceTotal > 0 ? "Completed" : "Pending",
  }));

  return NextResponse.json({
    totalShipments,
    pendingOrders,
    activeDrivers: activeDrivers.length,
    revenueToday,
    lineChartData,
    pieData,
    barData,
    transactionHistory,
  });
}
