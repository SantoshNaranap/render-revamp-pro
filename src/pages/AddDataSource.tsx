
import { Layout } from "@/components/Layout"
import { AddDataSourceForm } from "@/components/data-sources/AddDataSourceForm"

const AddDataSource = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add Data Source</h1>
          <p className="text-muted-foreground">Connect a new data source to train your AI model</p>
        </div>
        <AddDataSourceForm />
      </div>
    </Layout>
  )
}

export default AddDataSource
