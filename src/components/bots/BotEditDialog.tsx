
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Save, X } from "lucide-react"
import { useState, useEffect } from "react"

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

interface BotConfig {
  model: string
  temperature: number
  maxTokens: number
  topP: number
  systemPrompt: string
  integrations: string[]
}

interface BotEditDialogProps {
  bot: Bot
  open: boolean
  onClose: () => void
  onSave: (botId: string, config: BotConfig) => void
}

const availableModels = [
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet" },
  { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku" },
]

const availableIntegrations = [
  { id: "web-search", label: "Web Search" },
  { id: "memory", label: "Conversation Memory" },
  { id: "functions", label: "Function Calling" },
  { id: "multimodal", label: "Image Understanding" },
]

export function BotEditDialog({ bot, open, onClose, onSave }: BotEditDialogProps) {
  const [config, setConfig] = useState<BotConfig>({
    model: "gpt-4o-mini",
    temperature: 0.7,
    maxTokens: 1000,
    topP: 0.9,
    systemPrompt: "You are a helpful AI assistant.",
    integrations: []
  })

  const [botName, setBotName] = useState(bot.name)
  const [botDescription, setBotDescription] = useState(bot.description)

  useEffect(() => {
    if (open) {
      setBotName(bot.name)
      setBotDescription(bot.description)
      // Reset config when dialog opens
      setConfig({
        model: "gpt-4o-mini",
        temperature: 0.7,
        maxTokens: 1000,
        topP: 0.9,
        systemPrompt: "You are a helpful AI assistant.",
        integrations: []
      })
    }
  }, [open, bot])

  const updateConfig = (updates: Partial<BotConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const toggleIntegration = (integrationId: string) => {
    const newIntegrations = config.integrations.includes(integrationId)
      ? config.integrations.filter(id => id !== integrationId)
      : [...config.integrations, integrationId]
    updateConfig({ integrations: newIntegrations })
  }

  const handleSave = () => {
    onSave(bot.id, config)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Bot Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bot Name</Label>
              <Input
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Enter bot name"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={botDescription}
                onChange={(e) => setBotDescription(e.target.value)}
                placeholder="Enter bot description"
                className="min-h-[80px]"
              />
            </div>
          </div>

          <Separator />

          {/* Model Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Model Configuration</h3>
            
            <div className="space-y-2">
              <Label>AI Model</Label>
              <Select value={config.model} onValueChange={(value) => updateConfig({ model: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Temperature</Label>
                <Badge variant="outline" className="text-xs">
                  {config.temperature}
                </Badge>
              </div>
              <Slider
                value={[config.temperature]}
                onValueChange={([value]) => updateConfig({ temperature: value })}
                min={0}
                max={2}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls randomness. Lower = more focused, Higher = more creative
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Max Tokens</Label>
                <Badge variant="outline" className="text-xs">
                  {config.maxTokens}
                </Badge>
              </div>
              <Slider
                value={[config.maxTokens]}
                onValueChange={([value]) => updateConfig({ maxTokens: value })}
                min={100}
                max={4000}
                step={100}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Top P</Label>
                <Badge variant="outline" className="text-xs">
                  {config.topP}
                </Badge>
              </div>
              <Slider
                value={[config.topP]}
                onValueChange={([value]) => updateConfig({ topP: value })}
                min={0}
                max={1}
                step={0.05}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          {/* System Prompt */}
          <div className="space-y-2">
            <Label>System Prompt</Label>
            <Textarea
              value={config.systemPrompt}
              onChange={(e) => updateConfig({ systemPrompt: e.target.value })}
              placeholder="Enter system instructions for the AI..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Define how the AI should behave and respond
            </p>
          </div>

          <Separator />

          {/* Integrations */}
          <div className="space-y-4">
            <Label>Integrations</Label>
            <div className="space-y-3">
              {availableIntegrations.map((integration) => {
                const isEnabled = config.integrations.includes(integration.id)
                
                return (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="text-sm font-medium">{integration.label}</p>
                    </div>
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1 gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose} className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
