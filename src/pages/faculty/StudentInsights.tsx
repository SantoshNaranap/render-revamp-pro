
import { FacultyLayout } from "@/components/faculty/FacultyLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Brain,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  BookOpen,
  Target,
  Clock
} from "lucide-react"

const engagementStats = {
  totalStudents: 186,
  activeThisWeek: 142,
  totalInteractions: 1247,
  avgInteractionsPerStudent: 6.7
}

const knowledgeGaps = [
  { topic: "Recursion in Trees", course: "CS301", students: 18, percentage: 40 },
  { topic: "SQL Joins", course: "CS302", students: 24, percentage: 46 },
  { topic: "Deadlock Prevention", course: "CS303", students: 12, percentage: 25 },
  { topic: "ER Diagrams", course: "CS302", students: 15, percentage: 29 },
  { topic: "Graph Traversal", course: "CS301", students: 20, percentage: 44 },
]

const commonQuestions = [
  { question: "How does recursion work in binary trees?", count: 34, course: "CS301" },
  { question: "Explain the difference between INNER and OUTER joins", count: 28, course: "CS302" },
  { question: "What is the Banker's algorithm?", count: 22, course: "CS303" },
  { question: "How to create an ER diagram from requirements?", count: 19, course: "CS302" },
  { question: "When to use BFS vs DFS?", count: 17, course: "CS301" },
]

const courseEngagement = [
  { course: "CS301 - DSA", students: 45, activeRate: 78, avgReadiness: 65 },
  { course: "CS302 - DBMS", students: 52, activeRate: 65, avgReadiness: 52 },
  { course: "CS303 - OS", students: 48, activeRate: 82, avgReadiness: 71 },
  { course: "CS304 - Networks", students: 41, activeRate: 58, avgReadiness: 45 },
]

export default function StudentInsights() {
  return (
    <FacultyLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Insights</h1>
            <p className="text-muted-foreground mt-1">
              Aggregate analytics on student engagement and learning gaps
            </p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="CS301">CS301 - DSA</SelectItem>
              <SelectItem value="CS302">CS302 - DBMS</SelectItem>
              <SelectItem value="CS303">CS303 - OS</SelectItem>
              <SelectItem value="CS304">CS304 - Networks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{engagementStats.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{engagementStats.activeThisWeek}</p>
                  <p className="text-xs text-muted-foreground">Active This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{engagementStats.totalInteractions}</p>
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
                  <p className="text-2xl font-bold text-foreground">{engagementStats.avgInteractionsPerStudent}</p>
                  <p className="text-xs text-muted-foreground">Avg per Student</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="gaps" className="space-y-6">
          <TabsList>
            <TabsTrigger value="gaps">Knowledge Gaps</TabsTrigger>
            <TabsTrigger value="questions">Common Questions</TabsTrigger>
            <TabsTrigger value="engagement">Course Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="gaps" className="space-y-4">
            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Common Knowledge Gaps
                </CardTitle>
                <CardDescription>
                  Topics where students are struggling — consider addressing these in class
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {knowledgeGaps.map((gap, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{gap.topic}</p>
                        <p className="text-sm text-muted-foreground">{gap.course} • {gap.students} students affected</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          gap.percentage > 40 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }
                      >
                        {gap.percentage}% struggling
                      </Badge>
                    </div>
                    <Progress value={gap.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Most Asked Questions
                </CardTitle>
                <CardDescription>
                  Questions students frequently ask Nexus — indicates areas needing more clarity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {commonQuestions.map((q, index) => (
                  <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">"{q.question}"</p>
                      <Badge variant="outline" className="text-xs mt-2">{q.course}</Badge>
                    </div>
                    <Badge variant="secondary">{q.count} times</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {courseEngagement.map((course, index) => (
                <Card key={index} className="bg-card/50 border-border/60">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">{course.course}</CardTitle>
                      </div>
                      <Badge variant="outline">{course.students} students</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Active Rate
                        </span>
                        <span className="font-medium text-foreground">{course.activeRate}%</span>
                      </div>
                      <Progress value={course.activeRate} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          Avg Readiness
                        </span>
                        <span className="font-medium text-foreground">{course.avgReadiness}%</span>
                      </div>
                      <Progress value={course.avgReadiness} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Privacy Note */}
        <Card className="bg-card/50 border-border/60">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Privacy Protected</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All insights shown here are aggregated. Individual student learning profiles are 
                  private and not visible to faculty. You can see trends and patterns, not individual behaviors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FacultyLayout>
  )
}
