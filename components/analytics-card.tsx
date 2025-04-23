import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AnalyticsCard({ title, value, change, trend, description }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-3xl font-bold">{value}</p>
        <div className="mt-2 flex items-center">
          {trend === "up" && <ArrowUp className="mr-1 h-4 w-4 text-green-500" />}
          {trend === "down" && <ArrowDown className="mr-1 h-4 w-4 text-red-500" />}
          {trend === "neutral" && <Minus className="mr-1 h-4 w-4 text-muted-foreground" />}
          <span
            className={`text-sm font-medium ${
              trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {change}
          </span>
          {description && <span className="ml-1 text-xs text-muted-foreground">{description}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
