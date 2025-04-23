"use client"

import { useState } from "react"
import { CalendarIcon, Plus, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

// Sample product data
const products = [
  { id: 1, name: "Chocolate Cake", price: 599 },
  { id: 2, name: "Vanilla Cake", price: 499 },
  { id: 3, name: "Red Velvet Cake", price: 699 },
  { id: 4, name: "Black Forest Cake", price: 799 },
  { id: 5, name: "Pineapple Cake", price: 549 },
  { id: 6, name: "Butterscotch Cake", price: 649 },
  { id: 7, name: "Fruit Cake", price: 599 },
  { id: 8, name: "Coffee Cake", price: 649 },
]

export function CreateOrderDialog({ open, onOpenChange }) {
  const [orderType, setOrderType] = useState("delivery")
  const [date, setDate] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [openProductSelector, setOpenProductSelector] = useState(false)

  const addProduct = (product) => {
    setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    setOpenProductSelector(false)
  }

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    setSelectedProducts(
      selectedProducts.map((p) => (p.id === productId ? { ...p, quantity: Math.max(1, quantity) } : p)),
    )
  }

  const calculateSubtotal = () => {
    return selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
  }

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.18) // 18% GST
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the order data to your backend
    console.log("Order submitted")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>Create a new order for your customer. Fill in all the required details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Name</Label>
                  <Input id="customer-name" placeholder="Customer name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-phone">Phone</Label>
                  <Input id="customer-phone" placeholder="Phone number" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input id="customer-email" type="email" placeholder="Email address" />
              </div>
            </div>

            <Separator />

            {/* Order Type */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Order Type</h3>
              <RadioGroup
                defaultValue="delivery"
                value={orderType}
                onValueChange={setOrderType}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Pickup</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Delivery Address (only shown if delivery is selected) */}
            {orderType === "delivery" && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Delivery Address</h3>
                <div className="space-y-2">
                  <Label htmlFor="address-line1">Address Line 1</Label>
                  <Input id="address-line1" placeholder="Street address" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address-line2">Address Line 2 (Optional)</Label>
                  <Input id="address-line2" placeholder="Apartment, suite, etc." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" placeholder="Pincode" required />
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Date and Time */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">{orderType === "delivery" ? "Delivery Date" : "Pickup Date"}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-11">9:00 AM - 11:00 AM</SelectItem>
                      <SelectItem value="11-1">11:00 AM - 1:00 PM</SelectItem>
                      <SelectItem value="1-3">1:00 PM - 3:00 PM</SelectItem>
                      <SelectItem value="3-5">3:00 PM - 5:00 PM</SelectItem>
                      <SelectItem value="5-7">5:00 PM - 7:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Products */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Products</h3>
                <Popover open={openProductSelector} onOpenChange={setOpenProductSelector}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Search products..." />
                      <CommandList>
                        <CommandEmpty>No products found.</CommandEmpty>
                        <CommandGroup>
                          {products.map((product) => (
                            <CommandItem
                              key={product.id}
                              onSelect={() => addProduct(product)}
                              className="flex justify-between"
                            >
                              <span>{product.name}</span>
                              <span>₹{product.price}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {selectedProducts.length === 0 ? (
                <div className="rounded-md border border-dashed p-6 text-center">
                  <p className="text-sm text-muted-foreground">No products added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{product.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          >
                            <span>-</span>
                          </Button>
                          <Input
                            className="h-8 w-12 rounded-none text-center"
                            value={product.quantity}
                            onChange={(e) => updateQuantity(product.id, Number.parseInt(e.target.value) || 1)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          >
                            <span>+</span>
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => removeProduct(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-md bg-muted p-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{calculateSubtotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Tax (18% GST)</span>
                      <span>₹{calculateTax()}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Special Instructions */}
            <div className="space-y-2">
              <Label htmlFor="special-instructions">Special Instructions</Label>
              <Textarea
                id="special-instructions"
                placeholder="Any special instructions for this order..."
                className="min-h-[80px]"
              />
            </div>

            <Separator />

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Payment Method</h3>
              <RadioGroup defaultValue="cod" className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">Online Payment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={selectedProducts.length === 0}>
              Create Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
