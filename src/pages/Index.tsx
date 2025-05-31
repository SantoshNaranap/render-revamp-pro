
import { Layout } from "@/components/Layout"
import { DashboardMetrics } from "@/components/DashboardMetrics"
import { ActivityTimeline } from "@/components/ActivityTimeline"
import { ConversationStatus } from "@/components/ConversationStatus"
import { PopularTopics } from "@/components/PopularTopics"
import { RecentActivity } from "@/components/RecentActivity"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download, Calendar } from "lucide-react"

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 7 days
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <DashboardMetrics />

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityTimeline />
          </div>
          <div>
            <ConversationStatus />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PopularTopics />
          <RecentActivity />
        </div>
      </div>
    </Layout>
  )
}

export default Index
