"use client"

import { Download, Search, Clock, RefreshCcw, Percent, IndianRupee, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PaymentStatCard } from "@/components/payment-stat-card"

export default function PaymentsPage() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Manage your payments and transactions</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Payment Statistics Cards */}
      <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <PaymentStatCard
          title="Total Revenue"
          value="₹0"
          change="+0%"
          icon={<IndianRupee className="h-5 w-5" />}
          bgColor="bg-green-50"
          iconColor="text-green-500"
        />
        <PaymentStatCard
          title="Pending"
          value="₹0"
          change="0%"
          icon={<Clock className="h-5 w-5" />}
          bgColor="bg-yellow-50"
          iconColor="text-yellow-500"
        />
        <PaymentStatCard
          title="Refunded"
          value="₹0"
          change="0%"
          icon={<RefreshCcw className="h-5 w-5" />}
          bgColor="bg-red-50"
          iconColor="text-red-500"
        />
        <PaymentStatCard
          title="Processing Fee"
          value="₹0"
          change="0%"
          icon={<Percent className="h-5 w-5" />}
          bgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
      </div>

      {/* Filters Section */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            {/* Search Filter */}
            <div className="flex-1 space-y-2">
              <Label htmlFor="search-payments">Search Transactions</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-payments"
                  type="search"
                  placeholder="Search by transaction ID or customer..."
                  className="pl-8"
                />
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="w-full md:w-48 space-y-2">
              <Label htmlFor="payment-date-range">Date Range</Label>
              <Select defaultValue="this-month">
                <SelectTrigger id="payment-date-range">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Status Filter */}
            <div className="w-full md:w-40 space-y-2">
              <Label htmlFor="payment-status-filter">Status</Label>
              <Select defaultValue="all">
                <SelectTrigger id="payment-status-filter">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="successful">Successful</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method Filter */}
            <div className="w-full md:w-40 space-y-2">
              <Label htmlFor="payment-method">Method</Label>
              <Select defaultValue="all">
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Filters */}
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sample Transaction */}
      <div className="mt-6">
        <h3 className="mb-4 text-lg font-medium">Sample Transaction</h3>
        <Card>
          <CardContent className="p-0">
            <div className="border-b p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Transaction #TXN-1001</h4>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Successful
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span>April 19, 2025</span>
                    <span>•</span>
                    <span>Order #CK-1001</span>
                    <span>•</span>
                    <span>UPI</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">₹1,299</p>
                  <p className="text-sm text-muted-foreground">Fee: ₹25.98</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <div className="mt-12 flex flex-col items-center justify-center text-center">
        <CreditCard className="h-16 w-16 text-muted-foreground/60" />
        <h3 className="mt-4 text-xl font-medium">No transactions yet</h3>
        <p className="mt-2 text-muted-foreground">Complete your store setup to start accepting payments</p>
        <Button className="mt-6">
          <CreditCard className="mr-2 h-4 w-4" />
          Setup Payment Methods
        </Button>
      </div>
    </>
  )
}
