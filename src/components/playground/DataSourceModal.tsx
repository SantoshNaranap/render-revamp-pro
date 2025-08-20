
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Database, FileText, Globe, Zap, Plus } from "lucide-react"
import { useState } from "react"
import { DataSource } from "@/pages/Playground"

interface DataSourceModalProps {
  selectedDataSources: DataSource[]
  onSelectDataSources: (dataSources: DataSource[]) => void
  children: React.ReactNode
}

const mockDataSources: DataSource[] = [
  {
    id: "1",
    name: "PamperedChef CA",
    description: "Complete product documentation and user guides",
    status: "trained",
    documentCount: 156,
    lastUpdated: "2024-01-15",
    type: "pdf"
  },
  {
    id: "2",
    name: "PamperedChef US",
    description: "Frequently asked questions and support articles",
    status: "trained",
    documentCount: 89,
    lastUpdated: "2024-01-14",
    type: "text"
  },
  {
    id: "3",
    name: "PamperedChef-Product-Docs",
    description: "Internal knowledge base and procedures",
    status: "training",
    documentCount: 234,
    lastUpdated: "2024-01-16",
    type: "web"
  },
  {
    id: "4",
    name: "API Documentation",
    description: "Technical API documentation and examples",
    status: "trained",
    documentCount: 67,
    lastUpdated: "2024-01-13",
    type: "api"
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "pdf": return <FileText className="h-4 w-4" />
    case "text": return <FileText className="h-4 w-4" />
    case "web": return <Globe className="h-4 w-4" />
    case "api": return <Zap className="h-4 w-4" />
    default: return <Database className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "trained": return "bg-green-500/10 text-green-400 border-green-500/30"
    case "training": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
    case "failed": return "bg-red-500/10 text-red-400 border-red-500/30"
    default: return "bg-gray-500/10 text-gray-400 border-gray-500/30"
  }
}

export function DataSourceModal({ selectedDataSources, onSelectDataSources, children }: DataSourceModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)

  const filteredDataSources = mockDataSources.filter(ds => 
    ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ds.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDataSourceToggle = (dataSource: DataSource, checked: boolean) => {
    if (checked) {
      onSelectDataSources([...selectedDataSources, dataSource])
    } else {
      onSelectDataSources(selectedDataSources.filter(ds => ds.id !== dataSource.id))
    }
  }

  const isSelected = (dataSourceId: string) => {
    return selectedDataSources.some(ds => ds.id === dataSourceId)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Select Data Sources
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Choose one or more data sources for your AI assistant. Selected sources will be used to answer questions.
          </p>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search data sources..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Selected Count */}
          {selectedDataSources.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {selectedDataSources.length} data source{selectedDataSources.length !== 1 ? 's' : ''} selected
            </div>
          )}

          {/* Data Sources List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {filteredDataSources.map((dataSource) => (
              <div
                key={dataSource.id}
                className="p-4 rounded-lg border border-border/30 bg-card/40 hover:bg-card/60 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected(dataSource.id)}
                    onCheckedChange={(checked) => handleDataSourceToggle(dataSource, checked as boolean)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(dataSource.type)}
                        <h3 className="font-medium text-foreground">{dataSource.name}</h3>
                      </div>
                      <Badge className={getStatusColor(dataSource.status)}>
                        {dataSource.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {dataSource.description}
                    </p>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{dataSource.documentCount} documents</span>
                      <span>Updated {dataSource.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Source
            </Button>
            <Button onClick={() => setOpen(false)}>
              Done ({selectedDataSources.length} selected)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
