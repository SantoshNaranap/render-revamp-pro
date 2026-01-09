
import { useState } from "react"
import { FacultyLayout } from "@/components/faculty/FacultyLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { 
  BookOpen, 
  Plus, 
  Search,
  Users,
  FileText,
  Calendar,
  Settings,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const courses = [
  { 
    id: 1,
    name: "Data Structures & Algorithms", 
    code: "CS301",
    description: "Fundamental data structures and algorithm design techniques",
    students: 45, 
    units: 5,
    materials: 24,
    exams: 3,
    status: "active",
    semester: "Spring 2024"
  },
  { 
    id: 2,
    name: "Database Management Systems", 
    code: "CS302",
    description: "Database design, SQL, and transaction management",
    students: 52, 
    units: 6,
    materials: 18,
    exams: 2,
    status: "active",
    semester: "Spring 2024"
  },
  { 
    id: 3,
    name: "Operating Systems", 
    code: "CS303",
    description: "Process management, memory, and file systems",
    students: 48, 
    units: 5,
    materials: 20,
    exams: 3,
    status: "active",
    semester: "Spring 2024"
  },
  { 
    id: 4,
    name: "Computer Networks", 
    code: "CS304",
    description: "Network protocols, architectures, and security",
    students: 41, 
    units: 7,
    materials: 15,
    exams: 2,
    status: "active",
    semester: "Spring 2024"
  },
]

export default function FacultyCourses() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <FacultyLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground mt-1">
              Manage your courses, syllabi, and student enrollments
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input id="code" placeholder="e.g., CS305" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input id="name" placeholder="e.g., Machine Learning Fundamentals" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of the course..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input id="semester" placeholder="e.g., Spring 2024" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="units">Number of Units</Label>
                    <Input id="units" type="number" placeholder="5" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsCreateOpen(false)}>Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search courses..." 
            className="pl-10 bg-background/60 border-border/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Course Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-card/50 border-border/60">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardDescription className="text-sm font-medium">{course.code}</CardDescription>
                      <CardTitle className="text-lg mt-1">{course.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Course Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Archive Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                    {course.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{course.semester}</span>
                </div>

                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-2 rounded-lg bg-background/50">
                    <Users className="h-4 w-4 mx-auto text-blue-500 mb-1" />
                    <p className="text-lg font-bold text-foreground">{course.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="p-2 rounded-lg bg-background/50">
                    <BookOpen className="h-4 w-4 mx-auto text-primary mb-1" />
                    <p className="text-lg font-bold text-foreground">{course.units}</p>
                    <p className="text-xs text-muted-foreground">Units</p>
                  </div>
                  <div className="p-2 rounded-lg bg-background/50">
                    <FileText className="h-4 w-4 mx-auto text-green-500 mb-1" />
                    <p className="text-lg font-bold text-foreground">{course.materials}</p>
                    <p className="text-xs text-muted-foreground">Materials</p>
                  </div>
                  <div className="p-2 rounded-lg bg-background/50">
                    <Calendar className="h-4 w-4 mx-auto text-amber-500 mb-1" />
                    <p className="text-lg font-bold text-foreground">{course.exams}</p>
                    <p className="text-xs text-muted-foreground">Exams</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Content
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    View Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FacultyLayout>
  )
}
