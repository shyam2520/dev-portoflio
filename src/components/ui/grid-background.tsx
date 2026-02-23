import React from "react"
import { cn } from "@/lib/utils"

export function GridBackground({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative w-full h-full bg-black", className)}>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
