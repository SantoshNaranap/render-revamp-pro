
import { useState } from "react"
import { FacultyLayout } from "@/components/faculty/FacultyLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileText, 
  Video, 
  Link2, 
  Upload,
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  Trash2,
  BookOpen
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const contentItems = [
  { id: 1, name: "Unit 1 - Arrays Introduction", type: "notes", course: "CS301", unit: "Unit 1", uploadedAt: "2024-02-15", size: "2.4 MB" },
  { id: 2, name: "Linked Lists Lecture", type: "video", course: "CS301", unit: "Unit 2", uploadedAt: "2024-02-18", size: "156 MB" },
  { id: 3, name: "Binary Trees Tutorial", type: "video", course: "CS301", unit: "Unit 3", uploadedAt: "2024-02-22", size: "89 MB" },
  { id: 4, name: "Stack Operations PDF", type: "notes", course: "CS301", unit: "Unit 2", uploadedAt: "2024-02-20", size: "1.2 MB" },
  { id: 5, name: "ER Diagram Basics", type: "notes", course: "CS302", unit: "Unit 2", uploadedAt: "2024-02-10", size: "3.1 MB" },
  { id: 6, name: "SQL Tutorial Video", type: "video", course: "CS302", unit: "Unit 4", uploadedAt: "2024-02-25", size: "220 MB" },
  { id: 7, name: "Normalization Examples", type: "notes", course: "CS302", unit: "Unit 5", uploadedAt: "2024-02-28", size: "1.8 MB" },
  { id: 8, name: "W3Schools SQL Reference", type: "link", course: "CS302", unit: "Unit 4", uploadedAt: "2024-02-12", size: "-" },
  { id: 9, name: "Process Scheduling Slides", type: "notes", course: "CS303", unit: "Unit 2", uploadedAt: "2024-02-14", size: "4.5 MB" },
  { id: 10, name: "Deadlock Avoidance Video", type: "video", course: "CS303", unit: "Unit 4", uploadedAt: "2024-03-01", size: "134 MB" },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'notes':
      return <FileText className="h-4 w-4 text-blue-500" />
    case 'video':
      return <Video className="h-4 w-4 text-red-500" />
    case 'link':
      return <Link2 className="h-4 w-4 text-green-500" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'notes':
      return <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Notes</Badge>
    case 'video':
      return <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">Video</Badge>
    case 'link':
      return <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">Link</Badge>
    default:
      return null
  }
}

export default function ContentLibrary() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = selectedCourse === "all" || item.course === selectedCourse
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesCourse && matchesType
  })

  const stats = {
    total: contentItems.length,
    notes: contentItems.filter(i => i.type === 'notes').length,
    videos: contentItems.filter(i => i.type === 'video').length,
    links: contentItems.filter(i => i.type === 'link').length,
  }

  return (
    <FacultyLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Library</h1>
            <p className="text-muted-foreground mt-1">
              Upload and manage course materials for your students
            </p>
          </div>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Content</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="content-name">Content Name</Label>
                  <Input id="content-name" placeholder="e.g., Unit 3 - Binary Trees" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="course">Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CS301">CS301 - DSA</SelectItem>
                        <SelectItem value="CS302">CS302 - DBMS</SelectItem>
                        <SelectItem value="CS303">CS303 - OS</SelectItem>
                        <SelectItem value="CS304">CS304 - Networks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Unit 1</SelectItem>
                        <SelectItem value="2">Unit 2</SelectItem>
                        <SelectItem value="3">Unit 3</SelectItem>
                        <SelectItem value="4">Unit 4</SelectItem>
                        <SelectItem value="5">Unit 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Content Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notes">Notes / PDF</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">External Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Upload File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports PDF, DOCX, MP4, and more
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsUploadOpen(false)}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.notes}</p>
                  <p className="text-xs text-muted-foreground">Notes & PDFs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Video className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.videos}</p>
                  <p className="text-xs text-muted-foreground">Videos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Link2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.links}</p>
                  <p className="text-xs text-muted-foreground">External Links</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search content..." 
              className="pl-10 bg-background/60 border-border/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="CS301">CS301 - DSA</SelectItem>
              <SelectItem value="CS302">CS302 - DBMS</SelectItem>
              <SelectItem value="CS303">CS303 - OS</SelectItem>
              <SelectItem value="CS304">CS304 - Networks</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="link">Links</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content List */}
        <Card className="bg-card/50 border-border/60">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredContent.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 hover:bg-accent/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-background/80">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{item.course}</Badge>
                        <span className="text-xs text-muted-foreground">{item.unit}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{item.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getTypeBadge(item.type)}
                    <span className="text-xs text-muted-foreground hidden md:block">{item.uploadedAt}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </FacultyLayout>
  )
}
