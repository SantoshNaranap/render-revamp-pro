
import { FacultyLayout } from "@/components/faculty/FacultyLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Brain,
  TrendingUp,
  ChevronRight,
  Plus,
  FileText,
  AlertCircle
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const courseStats = [
  { name: "Data Structures & Algorithms", code: "CS301", students: 45, engagement: 78, gaps: 3 },
  { name: "Database Management Systems", code: "CS302", students: 52, engagement: 65, gaps: 5 },
  { name: "Operating Systems", code: "CS303", students: 48, engagement: 82, gaps: 2 },
  { name: "Computer Networks", code: "CS304", students: 41, engagement: 58, gaps: 4 },
]

const recentActivity = [
  { type: "question", content: "12 students asked about Binary Trees", course: "CS301", time: "2 hours ago" },
  { type: "gap", content: "Knowledge gap detected: SQL Joins", course: "CS302", time: "4 hours ago" },
  { type: "content", content: "New materials uploaded for Unit 3", course: "CS303", time: "Yesterday" },
  { type: "milestone", content: "Mid-semester exam configured", course: "CS301", time: "2 days ago" },
]

const commonGaps = [
  { topic: "Recursion in Trees", course: "CS301", students: 18, severity: "high" },
  { topic: "SQL Joins", course: "CS302", students: 24, severity: "high" },
  { topic: "Deadlock Prevention", course: "CS303", students: 12, severity: "medium" },
]

export default function FacultyDashboard() {
  const navigate = useNavigate()

  return (
    <FacultyLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome, Dr. Sharma</h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your courses and student engagement
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/faculty/content')}>
              <FileText className="h-4 w-4 mr-2" />
              Upload Content
            </Button>
            <Button onClick={() => navigate('/faculty/courses')}>
              <Plus className="h-4 w-4 mr-2" />
              New Course
            </Button>
          </div>
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
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">186</p>
                  <p className="text-xs text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                  <p className="text-xs text-muted-foreground">Bot Interactions</p>
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
                  <p className="text-2xl font-bold text-foreground">14</p>
                  <p className="text-xs text-muted-foreground">Knowledge Gaps</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Course Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Course Overview</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/faculty/courses')}>
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {courseStats.map((course, index) => (
                <Card key={index} className="bg-card/50 border-border/60">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">{course.code}</p>
                        <p className="font-medium text-foreground">{course.name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{course.students} students</p>
                          <p className="text-xs text-muted-foreground">{course.engagement}% engagement</p>
                        </div>
                        {course.gaps > 0 && (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                            {course.gaps} gaps
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={course.engagement} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Common Knowledge Gaps */}
            <Card className="bg-card/50 border-border/60">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Common Gaps
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/faculty/insights')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {commonGaps.map((gap, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{gap.topic}</p>
                      <p className="text-xs text-muted-foreground">{gap.course} • {gap.students} students</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        gap.severity === 'high' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }
                    >
                      {gap.severity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card/50 border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="pb-3 border-b border-border/60 last:border-0 last:pb-0">
                    <p className="text-sm text-foreground">{activity.content}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{activity.course}</Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FacultyLayout>
  )
}
