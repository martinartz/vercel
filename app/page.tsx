"use client"

// Update the page to work with the new layout
// Remove the Dashboard component and use a simpler component structure

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  Eye,
  FileText,
  Package,
  Share2,
  ShoppingBag,
  Video,
  Check,
  Info,
  Plus,
  Settings,
  BarChart3,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

// Import the ShareModal component
import { ShareModal } from "@/components/share-modal"

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, Cakesify!</h1>
          <p className="text-muted-foreground">Let's get your store ready for customers.</p>
        </div>
        {/* Replace the Share button with ShareModal */}
        <ShareModal>
          <Button className="hidden sm:flex">
            <Share2 className="mr-2 h-4 w-4" />
            Share your store
          </Button>
        </ShareModal>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Store Setup Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Complete Your Store Setup</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/settings">View all tasks</Link>
              </Button>
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
                actionHref="/settings"
              />
              <TaskCard
                title="Add Bank Details"
                description="Connect your bank account for payouts"
                icon={<CreditCard className="h-5 w-5" />}
                actionLabel="Add"
                actionHref="/settings"
              />
              <TaskCard
                title="Add Store Description"
                description="Tell customers about your store"
                icon={<FileText className="h-5 w-5" />}
                actionLabel="Add"
                actionHref="/settings"
              />
              <TaskCard
                title="Add Your First Product"
                description="Start building your product catalog"
                icon={<Package className="h-5 w-5" />}
                actionLabel="Add Product"
                actionHref="/products"
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
            <Button variant="outline" className="w-full" asChild>
              <Link href="/analytics">View analytics</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Learning Resources Section */}
      {/* Tutorial Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/tutorials/product-listing" className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium">Product Listing Tutorial</h3>
              <p className="text-sm text-muted-foreground">Learn how to create effective product listings</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/tutorials/store-setup" className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium">Setting Up Your Store</h3>
              <p className="text-sm text-muted-foreground">Complete guide to configuring your store settings</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/tutorials/processing-orders" className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium">Processing Orders</h3>
              <p className="text-sm text-muted-foreground">How to manage and fulfill customer orders</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link href="/activity">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
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

      {/* Action Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/products" className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Add Product</h3>
                  <p className="text-sm text-muted-foreground">Create your first product listing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/settings" className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Customize Store</h3>
                  <p className="text-sm text-muted-foreground">Personalize your store appearance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/analytics" className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Check your store performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/support" className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Get Help</h3>
                  <p className="text-sm text-muted-foreground">Contact support for assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      <Button className="mt-6" asChild>
        <Link href="/products">
          <Plus className="mr-2 h-4 w-4" />
          Add Products
        </Link>
      </Button>
    </>
  )
}

function TaskCard({ title, description, icon, actionLabel, actionHref }) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">{icon}</div>
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs whitespace-nowrap" asChild>
        <Link href={actionHref}>{actionLabel}</Link>
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
    <div className="flex items-center space-x-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconColor}`}>{icon}</div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}
