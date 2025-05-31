
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "conversation",
    user: "John Doe",
    action: "started a new conversation",
    time: "2 minutes ago",
    status: "active"
  },
  {
    id: 2,
    type: "message",
    user: "Sarah Wilson",
    action: "sent a message",
    time: "5 minutes ago",
    status: "pending"
  },
  {
    id: 3,
    type: "conversation",
    user: "Mike Johnson",
    action: "completed conversation",
    time: "15 minutes ago",
    status: "resolved"
  },
  {
    id: 4,
    type: "user",
    user: "Emma Davis",
    action: "joined the platform",
    time: "1 hour ago",
    status: "new"
  },
]

export function RecentActivity() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {activity.type === "conversation" && <MessageSquare className="w-3 h-3 text-blue-400" />}
                  {activity.type === "message" && <MessageSquare className="w-3 h-3 text-green-400" />}
                  {activity.type === "user" && <User className="w-3 h-3 text-orange-400" />}
                  <span className="text-sm font-medium text-foreground">{activity.user}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    activity.status === "active" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    activity.status === "pending" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                    activity.status === "resolved" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                    "bg-purple-500/10 text-purple-400 border-purple-500/20"
                  }`}
                >
                  {activity.status}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
