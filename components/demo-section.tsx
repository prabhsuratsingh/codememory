"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const sampleQuestions = [
  "Why did we switch from Redis to DynamoDB?",
  "Where is user-session expiry implemented?",
  "When did we add rate limiting?",
  "Who refactored the auth module?",
]

const mockResponses: Record<string, string> = {
  "Why did we switch from Redis to DynamoDB?":
    "Based on commit #a4f2c3d (March 2024): The team switched from Redis to DynamoDB because our read-heavy workload was causing Redis memory issues at scale. DynamoDB's auto-scaling and pay-per-request pricing better matched our traffic patterns. The migration also eliminated the need for manual cluster management.",
  "Where is user-session expiry implemented?":
    "Found in src/auth/session.ts (commit #b7e1d2f): Session expiry is handled by the SessionManager class. Tokens expire after 24 hours (configurable via SESSION_TTL env var). The cleanup job runs every hour via a cron in src/jobs/cleanup-sessions.ts.",
  "When did we add rate limiting?":
    "Rate limiting was added in commit #c9a3e5b (January 2024) by @sarah. It uses a token bucket algorithm implemented in src/middleware/rate-limit.ts. Default limits: 100 req/min for authenticated users, 20 req/min for anonymous.",
  "Who refactored the auth module?":
    "The auth module was refactored by @mike in commits #d2f4a6c through #e5g7b8d (February 2024). Key changes: migrated from session-based to JWT auth, added refresh token rotation, and implemented PKCE for OAuth flows.",
}

export function DemoSection() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleQuery = async (q: string) => {
    setQuery(q)
    setIsLoading(true)
    setResponse("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setResponse(
      mockResponses[q] ||
        "I couldn't find specific information about that in the commit history. Try rephrasing your question or check if this feature was implemented in the codebase.",
    )
    setIsLoading(false)
  }

  return (
    <section id="demo" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Try It Now</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ask questions about your codebase history in natural language.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Query input */}
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about your code history..."
                className="flex-1 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                onKeyDown={(e) => e.key === "Enter" && query && handleQuery(query)}
              />
              <Button
                onClick={() => query && handleQuery(query)}
                disabled={!query || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Sample questions */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sampleQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleQuery(q)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Response area */}
          {(isLoading || response) && (
            <div className="bg-card border border-border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="px-4 py-2 bg-secondary/50 border-b border-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground">Code Memory Response</span>
              </div>
              <div className="p-4 md:p-6">
                {isLoading ? (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Searching commit history...</span>
                  </div>
                ) : (
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{response}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
