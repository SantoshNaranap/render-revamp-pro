
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'May 25', conversations: 120, messages: 450, users: 89 },
  { name: 'May 26', conversations: 180, messages: 620, users: 125 },
  { name: 'May 27', conversations: 150, messages: 580, users: 110 },
  { name: 'May 28', conversations: 220, messages: 780, users: 165 },
  { name: 'May 29', conversations: 190, messages: 690, users: 140 },
  { name: 'May 30', conversations: 250, messages: 850, users: 180 },
  { name: 'May 31', conversations: 300, messages: 1020, users: 200 },
]

export function ActivityTimeline() {
  return (
    <Card className="border-border/60 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">7-Day Activity Trend</CardTitle>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>
              <span className="text-muted-foreground font-medium">Conversations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></div>
              <span className="text-muted-foreground font-medium">Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm"></div>
              <span className="text-muted-foreground font-medium">Users</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="conversations" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "#3b82f6", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="messages" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "#10b981", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "#f59e0b", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
