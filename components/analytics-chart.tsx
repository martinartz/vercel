"use client"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"

// Sample data for the sales chart
export const salesData = [
  { name: "Jan", sales: 12000 },
  { name: "Feb", sales: 19000 },
  { name: "Mar", sales: 15000 },
  { name: "Apr", sales: 22000 },
  { name: "May", sales: 28000 },
  { name: "Jun", sales: 24000 },
  { name: "Jul", sales: 32000 },
]

// Sample data for top products
export const topProductsData = [
  { name: "Chocolate Cake", value: 35, color: "#8884d8" },
  { name: "Red Velvet", value: 25, color: "#82ca9d" },
  { name: "Vanilla Cake", value: 20, color: "#ffc658" },
  { name: "Cupcakes", value: 15, color: "#ff8042" },
  { name: "Pastries", value: 5, color: "#0088FE" },
]

// Sample data for customer demographics
export const customerDemographicsData = [
  { name: "25-34", value: 40, color: "#82ca9d" },
  { name: "35-44", value: 25, color: "#ffc658" },
  { name: "18-24", value: 15, color: "#8884d8" },
  { name: "45-54", value: 15, color: "#ff8042" },
  { name: "55+", value: 5, color: "#0088FE" },
]

// Sample data for traffic sources
export const trafficSourcesData = [
  { name: "Social Media", value: 35, color: "#8884d8" },
  { name: "Direct", value: 30, color: "#82ca9d" },
  { name: "Search", value: 25, color: "#ffc658" },
  { name: "Referral", value: 10, color: "#ff8042" },
]

// Sample data for monthly revenue trend
export const revenueData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 19000 },
  { name: "Mar", revenue: 15000 },
  { name: "Apr", revenue: 22000 },
  { name: "May", revenue: 28000 },
  { name: "Jun", revenue: 24000 },
  { name: "Jul", revenue: 32000 },
]

// Sample data for order status
export const orderStatusData = [
  { name: "Completed", value: 65, color: "#82ca9d" },
  { name: "Pending", value: 20, color: "#ffc658" },
  { name: "Processing", value: 10, color: "#8884d8" },
  { name: "Cancelled", value: 5, color: "#ff8042" },
]

// Sample data for store visits
export const storeVisitsData = [
  { name: "Mon", visits: 120 },
  { name: "Tue", visits: 145 },
  { name: "Wed", visits: 162 },
  { name: "Thu", visits: 178 },
  { name: "Fri", visits: 220 },
  { name: "Sat", visits: 250 },
  { name: "Sun", visits: 210 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={salesData}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7b5df0" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#7b5df0" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Sales"]} />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#7b5df0"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorSales)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function StoreVisitsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={storeVisitsData}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip formatter={(value) => [`${value}`, "Visitors"]} />
        <Area
          type="monotone"
          dataKey="visits"
          stroke="#2dd4bf"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorVisits)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function TopProductsChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={topProductsData}
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 14 }} />
        <Tooltip formatter={(value) => [`${value}%`, "Market Share"]} labelStyle={{ color: "#888" }} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="#8884d8">
          {topProductsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CustomerDemographicsChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={customerDemographicsData}
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 14 }} />
        <Tooltip formatter={(value) => [`${value}%`, "Age Group"]} labelStyle={{ color: "#888" }} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="#82ca9d">
          {customerDemographicsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function TrafficSourcesChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        layout="vertical"
        data={trafficSourcesData}
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 14 }} />
        <Tooltip formatter={(value) => [`${value}%`, "Traffic"]} labelStyle={{ color: "#888" }} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="#8884d8">
          {trafficSourcesData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function RevenueTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={revenueData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />
        <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function OrderStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={orderStatusData}
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 14 }} />
        <Tooltip formatter={(value) => [`${value}%`, "Orders"]} labelStyle={{ color: "#888" }} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="#82ca9d">
          {orderStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
