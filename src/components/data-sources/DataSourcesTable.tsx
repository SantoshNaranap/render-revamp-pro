
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Globe, Zap, MoreHorizontal, Eye, Trash2, RefreshCw, Clock } from "lucide-react"
import { useState } from "react"
import { DataSourceStatusModal } from "./DataSourceStatusModal"

export interface DataSource {
  id: string
  name: string
  description: string
  status: "trained" | "training" | "failed"
  documentCount: number
  lastUpdated: string
  type: "pdf" | "text" | "web" | "api"
  size: string
  accuracy?: number
  scrapeFrequency?: "hourly" | "daily" | "weekly" | "monthly"
}

const mockDataSources: DataSource[] = [
  {
    id: "1",
    name: "PamperedChef CA",
    description: "Complete product documentation and user guides",
    status: "trained",
    documentCount: 156,
    lastUpdated: "2024-01-15",
    type: "pdf",
    size: "45.2 MB",
    accuracy: 94.5
  },
  {
    id: "2",
    name: "PamperedChef US",
    description: "Frequently asked questions and support articles",
    status: "trained",
    documentCount: 89,
    lastUpdated: "2024-01-14",
    type: "text",
    size: "12.8 MB",
    accuracy: 91.2
  },
  {
    id: "3",
    name: "PamperedChef-Product-Docs",
    description: "Internal knowledge base and procedures",
    status: "training",
    documentCount: 234,
    lastUpdated: "2024-01-16",
    type: "web",
    size: "78.9 MB",
    scrapeFrequency: "daily"
  },
  {
    id: "4",
    name: "API Documentation",
    description: "Technical API documentation and examples",
    status: "trained",
    documentCount: 67,
    lastUpdated: "2024-01-13",
    type: "api",
    size: "23.4 MB",
    accuracy: 96.8
  },
  {
    id: "5",
    name: "Training Materials",
    description: "Employee training and onboarding materials",
    status: "failed",
    documentCount: 145,
    lastUpdated: "2024-01-12",
    type: "pdf",
    size: "56.7 MB"
  },
  {
    id: "6",
    name: "Legal Documents",
    description: "Terms of service, privacy policy, and legal content",
    status: "trained",
    documentCount: 34,
    lastUpdated: "2024-01-11",
    type: "text",
    size: "8.9 MB",
    accuracy: 89.3
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "pdf": return <FileText className="h-4 w-4" />
    case "text": return <FileText className="h-4 w-4" />
    case "web": return <Globe className="h-4 w-4" />
    case "api": return <Zap className="h-4 w-4" />
    default: return <FileText className="h-4 w-4" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "trained": 
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Trained</Badge>
    case "training": 
      return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Training</Badge>
    case "failed": 
      return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Failed</Badge>
    default: 
      return <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/30">{status}</Badge>
  }
}

export function DataSourcesTable() {
  const [dataSources, setDataSources] = useState<DataSource[]>(mockDataSources)
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)

  const handleViewStatus = (dataSource: DataSource) => {
    setSelectedDataSource(dataSource)
    setIsStatusModalOpen(true)
  }

  const handleFrequencyChange = (dataSourceId: string, frequency: string) => {
    setDataSources(prev => prev.map(ds => 
      ds.id === dataSourceId 
        ? { ...ds, scrapeFrequency: frequency as DataSource['scrapeFrequency'] }
        : ds
    ))
  }

  const getFrequencyBadge = (frequency?: string) => {
    if (!frequency) return null
    
    const colors = {
      hourly: "bg-red-500/10 text-red-400 border-red-500/30",
      daily: "bg-blue-500/10 text-blue-400 border-blue-500/30", 
      weekly: "bg-green-500/10 text-green-400 border-green-500/30",
      monthly: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    }
    
    return (
      <Badge className={colors[frequency as keyof typeof colors] || "bg-gray-500/10 text-gray-400 border-gray-500/30"}>
        <Clock className="w-3 h-3 mr-1" />
        {frequency}
      </Badge>
    )
  }

  return (
    <>
      <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">All Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources.map((dataSource) => (
                <TableRow key={dataSource.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(dataSource.type)}
                      <div>
                        <div className="font-medium text-foreground">{dataSource.name}</div>
                        <div className="text-sm text-muted-foreground">{dataSource.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {dataSource.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(dataSource.status)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dataSource.documentCount}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dataSource.size}
                  </TableCell>
                  <TableCell>
                    {dataSource.accuracy ? (
                      <span className="text-green-400 font-medium">{dataSource.accuracy}%</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {dataSource.type === "web" ? (
                      <Select
                        value={dataSource.scrapeFrequency}
                        onValueChange={(value) => handleFrequencyChange(dataSource.id, value)}
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue placeholder="Set frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dataSource.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewStatus(dataSource)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DataSourceStatusModal
        dataSource={selectedDataSource}
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />
    </>
  )
}
