
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Key, Copy, Plus, Trash2, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function APIKeysSection() {
  const [showKey, setShowKey] = useState(false)

  const apiKeys = [
    {
      name: "Production API Key",
      key: "sk_live_••••••••••••••••••••••••••••••••4242",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      status: "active"
    },
    {
      name: "Development API Key",
      key: "sk_test_••••••••••••••••••••••••••••••••1234",
      created: "2024-01-10",
      lastUsed: "1 day ago",
      status: "active"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Keys
        </CardTitle>
        <CardDescription>
          Manage your API keys for integrating with external services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Use these keys to authenticate API requests to your bots
          </p>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Generate New Key
          </Button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((key, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">{key.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created {key.created} • Last used {key.lastUsed}
                  </p>
                </div>
                <Badge variant={key.status === "active" ? "default" : "secondary"}>
                  {key.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Input 
                  value={showKey ? key.key.replace(/•/g, 'x') : key.key}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium mb-4">API Usage Limits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">8,567</div>
              <div className="text-sm text-muted-foreground">Requests this month</div>
              <div className="text-xs text-green-500 mt-1">85.67% of 10,000 limit</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">1.2ms</div>
              <div className="text-sm text-muted-foreground">Avg response time</div>
              <div className="text-xs text-green-500 mt-1">Excellent performance</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-xs text-green-500 mt-1">No issues detected</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
