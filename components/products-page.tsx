"use client"

import { useState } from "react"
import { Package, Plus, Search, Filter, ArrowUpDown, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductsHeader } from "./products-header"

// Sample product data
const products = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 599,
    image: "/decadent-chocolate-cake.png",
    status: "active",
    stock: 15,
    category: "Cakes",
    description: "Rich chocolate cake with ganache frosting",
    variants: ["500g", "1kg", "2kg"],
    sales: 42,
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    price: 699,
    image: "/classic-red-velvet.png",
    status: "active",
    stock: 8,
    category: "Cakes",
    description: "Classic red velvet with cream cheese frosting",
    variants: ["500g", "1kg", "2kg"],
    sales: 38,
  },
  {
    id: 3,
    name: "Vanilla Cupcakes",
    price: 299,
    image: "/classic-vanilla-cupcakes.png",
    status: "active",
    stock: 24,
    category: "Cupcakes",
    description: "Vanilla cupcakes with buttercream frosting (6pcs)",
    variants: ["6pcs", "12pcs"],
    sales: 56,
  },
  {
    id: 4,
    name: "Blueberry Cheesecake",
    price: 799,
    image: "/blueberry-delight.png",
    status: "active",
    stock: 5,
    category: "Cakes",
    description: "Creamy cheesecake with blueberry topping",
    variants: ["8 inch"],
    sales: 27,
  },
  {
    id: 5,
    name: "Chocolate Chip Cookies",
    price: 199,
    image: "/classic-chocolate-chip-cookies.png",
    status: "active",
    stock: 40,
    category: "Cookies",
    description: "Classic chocolate chip cookies (8pcs)",
    variants: ["8pcs", "16pcs"],
    sales: 65,
  },
  {
    id: 6,
    name: "Strawberry Shortcake",
    price: 649,
    image: "/classic-berry-dessert.png",
    status: "inactive",
    stock: 0,
    category: "Cakes",
    description: "Light vanilla cake with fresh strawberries and cream",
    variants: ["500g", "1kg"],
    sales: 31,
  },
  {
    id: 7,
    name: "Chocolate Brownies",
    price: 249,
    image: "/decadent-chocolate-brownies.png",
    status: "active",
    stock: 18,
    category: "Brownies",
    description: "Fudgy chocolate brownies (4pcs)",
    variants: ["4pcs", "9pcs"],
    sales: 47,
  },
]

export default function ProductsPage() {
  const [view, setView] = useState<"grid" | "table">("grid")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    // Filter by status
    if (filterStatus !== "all" && product.status !== filterStatus) return false

    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <ProductsHeader />

      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select defaultValue="all" onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cakes">Cakes</SelectItem>
                <SelectItem value="cupcakes">Cupcakes</SelectItem>
                <SelectItem value="cookies">Cookies</SelectItem>
                <SelectItem value="brownies">Brownies</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-1">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("grid")}
                className="h-10 w-10"
              >
                <Package className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "table" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("table")}
                className="h-10 w-10"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters (Collapsed by default) */}
        <Card className="mb-2">
          <CardHeader className="py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </CardTitle>
              <Button variant="outline" size="sm">
                Apply Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="Min" className="w-full" />
                  <span>to</span>
                  <Input placeholder="Max" className="w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Stock Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock (≤ 5)</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select defaultValue="name-asc">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    <SelectItem value="stock-asc">Stock (Low to High)</SelectItem>
                    <SelectItem value="stock-desc">Stock (High to Low)</SelectItem>
                    <SelectItem value="sales-desc">Best Selling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12 px-4 border rounded-lg">
            <Package className="h-16 w-16 text-muted-foreground/60 mb-4" />
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchQuery
                ? `No products match your search "${searchQuery}". Try a different search term.`
                : "No products match your current filters. Try adjusting your filters or add a new product."}
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted/30 flex items-center justify-center overflow-hidden">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        <span className={product.stock === 0 ? "text-red-500" : ""}>{product.stock}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === "active" ? "default" : "secondary"}>
                          {product.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full bg-muted/30 relative group">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" variant="secondary">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
        <Badge className="absolute top-2 right-2" variant={product.status === "active" ? "default" : "secondary"}>
          {product.status === "active" ? "Active" : "Inactive"}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <p className="font-bold">₹{product.price}</p>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Label htmlFor={`product-status-${product.id}`} className="text-xs">
              Status
            </Label>
            <Switch id={`product-status-${product.id}`} checked={product.status === "active"} />
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Stock:</span>{" "}
            <span className={product.stock === 0 ? "text-red-500" : ""}>{product.stock}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
