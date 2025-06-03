import { Layout } from "@/components/Layout"
import { DataSourcesList } from "@/components/playground/DataSourcesList"
import { ChatInterface } from "@/components/playground/ChatInterface"
import { BotConfiguration } from "@/components/playground/BotConfiguration"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Beaker, Database, MessageSquare, Settings } from "lucide-react"

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
      <div className="space-y-6 h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
              <Beaker className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Lab</h1>
              <p className="text-muted-foreground">Experiment and test your AI models with different data sources</p>
            </div>
          </div>
        </div>

        {/* Main Content - New Layout */}
        <div className="grid grid-rows-2 gap-6 h-full">
          {/* Top Row - Data Sources and Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Sources Panel */}
            <div className="bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm rounded-xl border border-border/40">
              <DataSourcesList 
                selectedDataSource={selectedDataSource}
                onSelectDataSource={setSelectedDataSource}
              />
            </div>

            {/* Configuration Panel as Tabs */}
            <div className="bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm rounded-xl border border-border/40">
              <Tabs defaultValue="config" className="h-full flex flex-col">
                <div className="p-4 pb-0">
                  <TabsList className="grid w-full grid-cols-2 bg-background/60">
                    <TabsTrigger value="config" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Configuration
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2">
                      <Database className="h-4 w-4" />
                      Advanced
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="config" className="flex-1 mt-0">
                  <BotConfiguration 
                    config={botConfig}
                    onConfigChange={setBotConfig}
                  />
                </TabsContent>
                
                <TabsContent value="settings" className="flex-1 mt-0 p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      Advanced Settings
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>• Custom model endpoints</p>
                      <p>• Rate limiting controls</p>
                      <p>• Response caching</p>
                      <p>• Debug mode settings</p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/40 border border-border/30">
                      <p className="text-sm text-muted-foreground">Advanced features coming soon...</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Bottom Row - Chat Interface (Full Width) */}
          <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-xl border border-border/40 shadow-xl">
            <ChatInterface 
              selectedDataSource={selectedDataSource}
              botConfig={botConfig}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Playground
