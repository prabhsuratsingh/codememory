"use client"

import { GitBranch, ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/12 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <GitBranch className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Stop Forgetting Your Code Decisions
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Set up in 5 minutes. Works with any Git repository. Start building institutional memory for your codebase
            today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 group"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 group bg-transparent">
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </div>

          {/* Install command */}
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary border border-border">
            <code className="text-sm text-muted-foreground">$ npm install -g code-memory</code>
            <button
              className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              onClick={() => navigator.clipboard.writeText("npm install -g code-memory")}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
