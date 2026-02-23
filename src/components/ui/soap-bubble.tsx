import { useRef, useState, useCallback, useImperativeHandle, forwardRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

interface SmallBubble {
  id: number
  position: THREE.Vector3
  velocity: THREE.Vector3
  baseScale: number
  life: number
  maxLife: number
}

export interface SoapBubbleHandle {
  spawnBubbles: () => void
}

interface BubbleProps {
  onSpawnBubblesReady?: (fn: () => void) => void
}

function Bubble({ onSpawnBubblesReady }: BubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const [smallBubbles, setSmallBubbles] = useState<SmallBubble[]>([])
  const bubbleIdRef = useRef(0)
  const { mouse, viewport } = useThree()
  const [animationProgress, setAnimationProgress] = useState(0)
  
  // Responsive positioning based on viewport
  const isMobile = viewport.width < 6
  const bubblePosition: [number, number, number] = isMobile ? [-1.5, 0, -1] : [3, 0, 0]
  const bubbleScale = isMobile ? 1.5 : 2.5

  // Entrance animation
  useEffect(() => {
    let startTime: number | null = null
    const duration = 1500 // 1.5 seconds
    
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = time - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimationProgress(eased)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [])

  const spawnBubbles = useCallback(() => {
    const newBubbles: SmallBubble[] = []
    const count = Math.floor(Math.random() * 3) + 2 // 2-4 bubbles

    for (let i = 0; i < count; i++) {
      // Generate random point within the sphere (radius based on bubbleScale, centered at bubble position)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = Math.random() * bubbleScale
      
      // Calculate offset from center of big bubble
      const offsetX = radius * Math.sin(phi) * Math.cos(theta)
      const offsetY = radius * Math.sin(phi) * Math.sin(theta)
      const offsetZ = radius * Math.cos(phi)
      
      // Add to big bubble's position
      const spawnX = bubblePosition[0] + offsetX
      const spawnY = bubblePosition[1] + offsetY
      const spawnZ = bubblePosition[2] + offsetZ
      
      // Random speed multiplier (slower: 0.3x to 1.0x base speed)
      const speedMultiplier = 0.3 + Math.random() * 0.7
      
      // Random trajectory - mostly left but with variation
      const baseLeftSpeed = -0.03 * speedMultiplier
      const trajectoryVariation = (Math.random() - 0.5) * 0.03
      
      newBubbles.push({
        id: bubbleIdRef.current++,
        position: new THREE.Vector3(spawnX, spawnY, spawnZ),
        velocity: new THREE.Vector3(
          baseLeftSpeed + trajectoryVariation * 0.5,
          trajectoryVariation,
          (Math.random() - 0.5) * 0.015
        ),
        baseScale: 0.15 + Math.random() * 0.15, // Smaller: 0.15-0.3
        life: 0,
        maxLife: 2.5 + Math.random() * 1.5, // 2.5-4 seconds (longer life for slower movement)
      })
    }

    setSmallBubbles((prev) => [...prev, ...newBubbles])
  }, [bubblePosition, bubbleScale])

  // Notify parent that spawn function is ready
  useEffect(() => {
    if (onSpawnBubblesReady) {
      onSpawnBubblesReady(spawnBubbles)
    }
  }, [onSpawnBubblesReady, spawnBubbles])

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (meshRef.current && materialRef.current) {
      // Gentle rotation and floating animation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2

      // Animate the distortion for bubbling effect
      materialRef.current.distort = 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      // Subtle mouse follow effect
      const targetRotationY = mouse.x * 0.3
      const targetRotationX = -mouse.y * 0.3
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05
    }

    // Update small bubbles
    setSmallBubbles((bubbles) => {
      return bubbles
        .map((bubble) => {
          const newLife = bubble.life + 0.016
          const newPosition = bubble.position.clone().add(bubble.velocity)
          
          return {
            ...bubble,
            position: newPosition,
            life: newLife,
          }
        })
        .filter((bubble) => bubble.life < bubble.maxLife)
    })
  })

  return (
    <group>
      {/* Main bubble */}
      <mesh 
        ref={meshRef} 
        position={bubblePosition}
        scale={animationProgress}
      >
        <sphereGeometry args={[bubbleScale, 128, 128]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#ff69b4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.00}
          metalness={0.3}
          transparent={true}
          opacity={animationProgress}
          clearcoat={1}
          clearcoatRoughness={0}
          emissive="#ff1493"
          emissiveIntensity={1 * animationProgress}
        />
      </mesh>

      {/* Small bubbles */}
      {smallBubbles.map((bubble) => {
        // Calculate display scale based on life
        let displayScale = bubble.baseScale
        const timeUntilDeath = bubble.maxLife - bubble.life
        
        if (bubble.life < 0.2) {
          // Grow in
          displayScale = bubble.baseScale * (bubble.life / 0.2)
        } else if (timeUntilDeath < 0.4) {
          // Dramatic pop animation - rapid expand then burst
          const popProgress = 1 - (timeUntilDeath / 0.4)
          if (popProgress < 0.3) {
            // Expand phase - dramatic expansion (first 30%)
            displayScale = bubble.baseScale * (1 + popProgress * 4)
          } else {
            // Burst phase - rapid shrink (last 70%)
            const burstProgress = (popProgress - 0.3) / 0.7
            displayScale = bubble.baseScale * 2.2 * Math.pow(1 - burstProgress, 2)
          }
        }
        
        // Calculate opacity and emissive for dramatic pop effect
        let opacity = 0.8
        let emissiveIntensity = 2
        
        if (timeUntilDeath < 0.4) {
          const popProgress = 1 - (timeUntilDeath / 0.4)
          if (popProgress < 0.3) {
            // Brighten during expansion
            emissiveIntensity = 2 + popProgress * 10
            opacity = 0.8 + popProgress * 0.2
          } else {
            // Fade out during burst
            const fadeProgress = (popProgress - 0.3) / 0.7
            opacity = (1 - fadeProgress) * 1.0
            emissiveIntensity = (1 - fadeProgress) * 5
          }
        }
        
        // Random distortion for each bubble (based on id for consistency)
        const distortAmount = 0.3 + (bubble.id % 10) * 0.075 // 0.3 to 0.75
        const distortSpeed = 3 + (bubble.id % 7) * 0.5 // 3 to 6
        
        return (
          <mesh key={bubble.id} position={bubble.position} scale={displayScale}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial
              color="#ff1493"
              emissive="#ff1493"
              emissiveIntensity={emissiveIntensity}
              transparent
              opacity={opacity}
              distort={distortAmount}
              speed={distortSpeed}
              roughness={0.0}
              metalness={0.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export const SoapBubble = forwardRef<SoapBubbleHandle, {}>((_, ref) => {
  const spawnBubblesRef = useRef<(() => void) | null>(null)

  useImperativeHandle(ref, () => ({
    spawnBubbles: () => {
      if (spawnBubblesRef.current) {
        spawnBubblesRef.current()
      }
    }
  }))

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Enhanced lighting for visibility */}
        <ambientLight intensity={0.5} />

        <group position={[3, 0, 0]}>
          <Bubble onSpawnBubblesReady={(fn) => { spawnBubblesRef.current = fn }} />
        </group>
      </Canvas>
    </div>
  )
})
