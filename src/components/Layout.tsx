
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="h-16 border-b border-border/60 bg-card/30 backdrop-blur-md supports-[backdrop-filter]:bg-card/30 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden hover:bg-accent/50" />
              <div className="hidden md:flex items-center gap-4 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search conversations, users..." 
                    className="pl-10 bg-background/60 border-border/60 focus:border-primary/40 w-80"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative hover:bg-accent/50">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
              
              <div className="flex items-center gap-2 pl-3 border-l border-border/60">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-sm">
                  <div className="font-medium text-foreground">Admin User</div>
                  <div className="text-xs text-muted-foreground">administrator</div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content with better spacing */}
          <main className="flex-1 p-8 bg-gradient-to-br from-background to-background/80">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
