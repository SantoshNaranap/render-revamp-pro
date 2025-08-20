
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
import { Checkbox } from "@/components/ui/checkbox"
import { Save, X } from "lucide-react"
import { useState } from "react"

interface BotConfig {
  model: string
  temperature: number
  maxTokens: number
  topP: number
  systemPrompt: string
  integrations: string[]
}

interface CreateBotDialogProps {
  open: boolean
  onClose: () => void
  onSave: (botData: {
    name: string
    description: string
    config: BotConfig
    dataSources: string[]
  }) => void
}

const availableModels = [
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet" },
  { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku" },
]

const availableIntegrations = [
  { id: "web-search", label: "Parcel Lab" },
  { id: "memory", label: "Nice CXOne" },
  { id: "functions", label: "Function Calling" },
  { id: "multimodal", label: "Image Understanding" },
]

const availableDataSources = [
  { id: "faq-database", label: "PamperedChef CA" },
  { id: "support-tickets", label: "PC-Support " },
  { id: "product-docs", label: "PamperedChef-Product-Docs" },
  { id: "product-catalog", label: "PamperedChef US" },
  { id: "pricing-data", label: "Pricing Data" },
  { id: "sales-scripts", label: "Sales Scripts" },
  { id: "employee-handbook", label: "Employee Handbook" },
  { id: "policy-documents", label: "Policy Documents" },
  { id: "training-materials", label: "Training Materials" },
  { id: "api-docs", label: "API Documentation" },
  { id: "user-guides", label: "User Guides" },
  { id: "technical-specs", label: "Technical Specifications" },
]

export function CreateBotDialog({ open, onClose, onSave }: CreateBotDialogProps) {
  const [botName, setBotName] = useState("")
  const [botDescription, setBotDescription] = useState("")
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([])

  const [config, setConfig] = useState<BotConfig>({
    model: "gpt-4o-mini",
    temperature: 0.7,
    maxTokens: 1000,
    topP: 0.9,
    systemPrompt: "You are a helpful AI assistant.",
    integrations: []
  })

  const updateConfig = (updates: Partial<BotConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const toggleIntegration = (integrationId: string) => {
    const newIntegrations = config.integrations.includes(integrationId)
      ? config.integrations.filter(id => id !== integrationId)
      : [...config.integrations, integrationId]
    updateConfig({ integrations: newIntegrations })
  }

  const toggleDataSource = (dataSourceId: string) => {
    setSelectedDataSources(prev => 
      prev.includes(dataSourceId)
        ? prev.filter(id => id !== dataSourceId)
        : [...prev, dataSourceId]
    )
  }

  const handleSave = () => {
    if (!botName.trim()) return

    onSave({
      name: botName,
      description: botDescription,
      config,
      dataSources: selectedDataSources
    })

    // Reset form
    setBotName("")
    setBotDescription("")
    setSelectedDataSources([])
    setConfig({
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 1000,
      topP: 0.9,
      systemPrompt: "You are a helpful AI assistant.",
      integrations: []
    })
    
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create New Bot
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bot Name *</Label>
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

          {/* Data Sources */}
          <div className="space-y-4">
            <Label>Data Sources</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableDataSources.map((dataSource) => {
                const isSelected = selectedDataSources.includes(dataSource.id)
                
                return (
                  <div
                    key={dataSource.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={dataSource.id}
                      checked={isSelected}
                      onCheckedChange={() => toggleDataSource(dataSource.id)}
                    />
                    <Label
                      htmlFor={dataSource.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {dataSource.label}
                    </Label>
                  </div>
                )
              })}
            </div>
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
            <Button 
              onClick={handleSave} 
              className="flex-1 gap-2"
              disabled={!botName.trim()}
            >
              <Save className="w-4 h-4" />
              Create Bot
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
