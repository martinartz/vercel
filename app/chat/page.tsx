"use client"

import { useState } from "react"
import { Search, Smile, Paperclip, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data
const conversations = [
  {
    id: 1,
    customer: {
      name: "Rahul Sharma",
      avatar: "/stylized-initials.png",
      lastMessage: "I need a cake for about 15 people. Also, does it come with candles?",
      time: "9:41 AM",
      unread: 2,
      active: true,
    },
  },
  {
    id: 2,
    customer: {
      name: "Priya Patel",
      avatar: "/stylized-initials.png",
      lastMessage: "That would be great, thank you!",
      time: "9:41 AM",
      unread: 0,
    },
  },
  {
    id: 3,
    customer: {
      name: "Amit Kumar",
      avatar: "/stylized-initials.png",
      lastMessage: "We do offer discounts for corporate orders over ₹5000.",
      time: "9:41 AM",
      unread: 0,
    },
  },
  {
    id: 4,
    customer: {
      name: "Sneha Reddy",
      avatar: "/stylized-initials.png",
      lastMessage: "Hey, this is a dummy message",
      time: "9:41 AM",
      unread: 0,
    },
  },
  {
    id: 5,
    customer: {
      name: "Vikram Singh",
      avatar: "/stylized-initials.png",
      lastMessage: "Hey, this is a dummy message",
      time: "9:41 AM",
      unread: 0,
    },
  },
  {
    id: 6,
    customer: {
      name: "Neha Gupta",
      avatar: "/stylized-initials.png",
      lastMessage: "Hey, this is a dummy message",
      time: "9:41 AM",
      unread: 0,
    },
  },
  {
    id: 7,
    customer: {
      name: "Rajesh Khanna",
      avatar: "/stylized-initials.png",
      lastMessage: "Hey, this is a dummy message",
      time: "9:41 AM",
      unread: 0,
    },
  },
  {
    id: 8,
    customer: {
      name: "Ananya Desai",
      avatar: "/stylized-initials.png",
      lastMessage: "Hey, this is a dummy message",
      time: "9:41 AM",
      unread: 0,
    },
  },
  {
    id: 9,
    customer: {
      name: "Kiran Joshi",
      avatar: "/stylized-initials.png",
      lastMessage: "Hey, this is a dummy message",
      time: "9:41 AM",
      unread: 0,
    },
  },
]

const activeConversationMessages = [
  {
    id: 1,
    sender: "customer",
    text: "Hi Owner,",
    time: "9:41 AM",
  },
  {
    id: 2,
    sender: "customer",
    text: "I am interested in ordering a custom cake for my daughter's birthday. She loves unicorns and rainbows. Can you make something with those?",
    time: "9:41 AM",
    image: "/classic-berry-dessert.png",
  },
  {
    id: 3,
    sender: "customer",
    text: "Rahul Sharma",
    details: [
      { label: "Preferred flavor", value: "Chocolate" },
      { label: "Cake size", value: "2 pounds" },
      { label: "Budget", value: "₹1200 - ₹1500" },
    ],
    cta: "View Order Details",
    time: "9:41 AM",
  },
  {
    id: 4,
    sender: "owner",
    text: "Hi Rahul,",
    time: "9:41 AM",
  },
  {
    id: 5,
    sender: "owner",
    text: "This is a dummy text, you can place your words here. We'd be happy to create a unicorn and rainbow themed cake for your daughter's birthday. We have several designs available.",
    time: "9:41 AM",
  },
  {
    id: 6,
    sender: "owner",
    text: "Thank you.",
    time: "9:41 AM",
  },
]

const productDetails = {
  name: "Unicorn Rainbow Cake",
  location: "Cakesify Bakery, Koramangala, Bangalore",
  image1: "/classic-berry-dessert.png",
  image2: "/decadent-chocolate-cake.png",
  details: [
    { category: "Cake Type", value: "Birthday Cake" },
    { category: "Flavor", value: "Chocolate" },
    { category: "Size", value: "2 pounds" },
    { category: "Serves", value: "12-15 people" },
    { category: "Decoration", value: "Fondant" },
    { category: "Allergens", value: "Contains eggs, milk, wheat" },
    { category: "Customization", value: "Available" },
    { category: "Delivery", value: "Available" },
    { category: "Notice Required", value: "48 hours" },
    { category: "Price Range", value: "₹1200 - ₹1500" },
  ],
  amenities: [
    { name: "Eggless Option", available: true },
    { name: "Sugar-free Option", available: true },
    { name: "Gluten-free Option", available: false },
    { name: "Photo Cake", available: true },
    { name: "Tier Cake", available: true },
    { name: "Cupcakes", available: true },
    { name: "Cake Pops", available: true },
    { name: "Personalized Message", available: true },
    { name: "Candles", available: true },
    { name: "Cake Knife", available: true },
  ],
}

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left sidebar - Conversation list */}
      <div className="w-80 border-r">
        <div className="flex items-center justify-between border-b p-4">
          <h1 className="text-xl font-semibold">Inbox</h1>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex cursor-pointer items-start border-b p-4 hover:bg-muted/50 ${
                activeConversation.id === conversation.id ? "bg-muted/50" : ""
              }`}
              onClick={() => setActiveConversation(conversation)}
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage
                  src={conversation.customer.avatar || "/placeholder.svg"}
                  alt={conversation.customer.name}
                />
                <AvatarFallback>
                  {conversation.customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{conversation.customer.name}</div>
                  <div className="text-xs text-muted-foreground">{conversation.customer.time}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="truncate text-sm text-muted-foreground">{conversation.customer.lastMessage}</div>
                  {conversation.customer.unread > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 justify-center rounded-full p-0">
                      {conversation.customer.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Middle section - Chat */}
      <div className="flex flex-1 flex-col border-r">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={activeConversation.customer.avatar || "/placeholder.svg"}
                alt={activeConversation.customer.name}
              />
              <AvatarFallback>
                {activeConversation.customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <div className="font-medium">{activeConversation.customer.name}</div>
              {activeConversation.customer.active && (
                <div className="flex items-center text-xs text-green-600">
                  <div className="mr-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                  Active Now
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          {activeConversationMessages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}
            >
              {message.sender === "customer" && (
                <Avatar className="mr-2 mt-1 h-8 w-8">
                  <AvatarImage
                    src={activeConversation.customer.avatar || "/placeholder.svg"}
                    alt={activeConversation.customer.name}
                  />
                  <AvatarFallback>
                    {activeConversation.customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "customer" ? "bg-muted" : "bg-primary text-primary-foreground"
                }`}
              >
                {message.text}
                {message.image && (
                  <div className="mt-2">
                    <img
                      src={message.image || "/placeholder.svg"}
                      alt="Cake"
                      className="h-40 w-full rounded-md object-cover"
                    />
                  </div>
                )}
                {message.details && (
                  <div className="mt-2 rounded-md border bg-background p-3 text-foreground">
                    {message.details.map((detail, index) => (
                      <div key={index} className="flex justify-between py-1 text-sm">
                        <span className="text-muted-foreground">{detail.label}:</span>
                        <span className="font-medium">{detail.value}</span>
                      </div>
                    ))}
                    <Button size="sm" className="mt-2 w-full">
                      {message.cta}
                    </Button>
                  </div>
                )}
                <div
                  className={`mt-1 text-right text-xs ${
                    message.sender === "customer" ? "text-muted-foreground" : "text-primary-foreground/80"
                  }`}
                >
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Chat input */}
        <div className="border-t p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type your message here..."
              className="mx-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button size="icon" className="rounded-full">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right sidebar - Product details */}
      <div className="w-96">
        <div className="h-[calc(100vh-4rem)] overflow-auto">
          <div className="relative">
            <div className="flex">
              <img
                src={productDetails.image1 || "/placeholder.svg"}
                alt={productDetails.name}
                className="h-40 w-1/2 object-cover"
              />
              <img
                src={productDetails.image2 || "/placeholder.svg"}
                alt={productDetails.name}
                className="h-40 w-1/2 object-cover"
              />
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-xl font-bold">{productDetails.name}</h2>
            <p className="text-sm text-muted-foreground">{productDetails.location}</p>

            <div className="mt-4 space-y-4">
              {/* Product details */}
              {productDetails.details
                .reduce((acc, detail, index) => {
                  if (index % 2 === 0) {
                    acc.push([detail])
                  } else {
                    acc[acc.length - 1].push(detail)
                  }
                  return acc
                }, [] as any[])
                .map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-4">
                    {row.map((detail: any, colIndex: number) => (
                      <div key={colIndex} className="flex-1">
                        <div className="text-sm font-medium">{detail.category}</div>
                        <div className="text-sm">{detail.value}</div>
                      </div>
                    ))}
                  </div>
                ))}

              <Separator />

              {/* Amenities */}
              <div>
                <h3 className="mb-2 font-medium">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {productDetails.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div
                        className={`mr-2 h-2 w-2 rounded-full ${amenity.available ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button className="flex-1">Create Order</Button>
                <Button variant="outline" className="flex-1">
                  Send Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
