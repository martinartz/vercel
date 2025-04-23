import Link from "next/link"
import {
  Search,
  UserPlus,
  Play,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingBag,
  Settings,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UsersPage() {
  // Sample bakery staff users
  const users = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@sweetdelights.com",
      role: "Manager",
      status: "Active",
      lastActive: "2 hours ago",
      avatarUrl: "/stylized-initials.png",
      permissions: ["Orders", "Products", "Customers", "Analytics", "Settings"],
      joinDate: "Jan 15, 2023",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@sweetdelights.com",
      role: "Baker",
      status: "Active",
      lastActive: "1 day ago",
      avatarUrl: "/microphone-crowd.png",
      permissions: ["Orders", "Products"],
      joinDate: "Mar 10, 2023",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      email: "emma@sweetdelights.com",
      role: "Order Fulfillment",
      status: "Active",
      lastActive: "3 hours ago",
      avatarUrl: "/emergency-room-scene.png",
      permissions: ["Orders", "Customers"],
      joinDate: "Feb 5, 2023",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david@sweetdelights.com",
      role: "Customer Support",
      status: "Active",
      lastActive: "3 days ago",
      avatarUrl: "/abstract-geometric-dk.png",
      permissions: ["Orders", "Customers"],
      joinDate: "Apr 20, 2023",
    },
    {
      id: "5",
      name: "Olivia Wilson",
      email: "olivia@sweetdelights.com",
      role: "Inventory Manager",
      status: "Invited",
      lastActive: "Never",
      avatarUrl: "/surprised-owl.png",
      permissions: ["Products", "Analytics"],
      joinDate: "Pending",
    },
  ]

  // Tutorial videos for bakery staff management
  const tutorials = [
    {
      id: "1",
      title: "Adding Team Members",
      description: "Learn how to add and manage your bakery staff",
      thumbnail: "/staff-management.png",
      duration: "4:32",
    },
    {
      id: "2",
      title: "Setting Up Permissions",
      description: "How to configure access rights for your team",
      thumbnail: "/permissions-setup.png",
      duration: "3:15",
    },
    {
      id: "3",
      title: "Staff Training Guide",
      description: "Best practices for onboarding new bakery staff",
      thumbnail: "/staff-training.png",
      duration: "5:47",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Add and manage staff members for your bakery business.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      {/* Tutorial Videos Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={tutorial.thumbnail || "/placeholder.svg"}
                alt={tutorial.title}
                className="w-full h-[180px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {tutorial.duration}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{tutorial.title}</CardTitle>
              <CardDescription>{tutorial.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Bakery Staff Management */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage access and permissions for your bakery staff.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="baker">Baker</SelectItem>
                  <SelectItem value="order">Order Fulfillment</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="inventory">Inventory Manager</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="invited">Invited</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 pb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search team members..." className="h-9" />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 2).map((permission) => (
                        <PermissionBadge key={permission} permission={permission} />
                      ))}
                      {user.permissions.length > 2 && (
                        <Badge variant="outline" className="bg-gray-100">
                          +{user.permissions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link href={`/users/${user.id}`} className="flex w-full">
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        {user.status === "Invited" && <DropdownMenuItem>Resend Invitation</DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          {user.status === "Active" ? "Deactivate Account" : "Activate Account"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Showing 5 of 5 team members</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// Helper components for badges
function RoleBadge({ role }: { role: string }) {
  const roleStyles = {
    Manager: "bg-blue-100 text-blue-800 border-blue-200",
    Baker: "bg-purple-100 text-purple-800 border-purple-200",
    "Order Fulfillment": "bg-green-100 text-green-800 border-green-200",
    "Customer Support": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Inventory Manager": "bg-orange-100 text-orange-800 border-orange-200",
  }

  const style = roleStyles[role as keyof typeof roleStyles] || "bg-gray-100 text-gray-800 border-gray-200"

  return (
    <Badge variant="outline" className={style}>
      {role}
    </Badge>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Active") {
    return (
      <div className="flex items-center gap-1">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>Active</span>
      </div>
    )
  } else if (status === "Invited") {
    return (
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4 text-yellow-500" />
        <span>Invited</span>
      </div>
    )
  } else if (status === "Inactive") {
    return (
      <div className="flex items-center gap-1">
        <XCircle className="h-4 w-4 text-red-500" />
        <span>Inactive</span>
      </div>
    )
  }

  return <span>{status}</span>
}

function PermissionBadge({ permission }: { permission: string }) {
  const permissionIcons = {
    Orders: <ShoppingBag className="h-3 w-3 mr-1" />,
    Products: <Calendar className="h-3 w-3 mr-1" />,
    Customers: <UserPlus className="h-3 w-3 mr-1" />,
    Analytics: <Filter className="h-3 w-3 mr-1" />,
    Settings: <Settings className="h-3 w-3 mr-1" />,
  }

  const icon = permissionIcons[permission as keyof typeof permissionIcons]

  return (
    <Badge variant="outline" className="bg-gray-50 text-xs flex items-center">
      {icon}
      {permission}
    </Badge>
  )
}
