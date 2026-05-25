'use client'
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
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

interface NodeProps {
  position: [number, number, number]
  color: string
  label: string
  size?: number
}

function NetworkNode({ position, color, label, size = 0.12 }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.06
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      <Html center distanceFactor={6}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '8px',
          color,
          whiteSpace: 'nowrap',
          marginTop: '14px',
          letterSpacing: '.06em',
          opacity: 0.9,
        }}>
          {label}
        </div>
      </Html>
    </mesh>
  )
}

function ConnectionLine({ start, end, color = '#ffffff', opacity = 0.15 }: {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
  opacity?: number
}) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end])

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  const lineObject = useMemo(() => {
    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    )
  }, [geometry, color, opacity])

  return <primitive object={lineObject} />
}

function TravelingPacket({ start, end, color, speed = 1 }: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const t = useRef(Math.random())

  useFrame((_, delta) => {
    t.current = (t.current + delta * speed * 0.3) % 1
    if (meshRef.current) {
      meshRef.current.position.x = start[0] + (end[0] - start[0]) * t.current
      meshRef.current.position.y = start[1] + (end[1] - start[1]) * t.current
      meshRef.current.position.z = start[2] + (end[2] - start[2]) * t.current
    }
  })

  return (
    <mesh ref={meshRef} position={start}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  )
}

function NetworkScene() {
  const isGoldTheme = useIsGoldTheme()
  const palette = useMemo(() => isGoldTheme ? {
    neutral: '#7f6f4e',
    firewall: '#c8922a',
    router: '#d4a030',
    cloud: '#c0904a',
    connection: '#d4a030',
    packet1: '#d4a030',
    packet2: '#c8922a',
    line: '#a98640',
  } : {
    neutral: '#8080a0',
    firewall: '#ffaa00',
    router: '#4f7fff',
    cloud: '#a78bfa',
    connection: '#4f7fff',
    packet1: '#4f7fff',
    packet2: '#00d4ff',
    line: '#8080a0',
  }, [isGoldTheme])

  // Tokyo cluster
  const tokyoNodes: Array<{ pos: [number, number, number]; label: string; color: string }> = [
    { pos: [-2.2, 0.8,  0], label: 'L2 Switch', color: palette.neutral },
    { pos: [-2.2, 0.3,  0], label: 'L3/VLAN',   color: palette.neutral },
    { pos: [-2.2, -0.2, 0], label: 'Firewall',   color: palette.firewall },
    { pos: [-2.2, -0.7, 0], label: 'Router',     color: palette.router },
  ]

  // NYC cluster
  const nycNodes: Array<{ pos: [number, number, number]; label: string; color: string }> = [
    { pos: [2.2, 0.8,  0], label: 'L2 Switch', color: palette.neutral },
    { pos: [2.2, 0.3,  0], label: 'L3/VLAN',   color: palette.neutral },
    { pos: [2.2, -0.2, 0], label: 'Firewall',   color: palette.firewall },
    { pos: [2.2, -0.7, 0], label: 'Router',     color: palette.router },
  ]

  // Cloud node
  const cloudPos: [number, number, number] = [0, -1.3, 0]

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[-3, 2, 2]} color={palette.router} intensity={1.2} />
      <pointLight position={[3, 2, 2]}  color={palette.packet2} intensity={1.2} />
      <pointLight position={[0, -2, 2]} color={palette.cloud} intensity={0.6} />

      {/* Tokyo nodes */}
      {tokyoNodes.map((n, i) => (
        <NetworkNode key={`tk-${i}`} position={n.pos} color={n.color} label={n.label} />
      ))}

      {/* NYC nodes */}
      {nycNodes.map((n, i) => (
        <NetworkNode key={`ny-${i}`} position={n.pos} color={n.color} label={n.label} />
      ))}

      {/* Cloud */}
      <NetworkNode position={cloudPos} color={palette.cloud} label="CLOUD / INTERNET" size={0.18} />

      {/* Tokyo internal connections */}
      {tokyoNodes.slice(0, -1).map((n, i) => (
        <ConnectionLine key={`tk-link-${i}`} start={n.pos} end={tokyoNodes[i + 1].pos} color={palette.line} opacity={0.2} />
      ))}

      {/* NYC internal connections */}
      {nycNodes.slice(0, -1).map((n, i) => (
        <ConnectionLine key={`ny-link-${i}`} start={n.pos} end={nycNodes[i + 1].pos} color={palette.line} opacity={0.2} />
      ))}

      {/* WAN link — routers */}
      <ConnectionLine start={[-2.2, -0.7, 0]} end={[2.2, -0.7, 0]} color={palette.connection} opacity={0.15} />

      {/* Cloud connections */}
      <ConnectionLine start={[-2.2, -0.7, 0]} end={cloudPos} color={palette.cloud} opacity={0.1} />
      <ConnectionLine start={[2.2, -0.7, 0]}  end={cloudPos} color={palette.cloud} opacity={0.1} />

      {/* Traveling packets */}
      <TravelingPacket start={[-2.2, -0.7, 0]} end={[2.2, -0.7, 0]}  color={palette.packet1} speed={0.9} />
      <TravelingPacket start={[2.2, -0.7, 0]}  end={[-2.2, -0.7, 0]} color={palette.packet2} speed={0.7} />
      <TravelingPacket start={[-2.2, -0.7, 0]} end={cloudPos}         color={palette.cloud} speed={0.6} />
    </>
  )
}

export function Network3D() {
  return (
    <div
      style={{
        width: '100%',
        height: '320px',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'var(--bg2)',
        border: '1px solid var(--line)',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
        <NetworkScene />
      </Canvas>
    </div>
  )
}
