
import { useState } from "react"
import { Layout } from "@/components/Layout"
import { DashboardMetrics } from "@/components/DashboardMetrics"
import { EventMetrics } from "@/components/EventMetrics"
import { InteractionBreakdown } from "@/components/InteractionBreakdown"
import { ConversationFlow } from "@/components/ConversationFlow"
import { SessionTimeline } from "@/components/SessionTimeline"
import { ActivityTimeline } from "@/components/ActivityTimeline"
import { ConversationStatus } from "@/components/ConversationStatus"
import { PopularTopics } from "@/components/PopularTopics"
import { RecentActivity } from "@/components/RecentActivity"
import { TimePeriodFilter, TimePeriod } from "@/components/TimePeriodFilter"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download, TrendingUp, Activity, BarChart3 } from "lucide-react"

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

        {/* Event Analytics */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Event Analytics</h2>
          </div>
          <EventMetrics timePeriod={timePeriod} />
        </div>

        {/* Session & Interaction Analysis */}
        <div className="grid gap-8 lg:grid-cols-2">
          <SessionTimeline timePeriod={timePeriod} />
          <InteractionBreakdown timePeriod={timePeriod} />
        </div>

        {/* Conversation Flow Analysis */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Conversation Flow Analysis</h2>
          </div>
          <ConversationFlow timePeriod={timePeriod} />
        </div>

        {/* Chatbot Performance Metrics */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Resolution Rate</h2>
            <ActivityTimeline />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Escalation Rate</h2>
            <PopularTopics />
          </div>
        </div>

        {/* User Intent and Query Metrics */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Conversation Metrics</h2>
            <ConversationStatus />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Sentiment Analysis</h2>
            <ActivityTimeline />
          </div>
        </div>

        {/* Message Patterns */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Top User Queries & Categories</h2>
            <RecentActivity />
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
