"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  CreditCard,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  HelpCircle,
  Home,
  ImageIcon,
  IndianRupee,
  Info,
  LifeBuoy,
  LogOut,
  Package,
  Percent,
  PieChart,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  User,
  Users,
  Video,
  X,
  Clock,
  TrendingUp,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CreateOrderDialog } from "./components/create-order-dialog"
import { MenuIcon, MessageCircle } from "lucide-react"
import { PaymentStatCard } from "./components/payment-stat-card"
import { AnalyticsCard } from "./components/analytics-card"
import {
  SalesChart,
  TopProductsChart,
  CustomerDemographicsChart,
  TrafficSourcesChart,
  RevenueTrendChart,
  OrderStatusChart,
  StoreVisitsChart,
} from "./components/analytics-chart"

// Update the activeTab state to include the new tabs

function DesktopSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div className="space-y-1">
        <SidebarItem
          href="#"
          icon={<Home className="h-4 w-4" />}
          text="Home"
          isActive={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />
        <SidebarItem
          href="#"
          icon={<ShoppingBag className="h-4 w-4" />}
          text="Orders"
          isActive={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        />
        <SidebarItem
          href="/products"
          icon={<Package className="h-4 w-4" />}
          text="Products"
          isActive={activeTab === "products"}
          onClick={() => {}} // We'll use the href for navigation instead
        />
        <SidebarItem
          href="#"
          icon={<CreditCard className="h-4 w-4" />}
          text="Payments"
          isActive={activeTab === "payments"}
          onClick={() => setActiveTab("payments")}
        />
        <SidebarItem
          href="#"
          icon={<PieChart className="h-4 w-4" />}
          text="Analytics"
          isActive={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
        />
        <SidebarItem
          href="/settings"
          icon={<Settings className="h-4 w-4" />}
          text="Settings"
          isActive={activeTab === "settings"}
          onClick={() => {}} // We'll use the href for navigation instead
        />
        <SidebarItem
          href="/availability"
          icon={<Calendar className="h-4 w-4" />}
          text="Availability"
          isActive={activeTab === "availability"}
          onClick={() => {}} // We'll use the href for navigation instead
        />
        <SidebarItem href="#" icon={<Eye className="h-4 w-4" />} text="View store" />
      </div>
      <div className="mt-auto space-y-1">
        <SidebarItem href="#" icon={<HelpCircle className="h-4 w-4" />} text="Help centre" />
        <SidebarItem href="#" icon={<LifeBuoy className="h-4 w-4" />} text="Contact support" />
      </div>
    </div>
  )
}

function MobileSidebar() {
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div className="flex items-center gap-2 px-4 py-2">
        <CakeIcon className="h-6 w-6" />
        <span className="text-lg font-bold">cakesify</span>
      </div>
      <Separator className="my-2" />
      <div className="flex-1 space-y-1 px-1">
        <SidebarItem href="#" icon={<Home className="h-4 w-4" />} text="Home" isActive />
        <SidebarItem href="#" icon={<ShoppingBag className="h-4 w-4" />} text="Orders" />
        <SidebarItem href="/products" icon={<Package className="h-4 w-4" />} text="Products" />
        <SidebarItem href="#" icon={<CreditCard className="h-4 w-4" />} text="Payments" />
        <SidebarItem href="#" icon={<PieChart className="h-4 w-4" />} text="Analytics" />
        <SidebarItem href="/settings" icon={<Settings className="h-4 w-4" />} text="Settings" />
        <SidebarItem href="/availability" icon={<Calendar className="h-4 w-4" />} text="Availability" />
        <SidebarItem href="#" icon={<Eye className="h-4 w-4" />} text="View store" />
      </div>
      <Separator className="my-2" />
      <div className="space-y-1 px-1">
        <SidebarItem href="#" icon={<HelpCircle className="h-4 w-4" />} text="Help centre" />
        <SidebarItem href="#" icon={<LifeBuoy className="h-4 w-4" />} text="Contact support" />
      </div>
    </div>
  )
}

