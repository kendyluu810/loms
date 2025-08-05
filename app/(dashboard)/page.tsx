"use client";

import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const COLORS = ["#3461FF", "#40BF60", "#FFA500", "#FF5A5F"];

const RANGE_OPTIONS = [
  { label: "1 Day", value: "1d" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "6 Months", value: "6m" },
];

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [lineRange, setLineRange] = useState("7d");
  const [barRange, setBarRange] = useState("6m");
  const [txRange, setTxRange] = useState("7d");

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/analytics/dashboard?lineRange=${lineRange}&barRange=${barRange}&txRange=${txRange}`
      );
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [lineRange, barRange, txRange]);

  if (loading || !data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-max">
      {/* === Metric Cards === */}
      {[
        {
          title: "Total Shipments",
          value: data.totalShipments,
          color: "#3461FF",
        },
        {
          title: "Pending Orders",
          value: data.pendingOrders,
          color: "#FFA500",
        },
        {
          title: "Active Drivers",
          value: data.activeDrivers,
          color: "#40BF60",
        },
        {
          title: "Revenue Today",
          value: `$${data.revenueToday.toLocaleString()}`,
          color: "#FF5A5F",
        },
      ].map((metric, idx) => (
        <Card
          key={idx}
          className="w-full shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-700">{metric.title}</h3>
            <p className="text-2xl font-bold" style={{ color: metric.color }}>
              {metric.value}
            </p>
          </CardContent>
        </Card>
      ))}

      {/* === Line Chart === */}
      <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Shipments Over Time</h3>
            <select
              value={lineRange}
              onChange={(e) => setLineRange(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {RANGE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.lineChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="shipment"
                  stroke="#3461FF"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="delivery"
                  stroke="#40BF60"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* === Pie Chart === */}
      <Card className="col-span-1 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Active Shipments</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data.pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {data.pieData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="text-xs grid grid-cols-2 gap-2 mt-2">
              {data.pieData.map((item: any, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* === Bar Chart === */}
      <Card className="col-span-1 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Revenue Overview</h3>
            <select
              value={barRange}
              onChange={(e) => setBarRange(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {RANGE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3461FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* === Transaction Table === */}
      <Card className="col-span-full shadow-sm hover:shadow-md transition-shadow overflow-x-auto">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Transaction History</h3>
            <select
              value={txRange}
              onChange={(e) => setTxRange(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {RANGE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <table className="min-w-[600px] text-sm w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.transactionHistory.map((row: any, i: number) => (
                <tr className="border-b" key={i}>
                  <td className="py-2">{row.date}</td>
                  <td className="py-2">{row.customer?.companyName || "N/A"}</td>
                  <td className="py-2">{row.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
