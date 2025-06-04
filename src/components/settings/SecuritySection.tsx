
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Shield, Key, Smartphone } from "lucide-react"

export function SecuritySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Settings
        </CardTitle>
        <CardDescription>
          Manage your account security and authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Change */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Change Password</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Key className="h-4 w-4" />
            Update Password
          </Button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch />
          </div>
        </div>

        {/* Session Management */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium mb-4">Active Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium text-sm">Current Session</div>
                <div className="text-sm text-muted-foreground">Chrome on macOS • New York, NY</div>
              </div>
              <div className="text-xs text-green-500">Active</div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium text-sm">Mobile App</div>
                <div className="text-sm text-muted-foreground">iPhone • 2 days ago</div>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-4">
            Sign Out All Devices
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
