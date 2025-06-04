
import { Layout } from "@/components/Layout"
import { SettingsHeader } from "@/components/settings/SettingsHeader"
import { BillingSection } from "@/components/settings/BillingSection"
import { ProfileSection } from "@/components/settings/ProfileSection"
import { SecuritySection } from "@/components/settings/SecuritySection"
import { NotificationSettings } from "@/components/settings/NotificationSettings"
import { APIKeysSection } from "@/components/settings/APIKeysSection"

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <SettingsHeader />
        
        <div className="grid gap-8">
          <ProfileSection />
          <BillingSection />
          <SecuritySection />
          <NotificationSettings />
          <APIKeysSection />
        </div>
      </div>
    </Layout>
  )
}

export default Settings
