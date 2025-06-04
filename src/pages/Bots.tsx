
import { Layout } from "@/components/Layout"
import { BotsHeader } from "@/components/bots/BotsHeader"
import { BotsGrid } from "@/components/bots/BotsGrid"

const Bots = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <BotsHeader />
        <BotsGrid />
      </div>
    </Layout>
  )
}

export default Bots
