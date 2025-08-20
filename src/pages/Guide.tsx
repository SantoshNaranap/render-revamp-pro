import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Bot, Database, Sparkles, Settings, Rocket, Users, MessageSquare, BarChart3, Zap, Target, Award } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const quickStartSteps = [
  {
    id: "create-bot",
    title: "Create Your First Bot",
    description: "Set up your first AI bot to get started with PamperedChef",
    icon: Bot,
    link: "/bots",
    completed: false,
    time: "2 min"
  },
  {
    id: "add-data",
    title: "Add Data Sources",
    description: "Connect data sources to train your AI bot",
    icon: Database,
    link: "/data-sources",
    completed: false,
    time: "5 min"
  },
  {
    id: "test-playground",
    title: "Test in Playground",
    description: "Try out your bot in the interactive playground",
    icon: Sparkles,
    link: "/playground",
    completed: false,
    time: "3 min"
  },
  {
    id: "configure-settings",
    title: "Configure Bot Settings",
    description: "Fine-tune your bot's behavior and responses",
    icon: Settings,
    link: "/settings",
    completed: false,
    time: "4 min"
  },
  {
    id: "deploy-bot",
    title: "Deploy Your Bot",
    description: "Get integration code to embed your bot anywhere",
    icon: Rocket,
    link: "/bots",
    completed: false,
    time: "2 min"
  }
];

const achievements = [
  { icon: Users, title: "First Bot Created", description: "Successfully created your first AI bot" },
  { icon: MessageSquare, title: "First Conversation", description: "Had your first conversation with a bot" },
  { icon: Database, title: "Data Connected", description: "Connected your first data source" },
  { icon: Award, title: "Setup Complete", description: "Completed the entire setup process" }
];

const stats = [
  { label: "Bots Created", value: "0", icon: Bot, color: "text-blue-600 dark:text-blue-400" },
  { label: "Data Sources", value: "0", icon: Database, color: "text-green-600 dark:text-green-400" },
  { label: "Conversations", value: "0", icon: MessageSquare, color: "text-purple-600 dark:text-purple-400" },
  { label: "API Calls", value: "0", icon: Zap, color: "text-orange-600 dark:text-orange-400" }
];

