
import { Layout } from "@/components/Layout"
import { SettingsHeader } from "@/components/settings/SettingsHeader"
import { BillingSection } from "@/components/settings/BillingSection"
import { ProfileSection } from "@/components/settings/ProfileSection"
import { SecuritySection } from "@/components/settings/SecuritySection"
import { NotificationSettings } from "@/components/settings/NotificationSettings"
import { APIKeysSection } from "@/components/settings/APIKeysSection"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <SettingsHeader />
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <ProfileSection />
          </TabsContent>
          
          <TabsContent value="billing" className="mt-6">
            <BillingSection />
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <SecuritySection />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="api" className="mt-6">
            <APIKeysSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Settings
