'use client'
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function useIsGoldTheme() {
  const [isGoldTheme, setIsGoldTheme] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const update = () => setIsGoldTheme(['dark-gold', 'light-gold'].includes(root.dataset.theme))
    update()
    const observer = new MutationObserver(() => update())
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return isGoldTheme
}

function StarField({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      const r = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.03
      ref.current.rotation.y -= delta * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

function FloatingOrb({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.12
      meshRef.current.rotation.y = clock.elapsedTime * 0.08
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 4]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  )
}

function InnerGlow({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.04
      meshRef.current.scale.setScalar(s)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.9, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.04}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export function Scene3D() {
  const isGoldTheme = useIsGoldTheme()
  const palette = useMemo(() => isGoldTheme ? {
    points: '#d4a030',
    orb: '#d4a030',
    glow: '#c8922a',
    light1: '#d4a030',
    light2: '#c8922a',
  } : {
    points: '#4f7fff',
    orb: '#4f7fff',
    glow: '#00d4ff',
    light1: '#4f7fff',
    light2: '#00d4ff',
  }, [isGoldTheme])

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} color={palette.light1} intensity={1.5} />
        <pointLight position={[-2, -1, 1]} color={palette.light2} intensity={0.8} />
        <StarField color={palette.points} />
        <FloatingOrb color={palette.orb} />
        <InnerGlow color={palette.glow} />
      </Canvas>
    </div>
  )
}
