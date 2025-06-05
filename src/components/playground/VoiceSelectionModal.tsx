
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Volume2 } from "lucide-react"

export interface VoiceConfig {
  enabled: boolean
  voice: string
  speed: number
  pitch: number
  volume: number
}

interface VoiceSelectionModalProps {
  voiceConfig: VoiceConfig
  onConfigChange: (config: VoiceConfig) => void
  children: React.ReactNode
}

const voices = [
  { id: "alloy", name: "Alloy" },
  { id: "echo", name: "Echo" },
  { id: "fable", name: "Fable" },
  { id: "onyx", name: "Onyx" },
  { id: "nova", name: "Nova" },
  { id: "shimmer", name: "Shimmer" },
]

export function VoiceSelectionModal({ voiceConfig, onConfigChange, children }: VoiceSelectionModalProps) {
  const [open, setOpen] = useState(false)

  const updateConfig = (updates: Partial<VoiceConfig>) => {
    onConfigChange({ ...voiceConfig, ...updates })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voice Settings</DialogTitle>
          <DialogDescription>
            Configure the voice parameters for text-to-speech responses.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Enable Voice */}
          <div className="flex items-center justify-between">
            <Label htmlFor="voice-enabled" className="text-sm font-medium">
              Enable Voice Responses
            </Label>
            <Switch
              id="voice-enabled"
              checked={voiceConfig.enabled}
              onCheckedChange={(enabled) => updateConfig({ enabled })}
            />
          </div>

          {/* Voice Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Voice</Label>
            <Select
              value={voiceConfig.voice}
              onValueChange={(voice) => updateConfig({ voice })}
              disabled={!voiceConfig.enabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Speed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Speed</Label>
              <span className="text-sm text-muted-foreground">{voiceConfig.speed}x</span>
            </div>
            <Slider
              value={[voiceConfig.speed]}
              onValueChange={([speed]) => updateConfig({ speed })}
              min={0.5}
              max={2.0}
              step={0.1}
              disabled={!voiceConfig.enabled}
              className="w-full"
            />
          </div>

          {/* Pitch */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Pitch</Label>
              <span className="text-sm text-muted-foreground">{voiceConfig.pitch}</span>
            </div>
            <Slider
              value={[voiceConfig.pitch]}
              onValueChange={([pitch]) => updateConfig({ pitch })}
              min={0.5}
              max={2.0}
              step={0.1}
              disabled={!voiceConfig.enabled}
              className="w-full"
            />
          </div>

          {/* Volume */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Volume</Label>
              <span className="text-sm text-muted-foreground">{Math.round(voiceConfig.volume * 100)}%</span>
            </div>
            <Slider
              value={[voiceConfig.volume]}
              onValueChange={([volume]) => updateConfig({ volume })}
              min={0}
              max={1}
              step={0.05}
              disabled={!voiceConfig.enabled}
              className="w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
