
import { Card, CardContent } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import { DataSource, BotConfig, VoiceConfig } from "@/pages/Playground"
import { ChatHeader } from "./ChatHeader"
import { MessagesList } from "./MessagesList"
import { MessageInput } from "./MessageInput"

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
      <ChatHeader
        selectedDataSources={selectedDataSources}
        onSelectDataSources={onSelectDataSources}
        voiceConfig={voiceConfig}
        onVoiceConfigChange={onVoiceConfigChange}
        onRemoveDataSource={removeDataSource}
      />
      
      <CardContent className="flex-1 flex flex-col p-0">
        <MessagesList
          ref={scrollAreaRef}
          messages={messages}
          selectedDataSources={selectedDataSources}
          isLoading={isLoading}
        />
        
        <MessageInput
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
          selectedDataSources={selectedDataSources}
          isLoading={isLoading}
          isRecording={isRecording}
          onToggleRecording={toggleRecording}
        />
      </CardContent>
    </Card>
  )
}