function SidebarItem({ href, icon, text, isActive = false, onClick }) {
  // If it's an internal link (starts with #), use onClick for tab switching
  // Otherwise, it's a route link and we'll use the href directly
  const isInternalLink = href.startsWith("#")

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
      onClick={(e) => {
        if (isInternalLink && onClick) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [createOrderOpen, setCreateOrderOpen] = useState(false)
  const [analyticsView, setAnalyticsView] = useState("sample-data")
  const [analyticsPeriod, setAnalyticsPeriod] = useState("30d")

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <MobileSidebar />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <CakeIcon className="h-8 w-8" />
          <span className="text-xl font-bold">cakesify</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Share2 className="mr-2 h-4 w-4" />
            Share your store
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {activeTab === "overview" && (
              <>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome, Cakesify!</h1>
                    <p className="text-muted-foreground">Let's get your store ready for customers.</p>
                  </div>
                  <Button className="hidden sm:flex">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share your store
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Store Setup Card */}
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>Complete Your Store Setup</CardTitle>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View all tasks
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Pending tasks</DialogTitle>
                              <DialogDescription>
                                Complete these tasks to set up your store and start selling
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <TaskItem title="FSSAI" icon={<FileText className="h-4 w-4" />} completed={true} />
                              <TaskItem
                                title="Pan card"
                                icon={<CreditCard className="h-4 w-4" />}
                                completed={false}
                                actionLabel="Add"
                              />
                              <TaskItem
                                title="Profile image"
                                icon={<ImageIcon className="h-4 w-4" />}
                                completed={true}
                              />
                              <TaskItem
                                title="Bank credentials"
                                icon={<CreditCard className="h-4 w-4" />}
                                completed={false}
                                actionLabel="Add"
                              />
                              <TaskItem
                                title="Store description"
                                icon={<FileText className="h-4 w-4" />}
                                completed={false}
                                actionLabel="Add"
                              />
                            </div>
                            <DialogClose asChild>
                              <Button className="w-full">Continue</Button>
                            </DialogClose>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <CardDescription>Complete these tasks to start selling</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">40% complete</span>
                          <span className="text-sm text-muted-foreground">2/5 tasks</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <TaskCard
                          title="Add Pan Card"
                          description="Verify your identity to receive payments"
                          icon={<CreditCard className="h-5 w-5" />}
                          actionLabel="Add"
                        />
                        <TaskCard
                          title="Add Bank Details"
                          description="Connect your bank account for payouts"
                          icon={<CreditCard className="h-5 w-5" />}
                          actionLabel="Add"
                        />
                        <TaskCard
                          title="Add Store Description"
                          description="Tell customers about your store"
                          icon={<FileText className="h-5 w-5" />}
                          actionLabel="Add"
                        />
                        <TaskCard
                          title="Add Your First Product"
                          description="Start building your product catalog"
                          icon={<Package className="h-5 w-5" />}
                          actionLabel="Add Product"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Store Status</CardTitle>
                      <CardDescription>Your store's current status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-sm font-medium">Store Completion</h4>
                          <span className="text-sm text-muted-foreground">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Products</span>
                          </div>
                          <span className="text-sm font-medium">0 active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Orders</span>
                          </div>
                          <span className="text-sm font-medium">0 pending</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Store visits</span>
                          </div>
                          <span className="text-sm font-medium">0 today</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View analytics
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Learning Resources Section */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Learning Resources</h2>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View all <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Tabs defaultValue="videos">
                    <TabsList className="mb-4">
                      <TabsTrigger value="videos">Videos</TabsTrigger>
                      <TabsTrigger value="guides">Guides</TabsTrigger>
                      <TabsTrigger value="faq">FAQ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="videos" className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <LearningCard
                          title="Product Listing Tutorial"
                          description="Learn how to create effective product listings"
                          type="video"
                          duration="5:30"
                        />
                        <LearningCard
                          title="Setting Up Your Store"
                          description="Complete guide to configuring your store settings"
                          type="video"
                          duration="8:45"
                        />
                        <LearningCard
                          title="Processing Orders"
                          description="How to manage and fulfill customer orders"
                          type="video"
                          duration="6:20"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="guides" className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <LearningCard
                          title="Store Optimization Guide"
                          description="Tips to improve your store's performance"
                          type="article"
                          duration="10 min read"
                        />
                        <LearningCard
                          title="Product Photography Tips"
                          description="Take better photos of your baked goods"
                          type="article"
                          duration="8 min read"
                        />
                        <LearningCard
                          title="Pricing Strategy Guide"
                          description="How to price your products effectively"
                          type="article"
                          duration="12 min read"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="faq" className="space-y-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h3 className="font-medium">How do I receive payments?</h3>
                              <p className="text-sm text-muted-foreground">
                                Payments are processed automatically and transferred to your linked bank account within
                                2-3 business days after order completion.
                              </p>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                              <h3 className="font-medium">How do I handle order cancellations?</h3>
                              <p className="text-sm text-muted-foreground">
                                You can accept or reject cancellation requests from your Orders dashboard. Refunds are
                                processed automatically for approved cancellations.
                              </p>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                              <h3 className="font-medium">What are the delivery options?</h3>
                              <p className="text-sm text-muted-foreground">
                                You can choose between self-delivery or our integrated delivery partners. Configure your
                                delivery settings in the Store Settings section.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Activity Feed */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View all <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <ActivityItem
                          icon={<Check className="h-4 w-4" />}
                          title="FSSAI verification completed"
                          description="Your FSSAI certificate has been verified"
                          time="2 hours ago"
                          iconColor="bg-green-100 text-green-600"
                        />
                        <ActivityItem
                          icon={<Check className="h-4 w-4" />}
                          title="Profile image uploaded"
                          description="Your store profile image has been updated"
                          time="Yesterday"
                          iconColor="bg-green-100 text-green-600"
                        />
                        <ActivityItem
                          icon={<Info className="h-4 w-4" />}
                          title="Store created"
                          description="Your Cakesify store has been successfully created"
                          time="2 days ago"
                          iconColor="bg-blue-100 text-blue-600"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ActionCard
                    title="Add Product"
                    description="Create your first product listing"
                    icon={<Plus className="h-5 w-5" />}
                  />
                  <ActionCard
                    title="Customize Store"
                    description="Personalize your store appearance"
                    icon={<Settings className="h-5 w-5" />}
                  />
                  <ActionCard
                    title="View Analytics"
                    description="Check your store performance"
                    icon={<BarChart3 className="h-5 w-5" />}
                  />
                  <ActionCard
                    title="Get Help"
                    description="Contact support for assistance"
                    icon={<HelpCircle className="h-5 w-5" />}
                  />
                </div>
              </>
            )}

            {activeTab === "orders" && (
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
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <OrderStatCard
                    title="Total"
                    value="0"
                    icon={<Home className="h-5 w-5" />}
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
              </>
            )}

            {activeTab === "payments" && (
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
                    <Settings className="mr-2 h-4 w-4" />
                    Setup Payment Methods
                  </Button>
                </div>
              </>
            )}

            {activeTab === "analytics" && (
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
                      <AnalyticsCard
                        title="Orders"
                        value="87"
                        change="+8%"
                        trend="up"
                        description="vs. previous period"
                      />
                      <AnalyticsCard
                        title="Customers"
                        value="42"
                        change="+15%"
                        trend="up"
                        description="vs. previous period"
                      />
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
                                  <Eye className="h-5 w-5 text-teal-500" />
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
                                  <ShoppingBag className="h-5 w-5 text-blue-500" />
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
                      <AnalyticsCard
                        title="Orders"
                        value="0"
                        change="+0%"
                        trend="neutral"
                        description="vs. previous period"
                      />
                      <AnalyticsCard
                        title="Customers"
                        value="0"
                        change="+0%"
                        trend="neutral"
                        description="vs. previous period"
                      />
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
                              <p className="mt-1 text-sm text-muted-foreground">
                                Complete orders to see customer insights
                              </p>
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
                            <p className="mt-1 text-sm text-muted-foreground">
                              Share your store to start tracking visitors
                            </p>
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
            )}
          </div>
        </main>
      </div>

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="h-14 w-14 rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg">
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Chat Support</span>
        </Button>
      </div>

      {/* Create Order Dialog */}
      <CreateOrderDialog open={createOrderOpen} onOpenChange={setCreateOrderOpen} />
    </div>
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

function TaskItem({ title, icon, completed, actionLabel }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${completed ? "bg-green-100" : "bg-muted"}`}
        >
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          {completed && <Check className="h-4 w-4 text-green-600" />}
        </div>
      </div>
      {!completed && actionLabel && (
        <Button size="sm" variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

function TaskCard({ title, description, icon, actionLabel }) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">{icon}</div>
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs whitespace-nowrap">
        {actionLabel}
      </Button>
    </div>
  )
}

function LearningCard({ title, description, type, duration }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-muted">
        {type === "video" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
              <Video className="h-5 w-5" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-2 py-1 text-xs">{duration}</div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ icon, title, description, time, iconColor }) {
  return (
    <div className="flex gap-4">
      <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${iconColor}`}>{icon}</div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="mt-1 text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

function ActionCard({ title, description, icon }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">{icon}</div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function CakeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
      <path d="M2 21h20" />
      <path d="M7 8v2" />
      <path d="M12 8v2" />
      <path d="M17 8v2" />
      <path d="M7 4h.01" />
      <path d="M12 4h.01" />
      <path d="M17 4h.01" />
    </svg>
  )
}
