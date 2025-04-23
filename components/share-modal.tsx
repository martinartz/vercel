"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Facebook, Instagram, Link, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ShareModalProps {
  children: React.ReactNode
  storeUrl?: string
}

export function ShareModal({ children, storeUrl = "https://cakesify.store/blue-bakes" }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(storeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your store</DialogTitle>
          <DialogDescription>Share your store with customers and on social media</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="link" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>
          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <Input value={storeUrl} readOnly />
              <Button size="sm" onClick={copyToClipboard}>
                {copied ? "Copied!" : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this link with your customers to let them visit your store
            </p>
          </TabsContent>
          <TabsContent value="social" className="mt-4">
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <Facebook className="h-6 w-6" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <Instagram className="h-6 w-6" />
                <span className="text-xs">Instagram</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <Twitter className="h-6 w-6" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <Link className="h-6 w-6" />
                <span className="text-xs">WhatsApp</span>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="embed" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm">Embed your store on your website by adding this code to your HTML:</p>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-xs">
                  {`<iframe src="${storeUrl}" width="100%" height="600" frameborder="0"></iframe>`}
                </code>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<iframe src="${storeUrl}" width="100%" height="600" frameborder="0"></iframe>`,
                  )
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
              >
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
