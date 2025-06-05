
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Database } from "lucide-react"
import { forwardRef } from "react"
import { DataSource } from "@/pages/Playground"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface MessagesListProps {
  messages: Message[]
  selectedDataSources: DataSource[]
  isLoading: boolean
}

export const MessagesList = forwardRef<HTMLDivElement, MessagesListProps>(
  ({ messages, selectedDataSources, isLoading }, ref) => {
    return (
      <ScrollArea className="flex-1 px-6" ref={ref}>
        <div className="space-y-4 pb-4">
          {messages.length === 0 && selectedDataSources.length > 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation with the AI assistant</p>
              <p className="text-sm">Ask questions about your selected data sources</p>
            </div>
          )}

          {selectedDataSources.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select data sources to start chatting</p>
              <p className="text-sm">Click "Select Sources" above to choose your data sources</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent/60 text-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-accent/60 text-foreground p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    )
  }
)

MessagesList.displayName = "MessagesList"
