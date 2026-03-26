"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

function FloatingCoin({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function FloatingSphere({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </Float>
  )
}

function FloatingBook({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position} rotation={[0.2, 0.5, 0.1]}>
        <mesh>
          <boxGeometry args={[0.8, 1, 0.15]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        {/* Pages */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.75, 0.95, 0.12]} />
          <meshStandardMaterial color="#fafafa" />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingIsland({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
      <group position={position}>
        {/* Main island body */}
        <mesh>
          <cylinderGeometry args={[1.5, 1, 0.8, 8]} />
          <meshStandardMaterial color="#6b7280" roughness={0.8} />
        </mesh>
        {/* Grass top */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.1, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.9} />
        </mesh>
        {/* Small details */}
        <mesh position={[0.5, 0.6, 0.3]} scale={0.3}>
          <coneGeometry args={[0.5, 1, 8]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      <FloatingCoin position={[-3, 1, -2]} scale={0.8} />
      <FloatingCoin position={[3, -1, -1]} scale={0.6} />
      <FloatingCoin position={[0, 2, -3]} scale={0.5} />
      
      <FloatingSphere position={[-2, -1.5, -2]} color="#8b5cf6" scale={0.6} />
      <FloatingSphere position={[2.5, 0.5, -1.5]} color="#06b6d4" scale={0.5} />
      
      <FloatingBook position={[-1.5, 0.5, -1]} />
      <FloatingBook position={[2, 1.5, -2]} />
      
      <FloatingIsland position={[0, -2, -4]} />
      
      <Environment preset="sunset" />
    </>
  )
}

export function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function HeroThreeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          <Float speed={2} rotationIntensity={0.5}>
            <group position={[3, 0, 0]}>
              {/* Tree with coins */}
              <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
                <meshStandardMaterial color="#92400e" roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#22c55e" roughness={0.8} />
              </mesh>
              {/* Coins on tree */}
              <FloatingCoin position={[0.8, 0.8, 0]} scale={0.3} />
              <FloatingCoin position={[-0.6, 0.5, 0.5]} scale={0.25} />
              <FloatingCoin position={[0.3, 1.2, -0.3]} scale={0.2} />
            </group>
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.3}>
            <group position={[-3, -0.5, 0]}>
              {/* Trophy */}
              <mesh>
                <cylinderGeometry args={[0.3, 0.4, 0.8, 16]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          </Float>
          
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}
