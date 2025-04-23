import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TaskCardProps {
  title: string
  description: string
  icon: React.ReactNode
  actionLabel: string
  actionHref?: string
}

export function TaskCard({ title, description, icon, actionLabel, actionHref }: TaskCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">{icon}</div>
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {actionHref ? (
        <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs whitespace-nowrap" asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : (
        <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs whitespace-nowrap">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
