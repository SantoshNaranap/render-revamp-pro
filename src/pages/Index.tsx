
import { useState } from "react"
import { Layout } from "@/components/Layout"
import { DashboardMetrics } from "@/components/DashboardMetrics"
import { ActivityTimeline } from "@/components/ActivityTimeline"
import { ConversationStatus } from "@/components/ConversationStatus"
import { PopularTopics } from "@/components/PopularTopics"
import { RecentActivity } from "@/components/RecentActivity"
import { TimePeriodFilter, TimePeriod } from "@/components/TimePeriodFilter"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download, TrendingUp } from "lucide-react"

const Index = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('week')

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-border/40">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Analytics Dashboard</h1>
            <p className="text-lg text-muted-foreground">Monitor your AI platform performance and insights</p>
          </div>
          
          <div className="flex items-center gap-3">
            <TimePeriodFilter value={timePeriod} onChange={setTimePeriod} />
            <Button variant="outline" size="sm" className="gap-2 bg-background/60 hover:bg-background border-border/60">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* User Interaction Analytics */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">User Interaction Analytics</h2>
          </div>
          <DashboardMetrics timePeriod={timePeriod} />
        </div>

        {/* Chatbot Performance Metrics */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Resolution Rate</h2>
            <ActivityTimeline />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Fallback Rate</h2>
            <ConversationStatus />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Escalation Rate</h2>
            <PopularTopics />
          </div>
        </div>

        {/* User Intent and Query Metrics */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Top User Queries & Categories</h2>
            <RecentActivity />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Sentiment Analysis</h2>
            <ActivityTimeline />
          </div>
        </div>

        {/* Message Patterns */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Conversation Metrics</h2>
            <ConversationStatus />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Peak Activity & CTA Performance</h2>
            <PopularTopics />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index
