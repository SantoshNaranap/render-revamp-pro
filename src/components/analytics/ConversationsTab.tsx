import { useState } from "react"
import { Search, ThumbsUp, ThumbsDown, CheckCircle, AlertTriangle, Bot, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  sender: 'user' | 'bot'
  content: string
  confidence?: number
}

interface Conversation {
  id: string
  visitorId: string
  status: 'resolved' | 'abandoned' | 'pending'
  sentiment: 'positive' | 'negative' | 'neutral'
  summary: string
  intent: string
  hasGap: boolean
  timeAgo: string
  messageCount: number
  duration: string
  messages: Message[]
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    visitorId: 'visitor_8x7k2',
    status: 'resolved',
    sentiment: 'positive',
    summary: 'Asked about MBA program requirements and application deadlines',
    intent: 'Product Inquiry',
    hasGap: false,
    timeAgo: '2 hours ago',
    messageCount: 8,
    duration: '4m 32s',
    messages: [
      { id: '1', sender: 'user', content: 'Hi, I want to know about your MBA program' },
      { id: '2', sender: 'bot', content: 'Great question! Our MBA program offers both full-time and part-time options. What aspect interests you most - curriculum, admissions requirements, or tuition?', confidence: 95 },
      { id: '3', sender: 'user', content: 'What are the admission requirements?' },
      { id: '4', sender: 'bot', content: "For our MBA program, you'll need: a bachelor's degree, GMAT/GRE scores (average 680), 2+ years work experience, and 2 recommendation letters. Would you like details on any of these?", confidence: 92 },
    ]
  },
  {
    id: '2',
    visitorId: 'visitor_3m9p1',
    status: 'abandoned',
    sentiment: 'negative',
    summary: 'Frustrated about refund policy, left without resolution',
    intent: 'Refund Request',
    hasGap: false,
    timeAgo: '3 hours ago',
    messageCount: 3,
    duration: '1m 15s',
    messages: [
      { id: '1', sender: 'user', content: 'I need a refund for my purchase' },
      { id: '2', sender: 'bot', content: 'I understand you need help with a refund. Can you please provide your order number?', confidence: 88 },
      { id: '3', sender: 'user', content: 'This is ridiculous, I just want my money back!' },
    ]
  },
  {
    id: '3',
    visitorId: 'visitor_5k2n8',
    status: 'resolved',
    sentiment: 'positive',
    summary: 'Booked a campus tour for next week',
    intent: 'Campus Tour',
    hasGap: false,
    timeAgo: '5 hours ago',
    messageCount: 5,
    duration: '2m 45s',
    messages: [
      { id: '1', sender: 'user', content: 'Can I schedule a campus visit?' },
      { id: '2', sender: 'bot', content: 'Absolutely! We offer campus tours Monday through Friday. What date works best for you?', confidence: 97 },
    ]
  },
  {
    id: '4',
    visitorId: 'visitor_9x1m3',
    status: 'abandoned',
    sentiment: 'neutral',
    summary: "Asked about financial aid, bot couldn't provide specific info",
    intent: 'Unknown',
    hasGap: true,
    timeAgo: '6 hours ago',
    messageCount: 2,
    duration: '0m 45s',
    messages: [
      { id: '1', sender: 'user', content: 'What financial aid options do you have?' },
      { id: '2', sender: 'bot', content: "We offer various financial aid options. I'd recommend speaking with our financial aid office for personalized assistance.", confidence: 72 },
    ]
  },
]

export function ConversationsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [intentFilter, setIntentFilter] = useState("all")
  const [sentimentFilter, setSentimentFilter] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])

  const filteredConversations = mockConversations.filter(conv => {
    if (statusFilter !== "all" && conv.status !== statusFilter) return false
    if (sentimentFilter !== "all" && conv.sentiment !== sentimentFilter) return false
    if (searchQuery && !conv.summary.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-emerald-500/20 text-emerald-600 border-0">{status}</Badge>
      case 'abandoned':
        return <Badge className="bg-red-500/20 text-red-600 border-0">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4 text-emerald-500" />
      case 'negative':
        return <ThumbsDown className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-300px)] min-h-[600px]">
      {/* Left Panel - Conversation List */}
      <div className="w-1/2 flex flex-col gap-4">
        {/* Search and Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="abandoned">Abandoned</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={intentFilter} onValueChange={setIntentFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Intents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Intents</SelectItem>
              <SelectItem value="product">Product Inquiry</SelectItem>
              <SelectItem value="refund">Refund Request</SelectItem>
              <SelectItem value="tour">Campus Tour</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiment</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1 rounded-lg border border-border bg-card">
          <div className="divide-y divide-border">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedConversation?.id === conv.id ? 'bg-muted/70' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 bg-muted">
                    <AvatarFallback className="text-xs font-medium">
                      {conv.visitorId.slice(-2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{conv.visitorId}</span>
                      {getStatusBadge(conv.status)}
                      {getSentimentIcon(conv.sentiment)}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>Intent: <span className="font-medium text-foreground">{conv.intent}</span></span>
                      {conv.sentiment === 'positive' && (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <ThumbsUp className="h-3 w-3" />
                          Positive feedback
                        </span>
                      )}
                      {conv.hasGap && (
                        <Badge variant="outline" className="text-amber-600 border-amber-300 text-xs py-0">Gap</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground shrink-0">
                    <div>{conv.timeAgo}</div>
                    <div>{conv.messageCount} messages · {conv.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Conversation Detail */}
      <div className="w-1/2 flex flex-col rounded-lg border border-border bg-card">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{selectedConversation.visitorId}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.timeAgo} · {selectedConversation.duration}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedConversation.status)}
                  {getSentimentIcon(selectedConversation.sentiment)}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Intent:</span>
                <span className="font-medium">{selectedConversation.intent}</span>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    {message.sender === 'bot' && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.confidence && (
                        <p className="text-xs text-muted-foreground mt-1">{message.confidence}% confidence</p>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Actions */}
            <div className="p-4 border-t border-border flex gap-3">
              <Button variant="outline" className="flex-1">Add to Training</Button>
              <Button variant="outline" className="flex-1">Flag for Review</Button>
              <Button className="flex-1">View Full Thread</Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to view details
          </div>
        )}
      </div>
    </div>
  )
}
