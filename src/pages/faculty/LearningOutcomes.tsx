
import { useState } from "react"
import { FacultyLayout } from "@/components/faculty/FacultyLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target, 
  Plus, 
  BookOpen,
  Calendar,
  CheckCircle2,
  Circle,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const courseOutcomes = [
  {
    course: "Data Structures & Algorithms",
    code: "CS301",
    units: [
      {
        name: "Unit 1: Arrays & Linked Lists",
        week: "Week 1-2",
        outcomes: [
          { id: 1, text: "Understand array operations and time complexity", priority: "high" },
          { id: 2, text: "Implement singly and doubly linked lists", priority: "high" },
          { id: 3, text: "Compare array vs linked list performance", priority: "medium" },
        ]
      },
      {
        name: "Unit 2: Stacks & Queues",
        week: "Week 3-4",
        outcomes: [
          { id: 4, text: "Implement stack using arrays and linked lists", priority: "high" },
          { id: 5, text: "Understand queue operations and circular queues", priority: "high" },
          { id: 6, text: "Apply stacks in expression evaluation", priority: "medium" },
        ]
      },
      {
        name: "Unit 3: Trees",
        week: "Week 5-7",
        outcomes: [
          { id: 7, text: "Understand binary tree properties", priority: "high" },
          { id: 8, text: "Implement tree traversal algorithms", priority: "high" },
          { id: 9, text: "Apply recursion in tree problems", priority: "high" },
          { id: 10, text: "Understand BST operations", priority: "medium" },
        ]
      },
    ]
  },
  {
    course: "Database Management Systems",
    code: "CS302",
    units: [
      {
        name: "Unit 1: Introduction to DBMS",
        week: "Week 1-2",
        outcomes: [
          { id: 11, text: "Understand database concepts and architecture", priority: "medium" },
          { id: 12, text: "Compare file systems vs DBMS", priority: "low" },
        ]
      },
      {
        name: "Unit 2: ER Modeling",
        week: "Week 3-4",
        outcomes: [
          { id: 13, text: "Create ER diagrams from requirements", priority: "high" },
          { id: 14, text: "Understand entities, attributes, relationships", priority: "high" },
          { id: 15, text: "Handle cardinality and participation constraints", priority: "medium" },
        ]
      },
    ]
  },
]

export default function LearningOutcomes() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [expandedCourses, setExpandedCourses] = useState<string[]>(["CS301"])

  const toggleCourse = (code: string) => {
    setExpandedCourses(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Must Know</Badge>
      case 'medium':
        return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Should Know</Badge>
      case 'low':
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Good to Know</Badge>
      default:
        return null
    }
  }

  return (
    <FacultyLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Learning Outcomes</h1>
            <p className="text-muted-foreground mt-1">
              Define what students should know by when — powers knowledge gap detection
            </p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Outcome
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Learning Outcome</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Unit 1</SelectItem>
                        <SelectItem value="2">Unit 2</SelectItem>
                        <SelectItem value="3">Unit 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Outcome Description</Label>
                  <Textarea placeholder="e.g., Understand and implement binary search tree operations" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Expected By</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select week" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week1">Week 1</SelectItem>
                        <SelectItem value="week2">Week 2</SelectItem>
                        <SelectItem value="week3">Week 3</SelectItem>
                        <SelectItem value="week4">Week 4</SelectItem>
                        <SelectItem value="midsem">Mid-Semester</SelectItem>
                        <SelectItem value="endsem">End-Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Must Know</SelectItem>
                        <SelectItem value="medium">Should Know</SelectItem>
                        <SelectItem value="low">Good to Know</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddOpen(false)}>Add Outcome</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">How Learning Outcomes Work</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Learning outcomes define what students should understand by specific points in the semester. 
                  Nexus uses these to detect knowledge gaps — when a student's interactions suggest they haven't 
                  mastered a concept they should know by now, it's flagged as a gap.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Outcomes */}
        <div className="space-y-6">
          {courseOutcomes.map((course) => (
            <Card key={course.code} className="bg-card/50 border-border/60">
              <Collapsible 
                open={expandedCourses.includes(course.code)}
                onOpenChange={() => toggleCourse(course.code)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-accent/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardDescription className="text-sm font-medium">{course.code}</CardDescription>
                          <CardTitle className="text-lg">{course.course}</CardTitle>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">
                          {course.units.reduce((acc, u) => acc + u.outcomes.length, 0)} outcomes
                        </Badge>
                        {expandedCourses.includes(course.code) ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-6">
                    {course.units.map((unit, unitIndex) => (
                      <div key={unitIndex} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{unit.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {unit.week}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="space-y-2 pl-4 border-l-2 border-border">
                          {unit.outcomes.map((outcome) => (
                            <div 
                              key={outcome.id} 
                              className="flex items-center justify-between p-3 rounded-lg bg-background/50 group"
                            >
                              <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-foreground">{outcome.text}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {getPriorityBadge(outcome.priority)}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-destructive">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </FacultyLayout>
  )
}
