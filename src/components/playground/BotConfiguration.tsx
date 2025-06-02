
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Zap, Brain, MessageSquare, Globe } from "lucide-react"
import { BotConfig } from "@/pages/Playground"

interface BotConfigurationProps {
  config: BotConfig
  onConfigChange: (config: BotConfig) => void
}

const availableModels = [
  { value: "gpt-4o-mini", label: "GPT-4o Mini", description: "Fast and efficient" },
  { value: "gpt-4o", label: "GPT-4o", description: "Most capable" },
  { value: "gpt-4.5-preview", label: "GPT-4.5 Preview", description: "Latest preview" },
]

const availableIntegrations = [
  { id: "search", label: "Web Search", icon: Globe, description: "Access real-time web information" },
  { id: "memory", label: "Conversation Memory", icon: Brain, description: "Remember past conversations" },
  { id: "functions", label: "Function Calling", icon: Zap, description: "Execute custom functions" },
  { id: "multimodal", label: "Image Understanding", icon: MessageSquare, description: "Analyze images and documents" },
]

export function BotConfiguration({ config, onConfigChange }: BotConfigurationProps) {
  const updateConfig = (updates: Partial<BotConfig>) => {
    onConfigChange({ ...config, ...updates })
  }

  const toggleIntegration = (integrationId: string) => {
    const newIntegrations = config.integrations.includes(integrationId)
      ? config.integrations.filter(id => id !== integrationId)
      : [...config.integrations, integrationId]
    updateConfig({ integrations: newIntegrations })
  }

  return (
    <Card className="h-full flex flex-col border-border/60 bg-card/40 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Bot Configuration
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-6">
        {/* Model Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">AI Model</Label>
          <Select value={config.model} onValueChange={(value) => updateConfig({ model: value })}>
            <SelectTrigger className="bg-background/60 border-border/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{model.label}</span>
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Temperature */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Temperature</Label>
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

        {/* Max Tokens */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Max Tokens</Label>
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
          <p className="text-xs text-muted-foreground">
            Maximum length of the response
          </p>
        </div>

        {/* Top P */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Top P</Label>
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
          <p className="text-xs text-muted-foreground">
            Controls diversity via nucleus sampling
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">System Instructions</Label>
          <Textarea
            value={config.instructions}
            onChange={(e) => updateConfig({ instructions: e.target.value })}
            placeholder="Enter system instructions for the AI..."
            className="min-h-[100px] bg-background/60 border-border/60 resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Define how the AI should behave and respond
          </p>
        </div>

        {/* Integrations */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Integrations</Label>
          <div className="space-y-3">
            {availableIntegrations.map((integration) => {
              const Icon = integration.icon
              const isEnabled = config.integrations.includes(integration.id)
              
              return (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-accent/20"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{integration.label}</p>
                      <p className="text-xs text-muted-foreground">{integration.description}</p>
                    </div>
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

        {/* Save Button */}
        <Button className="w-full gap-2">
          <Settings className="h-4 w-4" />
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  )
}
