import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Square, 
  MessageCircle,
  X,
  MousePointer,
  AlertTriangle,
  Users2,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { TimePeriod } from "@/components/TimePeriodFilter"

interface EventMetricCardProps {
  title: string
  value: string
  subtitle: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
}

interface EventMetricsProps {
  timePeriod: TimePeriod
}

function EventMetricCard({ title, value, subtitle, change, isPositive, icon }: EventMetricCardProps) {
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

export function EventMetrics({ timePeriod }: EventMetricsProps) {
  // Mock data based on time period for event analytics
  const getEventData = () => {
    switch (timePeriod) {
      case 'day':
        return {
          sessions: { value: "1,247", subtitle: "Sessions started", change: "12.5%" },
          chatbotOpens: { value: "892", subtitle: "Chatbot opens", change: "8.3%" },
          conversations: { value: "673", subtitle: "Conversations started", change: "15.2%" },
          fallbacks: { value: "47", subtitle: "Fallbacks triggered", change: "-2.1%" }
        }
      case 'week':
        return {
          sessions: { value: "8,743", subtitle: "Sessions started", change: "18.7%" },
          chatbotOpens: { value: "6,241", subtitle: "Chatbot opens", change: "14.2%" },
          conversations: { value: "4,512", subtitle: "Conversations started", change: "22.1%" },
          fallbacks: { value: "284", subtitle: "Fallbacks triggered", change: "-5.4%" }
        }
      case 'month':
        return {
          sessions: { value: "34,892", subtitle: "Sessions started", change: "25.3%" },
          chatbotOpens: { value: "28,176", subtitle: "Chatbot opens", change: "19.8%" },
          conversations: { value: "19,847", subtitle: "Conversations started", change: "31.2%" },
          fallbacks: { value: "1,156", subtitle: "Fallbacks triggered", change: "-8.7%" }
        }
      case 'year':
        return {
          sessions: { value: "421,567", subtitle: "Sessions started", change: "42.1%" },
          chatbotOpens: { value: "347,892", subtitle: "Chatbot opens", change: "38.5%" },
          conversations: { value: "234,521", subtitle: "Conversations started", change: "45.7%" },
          fallbacks: { value: "12,847", subtitle: "Fallbacks triggered", change: "-15.2%" }
        }
    }
  }

  const data = getEventData()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <EventMetricCard
        title="Sessions Started"
        value={data.sessions.value}
        subtitle={data.sessions.subtitle}
        change={data.sessions.change}
        isPositive={true}
        icon={<Play className="h-4 w-4" />}
      />
      <EventMetricCard
        title="Chatbot Opens"
        value={data.chatbotOpens.value}
        subtitle={data.chatbotOpens.subtitle}
        change={data.chatbotOpens.change}
        isPositive={true}
        icon={<MessageCircle className="h-4 w-4" />}
      />
      <EventMetricCard
        title="Conversations"
        value={data.conversations.value}
        subtitle={data.conversations.subtitle}
        change={data.conversations.change}
        isPositive={true}
        icon={<Users2 className="h-4 w-4" />}
      />
      <EventMetricCard
        title="Fallbacks"
        value={data.fallbacks.value}
        subtitle={data.fallbacks.subtitle}
        change={data.fallbacks.change.replace('-', '')}
        isPositive={data.fallbacks.change.startsWith('-')}
        icon={<AlertTriangle className="h-4 w-4" />}
      />
    </div>
  )
}