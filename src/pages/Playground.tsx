
import { Layout } from "@/components/Layout"
import { ChatInterface } from "@/components/playground/ChatInterface"
import { BotConfiguration } from "@/components/playground/BotConfiguration"
import { useState } from "react"

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
  const [selectedDataSources, setSelectedDataSources] = useState<DataSource[]>([])
  const [botConfig, setBotConfig] = useState<BotConfig>({
    model: "gpt-4o-mini",
    temperature: 0.7,
    maxTokens: 1000,
    topP: 0.9,
    instructions: "You are a helpful assistant. Answer questions based on the provided data sources.",
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

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Interface */}
          <div className="h-full">
            <ChatInterface 
              selectedDataSources={selectedDataSources}
              onSelectDataSources={setSelectedDataSources}
              botConfig={botConfig}
            />
          </div>

          {/* Configuration Panel */}
          <div className="h-full">
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
