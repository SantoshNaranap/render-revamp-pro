
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Mic, Volume2, Gauge, Waves } from "lucide-react"
import { useState } from "react"

interface VoiceConfig {
  voice: string
  speed: number
  pitch: number
  volume: number
  enabled: boolean
}

export function VoiceControlsPanel() {
  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({
    voice: "aria",
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8,
    enabled: true
  })

  const voices = [
    { id: "aria", name: "Aria", description: "Natural and friendly" },
    { id: "roger", name: "Roger", description: "Professional and clear" },
    { id: "sarah", name: "Sarah", description: "Warm and engaging" },
    { id: "charlie", name: "Charlie", description: "Casual and conversational" },
    { id: "laura", name: "Laura", description: "Articulate and precise" }
  ]

  const updateVoiceConfig = (key: keyof VoiceConfig, value: any) => {
    setVoiceConfig(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="h-full border-border/60 bg-card/40 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Voice Controls
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Voice Enable/Disable */}
        <div className="flex items-center justify-between">
          <Label htmlFor="voice-enabled" className="text-sm font-medium">
            Enable Voice
          </Label>
          <Switch
            id="voice-enabled"
            checked={voiceConfig.enabled}
            onCheckedChange={(checked) => updateVoiceConfig('enabled', checked)}
          />
        </div>

        {/* Voice Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Waves className="h-4 w-4" />
            Voice Model
          </Label>
          <Select
            value={voiceConfig.voice}
            onValueChange={(value) => updateVoiceConfig('voice', value)}
            disabled={!voiceConfig.enabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{voice.name}</span>
                    <span className="text-xs text-muted-foreground">{voice.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Speed Control */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Speed: {voiceConfig.speed.toFixed(1)}x
          </Label>
          <Slider
            value={[voiceConfig.speed]}
            onValueChange={(value) => updateVoiceConfig('speed', value[0])}
            min={0.5}
            max={2.0}
            step={0.1}
            disabled={!voiceConfig.enabled}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Slow</span>
            <span>Normal</span>
            <span>Fast</span>
          </div>
        </div>

        {/* Pitch Control */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Waves className="h-4 w-4" />
            Pitch: {voiceConfig.pitch.toFixed(1)}
          </Label>
          <Slider
            value={[voiceConfig.pitch]}
            onValueChange={(value) => updateVoiceConfig('pitch', value[0])}
            min={0.5}
            max={1.5}
            step={0.1}
            disabled={!voiceConfig.enabled}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>Normal</span>
            <span>High</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Volume: {Math.round(voiceConfig.volume * 100)}%
          </Label>
          <Slider
            value={[voiceConfig.volume]}
            onValueChange={(value) => updateVoiceConfig('volume', value[0])}
            min={0}
            max={1}
            step={0.05}
            disabled={!voiceConfig.enabled}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Quiet</span>
            <span>Loud</span>
          </div>
        </div>

        {/* Voice Preview */}
        <div className="pt-4 border-t border-border/60">
          <button
            className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 rounded-md text-sm font-medium text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!voiceConfig.enabled}
            onClick={() => {
              // Here you would typically play a sample with the current settings
              console.log('Playing voice preview with config:', voiceConfig)
            }}
          >
            Preview Voice
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
