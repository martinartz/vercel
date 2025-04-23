"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useUserManagement } from "@/contexts/user-management-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function UserPermissionsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string
  const { users, roles, permissions, updateRole } = useUserManagement()

  const user = users.find((u) => u.id === userId)
  const userRole = roles.find((r) => r.id === user?.role)

  const [activePermissions, setActivePermissions] = useState<string[]>(userRole?.permissions || [])
  const [isSaving, setIsSaving] = useState(false)

  if (!user || !userRole) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/users">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Users
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">User or role not found</p>
            <Button className="mt-4" asChild>
              <Link href="/users">Return to Users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleTogglePermission = (permissionId: string) => {
    setActivePermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId)
      } else {
        return [...prev, permissionId]
      }
    })
  }

  const handleSavePermissions = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      updateRole(userRole.id, { permissions: activePermissions })
      setIsSaving(false)
    }, 1000)
  }

  // Group permissions by category
  const permissionsByCategory = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, typeof permissions>,
  )

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/users/${userId}`}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to User
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">User Permissions</h1>
          <Badge variant="outline" className="ml-2">
            {userRole.name}
          </Badge>
        </div>
        <p className="text-muted-foreground">Manage what {user.name} can access and modify</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Role Permissions
          </CardTitle>
          <CardDescription>
            {user.name} has the role of {userRole.name}. Any changes to permissions will affect all users with this
            role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="orders">
            <TabsList className="mb-4">
              {Object.keys(permissionsByCategory).map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {categoryPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{permission.name}</h3>
                      <p className="text-sm text-muted-foreground">{permission.description}</p>
                    </div>
                    <Switch
                      checked={activePermissions.includes(permission.id)}
                      onCheckedChange={() => handleTogglePermission(permission.id)}
                    />
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSavePermissions} disabled={isSaving}>
            {isSaving ? (
              "Saving Changes..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
