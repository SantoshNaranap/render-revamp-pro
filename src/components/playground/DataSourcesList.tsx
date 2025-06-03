
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Database, FileText, Globe, Zap, Plus, Sparkles } from "lucide-react"
import { useState } from "react"
import { DataSource } from "@/pages/Playground"

interface DataSourcesListProps {
  selectedDataSource: DataSource | null
  onSelectDataSource: (dataSource: DataSource) => void
}

const mockDataSources: DataSource[] = [
  {
    id: "1",
    name: "Product Documentation",
    description: "Complete product documentation and user guides",
    status: "trained",
    documentCount: 156,
    lastUpdated: "2024-01-15",
    type: "pdf"
  },
  {
    id: "2",
    name: "Customer Support FAQ",
    description: "Frequently asked questions and support articles",
    status: "trained",
    documentCount: 89,
    lastUpdated: "2024-01-14",
    type: "text"
  },
  {
    id: "3",
    name: "Company Knowledge Base",
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
    case "trained": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    case "training": return "bg-amber-500/10 text-amber-400 border-amber-500/30"
    case "failed": return "bg-red-500/10 text-red-400 border-red-500/30"
    default: return "bg-gray-500/10 text-gray-400 border-gray-500/30"
  }
}

export function DataSourcesList({ selectedDataSource, onSelectDataSource }: DataSourcesListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDataSources = mockDataSources.filter(ds => 
    ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ds.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <Database className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Data Sources</h2>
            <p className="text-sm text-muted-foreground">Select a trained model to experiment with</p>
          </div>
        </div>
        <Button size="sm" className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Plus className="h-4 w-4" />
          Add Source
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search data sources..." 
          className="pl-10 bg-background/80 border-border/40 focus:border-primary/40"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Data Sources Grid */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredDataSources.map((dataSource) => (
          <div
            key={dataSource.id}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 group ${
              selectedDataSource?.id === dataSource.id
                ? "border-primary/60 bg-gradient-to-r from-primary/10 to-primary/5 shadow-lg shadow-primary/20"
                : "border-border/20 bg-background/40 hover:bg-background/60 hover:border-primary/40 hover:shadow-md"
            }`}
            onClick={() => onSelectDataSource(dataSource)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-accent/40 group-hover:bg-accent/60 transition-colors">
                  {getTypeIcon(dataSource.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {dataSource.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {dataSource.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getStatusColor(dataSource.status)}`}>
                  {dataSource.status === "trained" && <Sparkles className="h-3 w-3 mr-1" />}
                  {dataSource.status}
                </Badge>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border/20">
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" />
                {dataSource.documentCount} docs
              </span>
              <span>Updated {dataSource.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
