import React from "react"
import { cn } from "@/lib/utils"

export function BubbleBackground({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-slate-950", className)}>
      <div className="absolute inset-0">
        {/* Animated bubbles */}
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute top-[40%] right-[30%] w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-blob animation-delay-3000" />
        <div className="absolute bottom-[30%] right-[15%] w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl animate-blob animation-delay-1000" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
