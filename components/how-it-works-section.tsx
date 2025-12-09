"use client"

import { useEffect, useRef, useState } from "react"
import { GitCommit, Database, Search, ArrowDown } from "lucide-react"

const steps = [
  {
    icon: GitCommit,
    title: "1. Commit Your Code",
    description: "A Git pre-commit hook captures your diff and sends it to Cohere's embedding API.",
    code: `git commit -m "Add user auth"`,
    highlight: "pre-commit hook → Cohere embed",
  },
  {
    icon: Database,
    title: "2. Store Context",
    description: "Embeddings and AI-generated summaries are stored in a vector database for semantic search.",
    code: `// Stored in vector DB
{
  embedding: [0.12, -0.34, ...],
  summary: "Added JWT auth flow"
}`,
    highlight: "embeddings + summary → vector DB",
  },
  {
    icon: Search,
    title: "3. Ask Questions",
    description: "Query your codebase history in natural language. Get instant, contextual answers.",
    code: `$ code-memory ask \\
  "Why did we switch to JWT?"`,
    highlight: "semantic recall → explanations",
  },
]

export function HowItWorksSection() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleSteps((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const elements = sectionRef.current?.querySelectorAll("[data-index]")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="py-20 md:py-32 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to never forget your code decisions again.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Connection line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 hidden md:block" />

          {steps.map((step, index) => (
            <div
              key={index}
              data-index={index}
              className={`relative mb-12 last:mb-0 transition-all duration-700 ${
                visibleSteps.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Icon node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 bg-card border border-border rounded-xl p-6 ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>

                  {/* Code block */}
                  <div className="bg-secondary/50 rounded-lg p-4 text-left">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-primary">
                    <ArrowDown className="w-3 h-3" />
                    <span>{step.highlight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
