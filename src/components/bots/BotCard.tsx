
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bot, MessageSquare, Target, Calendar, Code, Settings, Play, Pause, Edit } from "lucide-react"
import { CodeSnippetDialog } from "./CodeSnippetDialog"
import { BotEditDialog } from "./BotEditDialog"
import { useState } from "react"

interface Bot {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "training"
  conversations: number
  accuracy: number
  lastTrained: string
  dataSources: string[]
}

interface BotCardProps {
  bot: Bot
}

export function BotCard({ bot }: BotCardProps) {
  const [showCodeDialog, setShowCodeDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-400 border-green-500/20"
      case "inactive": return "bg-gray-500/10 text-gray-400 border-gray-500/20"
      case "training": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const handleSaveBotConfig = (botId: string, config: any) => {
    console.log('Saving bot config for bot:', botId, config)
    // Here you would typically make an API call to save the configuration
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow border border-border/40">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{bot.name}</CardTitle>
                <Badge variant="outline" className={getStatusColor(bot.status)}>
                  {bot.status}
                </Badge>
              </div>
            </div>
          </div>
          <CardDescription className="text-sm">{bot.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span>{bot.conversations.toLocaleString()} chats</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span>{bot.accuracy}% accuracy</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last trained: {new Date(bot.lastTrained).toLocaleDateString()}</span>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Data Sources ({bot.dataSources.length})</p>
            <div className="flex flex-wrap gap-1">
              {bot.dataSources.slice(0, 2).map((source, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {source}
                </Badge>
              ))}
              {bot.dataSources.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{bot.dataSources.length - 2} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 gap-2"
              onClick={() => setShowCodeDialog(true)}
            >
              <Code className="w-4 h-4" />
              Get Code
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowEditDialog(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              {bot.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <CodeSnippetDialog 
        bot={bot}
        open={showCodeDialog}
        onClose={() => setShowCodeDialog(false)}
      />

      <BotEditDialog
        bot={bot}
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={handleSaveBotConfig}
      />
    </>
  )
}
