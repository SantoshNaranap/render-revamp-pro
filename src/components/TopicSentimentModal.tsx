import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Minus, MessageSquare, TrendingUp } from "lucide-react"

interface TopicSentimentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topic: {
    name: string
    count: number
    category: string
  } | null
}

const topicSentimentData: Record<string, {
  positive: number
  neutral: number
  negative: number
  summary: string
  keyThemes: string[]
  recentFeedback: { sentiment: 'positive' | 'neutral' | 'negative'; text: string }[]
}> = {
  "Product Information": {
    positive: 68,
    neutral: 24,
    negative: 8,
    summary: "Users are generally very satisfied with product information availability. Most appreciate the detailed specifications and comparison features.",
    keyThemes: ["Clear descriptions", "Helpful comparisons", "Missing availability info"],
    recentFeedback: [
      { sentiment: 'positive', text: "Very detailed product specs, exactly what I needed!" },
      { sentiment: 'positive', text: "Love the comparison tool between products" },
      { sentiment: 'negative', text: "Wish there was more info on shipping times" }
    ]
  },
  "Pricing & Plans": {
    positive: 45,
    neutral: 30,
    negative: 25,
    summary: "Mixed feelings about pricing transparency. Users appreciate clear breakdowns but some find plans confusing or expensive.",
    keyThemes: ["Value for money", "Plan confusion", "Hidden fees concerns"],
    recentFeedback: [
      { sentiment: 'positive', text: "Great value compared to competitors" },
      { sentiment: 'neutral', text: "Need more clarity on what's included in each tier" },
      { sentiment: 'negative', text: "Felt misled about additional costs" }
    ]
  },
  "Technical Support": {
    positive: 35,
    neutral: 25,
    negative: 40,
    summary: "Users express frustration with response times and resolution quality. Positive feedback focuses on knowledgeable agents when reached.",
    keyThemes: ["Long wait times", "Knowledgeable staff", "Unresolved issues"],
    recentFeedback: [
      { sentiment: 'negative', text: "Waited 2 hours for a response" },
      { sentiment: 'positive', text: "Agent was very helpful once connected" },
      { sentiment: 'negative', text: "Issue still not resolved after 3 contacts" }
    ]
  },
  "Account Management": {
    positive: 72,
    neutral: 20,
    negative: 8,
    summary: "Highly positive sentiment around account features. Users find it easy to manage settings and appreciate the intuitive interface.",
    keyThemes: ["Easy navigation", "Quick updates", "Password reset issues"],
    recentFeedback: [
      { sentiment: 'positive', text: "Super easy to update my billing info" },
      { sentiment: 'positive', text: "Love the clean dashboard" },
      { sentiment: 'neutral', text: "Password reset could be faster" }
    ]
  },
  "Billing Inquiries": {
    positive: 40,
    neutral: 35,
    negative: 25,
    summary: "Users appreciate invoice clarity but express concerns about refund processing times and billing cycle flexibility.",
    keyThemes: ["Clear invoices", "Refund delays", "Billing cycle questions"],
    recentFeedback: [
      { sentiment: 'positive', text: "Invoices are very detailed and clear" },
      { sentiment: 'negative', text: "Refund took 2 weeks to process" },
      { sentiment: 'neutral', text: "Would like more payment options" }
    ]
  },
  "Feature Requests": {
    positive: 55,
    neutral: 35,
    negative: 10,
    summary: "Users are engaged and hopeful about future improvements. Most feel heard when submitting requests.",
    keyThemes: ["Mobile app improvements", "Integration requests", "UI enhancements"],
    recentFeedback: [
      { sentiment: 'positive', text: "Love that you're listening to feedback!" },
      { sentiment: 'neutral', text: "Hope my suggestion gets implemented soon" },
      { sentiment: 'positive', text: "The roadmap transparency is great" }
    ]
  },
  "API Integration": {
    positive: 60,
    neutral: 28,
    negative: 12,
    summary: "Developers are generally satisfied with API documentation. Some frustration around rate limits and webhook reliability.",
    keyThemes: ["Good documentation", "Rate limit concerns", "Webhook issues"],
    recentFeedback: [
      { sentiment: 'positive', text: "API docs are comprehensive and clear" },
      { sentiment: 'negative', text: "Rate limits are too restrictive" },
      { sentiment: 'positive', text: "Easy integration process" }
    ]
  },
  "Documentation": {
    positive: 58,
    neutral: 32,
    negative: 10,
    summary: "Documentation is well-received overall. Users request more examples and video tutorials.",
    keyThemes: ["Comprehensive guides", "Need more examples", "Video tutorials wanted"],
    recentFeedback: [
      { sentiment: 'positive', text: "Documentation helped me get started quickly" },
      { sentiment: 'neutral', text: "Would love more code examples" },
      { sentiment: 'positive', text: "FAQ section is very helpful" }
    ]
  }
}

export function TopicSentimentModal({ open, onOpenChange, topic }: TopicSentimentModalProps) {
  if (!topic) return null

  const sentiment = topicSentimentData[topic.name] || {
    positive: 50,
    neutral: 30,
    negative: 20,
    summary: "Sentiment data is being analyzed for this topic.",
    keyThemes: ["General feedback"],
    recentFeedback: []
  }

  const getSentimentIcon = (type: 'positive' | 'neutral' | 'negative') => {
    switch (type) {
      case 'positive': return <ThumbsUp className="h-3 w-3 text-emerald-500" />
      case 'negative': return <ThumbsDown className="h-3 w-3 text-red-500" />
      default: return <Minus className="h-3 w-3 text-yellow-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            {topic.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {topic.count} conversations
            </span>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
              {topic.category}
            </Badge>
          </div>

          {/* Summary */}
          <div>
            <h4 className="text-sm font-medium mb-2">User Sentiment Summary</h4>
            <p className="text-sm text-muted-foreground">{sentiment.summary}</p>
          </div>

          {/* Sentiment Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Sentiment Breakdown</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <ThumbsUp className="h-4 w-4 text-emerald-500" />
                <div className="flex-1">
                  <Progress value={sentiment.positive} className="h-2 bg-muted" />
                </div>
                <span className="text-sm font-medium w-12 text-right text-emerald-500">{sentiment.positive}%</span>
              </div>
              <div className="flex items-center gap-3">
                <Minus className="h-4 w-4 text-yellow-500" />
                <div className="flex-1">
                  <Progress value={sentiment.neutral} className="h-2 bg-muted" />
                </div>
                <span className="text-sm font-medium w-12 text-right text-yellow-500">{sentiment.neutral}%</span>
              </div>
              <div className="flex items-center gap-3">
                <ThumbsDown className="h-4 w-4 text-red-500" />
                <div className="flex-1">
                  <Progress value={sentiment.negative} className="h-2 bg-muted" />
                </div>
                <span className="text-sm font-medium w-12 text-right text-red-500">{sentiment.negative}%</span>
              </div>
            </div>
          </div>

          {/* Key Themes */}
          <div>
            <h4 className="text-sm font-medium mb-2">Key Themes</h4>
            <div className="flex flex-wrap gap-2">
              {sentiment.keyThemes.map((theme, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recent Feedback */}
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Feedback</h4>
            <div className="space-y-2">
              {sentiment.recentFeedback.map((feedback, index) => (
                <div key={index} className="flex items-start gap-2 p-2 rounded-md bg-accent/30">
                  {getSentimentIcon(feedback.sentiment)}
                  <p className="text-sm text-muted-foreground">{feedback.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
