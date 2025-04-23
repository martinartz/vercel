"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { User, Role, Permission } from "@/types/user-management"

// Sample data
const samplePermissions: Permission[] = [
  {
    id: "orders-view",
    name: "View Orders",
    description: "Can view all orders",
    category: "orders",
  },
  {
    id: "orders-create",
    name: "Create Orders",
    description: "Can create new orders",
    category: "orders",
  },
  {
    id: "orders-edit",
    name: "Edit Orders",
    description: "Can edit existing orders",
    category: "orders",
  },
  {
    id: "orders-delete",
    name: "Delete Orders",
    description: "Can delete orders",
    category: "orders",
  },
  {
    id: "products-view",
    name: "View Products",
    description: "Can view all products",
    category: "products",
  },
  {
    id: "products-create",
    name: "Create Products",
    description: "Can create new products",
    category: "products",
  },
  {
    id: "products-edit",
    name: "Edit Products",
    description: "Can edit existing products",
    category: "products",
  },
  {
    id: "products-delete",
    name: "Delete Products",
    description: "Can delete products",
    category: "products",
  },
  {
    id: "customers-view",
    name: "View Customers",
    description: "Can view all customers",
    category: "customers",
  },
  {
    id: "customers-edit",
    name: "Edit Customers",
    description: "Can edit customer information",
    category: "customers",
  },
  {
    id: "analytics-view",
    name: "View Analytics",
    description: "Can view analytics data",
    category: "analytics",
  },
  {
    id: "settings-view",
    name: "View Settings",
    description: "Can view store settings",
    category: "settings",
  },
  {
    id: "settings-edit",
    name: "Edit Settings",
    description: "Can edit store settings",
    category: "settings",
  },
  {
    id: "users-view",
    name: "View Users",
    description: "Can view all users",
    category: "users",
  },
  {
    id: "users-invite",
    name: "Invite Users",
    description: "Can invite new users",
    category: "users",
  },
  {
    id: "users-edit",
    name: "Edit Users",
    description: "Can edit user information",
    category: "users",
  },
  {
    id: "users-delete",
    name: "Delete Users",
    description: "Can delete users",
    category: "users",
  },
]

const sampleRoles: Role[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Full access to all features",
    permissions: samplePermissions.map((p) => p.id),
    isDefault: true,
  },
  {
    id: "admin",
    name: "Administrator",
    description: "Administrative access to most features",
    permissions: samplePermissions.filter((p) => p.id !== "settings-edit").map((p) => p.id),
  },
  {
    id: "manager",
    name: "Manager",
    description: "Can manage orders, products, and view analytics",
    permissions: samplePermissions
      .filter(
        (p) =>
          p.category === "orders" ||
          p.category === "products" ||
          p.id === "analytics-view" ||
          p.id === "customers-view",
      )
      .map((p) => p.id),
  },
  {
    id: "staff",
    name: "Staff",
    description: "Can view and process orders",
    permissions: ["orders-view", "orders-edit", "products-view", "customers-view"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access",
    permissions: ["orders-view", "products-view", "customers-view", "analytics-view"],
  },
]

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Martin Maravattickal",
    email: "martin@cakesify.com",
    phone: "+919841968501",
    role: "owner",
    status: "active",
    lastActive: "2023-04-20T10:30:00Z",
    createdAt: "2023-01-15T08:00:00Z",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@cakesify.com",
    role: "admin",
    status: "active",
    lastActive: "2023-04-19T16:45:00Z",
    createdAt: "2023-02-10T09:30:00Z",
  },
  {
    id: "3",
    name: "Rahul Patel",
    email: "rahul@cakesify.com",
    phone: "+919876543210",
    role: "manager",
    status: "active",
    lastActive: "2023-04-20T09:15:00Z",
    createdAt: "2023-03-05T11:20:00Z",
  },
  {
    id: "4",
    name: "Ananya Singh",
    email: "ananya@cakesify.com",
    role: "staff",
    status: "active",
    lastActive: "2023-04-18T14:20:00Z",
    createdAt: "2023-03-15T10:00:00Z",
  },
  {
    id: "5",
    name: "Vikram Desai",
    email: "vikram@example.com",
    role: "viewer",
    status: "invited",
    createdAt: "2023-04-10T15:30:00Z",
  },
]

interface UserManagementContextType {
  users: User[]
  roles: Role[]
  permissions: Permission[]
  currentUser: User | null
  addUser: (user: Omit<User, "id" | "createdAt">) => void
  updateUser: (id: string, userData: Partial<User>) => void
  deleteUser: (id: string) => void
  addRole: (role: Omit<Role, "id">) => void
  updateRole: (id: string, roleData: Partial<Role>) => void
  deleteRole: (id: string) => void
  hasPermission: (userId: string, permissionId: string) => boolean
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined)

export function UserManagementProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [roles, setRoles] = useState<Role[]>(sampleRoles)
  const [permissions] = useState<Permission[]>(samplePermissions)
  const [currentUser, setCurrentUser] = useState<User | null>(sampleUsers[0])

  const addUser = (user: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...user,
      id: `${users.length + 1}`,
      createdAt: new Date().toISOString(),
    }
    setUsers([...users, newUser])
  }

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...userData } : user)))

    // Update current user if it's the one being updated
    if (currentUser && currentUser.id === id) {
      setCurrentUser({ ...currentUser, ...userData })
    }
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const addRole = (role: Omit<Role, "id">) => {
    const newRole: Role = {
      ...role,
      id: `role-${roles.length + 1}`,
    }
    setRoles([...roles, newRole])
  }

  const updateRole = (id: string, roleData: Partial<Role>) => {
    setRoles(roles.map((role) => (role.id === id ? { ...role, ...roleData } : role)))
  }

  const deleteRole = (id: string) => {
    // Don't delete default roles
    const roleToDelete = roles.find((role) => role.id === id)
    if (roleToDelete?.isDefault) return

    setRoles(roles.filter((role) => role.id !== id))
  }

  const hasPermission = (userId: string, permissionId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return false

    const role = roles.find((r) => r.id === user.role)
    if (!role) return false

    return role.permissions.includes(permissionId)
  }

  return (
    <UserManagementContext.Provider
      value={{
        users,
        roles,
        permissions,
        currentUser,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
        hasPermission,
      }}
    >
      {children}
    </UserManagementContext.Provider>
  )
}

export function useUserManagement() {
  const context = useContext(UserManagementContext)
  if (context === undefined) {
    throw new Error("useUserManagement must be used within a UserManagementProvider")
  }
  return context
}
