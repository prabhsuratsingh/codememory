import Link from "next/link"

const commands = [
  {
    name: "init",
    description: "Initialize CodeMemory in your repository",
    usage: "codememory init [options]",
    href: "/docs/commands/init",
  },
  {
    name: "query",
    description: "Ask questions about your codebase history",
    usage: "codememory query <question>",
    href: "/docs/commands/query",
  },
  {
    name: "index",
    description: "Manually index commits into the vector database",
    usage: "codememory index [--from <commit>] [--to <commit>]",
    href: "/docs/commands/index",
  },
  {
    name: "config",
    description: "Configure CodeMemory settings",
    usage: "codememory config [--api-key <key>] [--db <path>]",
    href: "/docs/commands/config",
  },
  {
    name: "status",
    description: "Check the current status of CodeMemory",
    usage: "codememory status",
    href: "/docs/commands/status",
  },
]

export default function CommandsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Commands</h1>
        <p className="text-muted-foreground">Complete reference for all CodeMemory CLI commands.</p>
      </div>

      {/* Quick Reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Quick Reference
        </h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground">
            Available Commands
          </div>
          <pre className="p-4 overflow-x-auto space-y-1">
            {commands.map((cmd) => (
              <code key={cmd.name} className="block">
                <span className="text-git-green">$</span> <span className="text-primary">{cmd.usage}</span>
              </code>
            ))}
          </pre>
        </div>
      </section>

      {/* Command Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> All Commands
        </h2>
        <div className="grid gap-4">
          {commands.map((cmd) => (
            <Link
              key={cmd.name}
              href={cmd.href}
              className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-git-green">$</span>
                  <span>codememory {cmd.name}</span>
                </h3>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{cmd.description}</p>
              <code className="text-xs text-muted-foreground mt-2 block bg-muted/50 px-2 py-1 rounded">
                {cmd.usage}
              </code>
            </Link>
          ))}
        </div>
      </section>

      {/* Global Options */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Global Options
        </h2>
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-4">
            <code className="text-primary bg-muted px-2 py-0.5 rounded text-sm">--help, -h</code>
            <span className="text-muted-foreground text-sm">Display help information</span>
          </div>
          <div className="flex items-start gap-4">
            <code className="text-primary bg-muted px-2 py-0.5 rounded text-sm">--version, -v</code>
            <span className="text-muted-foreground text-sm">Show version number</span>
          </div>
          <div className="flex items-start gap-4">
            <code className="text-primary bg-muted px-2 py-0.5 rounded text-sm">--verbose</code>
            <span className="text-muted-foreground text-sm">Enable verbose output</span>
          </div>
          <div className="flex items-start gap-4">
            <code className="text-primary bg-muted px-2 py-0.5 rounded text-sm">--quiet, -q</code>
            <span className="text-muted-foreground text-sm">Suppress non-error output</span>
          </div>
        </div>
      </section>
    </div>
  )
}
