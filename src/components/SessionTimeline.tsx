import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { TimePeriod } from "@/components/TimePeriodFilter"

interface SessionTimelineProps {
  timePeriod: TimePeriod
}

export function SessionTimeline({ timePeriod }: SessionTimelineProps) {
  const getTimelineData = () => {
    switch (timePeriod) {
      case 'day':
        return [
          { time: '00:00', sessions_start: 12, sessions_end: 8, chatbot_opened: 15, chatbot_closed: 13 },
          { time: '06:00', sessions_start: 45, sessions_end: 38, chatbot_opened: 52, chatbot_closed: 48 },
          { time: '12:00', sessions_start: 127, sessions_end: 115, chatbot_opened: 143, chatbot_closed: 138 },
          { time: '18:00', sessions_start: 89, sessions_end: 84, chatbot_opened: 98, chatbot_closed: 92 }
        ]
      case 'week':
        return [
          { time: 'Mon', sessions_start: 892, sessions_end: 845, chatbot_opened: 967, chatbot_closed: 923 },
          { time: 'Tue', sessions_start: 1247, sessions_end: 1189, chatbot_opened: 1356, chatbot_closed: 1298 },
          { time: 'Wed', sessions_start: 1456, sessions_end: 1398, chatbot_opened: 1587, chatbot_closed: 1523 },
          { time: 'Thu', sessions_start: 1389, sessions_end: 1334, chatbot_opened: 1501, chatbot_closed: 1447 },
          { time: 'Fri', sessions_start: 1678, sessions_end: 1612, chatbot_opened: 1823, chatbot_closed: 1756 },
          { time: 'Sat', sessions_start: 987, sessions_end: 934, chatbot_opened: 1078, chatbot_closed: 1023 },
          { time: 'Sun', sessions_start: 1094, sessions_end: 1047, chatbot_opened: 1189, chatbot_closed: 1134 }
        ]
      case 'month':
        return [
          { time: 'Week 1', sessions_start: 8743, sessions_end: 8234, chatbot_opened: 9456, chatbot_closed: 9089 },
          { time: 'Week 2', sessions_start: 9456, sessions_end: 8967, chatbot_opened: 10234, chatbot_closed: 9823 },
          { time: 'Week 3', sessions_start: 8234, sessions_end: 7789, chatbot_opened: 8967, chatbot_closed: 8456 },
          { time: 'Week 4', sessions_start: 8459, sessions_end: 8012, chatbot_opened: 9189, chatbot_closed: 8798 }
        ]
      case 'year':
        return [
          { time: 'Jan', sessions_start: 32456, sessions_end: 30789, chatbot_opened: 35234, chatbot_closed: 33897 },
          { time: 'Feb', sessions_start: 28934, sessions_end: 27456, chatbot_opened: 31456, chatbot_closed: 30123 },
          { time: 'Mar', sessions_start: 35678, sessions_end: 33987, chatbot_opened: 38765, chatbot_closed: 37234 },
          { time: 'Apr', sessions_start: 31234, sessions_end: 29678, chatbot_opened: 33987, chatbot_closed: 32456 },
          { time: 'May', sessions_start: 36789, sessions_end: 35123, chatbot_opened: 39876, chatbot_closed: 38456 },
          { time: 'Jun', sessions_start: 34567, sessions_end: 32890, chatbot_opened: 37654, chatbot_closed: 36123 }
        ]
    }
  }

  const data = getTimelineData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Session & Chatbot Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sessions_start" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Sessions Started"
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="sessions_end" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                name="Sessions Ended"
                dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="chatbot_opened" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="Chatbot Opened"
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="chatbot_closed" 
                stroke="hsl(var(--muted))" 
                strokeWidth={2}
                name="Chatbot Closed"
                dot={{ fill: 'hsl(var(--muted))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}