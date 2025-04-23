"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Eye,
  HelpCircle,
  Home,
  LifeBuoy,
  LogOut,
  MenuIcon,
  MessageCircle,
  PackageIcon,
  PieChart,
  SettingsIcon,
  Share2,
  ShoppingBag,
  User,
  Users,
} from "lucide-react"

import { BarChart, CreditCardIcon, LayoutDashboard, MessageSquare, Package, Settings, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Import the ShareModal component
import { ShareModal } from "@/components/share-modal"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <MobileSidebar pathname={pathname} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <CakeIcon className="h-8 w-8" />
          <span className="text-xl font-bold">cakesify</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {/* Replace the Share button in the header with ShareModal */}
          <ShareModal>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Share2 className="mr-2 h-4 w-4" />
              Share your store
            </Button>
          </ShareModal>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <DesktopSidebar pathname={pathname} />
        </aside>
        {/* Main content */}
        <main className="flex-1 overflow-auto pt-4 pr-4 pb-4 md:pt-6 md:pr-6 md:pb-6 pl-0">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="h-14 w-14 rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg" asChild>
          <Link href="/chat">
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Customer Chat</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

function DesktopSidebar({ pathname }: { pathname: string }) {
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      href: "/orders",
      icon: ShoppingCart,
    },
    {
      name: "Payments",
      href: "/payments",
      icon: CreditCardIcon,
    },
    {
      name: "Products",
      href: "/products",
      icon: Package,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart,
    },
    {
      name: "Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      name: "Users",
      href: "/users",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div className="space-y-1">
        <SidebarItem href="/" icon={<Home className="h-4 w-4" />} text="Home" isActive={pathname === "/"} />
        <SidebarItem
          href="/orders"
          icon={<ShoppingBag className="h-4 w-4" />}
          text="Orders"
          isActive={pathname === "/orders"}
        />
        <SidebarItem
          href="/products"
          icon={<PackageIcon className="h-4 w-4" />}
          text="Products"
          isActive={pathname.startsWith("/products")}
        />
        <SidebarItem
          href="/payments"
          icon={<CreditCardIcon className="h-4 w-4" />}
          text="Payments"
          isActive={pathname === "/payments"}
        />
        <SidebarItem
          href="/analytics"
          icon={<PieChart className="h-4 w-4" />}
          text="Analytics"
          isActive={pathname === "/analytics"}
        />
        <SidebarItem
          href="/chat"
          icon={<MessageCircle className="h-4 w-4" />}
          text="Customer Chat"
          isActive={pathname === "/chat"}
        />
        <SidebarItem
          href="/settings"
          icon={<SettingsIcon className="h-4 w-4" />}
          text="Settings"
          isActive={pathname.startsWith("/settings")}
        />
        <SidebarItem
          href="/availability"
          icon={<Calendar className="h-4 w-4" />}
          text="Availability"
          isActive={pathname.startsWith("/availability")}
        />
        <SidebarItem
          href="/users"
          icon={<Users className="h-4 w-4" />}
          text="Users"
          isActive={pathname.startsWith("/users")}
        />
        <SidebarItem href="/store" icon={<Eye className="h-4 w-4" />} text="View store" />
      </div>
      <div className="mt-auto space-y-1">
        <SidebarItem href="/help" icon={<HelpCircle className="h-4 w-4" />} text="Help centre" />
        <SidebarItem href="/support" icon={<LifeBuoy className="h-4 w-4" />} text="Contact support" />
      </div>
    </div>
  )
}

function MobileSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div className="flex items-center gap-2 px-4 py-2">
        <CakeIcon className="h-6 w-6" />
        <span className="text-lg font-bold">cakesify</span>
      </div>
      <Separator className="my-2" />
      <div className="flex-1 space-y-1 px-1">
        <SidebarItem href="/" icon={<Home className="h-4 w-4" />} text="Home" isActive={pathname === "/"} />
        <SidebarItem
          href="/orders"
          icon={<ShoppingBag className="h-4 w-4" />}
          text="Orders"
          isActive={pathname === "/orders"}
        />
        <SidebarItem
          href="/products"
          icon={<PackageIcon className="h-4 w-4" />}
          text="Products"
          isActive={pathname.startsWith("/products")}
        />
        <SidebarItem
          href="/payments"
          icon={<CreditCardIcon className="h-4 w-4" />}
          text="Payments"
          isActive={pathname === "/payments"}
        />
        <SidebarItem
          href="/analytics"
          icon={<PieChart className="h-4 w-4" />}
          text="Analytics"
          isActive={pathname === "/analytics"}
        />
        <SidebarItem
          href="/chat"
          icon={<MessageCircle className="h-4 w-4" />}
          text="Customer Chat"
          isActive={pathname === "/chat"}
        />
        <SidebarItem
          href="/settings"
          icon={<SettingsIcon className="h-4 w-4" />}
          text="Settings"
          isActive={pathname.startsWith("/settings")}
        />
        <SidebarItem
          href="/availability"
          icon={<Calendar className="h-4 w-4" />}
          text="Availability"
          isActive={pathname.startsWith("/availability")}
        />
        <SidebarItem
          href="/users"
          icon={<Users className="h-4 w-4" />}
          text="Users"
          isActive={pathname.startsWith("/users")}
        />
        <SidebarItem
          href="/store"
          icon={<Eye className="h-4 w-4" />}
          text="View store"
          isActive={pathname === "/store"}
        />
      </div>
      <Separator className="my-2" />
      <div className="space-y-1 px-1">
        <SidebarItem
          href="/help"
          icon={<HelpCircle className="h-4 w-4" />}
          text="Help centre"
          isActive={pathname === "/help"}
        />
        <SidebarItem
          href="/support"
          icon={<LifeBuoy className="h-4 w-4" />}
          text="Contact support"
          isActive={pathname === "/support"}
        />
      </div>
    </div>
  )
}

function SidebarItem({ href, icon, text, isActive = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

function CakeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
      <path d="M2 21h20" />
      <path d="M7 8v2" />
      <path d="M12 8v2" />
      <path d="M17 8v2" />
      <path d="M7 4h.01" />
      <path d="M12 4h.01" />
      <path d="M17 4h.01" />
    </svg>
  )
}
