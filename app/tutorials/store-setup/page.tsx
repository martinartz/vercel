import Link from "next/link"
import { ArrowLeft, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function StoreSetupTutorial() {
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
        <h1 className="text-3xl font-bold mb-2">Setting Up Your Store</h1>
        <p className="text-muted-foreground">Complete guide to configuring your bakery store settings</p>
      </div>

      <div className="aspect-video w-full bg-muted rounded-lg mb-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Settings className="h-12 w-12" />
          <span>Tutorial Video</span>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Store Configuration Basics</h2>
          <p className="mb-4">
            Properly setting up your store is crucial for a smooth operation. This guide will walk you through all the
            essential settings you need to configure.
          </p>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Essential Store Settings</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Store profile and branding</li>
                <li>Payment methods and account details</li>
                <li>Delivery zones and shipping options</li>
                <li>Business hours and availability</li>
                <li>Tax and legal information</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step-by-Step Setup Guide</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">1. Complete Your Profile</h3>
              <p>Add your store name, description, and upload your logo and banner images.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">2. Configure Payment Settings</h3>
              <p>Add your bank details, PAN card, and set up payment methods for your customers.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">3. Set Delivery Options</h3>
              <p>Define your delivery zones, fees, and minimum order values.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">4. Configure Business Hours</h3>
              <p>Set your regular business hours and special holiday schedules.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">5. Add Legal Information</h3>
              <p>Upload your FSSAI certificate and other required legal documents.</p>
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/settings">Configure Your Store</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
