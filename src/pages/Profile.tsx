
import { Layout } from "@/components/Layout"
import { ProfileSection } from "@/components/settings/ProfileSection"
import { TeamMembersSection } from "@/components/profile/TeamMembersSection"
import { AccountPreferencesSection } from "@/components/profile/AccountPreferencesSection"

export default function Profile() {
  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and team members
          </p>
        </div>

        <ProfileSection />
        <TeamMembersSection />
        <AccountPreferencesSection />
      </div>
    </Layout>
  )
}
