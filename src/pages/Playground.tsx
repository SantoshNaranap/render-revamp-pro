
import { Layout } from "@/components/Layout"
import { DataSourcesList } from "@/components/playground/DataSourcesList"
import { ChatInterface } from "@/components/playground/ChatInterface"
import { BotConfiguration } from "@/components/playground/BotConfiguration"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface DataSource {
  id: string
  name: string
  description: string
  status: "trained" | "training" | "failed"
  documentCount: number
  lastUpdated: string
  type: "pdf" | "text" | "web" | "api"
}

export interface BotConfig {
  model: string
  temperature: number
  maxTokens: number
  topP: number
  instructions: string
  integrations: string[]
}

const Playground = () => {
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null)
  const [botConfig, setBotConfig] = useState<BotConfig>({
    model: "gpt-4o-mini",
    temperature: 0.7,
    maxTokens: 1000,
    topP: 0.9,
    instructions: "You are a helpful assistant. Answer questions based on the provided data source.",
    integrations: []
  })

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Playground</h1>
            <p className="text-muted-foreground">Test and configure your AI models with different data sources</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Data Sources Panel */}
          <div className="lg:col-span-1">
            <DataSourcesList 
              selectedDataSource={selectedDataSource}
              onSelectDataSource={setSelectedDataSource}
            />
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-1">
            <ChatInterface 
              selectedDataSource={selectedDataSource}
              botConfig={botConfig}
            />
          </div>

          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <BotConfiguration 
              config={botConfig}
              onConfigChange={setBotConfig}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Playground
