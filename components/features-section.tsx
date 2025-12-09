"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, FileCode, Tags, Zap, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Embeddings for Semantic Recall",
    description: "Cohere embeddings capture the meaning of your code changes, enabling natural language queries.",
    tag: "Cohere Embed",
  },
  {
    icon: FileCode,
    title: "Generate Explanations",
    description: "AI-powered summaries explain the 'why' behind every commit, not just the 'what'.",
    tag: "Cohere Generate",
  },
  {
    icon: Tags,
    title: "Smart Commit Classification",
    description: "Automatically detect commit types: refactor, feature, fix, docs, and more.",
    tag: "Cohere Classify",
  },
  {
    icon: Zap,
    title: "Instant Search",
    description: "Query years of commit history in milliseconds with vector similarity search.",
    tag: "Vector DB",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your code stays yours. Self-host or use our encrypted cloud with SOC 2 compliance.",
    tag: "Security",
  },
  {
    icon: Clock,
    title: "Git-Native Integration",
    description: "Works with your existing workflow. Just install the hook and commit as usual.",
    tag: "Pre-commit",
  },
]

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = sectionRef.current?.querySelectorAll("[data-index]")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/30" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Powered by Cohere</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enterprise-grade AI features that understand your codebase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">{feature.tag}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
