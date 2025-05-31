
import { Layout } from "@/components/Layout"
import { DashboardMetrics } from "@/components/DashboardMetrics"
import { ActivityTimeline } from "@/components/ActivityTimeline"
import { ConversationStatus } from "@/components/ConversationStatus"
import { PopularTopics } from "@/components/PopularTopics"
import { RecentActivity } from "@/components/RecentActivity"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download, Calendar, TrendingUp } from "lucide-react"

const Index = () => {
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
            <Button variant="outline" size="sm" className="gap-2 bg-background/60 hover:bg-background border-border/60">
              <Calendar className="h-4 w-4" />
              Last 7 days
            </Button>
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

        {/* Key Metrics */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Key Performance Metrics</h2>
          </div>
          <DashboardMetrics />
        </div>

        {/* Analytics Charts */}
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Activity Overview</h2>
            <ActivityTimeline />
          </div>
          <div className="lg:col-span-2 space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Status Distribution</h2>
            <ConversationStatus />
          </div>
        </div>

        {/* Insights Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Popular Discussion Topics</h2>
            <PopularTopics />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Platform Activity</h2>
            <RecentActivity />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index
