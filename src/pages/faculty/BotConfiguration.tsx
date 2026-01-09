
import { useState } from "react"
import { FacultyLayout } from "@/components/faculty/FacultyLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bot, 
  Shield,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  Save,
  RotateCcw,
  Eye,
  BookOpen
} from "lucide-react"

export default function BotConfiguration() {
  const [hasChanges, setHasChanges] = useState(false)

  return (
    <FacultyLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bot Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Customize how Nexus interacts with your students
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button className="gap-2" disabled={!hasChanges}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="behavior" className="space-y-6">
          <TabsList>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="guardrails">Guardrails</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Behavior Tab */}
          <TabsContent value="behavior" className="space-y-6">
            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Response Settings
                </CardTitle>
                <CardDescription>
                  Control how Nexus responds to student queries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label>Default Explanation Depth</Label>
                    <Select defaultValue="balanced" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple - Brief explanations</SelectItem>
                        <SelectItem value="balanced">Balanced - Moderate detail</SelectItem>
                        <SelectItem value="detailed">Detailed - In-depth explanations</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Students can still ask for simpler or more detailed explanations
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Language Style</Label>
                    <Select defaultValue="academic" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual - Friendly, conversational</SelectItem>
                        <SelectItem value="academic">Academic - Professional, formal</SelectItem>
                        <SelectItem value="encouraging">Encouraging - Supportive, motivating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include Examples</Label>
                      <p className="text-xs text-muted-foreground">
                        Nexus will include practical examples in explanations
                      </p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Reference Course Materials</Label>
                      <p className="text-xs text-muted-foreground">
                        Nexus will cite relevant uploaded materials in responses
                      </p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Knowledge Source Priority
                </CardTitle>
                <CardDescription>
                  Control which sources Nexus prioritizes for answers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Course Materials First</Label>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    When enabled, Nexus prioritizes your uploaded materials over general knowledge
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Allow General Knowledge</Label>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Allow Nexus to supplement with general knowledge when course materials don't cover a topic
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guardrails Tab */}
          <TabsContent value="guardrails" className="space-y-6">
            <Card className="bg-gradient-to-br from-red-500/5 to-red-500/10 border-red-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Academic Integrity Protection</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      These guardrails are always active and cannot be disabled. Nexus will never 
                      provide exam answers, complete assignments, or help with cheating.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Configurable Guardrails
                </CardTitle>
                <CardDescription>
                  Additional restrictions you can enable for your courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Limit to Syllabus Topics Only</Label>
                      <p className="text-xs text-muted-foreground">
                        Nexus will only answer questions related to your syllabus
                      </p>
                    </div>
                    <Switch onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Block Code Generation</Label>
                      <p className="text-xs text-muted-foreground">
                        Prevent Nexus from writing complete code solutions
                      </p>
                    </div>
                    <Switch onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Encourage Discussion Over Answers</Label>
                      <p className="text-xs text-muted-foreground">
                        Nexus will guide students to answers rather than providing them directly
                      </p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Restrict During Exam Periods</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically limit functionality during configured exam dates
                      </p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personality Tab */}
          <TabsContent value="personality" className="space-y-6">
            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Bot Personality
                </CardTitle>
                <CardDescription>
                  Customize how Nexus presents itself to students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Welcome Message</Label>
                  <Textarea 
                    placeholder="Hi! I'm Nexus, your learning companion. I'm here to help you understand your course materials and prepare for exams. What would you like to learn today?"
                    className="min-h-[100px]"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This message is shown when a student starts a new conversation
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Custom Instructions</Label>
                  <Textarea 
                    placeholder="Add any specific instructions for how Nexus should behave with your students..."
                    className="min-h-[100px]"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Additional context or instructions for Nexus (e.g., "Focus on practical applications")
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Encouragement Level</Label>
                  <div className="pt-2">
                    <Slider 
                      defaultValue={[70]} 
                      max={100} 
                      step={10}
                      onValueChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Neutral</span>
                    <span>Very Encouraging</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>
                  Technical configuration options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Response Length Limit</Label>
                  <Select defaultValue="medium" onValueChange={() => setHasChanges(true)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (~100 words)</SelectItem>
                      <SelectItem value="medium">Medium (~250 words)</SelectItem>
                      <SelectItem value="long">Long (~500 words)</SelectItem>
                      <SelectItem value="unlimited">No Limit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Learning Profile Personalization</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow Nexus to adapt to individual learning patterns
                      </p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Collect Analytics</Label>
                      <p className="text-xs text-muted-foreground">
                        Gather aggregate insights about student interactions
                      </p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/60">
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/10">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset All Settings to Default
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FacultyLayout>
  )
}
