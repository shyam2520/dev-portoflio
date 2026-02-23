import React from "react"
import { cn } from "@/lib/utils"

export function WavyBackground({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      {/* Animated wave layers */}
      <svg
        className="absolute top-0 left-0 w-full h-[120%] blur-2xl opacity-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.35)" />
            <stop offset="50%" stopColor="rgba(147, 51, 234, 0.35)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.35)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.28)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.28)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.28)" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 - Bottom layer */}
        <path
          d="M0,200 C320,100 420,300 740,220 C1060,140 1160,280 1440,200 L1440,800 L0,800 Z"
          fill="url(#gradient1)"
          className="animate-wave"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,200 C320,100 420,300 740,220 C1060,140 1160,280 1440,200 L1440,800 L0,800 Z;
              M0,280 C320,380 420,120 740,250 C1060,170 1160,100 1440,280 L1440,800 L0,800 Z;
              M0,150 C320,50 420,350 740,180 C1060,100 1160,320 1440,160 L1440,800 L0,800 Z;
              M0,200 C320,100 420,300 740,220 C1060,140 1160,280 1440,200 L1440,800 L0,800 Z
            "
          />
        </path>
        
        {/* Wave 2 - Middle layer */}
        <path
          d="M0,300 C360,200 460,400 780,320 C1100,240 1200,380 1440,300 L1440,800 L0,800 Z"
          fill="url(#gradient2)"
          className="animate-wave"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,300 C360,200 460,400 780,320 C1100,240 1200,380 1440,300 L1440,800 L0,800 Z;
              M0,380 C360,450 460,180 780,250 C1100,370 1200,200 1440,380 L1440,800 L0,800 Z;
              M0,250 C360,150 460,450 780,370 C1100,200 1200,420 1440,260 L1440,800 L0,800 Z;
              M0,300 C360,200 460,400 780,320 C1100,240 1200,380 1440,300 L1440,800 L0,800 Z
            "
          />
        </path>
        
        {/* Wave 3 - Top layer */}
        <path
          d="M0,400 C400,300 500,500 820,420 C1140,340 1240,480 1440,400 L1440,800 L0,800 Z"
          fill="url(#gradient3)"
          className="animate-wave"
        >
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="
              M0,400 C400,300 500,500 820,420 C1140,340 1240,480 1440,400 L1440,800 L0,800 Z;
              M0,480 C400,550 500,280 820,350 C1140,470 1240,300 1440,480 L1440,800 L0,800 Z;
              M0,350 C400,250 500,550 820,470 C1140,300 1240,520 1440,360 L1440,800 L0,800 Z;
              M0,400 C400,300 500,500 820,420 C1140,340 1240,480 1440,400 L1440,800 L0,800 Z
            "
          />
        </path>
      </svg>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent via-60% to-black" />
      
      <div className="relative z-10">{children}</div>
    </div>
  )
}
