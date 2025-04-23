import Link from "next/link"
import { ArrowLeft, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductListingTutorial() {
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
        <h1 className="text-3xl font-bold mb-2">Product Listing Tutorial</h1>
        <p className="text-muted-foreground">Learn how to create effective product listings for your bakery</p>
      </div>

      <div className="aspect-video w-full bg-muted rounded-lg mb-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Video className="h-12 w-12" />
          <span>Tutorial Video</span>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="mb-4">
            Creating effective product listings is essential for attracting customers and driving sales. This tutorial
            will guide you through the process of creating compelling product listings for your bakery items.
          </p>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Key Elements of a Great Product Listing</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>High-quality product images from multiple angles</li>
                <li>Clear, descriptive title that includes key product features</li>
                <li>Detailed product description highlighting unique selling points</li>
                <li>Accurate pricing and availability information</li>
                <li>Size options and customization possibilities</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step-by-Step Guide</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">1. Navigate to Products</h3>
              <p>Go to the Products section in your dashboard and click "Add Product".</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">2. Upload Product Images</h3>
              <p>Upload high-quality images of your bakery items. Include multiple angles if possible.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">3. Add Product Details</h3>
              <p>Enter the product name, description, price, and other relevant details.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">4. Set Variants and Options</h3>
              <p>Add size options, flavors, or other customization options for your bakery items.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">5. Publish Your Product</h3>
              <p>Review all details and click "Publish" to make your product available in your store.</p>
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/products">Start Creating Products</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
