
import { Button } from "@/components/ui/button"
import { Settings, Save } from "lucide-react"

export function SettingsHeader() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and billing</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Reset to Defaults
        </Button>
        
        <Button size="sm" className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
