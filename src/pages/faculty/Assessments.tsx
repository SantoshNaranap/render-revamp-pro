
import { useState } from "react"
import { FacultyLayout } from "@/components/faculty/FacultyLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Calendar as CalendarIcon, 
  Plus, 
  BookOpen,
  Clock,
  Target,
  Edit,
  Trash2,
  FileText,
  Users
} from "lucide-react"
import { format } from "date-fns"

const assessments = [
  {
    id: 1,
    name: "Mid-Semester Examination",
    course: "CS301",
    courseName: "Data Structures & Algorithms",
    type: "exam",
    date: "2024-03-15",
    duration: "2 hours",
    topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Binary Trees"],
    status: "upcoming"
  },
  {
    id: 2,
    name: "Quiz 2 - ER Modeling",
    course: "CS302",
    courseName: "Database Management Systems",
    type: "quiz",
    date: "2024-03-08",
    duration: "30 mins",
    topics: ["ER Diagrams", "Relationships", "Cardinality"],
    status: "upcoming"
  },
  {
    id: 3,
    name: "Assignment 2 - Process Scheduling",
    course: "CS303",
    courseName: "Operating Systems",
    type: "assignment",
    date: "2024-03-06",
    duration: "1 week",
    topics: ["CPU Scheduling", "Priority Scheduling", "Round Robin"],
    status: "upcoming"
  },
  {
    id: 4,
    name: "Lab Exam - Network Protocols",
    course: "CS304",
    courseName: "Computer Networks",
    type: "lab",
    date: "2024-03-11",
    duration: "1.5 hours",
    topics: ["TCP/IP", "UDP", "Socket Programming"],
    status: "upcoming"
  },
  {
    id: 5,
    name: "Quiz 1 - Arrays & Lists",
    course: "CS301",
    courseName: "Data Structures & Algorithms",
    type: "quiz",
    date: "2024-02-20",
    duration: "30 mins",
    topics: ["Arrays", "Linked Lists"],
    status: "completed"
  },
]

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'exam':
      return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Exam</Badge>
    case 'quiz':
      return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Quiz</Badge>
    case 'assignment':
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Assignment</Badge>
    case 'lab':
      return <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Lab</Badge>
    default:
      return null
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">Upcoming</Badge>
    case 'completed':
      return <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">Completed</Badge>
    default:
      return null
  }
}

export default function Assessments() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredAssessments = assessments.filter(a => 
    filterStatus === "all" || a.status === filterStatus
  )

  const upcomingCount = assessments.filter(a => a.status === 'upcoming').length

  return (
    <FacultyLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assessments</h1>
            <p className="text-muted-foreground mt-1">
              Configure exams, quizzes, and assignments — powers exam readiness signals
            </p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Assessment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Assessment Name</Label>
                  <Input placeholder="e.g., Mid-Semester Examination" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Course</Label>
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
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="lab">Lab Exam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label>Duration</Label>
                    <Input placeholder="e.g., 2 hours" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Topics Covered (comma-separated)</Label>
                  <Input placeholder="e.g., Arrays, Linked Lists, Stacks" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddOpen(false)}>Add Assessment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Target className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">How Assessments Power Readiness</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  When you configure assessments with their topics and dates, Nexus can calculate each 
                  student's readiness level. It compares what they should know (from Learning Outcomes) 
                  with what they've demonstrated understanding of (from their interactions).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline">
            {upcomingCount} upcoming
          </Badge>
        </div>

        {/* Assessments List */}
        <div className="grid gap-4">
          {filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="bg-card/50 border-border/60">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getTypeBadge(assessment.type)}
                        {getStatusBadge(assessment.status)}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{assessment.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {assessment.course} - {assessment.courseName}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          {assessment.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {assessment.duration}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {assessment.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      View Readiness
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FacultyLayout>
  )
}
