// @ts-nocheck
import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface InteractiveObjectProps {
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number] | number[];
  onClick: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  active?: boolean;
  hoverScale?: number;
  children: React.ReactNode;
}

const InteractiveObject = forwardRef<any, InteractiveObjectProps>(({ 
  name, 
  position, 
  rotation = [0, 0, 0],
  onClick, 
  onPointerOver,
  onPointerOut,
  active = true, 
  hoverScale = 1.05,
  children 
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const internalGroupRef = useRef<THREE.Group>(null);
  const clickGroupRef = useRef<THREE.Group>(null);
  
  useCursor(hovered && active);

  // Synchronize scale based on hover state using GSAP for smooth transitions
  useEffect(() => {
    if (clickGroupRef.current) {
      const targetScale = hovered && active ? hoverScale : 1;
      gsap.to(clickGroupRef.current.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [hovered, active, hoverScale]);

  useFrame((state) => {
    if (hovered && active && internalGroupRef.current) {
      // Subtle float animation when hovered
      const time = state.clock.getElapsedTime();
      internalGroupRef.current.position.y = Math.sin(time * 4) * 0.02;
      internalGroupRef.current.rotation.z = Math.sin(time * 2) * 0.01;
    } else if (internalGroupRef.current) {
      // Reset position when not hovered
      internalGroupRef.current.position.y = THREE.MathUtils.lerp(internalGroupRef.current.position.y, 0, 0.1);
      internalGroupRef.current.rotation.z = THREE.MathUtils.lerp(internalGroupRef.current.rotation.z, 0, 0.1);
    }
  });

  const handleInternalClick = (e: any) => {
    e.stopPropagation();
    if (!active) return;

    // 1. Haptic Feedback (Standard for modern web/mobile interaction)
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(10); // Subtle 10ms pulse
      } catch (err) {
        // Silent catch for browsers that block vibration without user gesture history
      }
    }

    // 2. Visual "Pop" Animation
    if (clickGroupRef.current) {
      gsap.fromTo(clickGroupRef.current.scale, 
        { x: hoverScale * 1.15, y: hoverScale * 1.15, z: hoverScale * 1.15 },
        { 
          x: hoverScale, 
          y: hoverScale, 
          z: hoverScale, 
          duration: 0.4, 
          ease: "elastic.out(1, 0.3)" 
        }
      );
    }

    // 3. Trigger Game Logic
    onClick();
  };

  return (
    <group 
      ref={ref}
      position={position} 
      rotation={rotation as any}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (active) {
          setHovered(true);
          onPointerOver?.();
        }
      }}
      onPointerOut={(e) => {
        setHovered(false);
        onPointerOut?.();
      }}
      onClick={handleInternalClick}
    >
      <group ref={clickGroupRef}>
        <group ref={internalGroupRef}>
          {children}
        </group>
      </group>
    </group>
  );
});

export default InteractiveObject;