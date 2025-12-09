"use client"

import { useState, useEffect } from "react"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState<"loading" | "complete" | "exit">("loading")

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  // Progress bar animation
  useEffect(() => {
    if (phase !== "loading") return

    const duration = 2000
    const steps = 100
    const stepDuration = duration / steps

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setPhase("complete")
          return 100
        }
        // Variable speed - slower at start and end
        const increment = prev < 20 ? 1 : prev > 80 ? 1 : 2
        return Math.min(prev + increment, 100)
      })
    }, stepDuration)

    return () => clearInterval(interval)
  }, [phase])

  // Transition to main page after complete
  useEffect(() => {
    if (phase === "complete") {
      const timeout = setTimeout(() => {
        setPhase("exit")
      }, 400)
      return () => clearTimeout(timeout)
    }
    if (phase === "exit") {
      const timeout = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [phase, onComplete])

  // Generate progress bar characters
  const barWidth = 40
  const filledWidth = Math.floor((progress / 100) * barWidth)
  const emptyWidth = barWidth - filledWidth
  const progressBar = `[${"=".repeat(filledWidth)}${filledWidth < barWidth ? ">" : ""}${" ".repeat(Math.max(0, emptyWidth - 1))}]`

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center font-mono">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            <span className="text-emerald-500">&lt;</span>
            CodeMemory
            <span className="text-emerald-500">/&gt;</span>
          </h1>
        </div>

        {/* Init text and progress */}
        <div className="text-muted-foreground text-sm md:text-base space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-emerald-500">$</span>
            <span>codememory --init</span>
            <span className={`${showCursor && phase === "loading" ? "opacity-100" : "opacity-0"}`}>_</span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center justify-center gap-3 text-xs md:text-sm">
            <span className="text-muted-foreground/70">Initializing memory</span>
            <span className="text-emerald-500">{progressBar}</span>
            <span className="w-12 text-right tabular-nums">{progress}%</span>
          </div>

          {/* Status messages that appear as progress increases */}
          <div className="h-16 mt-4 text-xs text-muted-foreground/50 space-y-1">
            {progress >= 20 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">Loading embeddings engine...</div>
            )}
            {progress >= 50 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                Connecting to vector store...
              </div>
            )}
            {progress >= 80 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">Indexing commit history...</div>
            )}
            {progress >= 100 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-emerald-500">Ready.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
