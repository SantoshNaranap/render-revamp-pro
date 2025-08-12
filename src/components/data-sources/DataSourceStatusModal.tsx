import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Globe, CheckCircle, XCircle, Clock, Download } from "lucide-react"
import { DataSource } from "./DataSourcesTable"

interface DataSourceStatusModalProps {
  dataSource: DataSource | null
  isOpen: boolean
  onClose: () => void
}

// Mock data for scraped URLs and document processing
const getMockWebsiteData = (dataSourceId: string) => ({
  totalUrls: 156,
  scrapedUrls: 142,
  failedUrls: 8,
  pendingUrls: 6,
  urls: [
    { url: "https://example.com/docs/getting-started", status: "completed", lastScraped: "2024-01-15 10:30", wordCount: 1240 },
    { url: "https://example.com/docs/api-reference", status: "completed", lastScraped: "2024-01-15 10:28", wordCount: 2156 },
    { url: "https://example.com/docs/tutorials/basics", status: "completed", lastScraped: "2024-01-15 10:25", wordCount: 892 },
    { url: "https://example.com/docs/tutorials/advanced", status: "processing", lastScraped: "2024-01-15 10:32", wordCount: 0 },
    { url: "https://example.com/docs/faq", status: "failed", lastScraped: "2024-01-15 10:20", wordCount: 0 },
    { url: "https://example.com/docs/troubleshooting", status: "completed", lastScraped: "2024-01-15 10:15", wordCount: 1567 },
    { url: "https://example.com/docs/installation", status: "completed", lastScraped: "2024-01-15 10:12", wordCount: 734 },
    { url: "https://example.com/docs/configuration", status: "processing", lastScraped: "2024-01-15 10:35", wordCount: 0 },
  ]
})

const getMockDocumentData = (dataSourceId: string) => ({
  totalDocuments: 45,
  processedDocuments: 42,
  failedDocuments: 2,
  pendingDocuments: 1,
  documents: [
    { name: "User Manual v2.3.pdf", status: "completed", pages: 124, size: "5.2 MB", processed: "2024-01-15 09:45" },
    { name: "API Documentation.pdf", status: "completed", pages: 89, size: "3.1 MB", processed: "2024-01-15 09:40" },
    { name: "Installation Guide.pdf", status: "completed", pages: 34, size: "1.8 MB", processed: "2024-01-15 09:35" },
    { name: "Troubleshooting Manual.pdf", status: "processing", pages: 67, size: "2.9 MB", processed: "2024-01-15 09:50" },
    { name: "Quick Start Guide.pdf", status: "failed", pages: 12, size: "0.8 MB", processed: "2024-01-15 09:30" },
    { name: "Advanced Features.pdf", status: "completed", pages: 156, size: "8.4 MB", processed: "2024-01-15 09:25" },
  ]
})

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle className="h-4 w-4 text-green-400" />
    case "processing": return <Clock className="h-4 w-4 text-yellow-400" />
    case "failed": return <XCircle className="h-4 w-4 text-red-400" />
    default: return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed": 
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Completed</Badge>
    case "processing": 
      return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Processing</Badge>
    case "failed": 
      return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Failed</Badge>
    default: 
      return <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/30">{status}</Badge>
  }
}

export function DataSourceStatusModal({ dataSource, isOpen, onClose }: DataSourceStatusModalProps) {
  if (!dataSource) return null

  const isWebsite = dataSource.type === "web"
  const websiteData = isWebsite ? getMockWebsiteData(dataSource.id) : null
  const documentData = !isWebsite ? getMockDocumentData(dataSource.id) : null

  const getProgressPercentage = () => {
    if (isWebsite && websiteData) {
      return Math.round((websiteData.scrapedUrls / websiteData.totalUrls) * 100)
    }
    if (documentData) {
      return Math.round((documentData.processedDocuments / documentData.totalDocuments) * 100)
    }
    return 0
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-background/95 backdrop-blur-sm border-border/60">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {isWebsite ? <Globe className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
            <span>{dataSource.name} - Status Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Overview */}
          <Card className="border-border/60 bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg">Processing Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="text-sm font-medium">{getProgressPercentage()}%</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {isWebsite && websiteData ? (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{websiteData.scrapedUrls}</div>
                      <div className="text-xs text-muted-foreground">Scraped URLs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{websiteData.pendingUrls}</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{websiteData.failedUrls}</div>
                      <div className="text-xs text-muted-foreground">Failed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{websiteData.totalUrls}</div>
                      <div className="text-xs text-muted-foreground">Total URLs</div>
                    </div>
                  </>
                ) : documentData ? (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{documentData.processedDocuments}</div>
                      <div className="text-xs text-muted-foreground">Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{documentData.pendingDocuments}</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{documentData.failedDocuments}</div>
                      <div className="text-xs text-muted-foreground">Failed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{documentData.totalDocuments}</div>
                      <div className="text-xs text-muted-foreground">Total Documents</div>
                    </div>
                  </>
                ) : null}
              </div>
            </CardContent>
          </Card>

          {/* Detailed List */}
          <Card className="border-border/60 bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg">
                {isWebsite ? "Scraped URLs" : "Document Processing Status"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {isWebsite && websiteData ? (
                    websiteData.urls.map((urlData, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                        <div className="flex items-center space-x-3 flex-1">
                          {getStatusIcon(urlData.status)}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                              {urlData.url}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last scraped: {urlData.lastScraped} | Words: {urlData.wordCount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(urlData.status)}
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : documentData ? (
                    documentData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                        <div className="flex items-center space-x-3 flex-1">
                          {getStatusIcon(doc.status)}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                              {doc.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {doc.pages} pages | {doc.size} | Processed: {doc.processed}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : null}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}