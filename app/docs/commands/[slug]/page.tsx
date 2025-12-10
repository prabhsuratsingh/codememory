import { notFound } from "next/navigation"
import commandsData from "@/data/commands.json"

interface Command {
  slug: string
  name: string
  description: string
  usage: string
  options: { flag: string; description: string }[]
  examples: { title: string; command: string }[]
  exampleOutput?: { title: string; content: string }
}

export function generateStaticParams() {
  return commandsData.commands.map((command) => ({
    slug: command.slug,
  }))
}

export default async function CommandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const command = commandsData.commands.find((cmd) => cmd.slug === slug) as Command | undefined

  if (!command) {
    notFound()
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Commands</span>
          <span>/</span>
          <span className="text-foreground">{command.name}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-git-green">$</span> codememory {command.name}
        </h1>
        <p className="text-muted-foreground">{command.description}</p>
      </div>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Usage
        </h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <pre className="p-4 overflow-x-auto">
            <code>
              <span className="text-git-green">$</span> <span className="text-foreground">{command.usage}</span>
            </code>
          </pre>
        </div>
      </section>

      {/* Options */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Options
        </h2>
        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {command.options.map((option, index) => (
            <div key={index} className="p-4">
              <code className="text-primary">{option.flag}</code>
              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-git-yellow">#</span> Examples
        </h2>
        <div className="space-y-4">
          {command.examples.map((example, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground">
                {example.title}
              </div>
              <pre className="p-4 overflow-x-auto">
                <code>
                  <span className="text-git-green">$</span> <span className="text-foreground">{example.command}</span>
                </code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Example Output (for status command) */}
      {command.exampleOutput && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-git-yellow">#</span> {command.exampleOutput.title}
          </h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground">Terminal</div>
            <pre className="p-4 overflow-x-auto whitespace-pre-wrap">
              <code className="text-muted-foreground">{command.exampleOutput.content}</code>
            </pre>
          </div>
        </section>
      )}
    </div>
  )
}
