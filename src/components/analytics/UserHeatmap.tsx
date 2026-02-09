
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Globe, TrendingUp } from "lucide-react"

interface LocationData {
  city: string
  country: string
  lat: number
  lng: number
  users: number
  sessions: number
  percentage: number
}

const locationData: LocationData[] = [
  { city: "New York", country: "United States", lat: 40.7, lng: -74.0, users: 1247, sessions: 3892, percentage: 22.4 },
  { city: "London", country: "United Kingdom", lat: 51.5, lng: -0.1, users: 893, sessions: 2671, percentage: 16.1 },
  { city: "Mumbai", country: "India", lat: 19.1, lng: 72.9, users: 756, sessions: 2104, percentage: 13.6 },
  { city: "Toronto", country: "Canada", lat: 43.7, lng: -79.4, users: 542, sessions: 1583, percentage: 9.8 },
  { city: "Sydney", country: "Australia", lat: -33.9, lng: 151.2, users: 431, sessions: 1267, percentage: 7.8 },
  { city: "Berlin", country: "Germany", lat: 52.5, lng: 13.4, users: 389, sessions: 1102, percentage: 7.0 },
  { city: "Dubai", country: "UAE", lat: 25.2, lng: 55.3, users: 312, sessions: 894, percentage: 5.6 },
  { city: "Singapore", country: "Singapore", lat: 1.4, lng: 103.8, users: 287, sessions: 812, percentage: 5.2 },
  { city: "São Paulo", country: "Brazil", lat: -23.6, lng: -46.6, users: 245, sessions: 698, percentage: 4.4 },
  { city: "Tokyo", country: "Japan", lat: 35.7, lng: 139.7, users: 198, sessions: 534, percentage: 3.6 },
  { city: "Lagos", country: "Nigeria", lat: 6.5, lng: 3.4, users: 156, sessions: 423, percentage: 2.8 },
  { city: "Paris", country: "France", lat: 48.9, lng: 2.4, users: 134, sessions: 378, percentage: 2.4 },
]

// Convert lat/lng to SVG coordinates on a simplified world map projection
function toSvgCoords(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 900 + 50
  const y = ((90 - lat) / 180) * 450 + 25
  return { x, y }
}

// Get dot size based on user count
function getDotRadius(users: number): number {
  if (users > 1000) return 12
  if (users > 500) return 9
  if (users > 300) return 7
  return 5
}

// Simplified world map paths (continents outlines)
const worldPaths = [
  // North America
  "M120,120 L180,90 L250,85 L280,100 L270,140 L250,170 L220,200 L190,210 L160,200 L130,180 L110,150 Z",
  // South America  
  "M200,230 L230,220 L260,240 L270,280 L260,340 L240,380 L220,400 L200,380 L190,340 L185,300 L190,260 Z",
  // Europe
  "M430,90 L470,80 L510,85 L520,100 L510,120 L490,130 L470,125 L450,130 L430,120 L425,100 Z",
  // Africa
  "M430,150 L470,140 L510,150 L530,180 L530,230 L520,280 L500,320 L470,340 L450,320 L430,280 L425,230 L420,190 Z",
  // Asia
  "M520,60 L600,50 L700,55 L760,70 L780,100 L770,140 L740,160 L700,170 L650,165 L600,150 L560,140 L530,130 L520,110 L515,80 Z",
  // Australia
  "M720,280 L780,270 L820,280 L830,310 L810,340 L770,350 L740,330 L720,300 Z",
]

const regionStats = [
  { region: "North America", users: 1789, change: "+12.3%", color: "text-green-400" },
  { region: "Europe", users: 1416, change: "+8.7%", color: "text-green-400" },
  { region: "Asia Pacific", users: 1672, change: "+18.2%", color: "text-green-400" },
  { region: "Middle East", users: 312, change: "+5.1%", color: "text-green-400" },
  { region: "South America", users: 245, change: "-2.3%", color: "text-red-400" },
  { region: "Africa", users: 156, change: "+24.6%", color: "text-green-400" },
]

export function UserHeatmap() {
  const totalUsers = locationData.reduce((sum, loc) => sum + loc.users, 0)

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/60">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalUsers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/60">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{locationData.length}</p>
              <p className="text-xs text-muted-foreground">Active Cities</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/60">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6</p>
              <p className="text-xs text-muted-foreground">Continents</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/60">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">+14.2%</p>
              <p className="text-xs text-muted-foreground">Growth (30d)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map */}
        <Card className="lg:col-span-2 bg-card/50 border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Global User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[2/1] bg-background/40 rounded-lg overflow-hidden border border-border/30">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={`h${i}`} x1="50" y1={100 * i + 75} x2="950" y2={100 * i + 75} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
                ))}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <line key={`v${i}`} x1={100 * i + 100} y1="25" x2={100 * i + 100} y2="475" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
                ))}

                {/* Continent shapes */}
                {worldPaths.map((d, i) => (
                  <path key={i} d={d} fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.4" />
                ))}

                {/* Heatmap dots with glow */}
                {locationData.map((loc, i) => {
                  const { x, y } = toSvgCoords(loc.lat, loc.lng)
                  const r = getDotRadius(loc.users)
                  const opacity = 0.4 + (loc.percentage / 22.4) * 0.6
                  return (
                    <g key={i}>
                      {/* Glow effect */}
                      <circle cx={x} cy={y} r={r * 3} fill="hsl(var(--primary))" opacity={opacity * 0.15} />
                      <circle cx={x} cy={y} r={r * 2} fill="hsl(var(--primary))" opacity={opacity * 0.25} />
                      {/* Main dot */}
                      <circle cx={x} cy={y} r={r} fill="hsl(var(--primary))" opacity={opacity} stroke="hsl(var(--primary-foreground))" strokeWidth="1" />
                      {/* Label for top cities */}
                      {loc.users > 400 && (
                        <text x={x} y={y - r - 6} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="500">
                          {loc.city}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Region Breakdown */}
        <Card className="bg-card/50 border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">By Region</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {regionStats.map((region) => (
              <div key={region.region} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/30">
                <div>
                  <p className="text-sm font-medium text-foreground">{region.region}</p>
                  <p className="text-xs text-muted-foreground">{region.users.toLocaleString()} users</p>
                </div>
                <span className={`text-sm font-medium ${region.color}`}>{region.change}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Cities Table */}
      <Card className="bg-card/50 border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Top Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {locationData.slice(0, 9).map((loc, i) => (
              <div key={loc.city} className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-border/30">
                <span className="text-lg font-bold text-muted-foreground w-6">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{loc.city}</p>
                  <p className="text-xs text-muted-foreground">{loc.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{loc.users.toLocaleString()}</p>
                  <Badge variant="outline" className="text-xs">{loc.percentage}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
