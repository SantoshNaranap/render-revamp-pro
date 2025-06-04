
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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Playground</h1>
            <p className="text-muted-foreground">Test and configure your AI models with different data sources</p>
          </div>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="space-y-6">
          {/* Top Row - Data Sources */}
          <div className="w-full">
            <DataSourcesList 
              selectedDataSource={selectedDataSource}
              onSelectDataSource={setSelectedDataSource}
            />
          </div>

          {/* Bottom Row - Chat and Configuration */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Chat Interface */}
            <div className="min-h-[600px]">
              <ChatInterface 
                selectedDataSource={selectedDataSource}
                botConfig={botConfig}
              />
            </div>

            {/* Configuration Panel */}
            <div className="min-h-[600px]">
              <BotConfiguration 
                config={botConfig}
                onConfigChange={setBotConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Playground
