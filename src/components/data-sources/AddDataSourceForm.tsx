
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  Globe, 
  Database, 
  FileText, 
  Zap, 
  Upload,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export function AddDataSourceForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("website")

  // Website form state
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [websiteDepth, setWebsiteDepth] = useState("2")
  const [websiteName, setWebsiteName] = useState("")
  const [crawledUrls, setCrawledUrls] = useState<{url: string, status: 'pending' | 'crawling' | 'completed' | 'failed', progress: number}[]>([])
  const [isCrawling, setIsCrawling] = useState(false)

  // Database form state
  const [dbType, setDbType] = useState("postgresql")
  const [dbHost, setDbHost] = useState("")
  const [dbPort, setDbPort] = useState("")
  const [dbName, setDbName] = useState("")
  const [dbUsername, setDbUsername] = useState("")
  const [dbPassword, setDbPassword] = useState("")

  // Files form state
  const [files, setFiles] = useState<File[]>([])
  const [filesName, setFilesName] = useState("")

  // API form state
  const [apiUrl, setApiUrl] = useState("")
  const [apiMethod, setApiMethod] = useState("GET")
  const [apiHeaders, setApiHeaders] = useState([{ key: "", value: "" }])
  const [apiName, setApiName] = useState("")

  const handleWebsiteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsCrawling(true)
    
    // Simulate discovering URLs and crawling process
    const mockUrls = [
      websiteUrl,
      websiteUrl + "/about",
      websiteUrl + "/services", 
      websiteUrl + "/contact",
      websiteUrl + "/blog",
      websiteUrl + "/products",
      websiteUrl + "/support",
      websiteUrl + "/careers"
    ]
    
    // Initialize URLs with pending status
    setCrawledUrls(mockUrls.map(url => ({ url, status: 'pending', progress: 0 })))
    
    // Simulate crawling each URL
    for (let i = 0; i < mockUrls.length; i++) {
      setTimeout(() => {
        setCrawledUrls(prev => prev.map((item, index) => 
          index === i ? { ...item, status: 'crawling' } : item
        ))
        
        // Simulate progress
        let progress = 0
        const progressInterval = setInterval(() => {
          progress += 20
          setCrawledUrls(prev => prev.map((item, index) => 
            index === i ? { ...item, progress } : item
          ))
          
          if (progress >= 100) {
            clearInterval(progressInterval)
            setCrawledUrls(prev => prev.map((item, index) => 
              index === i ? { ...item, status: 'completed', progress: 100 } : item
            ))
          }
        }, 200)
      }, i * 1000)
    }
    
    // Complete the process
    setTimeout(() => {
      toast({
        title: "Website Source Added",
        description: `Successfully crawled ${mockUrls.length} pages from ${websiteUrl}`,
      })
      setIsLoading(false)
      setIsCrawling(false)
      // navigate("/data-sources") - Don't navigate immediately so user can see results
    }, mockUrls.length * 1000 + 2000)
  }

  const handleDatabaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Database Connected",
        description: `Successfully connected to ${dbName} database`,
      })
      setIsLoading(false)
      navigate("/data-sources")
    }, 2000)
  }

  const handleFilesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate file upload
    setTimeout(() => {
      toast({
        title: "Files Uploaded",
        description: `Successfully uploaded ${files.length} files`,
      })
      setIsLoading(false)
      navigate("/data-sources")
    }, 2000)
  }

  const handleApiSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API connection
    setTimeout(() => {
      toast({
        title: "API Connected",
        description: `Successfully connected to ${apiUrl}`,
      })
      setIsLoading(false)
      navigate("/data-sources")
    }, 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const addApiHeader = () => {
    setApiHeaders([...apiHeaders, { key: "", value: "" }])
  }

  const updateApiHeader = (index: number, field: "key" | "value", value: string) => {
    const updated = apiHeaders.map((header, i) => 
      i === index ? { ...header, [field]: value } : header
    )
    setApiHeaders(updated)
  }

  const removeApiHeader = (index: number) => {
    setApiHeaders(apiHeaders.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        onClick={() => navigate("/data-sources")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Data Sources
      </Button>

      <Card className="border-border/60 bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Select Data Source Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="website" className="gap-2">
                <Globe className="h-4 w-4" />
                Website
              </TabsTrigger>
              <TabsTrigger value="database" className="gap-2">
                <Database className="h-4 w-4" />
                Database
              </TabsTrigger>
              <TabsTrigger value="files" className="gap-2">
                <FileText className="h-4 w-4" />
                Files
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2">
                <Zap className="h-4 w-4" />
                API
              </TabsTrigger>
            </TabsList>

            <TabsContent value="website" className="space-y-4 mt-6">
              <form onSubmit={handleWebsiteSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website-name">Source Name</Label>
                  <Input
                    id="website-name"
                    placeholder="e.g., Company Website"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website-url">Website URL</Label>
                  <Input
                    id="website-url"
                    type="url"
                    placeholder="https://example.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crawl-depth">Crawl Depth</Label>
                  <Input
                    id="crawl-depth"
                    type="number"
                    min="1"
                    max="5"
                    value={websiteDepth}
                    onChange={(e) => setWebsiteDepth(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    How many levels deep to crawl (1-5)
                  </p>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Crawling Website..." : "Start Crawling"}
                </Button>
                
                {/* Crawled URLs Display */}
                {isCrawling && crawledUrls.length > 0 && (
                  <Card className="mt-6 border-border/60 bg-card/40 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Crawling Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {crawledUrls.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {item.status === 'pending' && <Clock className="h-4 w-4 text-muted-foreground" />}
                              {item.status === 'crawling' && <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
                              {item.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                              {item.status === 'failed' && <AlertCircle className="h-4 w-4 text-red-500" />}
                              <span className="text-sm font-medium text-foreground">{item.url}</span>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={
                                item.status === 'completed' ? 'border-green-500/30 text-green-400' :
                                item.status === 'crawling' ? 'border-yellow-500/30 text-yellow-400' :
                                item.status === 'failed' ? 'border-red-500/30 text-red-400' :
                                'border-gray-500/30 text-gray-400'
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                          {item.status === 'crawling' && (
                            <Progress value={item.progress} className="h-2" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </form>
            </TabsContent>

            <TabsContent value="database" className="space-y-4 mt-6">
              <form onSubmit={handleDatabaseSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-type">Database Type</Label>
                    <select 
                      id="db-type"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={dbType}
                      onChange={(e) => setDbType(e.target.value)}
                    >
                      <option value="postgresql">PostgreSQL</option>
                      <option value="mysql">MySQL</option>
                      <option value="mongodb">MongoDB</option>
                      <option value="sqlite">SQLite</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-name-field">Database Name</Label>
                    <Input
                      id="db-name-field"
                      placeholder="my_database"
                      value={dbName}
                      onChange={(e) => setDbName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Host</Label>
                    <Input
                      id="db-host"
                      placeholder="localhost"
                      value={dbHost}
                      onChange={(e) => setDbHost(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-port">Port</Label>
                    <Input
                      id="db-port"
                      placeholder="5432"
                      value={dbPort}
                      onChange={(e) => setDbPort(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-username">Username</Label>
                    <Input
                      id="db-username"
                      placeholder="username"
                      value={dbUsername}
                      onChange={(e) => setDbUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-password">Password</Label>
                    <Input
                      id="db-password"
                      type="password"
                      placeholder="password"
                      value={dbPassword}
                      onChange={(e) => setDbPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Connecting..." : "Connect Database"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="files" className="space-y-4 mt-6">
              <form onSubmit={handleFilesSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="files-name">Source Name</Label>
                  <Input
                    id="files-name"
                    placeholder="e.g., Product Documentation"
                    value={filesName}
                    onChange={(e) => setFilesName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload Files</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.txt,.docx,.md"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">
                        Drop files here or click to browse
                      </span>
                      <br />
                      <span className="text-xs text-muted-foreground">
                        Supports PDF, TXT, DOCX, MD files
                      </span>
                    </Label>
                  </div>
                </div>
                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files</Label>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Button type="submit" disabled={isLoading || files.length === 0} className="w-full">
                  {isLoading ? "Uploading..." : "Upload Files"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="api" className="space-y-4 mt-6">
              <form onSubmit={handleApiSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-name">Source Name</Label>
                  <Input
                    id="api-name"
                    placeholder="e.g., Customer API"
                    value={apiName}
                    onChange={(e) => setApiName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-method">Method</Label>
                    <select 
                      id="api-method"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={apiMethod}
                      onChange={(e) => setApiMethod(e.target.value)}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                    </select>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label htmlFor="api-url">API URL</Label>
                    <Input
                      id="api-url"
                      type="url"
                      placeholder="https://api.example.com/data"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Headers</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addApiHeader}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Header
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {apiHeaders.map((header, index) => (
                      <div key={index} className="grid grid-cols-5 gap-2">
                        <div className="col-span-2">
                          <Input
                            placeholder="Header name"
                            value={header.key}
                            onChange={(e) => updateApiHeader(index, "key", e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            placeholder="Header value"
                            value={header.value}
                            onChange={(e) => updateApiHeader(index, "value", e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeApiHeader(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Connecting..." : "Connect API"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
