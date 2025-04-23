import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProcessingOrdersTutorial() {
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
        <h1 className="text-3xl font-bold mb-2">Processing Orders</h1>
        <p className="text-muted-foreground">How to manage and fulfill customer orders efficiently</p>
      </div>

      <div className="aspect-video w-full bg-muted rounded-lg mb-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ShoppingBag className="h-12 w-12" />
          <span>Tutorial Video</span>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Order Management Basics</h2>
          <p className="mb-4">
            Efficiently managing orders is key to customer satisfaction. This tutorial will guide you through the
            process of handling orders from receipt to delivery.
          </p>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Order Lifecycle</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Receiving and confirming new orders</li>
                <li>Processing payments</li>
                <li>Preparing orders</li>
                <li>Arranging delivery or pickup</li>
                <li>Handling order issues and returns</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step-by-Step Order Processing</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">1. Receive Order Notification</h3>
              <p>Get notified when a new order comes in via email, SMS, or app notification.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">2. Review Order Details</h3>
              <p>Check the order items, delivery address, and special instructions.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">3. Confirm and Process Order</h3>
              <p>Accept the order and begin preparation. Update the order status to "Processing".</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">4. Prepare for Delivery/Pickup</h3>
              <p>Package the order securely and prepare it for delivery or customer pickup.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">5. Complete the Order</h3>
              <p>Mark the order as "Completed" once delivered or picked up by the customer.</p>
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/orders">Manage Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
