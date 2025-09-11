import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { TimePeriod } from "@/components/TimePeriodFilter"

interface ConversationFlowProps {
  timePeriod: TimePeriod
}

export function ConversationFlow({ timePeriod }: ConversationFlowProps) {
  const getFlowData = () => {
    switch (timePeriod) {
      case 'day':
        return [
          { event: 'Sessions', count: 1247 },
          { event: 'Chatbot Opens', count: 892 },
          { event: 'Conversations Started', count: 673 },
          { event: 'Conversations Ended', count: 587 },
          { event: 'Conversations Abandoned', count: 67 },
          { event: 'Conversations Resumed', count: 89 }
        ]
      case 'week':
        return [
          { event: 'Sessions', count: 8743 },
          { event: 'Chatbot Opens', count: 6241 },
          { event: 'Conversations Started', count: 4512 },
          { event: 'Conversations Ended', count: 3987 },
          { event: 'Conversations Abandoned', count: 456 },
          { event: 'Conversations Resumed', count: 623 }
        ]
      case 'month':
        return [
          { event: 'Sessions', count: 34892 },
          { event: 'Chatbot Opens', count: 28176 },
          { event: 'Conversations Started', count: 19847 },
          { event: 'Conversations Ended', count: 17234 },
          { event: 'Conversations Abandoned', count: 1847 },
          { event: 'Conversations Resumed', count: 2456 }
        ]
      case 'year':
        return [
          { event: 'Sessions', count: 421567 },
          { event: 'Chatbot Opens', count: 347892 },
          { event: 'Conversations Started', count: 234521 },
          { event: 'Conversations Ended', count: 201834 },
          { event: 'Conversations Abandoned', count: 22156 },
          { event: 'Conversations Resumed', count: 29847 }
        ]
    }
  }

  const data = getFlowData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Count: <span className="font-semibold text-primary">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Conversation Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="event" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}