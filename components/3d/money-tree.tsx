"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

function Coin({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8
    }
  })
  
  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef} scale={scale}>
          <cylinderGeometry args={[0.15, 0.15, 0.03, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Coin emboss - Rp symbol */}
        <mesh position={[0, 0.016, 0]} scale={scale}>
          <cylinderGeometry args={[0.08, 0.08, 0.01, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

export function MoneyTree({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  const treeRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })
  
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={treeRef} position={position} scale={scale}>
        {/* Floating Island Base */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[1.2, 0.8, 0.8, 8]} />
          <meshStandardMaterial color="#4a5568" roughness={0.9} />
        </mesh>
        {/* Grass Layer */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[1.25, 1.2, 0.15, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.8} />
        </mesh>
        
        {/* Tree Trunk */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.12, 0.18, 1, 8]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} />
        </mesh>
        
        {/* Tree Crown - Multiple Layers */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </mesh>
        <mesh position={[0.3, 0.7, 0.2]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#22c55e" roughness={0.8} />
        </mesh>
        <mesh position={[-0.3, 0.6, -0.2]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#15803d" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#22c55e" roughness={0.8} />
        </mesh>
        
        {/* Coins on Tree */}
        <Coin position={[0.5, 0.8, 0.3]} scale={0.8} />
        <Coin position={[-0.4, 0.6, 0.4]} scale={0.7} />
        <Coin position={[0.3, 1.0, -0.2]} scale={0.6} />
        <Coin position={[-0.2, 0.4, 0.5]} scale={0.75} />
        <Coin position={[0.4, 0.3, -0.4]} scale={0.65} />
        <Coin position={[0, 1.1, 0.1]} scale={0.5} />
        
        {/* Books at base */}
        <group position={[0.6, -0.6, 0.3]} rotation={[0, 0.5, 0.1]}>
          <mesh>
            <boxGeometry args={[0.3, 0.22, 0.05]} />
            <meshStandardMaterial color="#8b5cf6" />
          </mesh>
        </group>
        <group position={[0.55, -0.55, 0.35]} rotation={[0.1, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[0.28, 0.2, 0.04]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
        </group>
      </group>
    </Float>
  )
}
