
import { StudentLayout } from "@/components/student/StudentLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Search,
  FileText,
  Video,
  Link2,
  ChevronRight,
  Clock
} from "lucide-react"

const courses = [
  { 
    id: 1, 
    name: "Data Structures & Algorithms", 
    code: "CS301",
    instructor: "Dr. Sharma",
    progress: 68, 
    units: [
      { name: "Arrays & Linked Lists", completed: true },
      { name: "Stacks & Queues", completed: true },
      { name: "Trees", completed: false },
      { name: "Graphs", completed: false },
      { name: "Sorting & Searching", completed: false },
    ],
    resources: { notes: 24, videos: 12, links: 8 },
    upcomingExam: "Mid-Semester - 12 days"
  },
  { 
    id: 2, 
    name: "Database Management Systems", 
    code: "CS302",
    instructor: "Prof. Gupta",
    progress: 45, 
    units: [
      { name: "Introduction to DBMS", completed: true },
      { name: "ER Modeling", completed: true },
      { name: "Relational Model", completed: false },
      { name: "SQL", completed: false },
      { name: "Normalization", completed: false },
    ],
    resources: { notes: 18, videos: 8, links: 5 },
    upcomingExam: "Quiz 2 - 5 days"
  },
  { 
    id: 3, 
    name: "Operating Systems", 
    code: "CS303",
    instructor: "Dr. Patel",
    progress: 72, 
    units: [
      { name: "Process Management", completed: true },
      { name: "CPU Scheduling", completed: true },
      { name: "Memory Management", completed: true },
      { name: "Deadlocks", completed: false },
      { name: "File Systems", completed: false },
    ],
    resources: { notes: 20, videos: 15, links: 10 },
    upcomingExam: "Assignment Due - 3 days"
  },
  { 
    id: 4, 
    name: "Computer Networks", 
    code: "CS304",
    instructor: "Dr. Kumar",
    progress: 35, 
    units: [
      { name: "Network Models", completed: true },
      { name: "Physical Layer", completed: false },
      { name: "Data Link Layer", completed: false },
      { name: "Network Layer", completed: false },
      { name: "Transport Layer", completed: false },
    ],
    resources: { notes: 15, videos: 10, links: 6 },
    upcomingExam: "Lab Exam - 8 days"
  },
]

export default function StudentCourses() {
  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground mt-1">
              Access your course materials and track progress
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search courses or topics..." 
              className="pl-10 bg-background/60 border-border/60"
            />
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-card/50 border-border/60">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardDescription className="text-sm font-medium">{course.code}</CardDescription>
                      <CardTitle className="text-xl mt-1">{course.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Instructor: {course.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.upcomingExam}
                    </Badge>
                    <Button size="sm" className="gap-2">
                      Open Course <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Units */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Units</h4>
                    <div className="space-y-2">
                      {course.units.map((unit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${unit.completed ? 'bg-green-500' : 'bg-muted'}`} />
                          <span className={unit.completed ? 'text-muted-foreground' : 'text-foreground'}>
                            {unit.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Available Resources</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col items-center p-3 rounded-lg bg-background/50">
                        <FileText className="h-5 w-5 text-blue-500 mb-1" />
                        <span className="text-lg font-bold text-foreground">{course.resources.notes}</span>
                        <span className="text-xs text-muted-foreground">Notes</span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-background/50">
                        <Video className="h-5 w-5 text-red-500 mb-1" />
                        <span className="text-lg font-bold text-foreground">{course.resources.videos}</span>
                        <span className="text-xs text-muted-foreground">Videos</span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-background/50">
                        <Link2 className="h-5 w-5 text-green-500 mb-1" />
                        <span className="text-lg font-bold text-foreground">{course.resources.links}</span>
                        <span className="text-xs text-muted-foreground">Links</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StudentLayout>
  )
}
