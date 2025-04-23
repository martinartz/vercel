"use client"

import { useState } from "react"
import { Download, BarChart3, Globe, Users, Package, TrendingUp, IndianRupee, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsCard } from "@/components/analytics-card"
import {
  SalesChart,
  TopProductsChart,
  CustomerDemographicsChart,
  TrafficSourcesChart,
  RevenueTrendChart,
  OrderStatusChart,
  StoreVisitsChart,
} from "@/components/analytics-chart"

export default function AnalyticsPage() {
  const [analyticsView, setAnalyticsView] = useState("sample-data")
  const [analyticsPeriod, setAnalyticsPeriod] = useState("30d")

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your store's performance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue={analyticsPeriod} onValueChange={setAnalyticsPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Toggle between Sample Data and No Data */}
      <div className="mt-4">
        <Tabs defaultValue="sample-data" onValueChange={(value) => setAnalyticsView(value)}>
          <TabsList>
            <TabsTrigger value="sample-data">Sample Data</TabsTrigger>
            <TabsTrigger value="no-data">No Data View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {analyticsView === "sample-data" ? (
        <>
          {/* Analytics Overview Cards with Sample Data */}
          <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnalyticsCard
              title="Total Sales"
              value="₹152,000"
              change="+12%"
              trend="up"
              description="vs. previous period"
            />
            <AnalyticsCard title="Orders" value="87" change="+8%" trend="up" description="vs. previous period" />
            <AnalyticsCard title="Customers" value="42" change="+15%" trend="up" description="vs. previous period" />
            <AnalyticsCard
              title="Avg. Order Value"
              value="₹1,747"
              change="+3%"
              trend="up"
              description="vs. previous period"
            />
          </div>

          {/* Main Analytics Dashboard */}
          <div className="grid gap-6 mt-6">
            {/* Top Row - Main Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Sales Chart */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Sales Overview
                      </CardTitle>
                      <CardDescription>Your store's sales performance over time</CardDescription>
                    </div>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder="View by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6">
                    <SalesChart />
                  </div>
                </CardContent>
              </Card>

              {/* Store Visits Chart */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-teal-500" />
                        Store Visits
                      </CardTitle>
                      <CardDescription>Visitor traffic to your store</CardDescription>
                    </div>
                    <Select defaultValue="weekly">
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder="View by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6">
                    <StoreVisitsChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Row - Revenue Trend */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5 text-green-500" />
                      Revenue Trend
                    </CardTitle>
                    <CardDescription>Monthly revenue growth</CardDescription>
                  </div>
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="12months">12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6">
                  <RevenueTrendChart />
                </div>
              </CardContent>
            </Card>

            {/* Bottom Row - Analytics Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Top Products */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-purple-500" />
                        Top Products
                      </CardTitle>
                      <CardDescription>Your best-selling products</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6">
                    <TopProductsChart />
                  </div>
                </CardContent>
              </Card>

              {/* Customer Demographics */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-500" />
                        Customer Demographics
                      </CardTitle>
                      <CardDescription>Insights about your customers</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6">
                    <CustomerDemographicsChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Analytics Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Order Status */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-blue-500" />
                        Order Status
                      </CardTitle>
                      <CardDescription>Distribution of order statuses</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6">
                    <OrderStatusChart />
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-amber-500" />
                        Traffic Sources
                      </CardTitle>
                      <CardDescription>Where your store visitors are coming from</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6">
                    <TrafficSourcesChart />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Analytics Overview Cards - Empty State */}
          <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnalyticsCard
              title="Total Sales"
              value="₹0"
              change="+0%"
              trend="neutral"
              description="vs. previous period"
            />
            <AnalyticsCard title="Orders" value="0" change="+0%" trend="neutral" description="vs. previous period" />
            <AnalyticsCard title="Customers" value="0" change="+0%" trend="neutral" description="vs. previous period" />
            <AnalyticsCard
              title="Avg. Order Value"
              value="₹0"
              change="+0%"
              trend="neutral"
              description="vs. previous period"
            />
          </div>

          {/* Sales Chart - Empty State */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Your store's sales performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground/60" />
                  <h3 className="mt-4 text-lg font-medium">No data available</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Start selling to see your sales data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Sections - Empty State */}
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            {/* Top Products - Empty State */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Your best-selling products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <Package className="h-8 w-8 mx-auto text-muted-foreground/60" />
                    <h3 className="mt-2 text-base font-medium">No products sold yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Add products to your store</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Demographics - Empty State */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Insights about your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <Users className="h-8 w-8 mx-auto text-muted-foreground/60" />
                    <h3 className="mt-2 text-base font-medium">No customer data yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Complete orders to see customer insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources - Empty State */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your store visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto text-muted-foreground/60" />
                  <h3 className="mt-2 text-base font-medium">No traffic data available</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Share your store to start tracking visitors</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Your Store
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}
