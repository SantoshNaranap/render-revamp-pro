
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Resolved', value: 465, color: '#10b981' },
  { name: 'Pending', value: 89, color: '#f59e0b' },
  { name: 'In Progress', value: 156, color: '#3b82f6' },
]

export function ConversationStatus() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Conversation Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="ml-6 space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <div className="text-sm font-medium text-foreground">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
