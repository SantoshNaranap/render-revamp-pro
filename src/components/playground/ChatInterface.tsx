
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MessageSquare, Bot, User, Sparkles, Zap } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { DataSource, BotConfig } from "@/pages/Playground"

interface ChatInterfaceProps {
  selectedDataSource: DataSource | null
  botConfig: BotConfig
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatInterface({ selectedDataSource, botConfig }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedDataSource) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Based on the "${selectedDataSource.name}" data source, I can help you with that. This is a simulated response using the configured model "${botConfig.model}" with temperature ${botConfig.temperature}.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <MessageSquare className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Chat Laboratory</h2>
            {selectedDataSource ? (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                Experimenting with: 
                <span className="text-primary font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {selectedDataSource.name}
                </span>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a data source to start experimenting
              </p>
            )}
          </div>
        </div>
        
        {selectedDataSource && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">{botConfig.model}</span>
          </div>
        )}
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 mb-6 p-4 rounded-xl bg-background/30 border border-border/30" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 && selectedDataSource && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/30">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Experiment!</h3>
              <p className="text-muted-foreground">Ask questions about "{selectedDataSource.name}" and test your AI configuration</p>
            </div>
          )}
          
          {messages.length === 0 && !selectedDataSource && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to the Lab</h3>
              <p className="text-muted-foreground">Select a data source from the panel above to start experimenting</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-[75%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
                    : 'bg-background/80 border border-border/40 text-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/40 to-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="bg-background/80 border border-border/40 text-foreground p-4 rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Input Area */}
      <div className="flex gap-3">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            selectedDataSource 
              ? "Start experimenting with your data source..." 
              : "Select a data source first..."
          }
          disabled={!selectedDataSource || isLoading}
          className="flex-1 bg-background/80 border-border/40 focus:border-primary/40 rounded-xl h-12"
        />
        <Button 
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || !selectedDataSource || isLoading}
          size="lg"
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-xl px-6"
        >
          <Send className="h-4 w-4" />
          Test
        </Button>
      </div>
    </div>
  )
}
