export type UserRole = "owner" | "admin" | "manager" | "staff" | "viewer"

export interface Permission {
  id: string
  name: string
  description: string
  category: "orders" | "products" | "customers" | "analytics" | "settings" | "users"
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[] // Permission IDs
  isDefault?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: UserRole
  status: "active" | "invited" | "disabled"
  lastActive?: string
  createdAt: string
}