export default function Guide() {
  const [steps, setSteps] = useState(quickStartSteps);
  
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;
  const totalTime = steps.reduce((acc, step) => acc + parseInt(step.time), 0);

  const toggleStep = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl"></div>
          <div className="relative p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center animate-scale-in">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Quick Start Guide</h1>
                <p className="text-xl text-muted-foreground">
                  Get up and running with PamperedChef in just {totalTime} minutes
                </p>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={stat.label} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <Card className="hover-scale cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <div>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Progress Overview */}
          <div className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  Your Progress
                </CardTitle>
                <CardDescription>
                  {completedSteps} of {steps.length} steps completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium text-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Estimated time remaining: {totalTime - (completedSteps * 3)} minutes
                  </p>
                </div>
                
                {progress === 100 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-scale-in">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-200 mb-2">
                      <Award className="w-5 h-5" />
                      <span className="font-medium">Congratulations!</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      You've mastered the basics! Your AI platform is ready for advanced features.
                    </p>
                  </div>
                )}

                {progress < 100 && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Rocket className="w-4 h-4" />
                      <span className="font-medium">Keep Going!</span>
                    </div>
                    <p className="text-sm text-primary/80">
                      You're making great progress. Complete the remaining steps to unlock your AI platform's full potential.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="animate-fade-in" style={{animationDelay: "200ms"}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={achievement.title} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className={`w-8 h-8 rounded-lg ${completedSteps > index ? 'bg-primary/10' : 'bg-muted'} flex items-center justify-center`}>
                        <achievement.icon className={`w-4 h-4 ${completedSteps > index ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${completedSteps > index ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      {completedSteps > index && (
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Steps List */}
          <Card className="lg:col-span-2 animate-fade-in" style={{animationDelay: "100ms"}}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Getting Started Steps</span>
                <Badge variant="outline" className="text-xs">
                  {totalTime} min total
                </Badge>
              </CardTitle>
              <CardDescription>
                Follow these steps to set up your AI platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const StepIcon = step.completed ? CheckCircle2 : Circle;
                  
                  return (
                    <div
                      key={step.id}
                      className={`group flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 hover-scale cursor-pointer ${
                        step.completed 
                          ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800 shadow-sm' 
                          : 'bg-card border-border hover:bg-accent/30 hover:border-primary/30'
                      }`}
                      onClick={() => toggleStep(step.id)}
                    >
                      {/* Step connector line */}
                      {index < steps.length - 1 && (
                        <div className="absolute left-8 top-16 w-0.5 h-8 bg-border group-hover:bg-primary/30 transition-colors"></div>
                      )}
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <button
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                            step.completed 
                              ? 'text-green-600 dark:text-green-400 scale-110' 
                              : 'text-muted-foreground hover:text-primary hover:scale-110'
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </button>
                        
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          step.completed 
                            ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 shadow-sm' 
                            : 'bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110'
                        }`}>
                          <IconComponent className={`w-6 h-6 transition-all duration-300 ${
                            step.completed 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-primary group-hover:scale-110'
                          }`} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold text-lg transition-colors ${
                            step.completed 
                              ? 'text-green-800 dark:text-green-200' 
                              : 'text-foreground group-hover:text-primary'
                          }`}>
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-background/50">
                              {step.time}
                            </Badge>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              step.completed 
                                ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
                                : 'bg-primary/10 text-primary'
                            }`}>
                              Step {index + 1}
                            </span>
                          </div>
                        </div>
                        <p className={`text-sm leading-relaxed mb-4 ${
                          step.completed 
                            ? 'text-green-700 dark:text-green-300' 
                            : 'text-muted-foreground'
                        }`}>
                          {step.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <Button asChild variant={step.completed ? "outline" : "default"} size="sm" className="transition-all duration-300">
                            <NavLink to={step.link}>
                              {step.completed ? "Review" : "Get Started"}
                            </NavLink>
                          </Button>
                          {step.completed && (
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs animate-fade-in">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card className="animate-fade-in" style={{animationDelay: "300ms"}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Jump to any section to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button asChild variant="outline" className="justify-start h-auto p-4 hover-scale">
                  <NavLink to="/bots" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium">Create Bot</h4>
                      <p className="text-sm text-muted-foreground">Start building your AI assistant</p>
                    </div>
                  </NavLink>
                </Button>
                
                <Button asChild variant="outline" className="justify-start h-auto p-4 hover-scale">
                  <NavLink to="/data-sources" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <Database className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium">Add Data</h4>
                      <p className="text-sm text-muted-foreground">Connect your knowledge sources</p>
                    </div>
                  </NavLink>
                </Button>
                
                <Button asChild variant="outline" className="justify-start h-auto p-4 hover-scale">
                  <NavLink to="/playground" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium">Test Bot</h4>
                      <p className="text-sm text-muted-foreground">Try your bot in the playground</p>
                    </div>
                  </NavLink>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Learning Resources */}
          <Card className="animate-fade-in" style={{animationDelay: "400ms"}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Need Help?
              </CardTitle>
              <CardDescription>
                Additional resources to help you succeed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer hover-scale">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Data Sources Guide</h4>
                    <p className="text-sm text-muted-foreground">Learn how to connect various data sources to train your AI bot effectively</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer hover-scale">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Bot Configuration</h4>
                    <p className="text-sm text-muted-foreground">Advanced settings to customize your AI bot's behavior and responses</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer hover-scale">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Integration Guide</h4>
                    <p className="text-sm text-muted-foreground">Deploy your bot to websites, apps, and messaging platforms</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}