"use client"

import { useState } from "react"
import { MapPin, Truck, Store, User, CreditCard, ImageIcon, Bell, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SettingsHeader } from "./settings-header"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [additionalCharges, setAdditionalCharges] = useState(10)
  const [maxDeliveryArea, setMaxDeliveryArea] = useState(10)
  const [isEditing, setIsEditing] = useState({
    storeName: false,
    pan: false,
    bankDetails: false,
    name: false,
    phone: false,
    email: false,
    storeDescription: false,
  })

  const handleEdit = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <SettingsHeader />
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 space-y-4">
          <div className="flex flex-col items-center p-6 bg-muted/40 rounded-lg">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src="/cozy-corner-bakery.png" alt="Store" />
              <AvatarFallback>BB</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-medium">Blue Bakes</h3>
              <p className="text-sm text-muted-foreground">Premium Bakery</p>
              <Badge variant="outline" className="mt-2">
                Active
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              <ImageIcon className="mr-2 h-4 w-4" />
              Change Image
            </Button>
          </div>

          <div className="space-y-1">
            <Button
              variant={activeTab === "account" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("account")}
            >
              <User className="mr-2 h-4 w-4" />
              Account
            </Button>
            <Button
              variant={activeTab === "store" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("store")}
            >
              <Store className="mr-2 h-4 w-4" />
              Store Details
            </Button>
            <Button
              variant={activeTab === "delivery" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("delivery")}
            >
              <Truck className="mr-2 h-4 w-4" />
              Delivery Settings
            </Button>
            <Button
              variant={activeTab === "location" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("location")}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </Button>
            <Button
              variant={activeTab === "payments" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("payments")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Payment Methods
            </Button>
            <Button
              variant={activeTab === "notifications" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant={activeTab === "security" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("security")}
            >
              <Lock className="mr-2 h-4 w-4" />
              Security
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Account Tab */}
          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Manage your personal account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                      {isEditing.name ? (
                        <Input className="mt-1 max-w-md" defaultValue="Martin Maravattickal" />
                      ) : (
                        <p className="font-medium">Martin Maravattickal</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit("name")}>
                      {isEditing.name ? "Save" : "Edit"}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      {isEditing.email ? (
                        <Input className="mt-1 max-w-md" defaultValue="cakesify@gmail.com" type="email" />
                      ) : (
                        <p className="font-medium">cakesify@gmail.com</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit("email")}>
                      {isEditing.email ? "Save" : "Edit"}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                      {isEditing.phone ? (
                        <Input className="mt-1 max-w-md" defaultValue="+919841968501" />
                      ) : (
                        <p className="font-medium">+919841968501</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit("phone")}>
                      {isEditing.phone ? "Save" : "Edit"}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                      <p className="font-medium">6th cross Street, kaggadasapura, Bengaluru, Karnataka 560093</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Store Details Tab */}
          {activeTab === "store" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Store className="mr-2 h-5 w-5" />
                  Store Details
                </CardTitle>
                <CardDescription>Manage your store information and legal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Store Name</h3>
                      {isEditing.storeName ? (
                        <Input className="mt-1 max-w-md" defaultValue="Blue Bakes" />
                      ) : (
                        <p className="font-medium">Blue Bakes</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit("storeName")}>
                      {isEditing.storeName ? "Save" : "Edit"}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">FSSAI Number</h3>
                      <p className="font-medium">10012063000134</p>
                      <Badge variant="outline" className="mt-1">
                        Verified
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" disabled>
                      Edit
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">PAN</h3>
                      {isEditing.pan ? (
                        <Input className="mt-1 max-w-md" placeholder="Enter PAN number" />
                      ) : (
                        <p className="font-medium text-muted-foreground">Not provided</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit("pan")}>
                      {isEditing.pan ? "Save" : "Add"}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Bank Details</h3>
                      {isEditing.bankDetails ? (
                        <div className="space-y-2 mt-1 max-w-md">
                          <Input placeholder="Account Number" />
                          <Input placeholder="IFSC Code" />
                          <Input placeholder="Account Holder Name" />
                        </div>
                      ) : (
                        <p className="font-medium text-muted-foreground">Not provided</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit("bankDetails")}>
                      {isEditing.bankDetails ? "Save" : "Add"}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="w-full max-w-2xl">
                      <h3 className="text-sm font-medium text-muted-foreground">Store Description</h3>
                      {isEditing.storeDescription ? (
                        <Textarea className="mt-1" placeholder="Describe your store" rows={4} />
                      ) : (
                        <p className="font-medium text-muted-foreground">Not provided</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit("storeDescription")}>
                      {isEditing.storeDescription ? "Save" : "Add"}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Delivery Settings Tab */}
          {activeTab === "delivery" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Delivery Settings
                </CardTitle>
                <CardDescription>Configure your delivery options and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="min-delivery">Minimum Delivery Charges</Label>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="1">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Distance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 km</SelectItem>
                            <SelectItem value="2">2 km</SelectItem>
                            <SelectItem value="3">3 km</SelectItem>
                            <SelectItem value="4">4 km</SelectItem>
                            <SelectItem value="5">5 km</SelectItem>
                          </SelectContent>
                        </Select>
                        <span>₹</span>
                        <Input id="min-delivery" defaultValue="10" className="w-24" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="free-delivery">Free Delivery Threshold</Label>
                      <div className="flex items-center gap-2">
                        <span>₹</span>
                        <Input id="free-delivery" defaultValue="500" className="w-24" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Orders above this amount qualify for free delivery
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Additional Charges</Label>
                      <span className="font-medium">₹{additionalCharges} / km</span>
                    </div>
                    <Slider
                      defaultValue={[10]}
                      max={50}
                      step={1}
                      onValueChange={(value) => setAdditionalCharges(value[0])}
                      className="py-4"
                    />
                    <p className="text-xs text-muted-foreground">
                      Additional charge per kilometer beyond minimum distance
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Maximum Delivery Area</Label>
                      <span className="font-medium">{maxDeliveryArea} km</span>
                    </div>
                    <Slider
                      defaultValue={[10]}
                      max={25}
                      step={1}
                      onValueChange={(value) => setMaxDeliveryArea(value[0])}
                      className="py-4"
                    />
                    <p className="text-xs text-muted-foreground">Maximum distance for delivery services</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Delivery Options</h3>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="self-delivery">Self Delivery</Label>
                        <p className="text-xs text-muted-foreground">Use your own delivery personnel</p>
                      </div>
                      <Switch id="self-delivery" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="partner-delivery">Delivery Partners</Label>
                        <p className="text-xs text-muted-foreground">Use third-party delivery services</p>
                      </div>
                      <Switch id="partner-delivery" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="scheduled-delivery">Scheduled Delivery</Label>
                        <p className="text-xs text-muted-foreground">Allow customers to schedule delivery time</p>
                      </div>
                      <Switch id="scheduled-delivery" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Location Tab */}
          {activeTab === "location" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Store Location
                </CardTitle>
                <CardDescription>Set your store's physical location for orders and deliveries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Order Pickup Location</h3>
                    <p className="mt-1">
                      6th Cross St, Balaji Layout, Kaggadasapura, Bengaluru, Karnataka 560093, India
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Pickup Address
                    </Button>
                  </div>

                  <div className="aspect-video w-full overflow-hidden rounded-md border">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vFnZmqB3TyaF7NeaXRuLV0CA5fws7u.png"
                      alt="Store location map"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Service Area</h3>
                    <p className="text-sm text-muted-foreground">Define the areas where you provide service</p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Primary Service Area</Label>
                        <Select defaultValue="kaggadasapura">
                          <SelectTrigger>
                            <SelectValue placeholder="Select area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kaggadasapura">Kaggadasapura</SelectItem>
                            <SelectItem value="cv-raman-nagar">CV Raman Nagar</SelectItem>
                            <SelectItem value="baiyappanahalli">Baiyappanahalli</SelectItem>
                            <SelectItem value="indiranagar">Indiranagar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Radius</Label>
                        <div className="flex items-center gap-2">
                          <Input defaultValue="10" className="w-24" />
                          <span>km</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Store Hours</h3>
                        <p className="text-sm text-muted-foreground">Set your operating hours</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Hours
                      </Button>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex justify-between p-2 rounded-md bg-muted/50">
                        <span>Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-md bg-muted/50">
                        <span>Saturday</span>
                        <span className="font-medium">10:00 AM - 9:00 PM</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-md bg-muted/50">
                        <span>Sunday</span>
                        <span className="font-medium">10:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "payments" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Configure payment options for your customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="online-payment">Online Payment</Label>
                      <p className="text-xs text-muted-foreground">Accept credit/debit cards and UPI</p>
                    </div>
                    <Switch id="online-payment" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="cod">Cash on Delivery</Label>
                      <p className="text-xs text-muted-foreground">Accept cash payments on delivery</p>
                    </div>
                    <Switch id="cod" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="wallet">Digital Wallets</Label>
                      <p className="text-xs text-muted-foreground">Accept payments via digital wallets</p>
                    </div>
                    <Switch id="wallet" defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Payment Gateway</h3>
                    <Alert>
                      <AlertDescription>
                        Your payment gateway is set up and working correctly. You can receive payments.
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <Label>Gateway Provider</Label>
                        <Select defaultValue="razorpay">
                          <SelectTrigger>
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="razorpay">Razorpay</SelectItem>
                            <SelectItem value="stripe">Stripe</SelectItem>
                            <SelectItem value="paytm">Paytm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Transaction Fee</Label>
                        <div className="flex items-center gap-2">
                          <Input defaultValue="2" className="w-24" />
                          <span>%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Discount & Offers</h3>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="enable-coupons">Enable Coupon Codes</Label>
                        <p className="text-xs text-muted-foreground">Allow customers to use coupon codes</p>
                      </div>
                      <Switch id="enable-coupons" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="enable-discounts">Automatic Discounts</Label>
                        <p className="text-xs text-muted-foreground">Apply automatic discounts based on order value</p>
                      </div>
                      <Switch id="enable-discounts" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="new-order-email">New Order</Label>
                      <p className="text-xs text-muted-foreground">Receive email when a new order is placed</p>
                    </div>
                    <Switch id="new-order-email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="order-status-email">Order Status Updates</Label>
                      <p className="text-xs text-muted-foreground">Receive email when order status changes</p>
                    </div>
                    <Switch id="order-status-email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="payment-email">Payment Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive email for payment events</p>
                    </div>
                    <Switch id="payment-email" defaultChecked />
                  </div>

                  <Separator />

                  <h3 className="font-medium">SMS Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="new-order-sms">New Order</Label>
                      <p className="text-xs text-muted-foreground">Receive SMS when a new order is placed</p>
                    </div>
                    <Switch id="new-order-sms" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="order-status-sms">Order Status Updates</Label>
                      <p className="text-xs text-muted-foreground">Receive SMS when order status changes</p>
                    </div>
                    <Switch id="order-status-sms" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="payment-sms">Payment Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive SMS for payment events</p>
                    </div>
                    <Switch id="payment-sms" />
                  </div>

                  <Separator />

                  <h3 className="font-medium">App Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="app-notifications">Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive push notifications on your mobile device</p>
                    </div>
                    <Switch id="app-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="sound-notifications">Sound Alerts</Label>
                      <p className="text-xs text-muted-foreground">Play sound for important notifications</p>
                    </div>
                    <Switch id="sound-notifications" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Password</h3>

                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <Button>Change Password</Button>

                  <Separator />

                  <h3 className="font-medium">Two-Factor Authentication</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="enable-2fa">Enable 2FA</Label>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="enable-2fa" />
                  </div>

                  <Separator />

                  <h3 className="font-medium">Login Sessions</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Bengaluru, India • Chrome on Windows</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>

                    <Button variant="outline" size="sm">
                      Sign Out of All Devices
                    </Button>
                  </div>

                  <Separator />

                  <h3 className="font-medium">Privacy</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="data-collection">Data Collection</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow us to collect usage data to improve services
                      </p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
