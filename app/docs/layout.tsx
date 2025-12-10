import type React from "react"
import { DocsSidebar } from "@/components/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <DocsSidebar />
      <main className="flex-1 p-8 max-w-4xl">{children}</main>
    </div>
  )
}
