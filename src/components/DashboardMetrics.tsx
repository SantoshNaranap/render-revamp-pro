
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  UserCheck,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { TimePeriod } from "@/components/TimePeriodFilter"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
}

interface DashboardMetricsProps {
  timePeriod: TimePeriod
}

function MetricCard({ title, value, subtitle, change, isPositive, icon }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden group transition-all duration-300 border-border/60 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-bold text-foreground tracking-tight">{value}</div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{subtitle}</span>
          <Badge 
            variant="outline" 
            className={`text-xs font-medium px-2 py-1 ${
              isPositive 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20" 
                : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
            } transition-colors duration-200`}
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

export function DashboardMetrics({ timePeriod }: DashboardMetricsProps) {
  // Mock data based on time period
  const getMetricData = () => {
    switch (timePeriod) {
      case 'day':
        return {
          conversations: { value: "342", subtitle: "Last 24 hours", change: "8.2%" },
          users: { value: "127", subtitle: "Active users today", change: "15.1%" },
          retention: { value: "82.1%", subtitle: "Daily retention", change: "3.4%" },
          dropOff: { value: "12.8%", subtitle: "Same-day exits", change: "-1.2%" }
        }
      case 'week':
        return {
          conversations: { value: "2,847", subtitle: "Last 7 days", change: "18.5%" },
          users: { value: "1,653", subtitle: "Weekly active users", change: "12.3%" },
          retention: { value: "78.2%", subtitle: "7-day retention rate", change: "5.7%" },
          dropOff: { value: "15.4%", subtitle: "Weekly exits", change: "-2.1%" }
        }
      case 'month':
        return {
          conversations: { value: "12,847", subtitle: "Last 30 days", change: "24.7%" },
          users: { value: "6,234", subtitle: "Monthly active users", change: "18.9%" },
          retention: { value: "68.9%", subtitle: "30-day retention", change: "7.2%" },
          dropOff: { value: "18.7%", subtitle: "Monthly exits", change: "-3.8%" }
        }
      case 'year':
        return {
          conversations: { value: "147,523", subtitle: "Last 12 months", change: "32.1%" },
          users: { value: "28,945", subtitle: "Yearly active users", change: "28.4%" },
          retention: { value: "61.3%", subtitle: "Annual retention", change: "11.5%" },
          dropOff: { value: "22.1%", subtitle: "Annual exits", change: "-5.2%" }
        }
    }
  }

  const data = getMetricData()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Conversations"
        value={data.conversations.value}
        subtitle={data.conversations.subtitle}
        change={data.conversations.change}
        isPositive={true}
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <MetricCard
        title="Unique Users"
        value={data.users.value}
        subtitle={data.users.subtitle}
        change={data.users.change}
        isPositive={true}
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="User Retention"
        value={data.retention.value}
        subtitle={data.retention.subtitle}
        change={data.retention.change}
        isPositive={true}
        icon={<UserCheck className="h-4 w-4" />}
      />
      <MetricCard
        title="Drop Off Rate"
        value={data.dropOff.value}
        subtitle={data.dropOff.subtitle}
        change={data.dropOff.change.replace('-', '')}
        isPositive={data.dropOff.change.startsWith('-')}
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  )
}
