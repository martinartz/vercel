import { Package, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 599,
    image: "/decadent-chocolate-cake.png",
    status: "active",
    stock: 15,
    category: "Cakes",
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    price: 699,
    image: "/classic-red-velvet.png",
    status: "active",
    stock: 8,
    category: "Cakes",
  },
  {
    id: 3,
    name: "Vanilla Cupcakes (6pcs)",
    price: 299,
    image: "/classic-vanilla-cupcakes.png",
    status: "inactive",
    stock: 0,
    category: "Cupcakes",
  },
]

export function ProductDisplay({ view = "sample" }: { view?: "sample" | "empty" }) {
  if (view === "empty") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-4">
        <Package className="h-16 w-16 text-muted-foreground/60 mb-4" />
        <h3 className="text-xl font-medium mb-2">No products yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Start adding products to your store. Products will appear here once created.
        </p>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Add Your First Product
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {sampleProducts
            .filter((product) => product.status === "active")
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {sampleProducts
            .filter((product) => product.status === "inactive")
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-32 h-32 bg-muted/30 flex items-center justify-center shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="max-w-full max-h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <Badge variant={product.status === "active" ? "default" : "secondary"}>
                    {product.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">Category: {product.category}</p>
                <p className="font-medium mt-1">₹{product.price}</p>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`product-status-${product.id}`} className="text-sm">
                      Status:
                    </Label>
                    <div className="flex items-center gap-1">
                      <Switch id={`product-status-${product.id}`} checked={product.status === "active"} />
                      {product.status === "active" ? (
                        <ToggleRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Stock:</span>{" "}
                    <span className={product.stock === 0 ? "text-red-500" : ""}>
                      {product.stock} {product.stock === 1 ? "unit" : "units"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
