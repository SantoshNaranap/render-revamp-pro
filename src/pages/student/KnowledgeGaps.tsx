
import { StudentLayout } from "@/components/student/StudentLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  BookOpen, 
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Circle
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const knowledgeAreas = [
  {
    course: "Data Structures & Algorithms",
    code: "CS301",
    topics: [
      { name: "Recursion in Trees", status: "weak", description: "Practice traversal algorithms and recursive problem solving", expectedBy: "Week 6" },
      { name: "Graph Traversal", status: "not_started", description: "BFS and DFS implementations", expectedBy: "Week 8" },
      { name: "Dynamic Programming", status: "partial", description: "Understand memoization and tabulation", expectedBy: "Week 10" },
    ]
  },
  {
    course: "Database Management Systems",
    code: "CS302",
    topics: [
      { name: "ER Diagrams", status: "partial", description: "Practice converting requirements to ER models", expectedBy: "Week 4" },
      { name: "SQL Joins", status: "not_started", description: "Inner, outer, cross joins", expectedBy: "Week 6" },
      { name: "Normalization", status: "not_started", description: "1NF through BCNF", expectedBy: "Week 7" },
    ]
  },
  {
    course: "Operating Systems",
    code: "CS303",
    topics: [
      { name: "Deadlock Prevention", status: "partial", description: "Banker's algorithm and resource allocation", expectedBy: "Week 7" },
      { name: "Page Replacement", status: "not_started", description: "FIFO, LRU, Optimal algorithms", expectedBy: "Week 9" },
    ]
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'weak':
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case 'partial':
      return <Circle className="h-4 w-4 text-amber-500" />
    case 'not_started':
      return <Circle className="h-4 w-4 text-muted-foreground" />
    case 'strong':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'weak':
      return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Needs Focus</Badge>
    case 'partial':
      return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Partial</Badge>
    case 'not_started':
      return <Badge className="bg-muted/50 text-muted-foreground border-border">Not Started</Badge>
    case 'strong':
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Strong</Badge>
    default:
      return null
  }
}

export default function KnowledgeGaps() {
  const navigate = useNavigate()
  
  const totalGaps = knowledgeAreas.reduce((acc, area) => acc + area.topics.length, 0)
  const weakAreas = knowledgeAreas.reduce((acc, area) => 
    acc + area.topics.filter(t => t.status === 'weak').length, 0)

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Knowledge Gaps</h1>
            <p className="text-muted-foreground mt-1">
              Topics you should focus on based on your course progress
            </p>
          </div>
          <Button 
            onClick={() => navigate('/student/chat')}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Ask Nexus for Help
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Brain className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalGaps}</p>
                  <p className="text-xs text-muted-foreground">Total Topics to Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{weakAreas}</p>
                  <p className="text-xs text-muted-foreground">Need Immediate Focus</p>
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
                  <p className="text-2xl font-bold text-foreground">+12%</p>
                  <p className="text-xs text-muted-foreground">Improvement This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Areas by Course */}
        <div className="space-y-6">
          {knowledgeAreas.map((area, index) => (
            <Card key={index} className="bg-card/50 border-border/60">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardDescription className="text-sm font-medium">{area.code}</CardDescription>
                    <CardTitle className="text-lg">{area.course}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {area.topics.map((topic, topicIndex) => (
                    <div 
                      key={topicIndex} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-background/50 gap-4"
                    >
                      <div className="flex items-start gap-3">
                        {getStatusIcon(topic.status)}
                        <div>
                          <p className="font-medium text-foreground">{topic.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">Expected by: {topic.expectedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(topic.status)}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate('/student/chat')}
                        >
                          Study This
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Encouragement Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">You're making progress!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Identifying gaps is the first step to mastery. Focus on one topic at a time, 
                  and don't hesitate to ask Nexus for explanations tailored to your learning style.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
