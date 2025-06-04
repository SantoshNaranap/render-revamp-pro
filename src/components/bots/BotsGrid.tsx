
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BotCard } from "./BotCard"

const mockBots = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    status: "active",
    conversations: 1247,
    accuracy: 94,
    lastTrained: "2024-01-15",
    dataSources: ["FAQ Database", "Support Tickets", "Product Docs"]
  },
  {
    id: "2", 
    name: "Sales Assistant Bot",
    description: "Helps qualify leads and schedule demos",
    status: "active",
    conversations: 892,
    accuracy: 89,
    lastTrained: "2024-01-10",
    dataSources: ["Product Catalog", "Pricing Data", "Sales Scripts"]
  },
  {
    id: "3",
    name: "HR Onboarding Bot",
    description: "Guides new employees through onboarding process", 
    status: "training",
    conversations: 156,
    accuracy: 76,
    lastTrained: "2024-01-08",
    dataSources: ["Employee Handbook", "Policy Documents", "Training Materials"]
  },
  {
    id: "4",
    name: "Product Documentation Bot",
    description: "Provides technical documentation and guides",
    status: "inactive",
    conversations: 423,
    accuracy: 91,
    lastTrained: "2023-12-20",
    dataSources: ["API Docs", "User Guides", "Technical Specs"]
  }
]

export function BotsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockBots.map((bot) => (
        <BotCard key={bot.id} bot={bot} />
      ))}
    </div>
  )
}
