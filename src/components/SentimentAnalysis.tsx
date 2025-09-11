import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";

interface SentimentAnalysisProps {
  timePeriod?: string;
}

const SentimentAnalysis = ({ timePeriod = "7d" }: SentimentAnalysisProps) => {
  // Mock sentiment data - in real app this would come from API
  const sentimentData = [
    { name: "Positive", value: 65, count: 1250, color: "#22c55e" },
    { name: "Neutral", value: 25, count: 480, color: "#6b7280" },
    { name: "Negative", value: 10, count: 192, color: "#ef4444" },
  ];

  const trendData = [
    { day: "Mon", positive: 120, neutral: 45, negative: 15 },
    { day: "Tue", positive: 135, neutral: 52, negative: 18 },
    { day: "Wed", positive: 142, neutral: 48, negative: 12 },
    { day: "Thu", positive: 158, neutral: 55, negative: 20 },
    { day: "Fri", positive: 165, neutral: 62, negative: 25 },
    { day: "Sat", positive: 145, neutral: 58, negative: 22 },
    { day: "Sun", positive: 138, neutral: 51, negative: 19 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      if (payload[0].payload.name) {
        // Pie chart tooltip
        const data = payload[0].payload;
        return (
          <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
            <p className="font-medium">{data.name}</p>
            <p className="text-sm text-muted-foreground">{data.count} messages ({data.value}%)</p>
          </div>
        );
      } else {
        // Bar chart tooltip
        return (
          <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
            <p className="font-medium mb-2">{label}</p>
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.dataKey}: {entry.value}
              </p>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value: string, entry: any) => (
                  <span style={{ color: entry.color }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sentiment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trendData}>
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="positive" stackId="a" fill="#22c55e" />
              <Bar dataKey="neutral" stackId="a" fill="#6b7280" />
              <Bar dataKey="negative" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysis;