export default function GettingStartedPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Getting Started</h1>
        <p className="text-muted-foreground">Learn how to set up CodeMemory in your project in under 5 minutes.</p>
      </div>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Prerequisites
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="text-git-green">✓</span> Node.js 18 or higher
          </li>
          <li className="flex items-center gap-2">
            <span className="text-git-green">✓</span> Git repository initialized
          </li>
          <li className="flex items-center gap-2">
            <span className="text-git-green">✓</span> Cohere API key
          </li>
        </ul>
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Installation
        </h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground">Terminal</div>
          <pre className="p-4 overflow-x-auto">
            <code>
              <span className="text-git-green">$</span>{" "}
              <span className="text-foreground">npm install -g codememory</span>
            </code>
          </pre>
        </div>
      </section>

      {/* Initialize */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Initialize in your project
        </h2>
        <p className="text-muted-foreground">Navigate to your project directory and run the init command:</p>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground">Terminal</div>
          <pre className="p-4 overflow-x-auto space-y-2">
            <code className="block">
              <span className="text-git-green">$</span> <span className="text-foreground">cd your-project</span>
            </code>
            <code className="block">
              <span className="text-git-green">$</span> <span className="text-foreground">codememory init</span>
            </code>
          </pre>
        </div>
        <p className="text-muted-foreground text-sm">
          This will set up the Git pre-commit hook and create a{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.codememory</code> configuration file.
        </p>
      </section>

      {/* Configure API Key */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Configure your API key
        </h2>
        <p className="text-muted-foreground">Add your Cohere API key to enable AI-powered features:</p>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground">Terminal</div>
          <pre className="p-4 overflow-x-auto">
            <code>
              <span className="text-git-green">$</span>{" "}
              <span className="text-foreground">codememory config --api-key YOUR_COHERE_API_KEY</span>
            </code>
          </pre>
        </div>
      </section>

      {/* Verify */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Verify installation
        </h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground">Terminal</div>
          <pre className="p-4 overflow-x-auto space-y-2">
            <code className="block">
              <span className="text-git-green">$</span> <span className="text-foreground">codememory status</span>
            </code>
            <code className="block text-muted-foreground">
              {`
✓ Git hook installed
✓ API key configured  
✓ Vector DB connected
✓ Ready to index commits`}
            </code>
          </pre>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Next steps
        </h2>
        <div className="grid gap-4">
          <a
            href="/docs/commands"
            className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
          >
            <h3 className="font-medium group-hover:text-primary transition-colors">Explore Commands →</h3>
            <p className="text-sm text-muted-foreground mt-1">Learn about all available CLI commands</p>
          </a>
        </div>
      </section>
    </div>
  )
}
