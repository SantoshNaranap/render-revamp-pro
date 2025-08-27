import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from "lucide-react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      
      {/* Login Card */}
      <Card className="w-full max-w-md relative z-10 card-elevated animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-sm" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gradient">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full gap-2 h-11">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full gap-2 h-11">
              <Chrome className="h-4 w-4" />
              Google
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-3 text-xs text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11 focus-ring"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11 focus-ring"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border focus:ring-primary" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
              Forgot password?
            </Button>
          </div>

          {/* Sign In Button */}
          <Button className="w-full h-11 btn-primary font-medium">
            Sign In
          </Button>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 font-medium">
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}