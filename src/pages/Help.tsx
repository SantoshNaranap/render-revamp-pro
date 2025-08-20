
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  HelpCircle, 
  MessageSquare, 
  VideoIcon, 
  FileText, 
  Search, 
  Phone, 
  Mail, 
  ExternalLink,
  PlayCircle
} from "lucide-react";

const Help = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-border/40">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Help Center</h1>
            <p className="text-lg text-muted-foreground">Get answers, find resources, and connect with support</p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for help topics..."
              className="pl-10 bg-background/60 border-border/60 w-full"
            />
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Guides</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <VideoIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Tutorials</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Getting Started Guide */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" /> 
                    Getting Started
                  </CardTitle>
                  <CardDescription>Learn the basics of the PamperedChef AI platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      A comprehensive guide covering setup, navigation, and basic features to help you get up and running quickly.
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Platform overview</li>
                      <li>Creating your first bot</li>
                      <li>Connecting data sources</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    Read Guide <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Data Sources Guide */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> 
                    Data Source Management
                  </CardTitle>
                  <CardDescription>Connect and manage your data sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Learn how to connect, organize, and optimize your data sources for use with the AI platform.
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Supported file types</li>
                      <li>API integration options</li>
                      <li>Data security and privacy</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    Read Guide <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Analytics Guide */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <VideoIcon className="h-5 w-5 text-primary" /> 
                    Analytics & Reporting
                  </CardTitle>
                  <CardDescription>Get insights from your AI interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Understand how to use the analytics dashboard to gain insights and optimize your AI performance.
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Dashboard navigation</li>
                      <li>Key metrics explained</li>
                      <li>Custom reporting options</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    Read Guide <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about the PamperedChef AI platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create a new AI bot?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      To create a new bot, navigate to the Bots page from the sidebar and click the "Create New Bot" button. 
                      Follow the guided setup process to configure your bot's capabilities, knowledge base, and interaction style. 
                      You can customize appearance, behavior, and data sources within the bot creation interface.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What types of data sources can I connect?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      The PamperedChef platform supports various data sources including PDF documents, Word files, CSV data, 
                      website URLs, API endpoints, and database connections. You can upload files directly through 
                      the Data Sources page or connect to external sources using our integration options.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How does the Analytics dashboard work?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      The Analytics dashboard provides insights into your AI platform usage, bot performance, and user interactions.
                      You can monitor metrics like response accuracy, user satisfaction, conversation volume, and popular topics.
                      Use these insights to optimize your bot configurations and improve overall performance.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What are the billing and subscription options?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      PamperedChef offers flexible pricing tiers including Free, Professional, and Enterprise plans. 
                      Billing is based on usage metrics such as API calls, data storage, and advanced features.
                      Visit the Settings page and navigate to the Billing section to view your current plan, usage statistics, 
                      and available upgrade options.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I manage user permissions and access?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      User permissions are managed through the Settings page under the Security section. 
                      Administrators can invite team members, assign roles (Viewer, Editor, or Admin), 
                      and control access to specific bots and data sources. Each role has predefined 
                      permissions that can be customized to fit your organization's requirements.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Tutorials Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Tutorial 1 */}
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Getting Started with PamperedChef</CardTitle>
                  <CardDescription>Complete platform walkthrough</CardDescription>
                </CardHeader>
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded-md">
                      <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Tutorial thumbnail" 
                        className="object-cover w-full h-full opacity-80" />
                      <Button variant="outline" size="icon" className="absolute bg-white/30 backdrop-blur-sm hover:bg-white/50">
                        <PlayCircle className="h-10 w-10" />
                      </Button>
                    </div>
                  </AspectRatio>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">Duration: 15:24</p>
                    </div>
                    <Button variant="ghost" size="sm">Watch Now</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tutorial 2 */}
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Advanced Bot Configuration</CardTitle>
                  <CardDescription>Customize AI behavior and responses</CardDescription>
                </CardHeader>
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded-md">
                      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="Tutorial thumbnail" 
                        className="object-cover w-full h-full opacity-80" />
                      <Button variant="outline" size="icon" className="absolute bg-white/30 backdrop-blur-sm hover:bg-white/50">
                        <PlayCircle className="h-10 w-10" />
                      </Button>
                    </div>
                  </AspectRatio>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">Duration: 12:37</p>
                    </div>
                    <Button variant="ghost" size="sm">Watch Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline">View All Tutorials</Button>
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Our support team is ready to help</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Email Support</h4>
                      <p className="text-sm text-muted-foreground">support@kaaylabs.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Phone Support</h4>
                      <p className="text-sm text-muted-foreground">Available for Enterprise plans</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Live Chat</h4>
                      <p className="text-sm text-muted-foreground">Available 24/7 for all users</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Support</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community</CardTitle>
                  <CardDescription>Connect with other Kaaylabs users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Featured Discussion</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      "Best practices for training AI with limited data sources"
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xs">JD</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">Started by John Doe • 23 responses</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Join our community</h3>
                    <p className="text-sm text-muted-foreground">
                      Get help from other users, share your experiences, and learn best practices.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button variant="outline" className="flex-1">Discord</Button>
                  <Button variant="outline" className="flex-1">Forum</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Help;
