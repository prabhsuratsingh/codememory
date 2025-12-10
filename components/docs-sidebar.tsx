"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, BookOpen, Terminal, Home, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Image from "next/image"

const commands = [
    { name: "init", href: "/docs/commands/init", description: "Initialize CodeMemory" },
    { name: "query", href: "/docs/commands/query", description: "Query your codebase" },
    { name: "index", href: "/docs/commands/index", description: "Index commits" },
    { name: "config", href: "/docs/commands/config", description: "Configure settings" },
    { name: "status", href: "/docs/commands/status", description: "Check status" },
]

export function DocsSidebar() {
    const pathname = usePathname()
    const [commandsOpen, setCommandsOpen] = useState(pathname.includes("/docs/commands"))
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm h-screen sticky top-0 overflow-y-auto flex flex-col">
            {/* Header with logo and theme toggle */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-mono font-bold text-foreground hover:text-primary transition-colors"
                >
                    <Image src="/code-mem-logo-no-bg-sharp.png" alt="Logo" width={50} height={50} />

                    <span>CodeMemory</span>
                </Link>
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                    aria-label="Toggle theme"
                >
                    {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
            </div>

            <nav className="p-4 space-y-2 flex-1">
                {/* Back to home */}
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                >
                    <Home className="w-4 h-4" />
                    <span>Back to Home</span>
                </Link>

                <div className="border-t border-border my-4" />

                {/* Getting Started */}
                <Link
                    href="/docs/getting-started"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        pathname === "/docs/getting-started"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                >
                    <BookOpen className="w-4 h-4" />
                    <span>Getting Started</span>
                </Link>

                {/* Commands with dropdown */}
                <div>
                    <button
                        onClick={() => setCommandsOpen(!commandsOpen)}
                        className={cn(
                            "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors",
                            pathname.includes("/docs/commands")
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Terminal className="w-4 h-4" />
                            <span>Commands</span>
                        </div>
                        {commandsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    {/* Dropdown items */}
                    <div
                        className={cn(
                            "ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-200",
                            commandsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                        )}
                    >
                        <Link
                            href="/docs/commands"
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors border-l-2",
                                pathname === "/docs/commands"
                                    ? "border-primary text-primary bg-primary/5"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
                            )}
                        >
                            <span className="text-git-green">$</span>
                            <span>Overview</span>
                        </Link>
                        {commands.map((cmd) => (
                            <Link
                                key={cmd.name}
                                href={cmd.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors border-l-2",
                                    pathname === cmd.href
                                        ? "border-primary text-primary bg-primary/5"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
                                )}
                            >
                                <span className="text-git-green">$</span>
                                <span>{cmd.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </aside>
    )
}
