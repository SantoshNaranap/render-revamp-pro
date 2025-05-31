
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const topics = [
  { name: "Product Info", count: 245, trend: "up" },
  { name: "Pricing", count: 189, trend: "up" },
  { name: "Technical Support", count: 167, trend: "down" },
  { name: "Account", count: 134, trend: "up" },
  { name: "Billing", count: 98, trend: "stable" },
  { name: "Features", count: 87, trend: "up" },
  { name: "Integration", count: 76, trend: "up" },
  { name: "API", count: 54, trend: "stable" },
]

export function PopularTopics() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Popular Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <Badge
              key={index}
              variant="outline"
              className="px-3 py-2 bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer border-border/50"
            >
              <span className="font-medium">{topic.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">({topic.count})</span>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
