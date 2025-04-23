"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, HelpCircle, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SupportPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "support",
      timestamp: "Just now",
    },
  ])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: message,
      sender: "user",
      timestamp: "Just now",
    }

    setMessages([...messages, userMessage])
    setMessage("")

    // Simulate support response after a delay
    setTimeout(() => {
      const supportMessage = {
        id: messages.length + 2,
        content: "Thanks for your message. Our team will get back to you shortly.",
        sender: "support",
        timestamp: "Just now",
      }
      setMessages((prev) => [...prev, supportMessage])
    }, 1000)
  }

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
        <h1 className="text-3xl font-bold mb-2">Support Center</h1>
        <p className="text-muted-foreground">Get help with your Cakesify store</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Help Topics</CardTitle>
              <CardDescription>Browse common help topics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="#" className="flex items-center gap-2 text-sm hover:underline">
                <HelpCircle className="h-4 w-4" />
                Getting Started
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm hover:underline">
                <HelpCircle className="h-4 w-4" />
                Account & Billing
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm hover:underline">
                <HelpCircle className="h-4 w-4" />
                Orders & Delivery
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm hover:underline">
                <HelpCircle className="h-4 w-4" />
                Products & Inventory
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm hover:underline">
                <HelpCircle className="h-4 w-4" />
                Payment Methods
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">support@cakesify.com</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Our support team is available Monday to Friday, 9 AM to 6 PM IST
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Live Chat Support</CardTitle>
              <CardDescription>Chat with our support team</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 space-y-4 overflow-auto mb-4 max-h-[400px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={msg.sender === "user" ? "/placeholder.svg" : "/placeholder.svg?support"}
                        alt={msg.sender}
                      />
                      <AvatarFallback>{msg.sender === "user" ? "U" : "S"}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
