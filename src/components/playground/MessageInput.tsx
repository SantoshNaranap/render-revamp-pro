
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, MicOff } from "lucide-react"
import { DataSource } from "@/pages/Playground"

interface MessageInputProps {
  inputValue: string
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  selectedDataSources: DataSource[]
  isLoading: boolean
  isRecording: boolean
  onToggleRecording: () => void
}

export function MessageInput({
  inputValue,
  onInputChange,
  onSendMessage,
  onKeyPress,
  selectedDataSources,
  isLoading,
  isRecording,
  onToggleRecording
}: MessageInputProps) {
  return (
    <div className="border-t border-border/60 p-4">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
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
          onClick={onToggleRecording}
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
          onClick={onSendMessage}
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
  )
}
