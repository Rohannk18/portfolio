'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingNodesProps {
  mouse: { normalizedX: number; normalizedY: number };
}

export function FloatingNodes({ mouse }: FloatingNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const node1Ref = useRef<THREE.Mesh>(null);
  const node2Ref = useRef<THREE.Mesh>(null);
  const node3Ref = useRef<THREE.Mesh>(null);
  const node4Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Parallax damping to mouse position
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.normalizedX * 0.35,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.normalizedY * 0.25,
        0.05
      );
    }

    if (node1Ref.current) {
      node1Ref.current.rotation.x += delta * 0.2;
      node1Ref.current.rotation.y += delta * 0.3;
    }
    if (node2Ref.current) {
      node2Ref.current.rotation.y += delta * 0.25;
      node2Ref.current.rotation.z += delta * 0.15;
    }
    if (node3Ref.current) {
      node3Ref.current.rotation.x += delta * 0.18;
      node3Ref.current.rotation.z += delta * 0.22;
    }
    if (node4Ref.current) {
      node4Ref.current.rotation.y += delta * 0.3;
      node4Ref.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node 1: AI / Neural Icosahedron (Top Right) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[3.5, 1.8, -1]}>
        <mesh ref={node1Ref}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial
            color="#818cf8"
            wireframe
            emissive="#4338ca"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      {/* Node 2: Database Cylinder / Backend (Bottom Right) */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2} position={[3.2, -1.8, 0]}>
        <mesh ref={node2Ref}>
          <cylinderGeometry args={[0.7, 0.7, 0.9, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            emissive="#0284c7"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Node 3: Algorithms / Python Torus (Top Left) */}
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.4} position={[-3.8, 2.0, -1.5]}>
        <mesh ref={node3Ref}>
          <torusGeometry args={[0.8, 0.25, 12, 24]} />
          <meshStandardMaterial
            color="#c084fc"
            wireframe
            emissive="#7e22ce"
            emissiveIntensity={0.6}
            transparent
            opacity={0.75}
          />
        </mesh>
      </Float>

      {/* Node 4: Systems / Octahedron (Bottom Left) */}
      <Float speed={1.6} rotationIntensity={0.9} floatIntensity={1.1} position={[-3.5, -1.9, -0.5]}>
        <mesh ref={node4Ref}>
          <octahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color="#34d399"
            wireframe
            emissive="#059669"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
    </group>
  );
}
