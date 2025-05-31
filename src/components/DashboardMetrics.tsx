
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
        value="1,234"
        subtitle="89 currently active"
        change="12.5%"
        isPositive={true}
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <MetricCard
        title="Messages Processed"
        value="15,678"
        subtitle="Average 12.7 per chat"
        change="3.2%"
        isPositive={false}
        icon={<TrendingUp className="h-4 w-4" />}
      />
      <MetricCard
        title="Active Users"
        value="234"
        subtitle="456 total registered"
        change="8.9%"
        isPositive={true}
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="Satisfaction Score"
        value="4.5/5"
        subtitle="Based on 1.2k reviews"
        change="2.1%"
        isPositive={true}
        icon={<Star className="h-4 w-4" />}
      />
    </div>
  )
}
