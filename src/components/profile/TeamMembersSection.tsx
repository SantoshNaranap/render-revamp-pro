
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, UserPlus, MoreHorizontal, Mail, Shield, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

type Role = "admin" | "editor" | "analyst"

interface TeamMember {
  id: string
  name: string
  email: string
  role: Role
  status: "active" | "pending"
  joinedAt: string
}

const roleConfig: Record<Role, { label: string; color: string; description: string }> = {
  admin: {
    label: "Admin",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    description: "Full access to all features and settings"
  },
  editor: {
    label: "Editor",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    description: "Can edit bots, data sources, and content"
  },
  analyst: {
    label: "Analyst",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    description: "View-only access to analytics and reports"
  }
}

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-15"
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    role: "editor",
    status: "active",
    joinedAt: "2024-02-20"
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "analyst",
    status: "active",
    joinedAt: "2024-03-10"
  },
  {
    id: "4",
    name: "",
    email: "pending@example.com",
    role: "analyst",
    status: "pending",
    joinedAt: "2024-06-01"
  }
]

export function TeamMembersSection() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<Role>("analyst")

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address")
      return
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "",
      email: inviteEmail,
      role: inviteRole,
      status: "pending",
      joinedAt: new Date().toISOString().split('T')[0]
    }

    setMembers([...members, newMember])
    setInviteEmail("")
    setInviteRole("analyst")
    setInviteDialogOpen(false)
    toast.success(`Invitation sent to ${inviteEmail}`)
  }

  const handleRoleChange = (memberId: string, newRole: Role) => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, role: newRole } : m
    ))
    toast.success("Role updated successfully")
  }

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId))
    toast.success("Team member removed")
  }

  const handleResendInvite = (email: string) => {
    toast.success(`Invitation resent to ${email}`)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Invite and manage team members with different access levels
              </CardDescription>
            </div>
          </div>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team. They'll receive an email with instructions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roleConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex flex-col">
                            <span>{config.label}</span>
                            <span className="text-xs text-muted-foreground">{config.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Role Permissions
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {roleConfig[inviteRole].description}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInvite}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm">
                    {member.name 
                      ? member.name.split(' ').map(n => n[0]).join('').toUpperCase()
                      : member.email[0].toUpperCase()
                    }
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {member.name || member.email}
                    </span>
                    {member.status === "pending" && (
                      <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                        Pending
                      </Badge>
                    )}
                  </div>
                  {member.name && (
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select
                  value={member.role}
                  onValueChange={(v) => handleRoleChange(member.id, v as Role)}
                >
                  <SelectTrigger className="w-32">
                    <Badge variant="outline" className={roleConfig[member.role].color}>
                      {roleConfig[member.role].label}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <Badge variant="outline" className={config.color}>
                          {config.label}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {member.status === "pending" && (
                      <DropdownMenuItem onClick={() => handleResendInvite(member.email)}>
                        <Mail className="h-4 w-4 mr-2" />
                        Resend Invitation
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
