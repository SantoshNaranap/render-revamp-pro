
import { StudentLayout } from "@/components/student/StudentLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  Calendar,
  BookOpen,
  CheckCircle2,
  Clock,
  MessageSquare,
  TrendingUp
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const upcomingExams = [
  {
    id: 1,
    course: "Data Structures & Algorithms",
    code: "CS301",
    examType: "Mid-Semester",
    date: "2024-03-15",
    daysLeft: 12,
    readiness: 65,
    readinessLabel: "Moderate",
    coveredTopics: ["Arrays", "Linked Lists", "Stacks", "Queues"],
    focusAreas: ["Binary Trees", "Recursion"],
    suggestedActions: [
      "Practice tree traversal problems",
      "Review recursive algorithms",
      "Complete Unit 3 exercises"
    ]
  },
  {
    id: 2,
    course: "Database Management Systems",
    code: "CS302",
    examType: "Quiz 2",
    date: "2024-03-08",
    daysLeft: 5,
    readiness: 45,
    readinessLabel: "Needs Work",
    coveredTopics: ["Introduction", "ER Modeling basics"],
    focusAreas: ["ER Diagrams", "Cardinality"],
    suggestedActions: [
      "Practice ER diagram creation",
      "Review relationship types",
      "Study sample problems"
    ]
  },
  {
    id: 3,
    course: "Operating Systems",
    code: "CS303",
    examType: "Assignment Due",
    date: "2024-03-06",
    daysLeft: 3,
    readiness: 80,
    readinessLabel: "Good",
    coveredTopics: ["Process Management", "Scheduling"],
    focusAreas: ["Priority Scheduling"],
    suggestedActions: [
      "Complete coding exercises",
      "Review scheduling algorithms"
    ]
  },
]

const getReadinessColor = (readiness: number) => {
  if (readiness >= 70) return "text-green-500"
  if (readiness >= 50) return "text-amber-500"
  return "text-red-500"
}

const getReadinessBg = (readiness: number) => {
  if (readiness >= 70) return "bg-green-500/10 border-green-500/20"
  if (readiness >= 50) return "bg-amber-500/10 border-amber-500/20"
  return "bg-red-500/10 border-red-500/20"
}

export default function ExamReadiness() {
  const navigate = useNavigate()

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Exam Readiness</h1>
            <p className="text-muted-foreground mt-1">
              Track your preparation and focus on what matters most
            </p>
          </div>
          <Button 
            onClick={() => navigate('/student/chat')}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Get Study Plan
          </Button>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">63%</p>
                  <p className="text-xs text-muted-foreground">Average Readiness</p>
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
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Upcoming Exams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Clock className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3 days</p>
                  <p className="text-xs text-muted-foreground">Until Next Deadline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Cards */}
        <div className="space-y-6">
          {upcomingExams.map((exam) => (
            <Card key={exam.id} className="bg-card/50 border-border/60">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getReadinessBg(exam.readiness)}`}>
                      <Target className={`h-6 w-6 ${getReadinessColor(exam.readiness)}`} />
                    </div>
                    <div>
                      <CardDescription className="text-sm font-medium">{exam.code}</CardDescription>
                      <CardTitle className="text-xl mt-1">{exam.course}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{exam.examType}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {exam.daysLeft} days left
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getReadinessColor(exam.readiness)}`}>
                      {exam.readiness}%
                    </div>
                    <p className="text-sm text-muted-foreground">{exam.readinessLabel}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Preparation Progress</span>
                    <span className="font-medium text-foreground">{exam.readiness}%</span>
                  </div>
                  <Progress value={exam.readiness} className="h-2" />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {/* Covered Topics */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Topics Covered
                    </h4>
                    <div className="space-y-1">
                      {exam.coveredTopics.map((topic, index) => (
                        <p key={index} className="text-sm text-muted-foreground">• {topic}</p>
                      ))}
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Target className="h-4 w-4 text-amber-500" />
                      Focus Areas
                    </h4>
                    <div className="space-y-1">
                      {exam.focusAreas.map((area, index) => (
                        <p key={index} className="text-sm text-amber-400">• {area}</p>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Actions */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Suggested Actions
                    </h4>
                    <div className="space-y-1">
                      {exam.suggestedActions.map((action, index) => (
                        <p key={index} className="text-sm text-muted-foreground">• {action}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => navigate('/student/chat')}
                  >
                    <BookOpen className="h-4 w-4" />
                    Study Focus Areas
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => navigate('/student/chat')}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Create Revision Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Encouragement */}
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Target className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">You're on track!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Remember, these readiness indicators are here to guide you, not stress you. 
                  Focus on your weakest areas first, and you'll see improvement quickly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
