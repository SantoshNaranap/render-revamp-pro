import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, MessageSquare, Bot, User, Database, X, Mic, MicOff, Volume2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { DataSource, BotConfig, VoiceConfig } from "@/pages/Playground"
import { DataSourceModal } from "./DataSourceModal"
import { VoiceSelectionModal } from "./VoiceSelectionModal"

interface ChatInterfaceProps {
  selectedDataSources: DataSource[]
  onSelectDataSources: (dataSources: DataSource[]) => void
  botConfig: BotConfig
  voiceConfig: VoiceConfig
  onVoiceConfigChange: (config: VoiceConfig) => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatInterface({ selectedDataSources, onSelectDataSources, botConfig, voiceConfig, onVoiceConfigChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || selectedDataSources.length === 0) return

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
      const sourceNames = selectedDataSources.map(ds => ds.name).join(", ")
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Based on the selected data sources (${sourceNames}), I can help you with that. This is a simulated response using the configured model "${botConfig.model}" with temperature ${botConfig.temperature}.`,
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

  const removeDataSource = (dataSourceId: string) => {
    onSelectDataSources(selectedDataSources.filter(ds => ds.id !== dataSourceId))
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const audioChunks: BlobPart[] = []

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        // Here you would typically send the audio to a speech-to-text service
        // For now, we'll simulate the transcription
        setTimeout(() => {
          setInputValue("This is a simulated transcription of your voice input.")
        }, 500)
        
        // Clean up the stream
        stream.getTracks().forEach(track => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop()
      setMediaRecorder(null)
      setIsRecording(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <Card className="h-full flex flex-col border-border/60 bg-card/40 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Chat Interface
        </CardTitle>
        
        {/* Data Sources and Voice Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <DataSourceModal 
                selectedDataSources={selectedDataSources}
                onSelectDataSources={onSelectDataSources}
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Database className="h-4 w-4" />
                  {selectedDataSources.length === 0 ? 'Select Sources' : `${selectedDataSources.length} Selected`}
                </Button>
              </DataSourceModal>

              <VoiceSelectionModal
                voiceConfig={voiceConfig}
                onConfigChange={onVoiceConfigChange}
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Volume2 className="h-4 w-4" />
                  Voice {voiceConfig.enabled ? 'On' : 'Off'}
                </Button>
              </VoiceSelectionModal>
            </div>
          </div>
          
          {/* Selected Data Sources */}
          {selectedDataSources.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedDataSources.map((dataSource) => (
                <Badge 
                  key={dataSource.id} 
                  variant="secondary" 
                  className="flex items-center gap-1 pr-1"
                >
                  {dataSource.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-destructive/20"
                    onClick={() => removeDataSource(dataSource.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
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
        
        {/* Input Area */}
        <div className="border-t border-border/60 p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                selectedDataSources.length > 0
                  ? "Ask a question about your data sources..." 
                  : "Select data sources first..."
              }
              disabled={selectedDataSources.length === 0 || isLoading}
              className="flex-1 bg-background/60 border-border/60"
            />
            
            {/* Microphone Button */}
            <Button 
              onClick={toggleRecording}
              disabled={selectedDataSources.length === 0}
              size="sm"
              variant={isRecording ? "destructive" : "outline"}
              className={`gap-2 ${isRecording ? 'animate-pulse' : ''}`}
            >
              {isRecording ? (
                <>
                  <MicOff className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-current rounded-full animate-pulse"></div>
                    <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </>
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || selectedDataSources.length === 0 || isLoading}
              size="sm"
              className="gap-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Recording Status */}
          {isRecording && (
            <div className="mt-2 text-center">
              <p className="text-xs text-muted-foreground animate-pulse">
                🎤 Recording... Click the microphone again to stop
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
