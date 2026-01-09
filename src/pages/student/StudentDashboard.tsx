
import { StudentLayout } from "@/components/student/StudentLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Brain, 
  Target, 
  MessageSquare, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const enrolledCourses = [
  { 
    id: 1, 
    name: "Data Structures & Algorithms", 
    code: "CS301", 
    progress: 68, 
    nextTopic: "Binary Trees",
    upcomingExam: "Mid-Semester - 12 days"
  },
  { 
    id: 2, 
    name: "Database Management Systems", 
    code: "CS302", 
    progress: 45, 
    nextTopic: "Normalization",
    upcomingExam: "Quiz 2 - 5 days"
  },
  { 
    id: 3, 
    name: "Operating Systems", 
    code: "CS303", 
    progress: 72, 
    nextTopic: "Process Scheduling",
    upcomingExam: "Assignment Due - 3 days"
  },
  { 
    id: 4, 
    name: "Computer Networks", 
    code: "CS304", 
    progress: 35, 
    nextTopic: "TCP/IP Protocol",
    upcomingExam: "Lab Exam - 8 days"
  },
]

const knowledgeGaps = [
  { topic: "Recursion in Trees", course: "CS301", priority: "high" },
  { topic: "ER Diagrams", course: "CS302", priority: "medium" },
  { topic: "Deadlock Prevention", course: "CS303", priority: "low" },
]

export default function StudentDashboard() {
  const navigate = useNavigate()

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, Student!</h1>
            <p className="text-muted-foreground mt-1">
              Here's what you should focus on today
            </p>
          </div>
          <Button 
            onClick={() => navigate('/student/chat')}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Ask Nexus
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4</p>
                  <p className="text-xs text-muted-foreground">Active Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Brain className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Knowledge Gaps</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Target className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">55%</p>
                  <p className="text-xs text-muted-foreground">Avg. Readiness</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3 days</p>
                  <p className="text-xs text-muted-foreground">Next Deadline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">My Courses</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/courses')}>
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="bg-card/50 border-border/60 hover:border-primary/40 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardDescription className="text-xs font-medium">{course.code}</CardDescription>
                        <CardTitle className="text-base mt-1">{course.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {course.progress}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Next: {course.nextTopic}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3 text-amber-500" />
                      <span className="text-amber-500">{course.upcomingExam}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Knowledge Gaps & Quick Actions */}
          <div className="space-y-6">
            {/* Knowledge Gaps */}
            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Brain className="h-4 w-4 text-amber-500" />
                    Focus Areas
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/student/gaps')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {knowledgeGaps.map((gap, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{gap.topic}</p>
                      <p className="text-xs text-muted-foreground">{gap.course}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        gap.priority === 'high' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : gap.priority === 'medium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-green-500/10 text-green-400 border-green-500/20'
                      }
                    >
                      {gap.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate('/student/chat')}
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask about a topic
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate('/student/readiness')}
                >
                  <Target className="h-4 w-4" />
                  Check exam readiness
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate('/student/progress')}
                >
                  <TrendingUp className="h-4 w-4" />
                  View my progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
