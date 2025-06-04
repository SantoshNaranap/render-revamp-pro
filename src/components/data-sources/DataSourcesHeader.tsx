
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function DataSourcesHeader() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Sources</h1>
        <p className="text-muted-foreground">Manage and monitor your training data sources</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search data sources..." 
            className="pl-10 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        
        <Button 
          size="sm" 
          className="gap-2"
          onClick={() => navigate("/data-sources/add")}
        >
          <Plus className="h-4 w-4" />
          Add Source
        </Button>
      </div>
    </div>
  )
}
