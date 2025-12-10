"use client"

import { useState, useEffect } from "react"
import { GitBranch, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-5xl ${
        isScrolled
          ? "bg-card/80 backdrop-blur-xl border border-border shadow-lg"
          : "bg-card/60 backdrop-blur-md border border-border/50"
      } rounded-full px-4 md:px-6 py-3`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Image src="/code-mem-logo-no-bg-sharp.png" alt="Logo" width={50} height={50} />
          </div>
          <span className="font-semibold text-foreground text-sm">Code Memory</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Demo
          </a>
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full w-9 h-9">
            {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button className="hidden md:flex rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4">
            Get Started
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              How it works
            </a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              Features
            </a>
            <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              Demo
            </a>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              Docs
            </Link>
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm mt-2">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
