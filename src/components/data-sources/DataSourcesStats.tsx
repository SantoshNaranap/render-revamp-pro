
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function DataSourcesStats() {
  const stats = [
    {
      title: "Total Sources",
      value: "12",
      icon: Database,
      color: "text-blue-500"
    },
    {
      title: "Trained",
      value: "8",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "Training",
      value: "3",
      icon: Clock,
      color: "text-yellow-500"
    },
    {
      title: "Failed",
      value: "1",
      icon: AlertCircle,
      color: "text-red-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/60 bg-card/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
