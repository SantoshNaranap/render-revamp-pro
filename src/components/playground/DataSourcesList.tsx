
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Database, FileText, Globe, Zap, Plus } from "lucide-react"
import { useState } from "react"
import { DataSource } from "@/pages/Playground"

interface DataSourcesListProps {
  selectedDataSource: DataSource | null
  onSelectDataSource: (dataSource: DataSource) => void
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

export function DataSourcesList({ selectedDataSource, onSelectDataSource }: DataSourcesListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDataSources = mockDataSources.filter(ds => 
    ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ds.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="h-full flex flex-col border-border/60 bg-card/40 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Sources
          </CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search data sources..." 
            className="pl-10 bg-background/60 border-border/60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {filteredDataSources.map((dataSource) => (
          <div
            key={dataSource.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedDataSource?.id === dataSource.id
                ? "border-primary/50 bg-primary/5"
                : "border-border/30 bg-accent/20 hover:bg-accent/40 hover:border-primary/30"
            }`}
            onClick={() => onSelectDataSource(dataSource)}
          >
            <div className="flex items-start justify-between mb-2">
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
        ))}
      </CardContent>
    </Card>
  )
}
