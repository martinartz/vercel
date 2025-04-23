"use client"

import { useState } from "react"
import { Check, Clock, Filter, Plus, Search, ShoppingBag, X, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CreateOrderDialog } from "@/components/create-order-dialog"

export default function OrdersPage() {
  const [createOrderOpen, setCreateOrderOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage your customer orders</p>
        </div>
        <Button onClick={() => setCreateOrderOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      {/* Order Statistics Cards */}
      <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <OrderStatCard
          title="Total"
          value="0"
          icon={<ShoppingBag className="h-5 w-5" />}
          bgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
        <OrderStatCard
          title="Completed"
          value="0"
          icon={<Check className="h-5 w-5" />}
          bgColor="bg-green-50"
          iconColor="text-green-500"
        />
        <OrderStatCard
          title="Pending"
          value="0"
          icon={<Clock className="h-5 w-5" />}
          bgColor="bg-yellow-50"
          iconColor="text-yellow-500"
        />
        <OrderStatCard
          title="Cancelled"
          value="0"
          icon={<X className="h-5 w-5" />}
          bgColor="bg-red-50"
          iconColor="text-red-500"
        />
      </div>

      {/* Filters Section */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            {/* Search Filter */}
            <div className="flex-1 space-y-2">
              <Label htmlFor="search-orders">Search Orders</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-orders"
                  type="search"
                  placeholder="Search by order ID or customer..."
                  className="pl-8"
                />
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="w-full md:w-48 space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select defaultValue="all-time">
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-40 space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="all">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Status Filter */}
            <div className="w-full md:w-40 space-y-2">
              <Label htmlFor="payment-status">Payment</Label>
              <Select defaultValue="all">
                <SelectTrigger id="payment-status">
                  <SelectValue placeholder="Payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters */}
            <div className="flex-shrink-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Advanced Filters</h4>
                      <Separator />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="order-type">Order Type</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="order-type">
                          <SelectValue placeholder="Select order type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="pickup">Pickup</SelectItem>
                          <SelectItem value="delivery">Delivery</SelectItem>
                          <SelectItem value="custom">Custom Order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price-range">Price Range</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="price-range">
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="under-500">Under ₹500</SelectItem>
                          <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                          <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                          <SelectItem value="over-2000">Over ₹2000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button size="sm">Apply Filters</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Reset Filters */}
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sample Order */}
      <div className="mt-6">
        <h3 className="mb-4 text-lg font-medium">Sample Order</h3>
        <Card>
          <CardContent className="p-0">
            <div className="border-b p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Order #CK-1001</h4>
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                      Pending
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span>April 19, 2025</span>
                    <span>•</span>
                    <span>₹1,299</span>
                    <span>•</span>
                    <span>3 items</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm">Process Order</Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex-1 space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">Customer</h5>
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-sm">rahul.sharma@example.com</p>
                    <p className="text-sm">+91 98765 43210</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">Delivery Address</h5>
                    <p className="text-sm">123 Main Street, Apartment 4B</p>
                    <p className="text-sm">Koramangala, Bangalore - 560034</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">Order Details</h5>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>1 × Chocolate Cake (1kg)</span>
                        <span>₹599</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>1 × Red Velvet Cake (500g)</span>
                        <span>₹399</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>1 × Assorted Cupcakes (6pcs)</span>
                        <span>₹299</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹1,297</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee</span>
                        <span>₹100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Discount</span>
                        <span className="text-green-600">-₹100</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>₹1,299</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">Payment</h5>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        Paid
                      </span>
                      <span className="text-sm">Online Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <div className="mt-12 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/60" />
        <h3 className="mt-4 text-xl font-medium">No orders to be found</h3>
        <p className="mt-2 text-muted-foreground">Start selling by adding products to your store</p>
        <Button className="mt-6">
          <Plus className="mr-2 h-4 w-4" />
          Add Products
        </Button>
      </div>

      {/* Create Order Dialog */}
      <CreateOrderDialog open={createOrderOpen} onOpenChange={setCreateOrderOpen} />
    </>
  )
}

function OrderStatCard({ title, value, icon, bgColor, iconColor }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
