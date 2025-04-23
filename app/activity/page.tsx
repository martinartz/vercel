import Link from "next/link"
import { ArrowLeft, Check, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ActivityPage() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Activity History</h1>
        <p className="text-muted-foreground">Track all activities and changes in your store</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
              <ActivityItem
                icon={<X className="h-4 w-4" />}
                title="Payment method update failed"
                description="There was an issue updating your payment method"
                time="3 days ago"
                iconColor="bg-red-100 text-red-600"
              />
              <ActivityItem
                icon={<Info className="h-4 w-4" />}
                title="Login from new device"
                description="New login detected from Chrome on Windows"
                time="4 days ago"
                iconColor="bg-blue-100 text-blue-600"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No order activity yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No product activity yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
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
