"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartPie, Package, Truck } from "lucide-react";

const ShipmentData = [
  { day: 10, shipment: 12, delivery: 8 },
  { day: 11, shipment: 14, delivery: 9 },
  { day: 12, shipment: 11, delivery: 6 },
  { day: 13, shipment: 13, delivery: 7 },
  { day: 14, shipment: 10, delivery: 6 },
  { day: 15, shipment: 9, delivery: 5 },
  { day: 16, shipment: 11, delivery: 7 },
  { day: 17, shipment: 12, delivery: 8 },
  { day: 18, shipment: 13, delivery: 9 },
];

const revenueData = [
  { day: "Mon", total: 4000, profit: 2400 },
  { day: "Tue", total: 3000, profit: 1398 },
  { day: "Wed", total: 5000, profit: 4000 },
  { day: "Thu", total: 2780, profit: 3908 },
  { day: "Fri", total: 1890, profit: 4800 },
  { day: "Sat", total: 2390, profit: 3800 },
  { day: "Sun", total: 3490, profit: 4300 },
];

const activeShipments = [
  { name: "Pending", value: 3, color: "#40bf60" },
  { name: "In Delivery", value: 1, color: "#69a1fe" },
  { name: "Issue", value: 1, color: "#eedc36" },
  { name: "Late", value: 1, color: "#dd4040" },
];

const loadsAnalysis = [
  { state: "Alabama", percent: 28 },
  { state: "Arizona", percent: 18 },
  { state: "California", percent: 14 },
  { state: "Indiana", percent: 9 },
  { state: "Louisiana", percent: 5 },
];

const transactions = [
  {
    id: "#951159739",
    driver: "Sam Smith",
    date: "14 Apr 2022",
    type: "Detention",
    amount: "$480",
  },
  {
    id: "#951159739",
    driver: "Rasmus Andersson",
    date: "13 Apr 2022",
    type: "Incentive",
    amount: "$300",
  },
  {
    id: "#951159739",
    driver: "Philip Aminoff",
    date: "12 Apr 2022",
    type: "Surcharge",
    amount: "$150",
  },
  {
    id: "#951159739",
    driver: "Lincoln Rosser",
    date: "10 Apr 2022",
    type: "Detention",
    amount: "$80",
  },
  {
    id: "#951159739",
    driver: "Terry Herwitz",
    date: "10 Apr 2022",
    type: "Detention",
    amount: "$100",
  },
];

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 bg-[#F7F8FA]">
      {/* Shipments Metrics */}
      <div className="bg-white rounded-xl p-4 shadow col-span-2 max-w-2xl">
        <div className="flex justify-between mb-2">
          <h2 className="font-semibold">Shipments Metrics</h2>
          <Select defaultValue="lastMonth">
            <SelectTrigger className="w-[120px] text-sm">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last3month">Last 3 Month</SelectItem>
              <SelectItem value="last6month">Last 6 Month</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={ShipmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="shipment" stroke="#8884d8" />
            <Line type="monotone" dataKey="delivery" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total Shipments Cards */}
      <div className="bg-white rounded-xl p-4 shadow flex flex-col gap-2 max-w-xs text-[#142b52]">
        <div className="">
          <h3 className="text-2xl font-medium ">Total Shipments</h3>
          <div className="flex items-center gap-4">
            <ChartPie width={24} height={24} />
            <p className="text-xl font-normal">16</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-medium ">Pending Package</h3>
          <div className="flex items-center gap-4">
            <Package width={24} height={24} />
            <p className="text-xl font-normal">10</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-medium ">Delivery Shipments</h3>
          <div className="flex items-center gap-4">
            <Truck width={24} height={24} />
            <p className="text-xl font-normal">6</p>
          </div>
        </div>
      </div>

      {/* Active Shipments */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="font-semibold mb-2">Active Shipments</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={activeShipments}
              dataKey="value"
              nameKey="name"
              innerRadius={40}
              outerRadius={60}
            >
              {activeShipments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ul className="flex flex-nowrap mt-4 text-xs">
          {activeShipments.map((item) => (
            <li key={item.name}>
              <span style={{ color: item.color }}>■</span> {item.name} (
              {item.value})
            </li>
          ))}
        </ul>
      </div>

      {/* Loads Analysis */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="font-semibold mb-2">Loads Analysis</h2>
        <ul className="text-xs space-y-1">
          {loadsAnalysis.map((item) => (
            <li key={item.state} className="flex justify-between">
              <span>{item.state}</span>
              <span>{item.percent}%</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-xl p-4 shadow col-span-2">
        <div className="flex justify-between mb-2">
          <h2 className="font-semibold">Revenue Overview</h2>
          <span className="text-sm text-gray-500">Last Week</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#69a1fe" />
            <Bar dataKey="profit" fill="#40bf60" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl p-4 shadow col-span-1">
        <h2 className="font-semibold mb-2">Transaction History</h2>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left border-b">
              <th>Load#</th>
              <th>Driver</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx} className="border-b">
                <td>{tx.id}</td>
                <td>{tx.driver}</td>
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
