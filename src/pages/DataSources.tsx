
import { Layout } from "@/components/Layout"
import { DataSourcesTable } from "@/components/data-sources/DataSourcesTable"
import { DataSourcesHeader } from "@/components/data-sources/DataSourcesHeader"
import { DataSourcesStats } from "@/components/data-sources/DataSourcesStats"

const DataSources = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <DataSourcesHeader />
        <DataSourcesStats />
        <DataSourcesTable />
      </div>
    </Layout>
  )
}

export default DataSources
