
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface Bot {
  id: string
  name: string
  description: string
  status: string
  conversations: number
  accuracy: number
  lastTrained: string
  dataSources: string[]
}

interface CodeSnippetDialogProps {
  bot: Bot
  open: boolean
  onClose: () => void
}

export function CodeSnippetDialog({ bot, open, onClose }: CodeSnippetDialogProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const jsSnippet = `<!-- Kaaylabs Bot Integration -->
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.kaaylabs.ai/widget.js';
    script.setAttribute('data-bot-id', '${bot.id}');
    script.setAttribute('data-bot-name', '${bot.name}');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-position', 'bottom-right');
    document.head.appendChild(script);
  })();
</script>`

  const reactSnippet = `import { KaaylabsWidget } from '@kaaylabs/react-widget';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      <KaaylabsWidget
        botId="${bot.id}"
        botName="${bot.name}"
        theme="light"
        position="bottom-right"
        welcomeMessage="Hi! How can I help you today?"
      />
    </div>
  );
}`

  const htmlSnippet = `<!-- Add this script tag to your HTML head -->
<script src="https://cdn.kaaylabs.ai/widget.js"></script>

<!-- Add this div where you want the chat widget -->
<div 
  id="kaaylabs-widget"
  data-bot-id="${bot.id}"
  data-bot-name="${bot.name}"
  data-theme="light"
  data-position="bottom-right"
>
</div>

<script>
  // Initialize the widget
  window.KaaylabsWidget.init();
</script>`

  const nextjsSnippet = `// app/components/ChatWidget.tsx (App Router)
'use client';

import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.kaaylabs.ai/widget.js';
    script.setAttribute('data-bot-id', '${bot.id}');
    script.setAttribute('data-bot-name', '${bot.name}');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-position', 'bottom-right');
    document.head.appendChild(script);

    return () => {
      // Cleanup on component unmount
      const existingScript = document.querySelector('script[src="https://cdn.kaaylabs.ai/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // Widget is injected via script
}

// app/layout.tsx - Add to your layout
import ChatWidget from './components/ChatWidget';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}`

  const apiSnippet = `// Direct API Integration
const response = await fetch('https://api.kaaylabs.ai/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    botId: '${bot.id}',
    message: 'Hello, I need help with...',
    sessionId: 'unique-session-id'
  })
});

const data = await response.json();
console.log(data.response);`

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Integration Code for "{bot.name}"
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              {bot.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Choose your preferred integration method and copy the code snippet to embed this bot in your website.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
            <TabsTrigger value="nextjs">Next.js</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="javascript" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">JavaScript Widget</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(jsSnippet, 'javascript')}
                  className="gap-2"
                >
                  {copied === 'javascript' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'javascript' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{jsSnippet}</code>
              </pre>
              <p className="text-sm text-muted-foreground">
                Add this script to any website. The widget will appear as a floating chat bubble.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="react" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">React Component</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(reactSnippet, 'react')}
                  className="gap-2"
                >
                  {copied === 'react' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'react' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{reactSnippet}</code>
              </pre>
              <p className="text-sm text-muted-foreground">
                Install: <code className="bg-muted px-1 rounded">npm install @kaaylabs/react-widget</code>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="nextjs" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Next.js Integration</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(nextjsSnippet, 'nextjs')}
                  className="gap-2"
                >
                  {copied === 'nextjs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'nextjs' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{nextjsSnippet}</code>
              </pre>
              <p className="text-sm text-muted-foreground">
                For Next.js App Router. Supports both client-side rendering and proper cleanup.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="html" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Pure HTML</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(htmlSnippet, 'html')}
                  className="gap-2"
                >
                  {copied === 'html' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'html' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{htmlSnippet}</code>
              </pre>
              <p className="text-sm text-muted-foreground">
                Basic HTML integration for static websites or custom implementations.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Direct API Integration</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(apiSnippet, 'api')}
                  className="gap-2"
                >
                  {copied === 'api' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'api' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{apiSnippet}</code>
              </pre>
              <p className="text-sm text-muted-foreground">
                For custom chat interfaces or backend integrations. Requires API key from your dashboard.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Configuration Options</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Theme:</strong> light, dark, auto
            </div>
            <div>
              <strong>Position:</strong> bottom-right, bottom-left, top-right, top-left
            </div>
            <div>
              <strong>Bot ID:</strong> {bot.id}
            </div>
            <div>
              <strong>Data Sources:</strong> {bot.dataSources.length} connected
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
