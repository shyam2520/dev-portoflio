import React from "react"
import { cn } from "@/lib/utils"

export function DotsBackground({
  children,
  className,
  dotSize = 1,
  dotColor = "#888",
  backgroundColor = "transparent",
  gap = 15,
  maskColor = "#000",
}: {
  children?: React.ReactNode
  className?: string
  dotSize?: number
  dotColor?: string
  backgroundColor?: string
  gap?: number
  maskColor?: string
}) {
  return (
    <div
      className={cn("relative w-full h-full", className)}
      style={{
        background: backgroundColor,
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
          maskImage: `radial-gradient(ellipse 80% 50% at 50% 50%, ${maskColor} 40%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(ellipse 80% 50% at 50% 50%, ${maskColor} 40%, transparent 100%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
