
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Star,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
}

function MetricCard({ title, value, subtitle, change, isPositive, icon }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary/70">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{subtitle}</span>
          <Badge 
            variant="outline" 
            className={`text-xs ${
              isPositive 
                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-1" />
            )}
            {change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Conversations"
        value="1,234"
        subtitle="89 active"
        change="12.5% from last period"
        isPositive={true}
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <MetricCard
        title="Total Messages"
        value="15,678"
        subtitle="Avg 12.7/conversation"
        change="3.2% from last period"
        isPositive={false}
        icon={<TrendingUp className="h-4 w-4" />}
      />
      <MetricCard
        title="Active Users"
        value="234"
        subtitle="456 total"
        change="8.9% from last period"
        isPositive={true}
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="Satisfaction Score"
        value="4.5/5"
        subtitle="Based on 1.2k ratings"
        change="2.1% from last period"
        isPositive={true}
        icon={<Star className="h-4 w-4" />}
      />
    </div>
  )
}
