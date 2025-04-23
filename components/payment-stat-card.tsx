import { Card, CardContent } from "@/components/ui/card"

export function PaymentStatCard({ title, value, change, icon, bgColor, iconColor }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
            {change && <p className="mt-1 text-xs font-medium text-muted-foreground">{change}</p>}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
