'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticlesField } from './ParticlesField';
import { FloatingNodes } from './FloatingNodes';
import { useMousePosition } from '@/hooks/useMousePosition';

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const mouse = useMousePosition();

  useEffect(() => {
    setMounted(true);
    // Detect mobile or low power devices
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) {
      setIsLowPower(true);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent" />
    );
  }

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-sky-500/10 blur-[80px] pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={isLowPower ? 1 : [1, 2]}
        gl={{
          antialias: !isLowPower,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#818cf8" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#38bdf8" />

        <Suspense fallback={null}>
          <ParticlesField count={isLowPower ? 120 : 260} />
          {!isLowPower && <FloatingNodes mouse={mouse} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
