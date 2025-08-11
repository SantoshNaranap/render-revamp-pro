import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Bot, Database, Sparkles, Settings, Rocket } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const quickStartSteps = [
  {
    id: "create-bot",
    title: "Create Your First Bot",
    description: "Set up your first AI bot to get started with Kaaylabs",
    icon: Bot,
    link: "/bots",
    completed: false
  },
  {
    id: "add-data",
    title: "Add Data Sources",
    description: "Connect data sources to train your AI bot",
    icon: Database,
    link: "/data-sources",
    completed: false
  },
  {
    id: "test-playground",
    title: "Test in Playground",
    description: "Try out your bot in the interactive playground",
    icon: Sparkles,
    link: "/playground",
    completed: false
  },
  {
    id: "configure-settings",
    title: "Configure Bot Settings",
    description: "Fine-tune your bot's behavior and responses",
    icon: Settings,
    link: "/settings",
    completed: false
  },
  {
    id: "deploy-bot",
    title: "Deploy Your Bot",
    description: "Get integration code to embed your bot anywhere",
    icon: Rocket,
    link: "/bots",
    completed: false
  }
];

export default function Guide() {
  const [steps, setSteps] = useState(quickStartSteps);
  
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  const toggleStep = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Quick Start Guide</h2>
          <p className="text-muted-foreground">
            Get up and running with Kaaylabs in just a few steps
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Progress Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-primary" />
                </div>
                Your Progress
              </CardTitle>
              <CardDescription>
                {completedSteps} of {steps.length} steps completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              {progress === 100 && (
                <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">Congratulations!</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    You've completed the quick start guide. Your AI platform is ready to use!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Steps List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Getting Started Steps</CardTitle>
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
                      className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                        step.completed 
                          ? 'bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800' 
                          : 'bg-card border-border hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStep(step.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                            step.completed 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </button>
                        
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-100 dark:bg-green-900/50' 
                            : 'bg-primary/10'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            step.completed 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-primary'
                          }`} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${
                            step.completed 
                              ? 'text-green-800 dark:text-green-200' 
                              : 'text-foreground'
                          }`}>
                            {step.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            step.completed 
                              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            Step {index + 1}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${
                          step.completed 
                            ? 'text-green-700 dark:text-green-300' 
                            : 'text-muted-foreground'
                        }`}>
                          {step.description}
                        </p>
                        <div className="mt-3">
                          <Button asChild variant={step.completed ? "outline" : "default"} size="sm">
                            <NavLink to={step.link}>
                              {step.completed ? "Review" : "Get Started"}
                            </NavLink>
                          </Button>
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
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Additional resources to help you succeed with Kaaylabs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Data Sources Guide</h4>
                  <p className="text-sm text-muted-foreground">Learn how to connect your data</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Bot Configuration</h4>
                  <p className="text-sm text-muted-foreground">Customize your AI bot behavior</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Integration Guide</h4>
                  <p className="text-sm text-muted-foreground">Deploy your bot anywhere</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}