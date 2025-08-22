
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Hash, ChevronDown, MessageCircle } from "lucide-react"
import { useState } from "react"

const topics = [
  { 
    name: "Product Information", 
    count: 245, 
    trend: "up", 
    category: "sales",
    sampleQuestions: [
      "What features are included in the pro plan?",
      "How does your product compare to competitors?",
      "Do you offer a free trial?",
      "What integrations do you support?",
      "Is there a mobile app available?"
    ]
  },
  { 
    name: "Pricing & Plans", 
    count: 189, 
    trend: "up", 
    category: "sales",
    sampleQuestions: [
      "What's the difference between starter and pro plans?",
      "Do you offer annual discounts?",
      "Can I change my plan later?",
      "Are there any setup fees?",
      "What payment methods do you accept?"
    ]
  },
  { 
    name: "Technical Support", 
    count: 167, 
    trend: "down", 
    category: "support",
    sampleQuestions: [
      "I'm having trouble with API authentication",
      "The dashboard is loading slowly",
      "How do I reset my password?",
      "My data export isn't working",
      "Can't connect to the database"
    ]
  },
  { 
    name: "Account Management", 
    count: 134, 
    trend: "up", 
    category: "account",
    sampleQuestions: [
      "How do I add team members?",
      "Can I change my email address?",
      "How do I delete my account?",
      "Where can I see my usage statistics?",
      "How do I update my profile information?"
    ]
  },
  { 
    name: "Billing Inquiries", 
    count: 98, 
    trend: "stable", 
    category: "billing",
    sampleQuestions: [
      "When will I be charged?",
      "How do I update my payment method?",
      "Can I get a refund?",
      "Where can I download my invoices?",
      "Why was my payment declined?"
    ]
  },
  { 
    name: "Feature Requests", 
    count: 87, 
    trend: "up", 
    category: "product",
    sampleQuestions: [
      "Can you add dark mode support?",
      "Will you support SSO login?",
      "Can we get better filtering options?",
      "Please add bulk export functionality",
      "Would love to see real-time notifications"
    ]
  },
  { 
    name: "API Integration", 
    count: 76, 
    trend: "up", 
    category: "technical",
    sampleQuestions: [
      "How do I get my API key?",
      "What's the rate limit for API calls?",
      "Do you have webhooks available?",
      "Is there a Python SDK?",
      "How do I authenticate API requests?"
    ]
  },
  { 
    name: "Documentation", 
    count: 54, 
    trend: "stable", 
    category: "support",
    sampleQuestions: [
      "Where can I find the getting started guide?",
      "Do you have video tutorials?",
      "Is there an API reference?",
      "Can you provide more examples?",
      "The docs seem outdated, when will they be updated?"
    ]
  },
]

export function PopularTopics() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null)

  const toggleTopic = (index: number) => {
    setExpandedTopic(expandedTopic === index ? null : index)
  }

  return (
    <Card className="border-border/60 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">Trending Discussion Topics</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="group rounded-lg bg-accent/20 hover:bg-accent/40 transition-all duration-200 border border-border/30 hover:border-primary/30 overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleTopic(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {topic.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {topic.trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                      {topic.trend === "down" && <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />}
                      <span className="text-sm font-medium text-muted-foreground">
                        {topic.count}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        expandedTopic === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                >
                  {topic.category}
                </Badge>
              </div>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedTopic === index ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4 space-y-2 border-t border-border/30">
                  <div className="flex items-center gap-2 pt-3 mb-2">
                    <MessageCircle className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Sample Questions ({topic.sampleQuestions.length})
                    </span>
                  </div>
                  {topic.sampleQuestions.map((question, qIndex) => (
                    <div 
                      key={qIndex}
                      className="group/question p-3 rounded-md bg-background/50 hover:bg-background/80 transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/20"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground/80 group-hover/question:text-foreground transition-colors leading-relaxed">
                          "{question}"
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                      View all {topic.count} questions →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
