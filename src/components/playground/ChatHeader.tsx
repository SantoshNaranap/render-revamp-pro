
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Database, X, Volume2 } from "lucide-react"
import { DataSource, VoiceConfig } from "@/pages/Playground"
import { DataSourceModal } from "./DataSourceModal"
import { VoiceSelectionModal } from "./VoiceSelectionModal"

interface ChatHeaderProps {
  selectedDataSources: DataSource[]
  onSelectDataSources: (dataSources: DataSource[]) => void
  voiceConfig: VoiceConfig
  onVoiceConfigChange: (config: VoiceConfig) => void
  onRemoveDataSource: (dataSourceId: string) => void
}

export function ChatHeader({
  selectedDataSources,
  onSelectDataSources,
  voiceConfig,
  onVoiceConfigChange,
  onRemoveDataSource
}: ChatHeaderProps) {
  return (
    <CardHeader className="pb-4">
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        Chat Interface
      </CardTitle>
      
      {/* Data Sources and Voice Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <DataSourceModal 
              selectedDataSources={selectedDataSources}
              onSelectDataSources={onSelectDataSources}
            >
              <Button variant="outline" size="sm" className="gap-2">
                <Database className="h-4 w-4" />
                {selectedDataSources.length === 0 ? 'Select Sources' : `${selectedDataSources.length} Selected`}
              </Button>
            </DataSourceModal>

            <VoiceSelectionModal
              voiceConfig={voiceConfig}
              onConfigChange={onVoiceConfigChange}
            >
              <Button variant="outline" size="sm" className="gap-2">
                <Volume2 className="h-4 w-4" />
                Voice {voiceConfig.enabled ? 'On' : 'Off'}
              </Button>
            </VoiceSelectionModal>
          </div>
        </div>
        
        {/* Selected Data Sources */}
        {selectedDataSources.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedDataSources.map((dataSource) => (
              <Badge 
                key={dataSource.id} 
                variant="secondary" 
                className="flex items-center gap-1 pr-1"
              >
                {dataSource.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive/20"
                  onClick={() => onRemoveDataSource(dataSource.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </CardHeader>
  )
}
