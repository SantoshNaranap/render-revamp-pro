
import { useState } from "react"
import { StudentLayout } from "@/components/student/StudentLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Send, 
  Sparkles, 
  BookOpen,
  Brain,
  Target,
  Lightbulb,
  GraduationCap
} from "lucide-react"

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickPrompts = [
  { icon: BookOpen, text: "What should I study for CS301?", color: "text-blue-500" },
  { icon: Brain, text: "Explain Binary Trees simply", color: "text-amber-500" },
  { icon: Target, text: "Am I ready for my mid-semester?", color: "text-green-500" },
  { icon: Lightbulb, text: "What are my weak areas?", color: "text-purple-500" },
]

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: "Hi! I'm Nexus, your personalized learning companion. I'm here to help you understand your course material, identify what to focus on, and prepare for exams with confidence. What would you like to work on today?",
    timestamp: new Date()
  }
]

export default function StudentChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: "I understand you want to learn more about that topic. Based on your course materials and learning progress, let me provide you with a focused explanation...\n\nThis is a demo response. In the full version, I would provide personalized guidance based on your enrolled courses and learning profile.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleQuickPrompt = (text: string) => {
    setInputValue(text)
  }

  return (
    <StudentLayout>
      <div className="h-[calc(100vh-10rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ask Nexus</h1>
              <p className="text-sm text-muted-foreground">Your personalized learning companion</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Online
          </Badge>
        </div>

        <div className="flex-1 grid gap-6 lg:grid-cols-4">
          {/* Chat Area */}
          <Card className="lg:col-span-3 flex flex-col bg-card/50 border-border/60">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent/50 text-foreground'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Nexus</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border/60 p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything about your courses..."
                  className="flex-1 bg-background/60 border-border/60"
                />
                <Button onClick={handleSend} disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Prompts Sidebar */}
          <div className="space-y-4">
            <Card className="bg-card/50 border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto py-3 text-left"
                    onClick={() => handleQuickPrompt(prompt.text)}
                  >
                    <prompt.icon className={`h-4 w-4 ${prompt.color}`} />
                    <span className="text-xs">{prompt.text}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Learning Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  The more you interact with me, the better I understand your learning style. 
                  Don't hesitate to ask for simpler explanations or more details!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
