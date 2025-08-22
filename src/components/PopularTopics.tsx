
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Hash } from "lucide-react"

const topics = [
  { name: "Product Information", count: 245, trend: "up", category: "sales" },
  { name: "Pricing & Plans", count: 189, trend: "up", category: "sales" },
  { name: "Technical Support", count: 167, trend: "down", category: "support" },
  { name: "Account Management", count: 134, trend: "up", category: "account" },
  { name: "Billing Inquiries", count: 98, trend: "stable", category: "billing" },
  { name: "Feature Requests", count: 87, trend: "up", category: "product" },
  { name: "API Integration", count: 76, trend: "up", category: "technical" },
  { name: "Documentation", count: 54, trend: "stable", category: "support" },
]

export function PopularTopics() {
  return (
    <Card className="border-border/60 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">Trending Discussion Topics</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="group p-4 rounded-lg bg-accent/20 hover:bg-accent/40 transition-all duration-200 cursor-pointer border border-border/30 hover:border-primary/30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {topic.name}
                </span>
                <div className="flex items-center gap-1">
                  {topic.trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {topic.trend === "down" && <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />}
                  <span className="text-sm font-medium text-muted-foreground">
                    {topic.count}
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-xs bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
              >
                {topic.category}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
