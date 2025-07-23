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
const lineChartData = [
  { name: "Mon", shipment: 10, delivery: 5 },
  { name: "Tue", shipment: 20, delivery: 10 },
  { name: "Wed", shipment: 15, delivery: 12 },
  { name: "Thu", shipment: 25, delivery: 18 },
  { name: "Fri", shipment: 30, delivery: 22 },
];

const pieData = [
  { name: "In Transit", value: 40 },
  { name: "Delivered", value: 30 },
  { name: "Delayed", value: 20 },
  { name: "Cancelled", value: 10 },
];

const barData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
];

const COLORS = ["#3461FF", "#40BF60", "#FFA500", "#FF5A5F"];
const DashboardPage = () => {
  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-max">
      {/* Metrics Cards */}
      <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-700">Total Shipments</h3>
          <p className="text-2xl font-bold text-[#3461FF]">120</p>
        </CardContent>
      </Card>

      <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-700">Pending Orders</h3>
          <p className="text-2xl font-bold text-[#FFA500]">18</p>
        </CardContent>
      </Card>

      <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-700">Active Drivers</h3>
          <p className="text-2xl font-bold text-[#40BF60]">24</p>
        </CardContent>
      </Card>

      <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-700">Revenue Today</h3>
          <p className="text-2xl font-bold text-[#FF5A5F]">$4,800</p>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Shipments Over Time</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
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

      {/* Pie Chart */}
      <Card className="col-span-1 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Active Shipments</h3>
          <div className="h-[220px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-4 text-xs grid grid-cols-2 gap-2">
              {pieData.map((item, index) => (
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

      {/* Bar Chart */}
      <Card className="col-span-1 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Revenue Overview</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3461FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card className="col-span-full shadow-sm hover:shadow-md transition-shadow overflow-x-auto">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Transaction History</h3>
          <table className="min-w-[600px] text-sm w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">2025-07-22</td>
                <td className="py-2">Acme Corp</td>
                <td className="py-2">$2,000</td>
                <td className="py-2 text-green-600">Completed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2025-07-21</td>
                <td className="py-2">Global Freight</td>
                <td className="py-2">$1,200</td>
                <td className="py-2 text-yellow-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
