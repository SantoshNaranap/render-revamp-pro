
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Crown, Zap, Star, Check } from "lucide-react"

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "1 bot",
      "100 conversations/month",
      "Basic analytics",
      "Community support"
    ],
    current: false,
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For growing businesses",
    features: [
      "10 bots",
      "10,000 conversations/month",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "API access"
    ],
    current: true,
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For large organizations",
    features: [
      "Unlimited bots",
      "Unlimited conversations",
      "Advanced AI models",
      "24/7 dedicated support",
      "Custom integrations",
      "White-label solutions",
      "Advanced security"
    ],
    current: false,
    popular: false
  }
]

export function BillingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Billing & Subscription
        </CardTitle>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Plan */}
        <div className="p-4 border rounded-lg bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Current Plan: Pro</h3>
              <p className="text-sm text-muted-foreground">Next billing date: January 15, 2025</p>
            </div>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              Active
            </Badge>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold">7/10</div>
            <div className="text-sm text-muted-foreground">Bots Used</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-sm text-muted-foreground">Conversations this month</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold">28%</div>
            <div className="text-sm text-muted-foreground">Monthly usage</div>
          </div>
        </div>

        {/* Available Plans */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 border rounded-lg ${
                  tier.current 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50 transition-colors"
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold flex items-center justify-center gap-2">
                    {tier.name === "Enterprise" && <Crown className="h-4 w-4" />}
                    {tier.name === "Pro" && <Zap className="h-4 w-4" />}
                    {tier.name}
                  </h4>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground ml-1">/{tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={tier.current ? "outline" : "default"}
                  disabled={tier.current}
                >
                  {tier.current ? "Current Plan" : `Upgrade to ${tier.name}`}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/27</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline">View Invoices</Button>
          <Button variant="outline">Download Receipt</Button>
          <Button variant="outline" className="text-red-500 hover:text-red-600">
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
