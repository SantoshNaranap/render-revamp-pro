
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

export function DashboardMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Conversations"
        value="2,847"
        subtitle="Today: 342 conversations"
        change="18.5%"
        isPositive={true}
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <MetricCard
        title="Unique Users"
        value="1,653"
        subtitle="Monthly active users"
        change="12.3%"
        isPositive={true}
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="User Retention"
        value="78.2%"
        subtitle="7-day retention rate"
        change="5.7%"
        isPositive={true}
        icon={<UserCheck className="h-4 w-4" />}
      />
      <MetricCard
        title="Drop Off Rate"
        value="15.4%"
        subtitle="Early conversation exits"
        change="2.1%"
        isPositive={false}
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  )
}
