
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User, Clock, Activity } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "conversation",
    user: "John Doe",
    action: "started a new conversation about pricing",
    time: "2 minutes ago",
    status: "active"
  },
  {
    id: 2,
    type: "message",
    user: "Sarah Wilson", 
    action: "sent a follow-up message",
    time: "5 minutes ago",
    status: "pending"
  },
  {
    id: 3,
    type: "conversation",
    user: "Mike Johnson",
    action: "completed conversation successfully",
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
  {
    id: 5,
    type: "conversation",
    user: "Alex Chen",
    action: "requested technical support",
    time: "2 hours ago",
    status: "pending"
  },
]

export function RecentActivity() {
  return (
    <Card className="border-border/60 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">Live Activity Feed</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="group flex items-center gap-4 p-4 rounded-lg bg-accent/20 hover:bg-accent/40 transition-all duration-200 border border-border/30 hover:border-primary/30">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  {activity.type === "conversation" && <MessageSquare className="w-4 h-4 text-blue-400" />}
                  {activity.type === "message" && <MessageSquare className="w-4 h-4 text-emerald-400" />}
                  {activity.type === "user" && <User className="w-4 h-4 text-amber-400" />}
                  <span className="text-sm font-medium text-foreground">{activity.user}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${
                    activity.status === "active" ? "bg-blue-500/10 text-blue-400 border-blue-500/30" :
                    activity.status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
                    activity.status === "resolved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" :
                    "bg-purple-500/10 text-purple-400 border-purple-500/30"
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
