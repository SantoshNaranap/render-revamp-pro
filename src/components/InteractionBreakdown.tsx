import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts"
import { TimePeriod } from "@/components/TimePeriodFilter"

interface InteractionBreakdownProps {
  timePeriod: TimePeriod
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--muted))',
  'hsl(var(--destructive))',
  'hsl(217, 91%, 60%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)'
]

export function InteractionBreakdown({ timePeriod }: InteractionBreakdownProps) {
  const getInteractionData = () => {
    switch (timePeriod) {
      case 'day':
        return [
          { name: 'User Messages', value: 1456, color: COLORS[0] },
          { name: 'Bot Responses', value: 1423, color: COLORS[1] },
          { name: 'Link Clicks', value: 234, color: COLORS[2] },
          { name: 'New Chat Clicks', value: 187, color: COLORS[3] },
          { name: 'Conversations Resumed', value: 89, color: COLORS[4] },
          { name: 'Conversations Abandoned', value: 67, color: COLORS[5] }
        ]
      case 'week':
        return [
          { name: 'User Messages', value: 9847, color: COLORS[0] },
          { name: 'Bot Responses', value: 9654, color: COLORS[1] },
          { name: 'Link Clicks', value: 1642, color: COLORS[2] },
          { name: 'New Chat Clicks', value: 1289, color: COLORS[3] },
          { name: 'Conversations Resumed', value: 623, color: COLORS[4] },
          { name: 'Conversations Abandoned', value: 456, color: COLORS[5] }
        ]
      case 'month':
        return [
          { name: 'User Messages', value: 42356, color: COLORS[0] },
          { name: 'Bot Responses', value: 41892, color: COLORS[1] },
          { name: 'Link Clicks', value: 7234, color: COLORS[2] },
          { name: 'New Chat Clicks', value: 5647, color: COLORS[3] },
          { name: 'Conversations Resumed', value: 2456, color: COLORS[4] },
          { name: 'Conversations Abandoned', value: 1847, color: COLORS[5] }
        ]
      case 'year':
        return [
          { name: 'User Messages', value: 512847, color: COLORS[0] },
          { name: 'Bot Responses', value: 508234, color: COLORS[1] },
          { name: 'Link Clicks', value: 87456, color: COLORS[2] },
          { name: 'New Chat Clicks', value: 68234, color: COLORS[3] },
          { name: 'Conversations Resumed', value: 29847, color: COLORS[4] },
          { name: 'Conversations Abandoned', value: 22156, color: COLORS[5] }
        ]
    }
  }

  const data = getInteractionData()

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Count: <span className="font-semibold text-foreground">{data.value.toLocaleString()}</span>
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="hsl(var(--foreground))"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-medium"
        style={{ 
          fontSize: "12px", 
          fontWeight: "500",
          filter: "drop-shadow(0 1px 2px hsl(var(--background)/0.8))"
        }}
      >
        {`${name}: ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Interaction Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={<CustomLabel />}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}