"use client"

import { useEffect, useState } from "react"
import { GitCommit, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Git branch lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-foreground" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-in fade-in duration-500">
            <GitCommit className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Git-native memory for your codebase</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            AI That <span className="text-primary">Remembers</span>
            <br />
            Your Project
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Developers constantly forget why something was written.
            <br className="hidden md:block" />A tool that stores + retrieves the reasoning behind code changes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 group"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
              <code className="text-sm">$ npm i code-memory</code>
            </Button>
          </div>

          {/* Terminal Preview */}
          <div
            className={`max-w-2xl mx-auto transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <TerminalPreview />
          </div>
        </div>
      </div>
    </section>
  )
}

function TerminalPreview() {
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const lines = [
    { type: "command", text: '$ git commit -m "Switch from Redis to DynamoDB"' },
    { type: "output", text: "✓ Diff analyzed and embedded" },
    { type: "output", text: "✓ Reasoning stored in vector DB" },
    { type: "blank", text: "" },
    { type: "command", text: '$ code-memory ask "Why did we switch?"' },
    { type: "response", text: "→ DynamoDB chosen for auto-scaling and lower" },
    { type: "response", text: "  costs at our expected read-heavy workload." },
  ]

  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsTyping(false)
      return
    }

    const currentText = lines[currentLine].text

    if (currentChar < currentText.length) {
      // Type next character
      const typingSpeed = lines[currentLine].type === "command" ? 40 : 20
      const timer = setTimeout(() => {
        setCurrentChar((prev) => prev + 1)
      }, typingSpeed)
      return () => clearTimeout(timer)
    } else {
      // Move to next line after a pause
      const pauseTime = lines[currentLine].type === "blank" ? 100 : 300
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
        setCurrentChar(0)
      }, pauseTime)
      return () => clearTimeout(timer)
    }
  }, [currentLine, currentChar, lines])

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
        <span className="text-xs text-muted-foreground">terminal — code-memory</span>
      </div>

      {/* Terminal content */}
      <div className="p-4 md:p-6 text-left min-h-[200px]">
        {lines.slice(0, currentLine).map((line, index) => (
          <div
            key={index}
            className={`text-sm md:text-base leading-relaxed ${
              line.type === "command"
                ? "text-foreground"
                : line.type === "output"
                  ? "text-git-green"
                  : line.type === "response"
                    ? "text-git-blue"
                    : ""
            }`}
          >
            {line.text || "\u00A0"}
          </div>
        ))}

        {currentLine < lines.length && (
          <div
            className={`text-sm md:text-base leading-relaxed ${
              lines[currentLine].type === "command"
                ? "text-foreground"
                : lines[currentLine].type === "output"
                  ? "text-git-green"
                  : lines[currentLine].type === "response"
                    ? "text-git-blue"
                    : ""
            }`}
          >
            {lines[currentLine].text.slice(0, currentChar)}
            <span className="inline-block w-2 h-5 bg-primary animate-blink ml-0.5 align-middle" />
          </div>
        )}

        {/* Cursor when done typing */}
        {!isTyping && currentLine >= lines.length && (
          <div className="text-sm md:text-base leading-relaxed">
            <span className="inline-block w-2 h-5 bg-primary animate-blink" />
          </div>
        )}
      </div>
    </div>
  )
}
