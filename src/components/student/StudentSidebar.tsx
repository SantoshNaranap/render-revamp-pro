
import { 
  BookOpen, 
  Brain, 
  Target, 
  GraduationCap,
  User,
  HelpCircle,
  MessageSquare
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const learningItems = [
  { 
    title: "My Courses", 
    url: "/student/courses", 
    icon: BookOpen,
    badge: null
  },
  { 
    title: "Ask Nexus", 
    url: "/student/chat", 
    icon: MessageSquare,
    badge: null
  },
]

const progressItems = [
  { 
    title: "Knowledge Gaps", 
    url: "/student/gaps", 
    icon: Brain,
    badge: "3 areas"
  },
  { 
    title: "Exam Readiness", 
    url: "/student/readiness", 
    icon: Target,
    badge: null
  },
  { 
    title: "My Progress", 
    url: "/student/progress", 
    icon: GraduationCap,
    badge: null
  },
]

const accountItems = [
  { 
    title: "Profile", 
    url: "/student/profile", 
    icon: User,
    badge: null
  },
  { 
    title: "Help", 
    url: "/student/help", 
    icon: HelpCircle,
    badge: null
  },
]

export function StudentSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/student") {
      return currentPath === "/student"
    }
    return currentPath.startsWith(path)
  }

  const getNavCls = (path: string) => {
    const active = isActive(path)
    return active 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
  }

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-foreground">Nexus²</h2>
              <p className="text-xs text-muted-foreground">Learning Companion</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Learning
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {learningItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            My Progress
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {progressItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="outline" className="ml-auto text-xs bg-amber-500/10 text-amber-400 border-amber-500/20">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="bg-accent/50 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">Spring 2024</span>
            </div>
            <p className="text-xs text-muted-foreground">
              4 courses enrolled
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
