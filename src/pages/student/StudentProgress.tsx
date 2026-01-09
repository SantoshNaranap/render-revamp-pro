
import { StudentLayout } from "@/components/student/StudentLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  GraduationCap, 
  TrendingUp,
  BookOpen,
  MessageSquare,
  Clock,
  Target,
  Brain,
  Calendar
} from "lucide-react"

const learningStats = {
  totalInteractions: 156,
  topicsExplored: 42,
  hoursSpent: 28,
  streakDays: 7
}

const courseProgress = [
  { name: "Data Structures & Algorithms", code: "CS301", progress: 68, trend: "+5%" },
  { name: "Database Management Systems", code: "CS302", progress: 45, trend: "+8%" },
  { name: "Operating Systems", code: "CS303", progress: 72, trend: "+3%" },
  { name: "Computer Networks", code: "CS304", progress: 35, trend: "+12%" },
]

const recentActivity = [
  { type: "question", content: "Asked about Binary Tree traversal", course: "CS301", time: "2 hours ago" },
  { type: "topic", content: "Studied Deadlock Prevention", course: "CS303", time: "Yesterday" },
  { type: "question", content: "Asked about SQL Joins", course: "CS302", time: "Yesterday" },
  { type: "topic", content: "Reviewed Process Scheduling", course: "CS303", time: "2 days ago" },
  { type: "question", content: "Asked about Network Layers", course: "CS304", time: "3 days ago" },
]

const learningInsights = [
  { 
    title: "Preferred Learning Style", 
    value: "Detailed explanations",
    description: "You tend to ask for in-depth explanations rather than quick summaries"
  },
  { 
    title: "Most Active Time", 
    value: "Evenings (6-9 PM)",
    description: "You're most engaged during evening study sessions"
  },
  { 
    title: "Strongest Area", 
    value: "Operating Systems",
    description: "You show consistent understanding in OS concepts"
  },
]

export default function StudentProgress() {
  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Progress</h1>
          <p className="text-muted-foreground mt-1">
            Track your learning journey and see how you're improving
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{learningStats.totalInteractions}</p>
                  <p className="text-xs text-muted-foreground">Total Interactions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <BookOpen className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{learningStats.topicsExplored}</p>
                  <p className="text-xs text-muted-foreground">Topics Explored</p>
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
                  <p className="text-2xl font-bold text-foreground">{learningStats.hoursSpent}h</p>
                  <p className="text-xs text-muted-foreground">Time with Nexus</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Calendar className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{learningStats.streakDays} days</p>
                  <p className="text-xs text-muted-foreground">Learning Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Course Progress */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Course Progress</h2>
            <div className="space-y-4">
              {courseProgress.map((course, index) => (
                <Card key={index} className="bg-card/50 border-border/60">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">{course.code}</p>
                        <p className="font-medium text-foreground">{course.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {course.trend}
                        </Badge>
                        <span className="text-lg font-bold text-foreground">{course.progress}%</span>
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
            <Card className="bg-card/50 border-border/60">
              <CardContent className="p-4 space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border/60 last:border-0 last:pb-0">
                    <div className={`p-1.5 rounded-lg ${activity.type === 'question' ? 'bg-primary/10' : 'bg-green-500/10'}`}>
                      {activity.type === 'question' ? (
                        <MessageSquare className="h-3 w-3 text-primary" />
                      ) : (
                        <BookOpen className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{activity.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{activity.course}</Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Insights */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Your Learning Profile
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {learningInsights.map((insight, index) => (
              <Card key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">{insight.title}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{insight.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <Card className="bg-card/50 border-border/60">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Your learning profile is private</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This information is only visible to you and helps Nexus personalize your learning experience. 
                  It's never shared with faculty or other students.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
