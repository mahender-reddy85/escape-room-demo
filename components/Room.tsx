
// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { LevelConfig, GameStatus } from '../types';
import * as THREE from 'three';

const DustParticles = ({ count = 100 }) => {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = Math.random() * 5;
      const z = (Math.random() - 0.5) * 6;
      const speed = 0.001 + Math.random() * 0.002;
      const phase = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, speed, phase });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      const { x, y, z, speed, phase } = particle;
      const t = state.clock.getElapsedTime();
      
      dummy.position.set(
        x + Math.sin(t * 0.5 + phase) * 0.1,
        (y + t * speed) % 5, 
        z + Math.cos(t * 0.5 + phase) * 0.1
      );
      
      const s = 0.005 + Math.sin(t * 2 + phase) * 0.002;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.3} emissive="#ffffff" emissiveIntensity={0.5} />
    </instancedMesh>
  );
};

const Room: React.FC<any> = ({ level, status }) => {
  const overheadLightRef = useRef<any>(null);
  const shelfBooksRef = useRef<any>(null);
  const plantLeavesRef = useRef<any>(null);
  const sphereRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (overheadLightRef.current) {
      overheadLightRef.current.intensity = 1.0 + Math.sin(time * 0.5) * 0.2;
    }

    if (shelfBooksRef.current) {
      shelfBooksRef.current.children.forEach((book, i) => {
        if (book.userData.isBook) {
          book.rotation.z = Math.sin(time * 0.8 + i) * 0.02;
          book.position.y = 0.15 + Math.sin(time * 0.5 + i) * 0.005;
        }
      });
    }

    if (plantLeavesRef.current) {
      plantLeavesRef.current.children.forEach((leaf, i) => {
        leaf.rotation.x = Math.sin(time * 0.6 + i) * 0.15;
        leaf.rotation.z = Math.cos(time * 0.5 + i) * 0.1;
      });
    }

    if (sphereRef.current) {
      const shimmer = 0.4 + Math.sin(time * 3) * 0.3;
      sphereRef.current.material.emissiveIntensity = shimmer;
      sphereRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.01);
    }
  });

  return (
    <group>
      <pointLight ref={overheadLightRef} position={[0, 4.5, 0]} intensity={1} distance={15} color="#ffffff" />
      <DustParticles count={150} />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 2.5, -2.5]}>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-2.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[2.5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Wall Decorations: Tech Panels & Schematics */}
      <group position={[2.38, 2.5, -1]}>
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.8, 1.2]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[-0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.7, 1.1]} />
          <meshStandardMaterial color="#f8fafc" wireframe />
        </mesh>
      </group>

      {/* Framed Schematic (Left Wall) */}
      <group position={[-2.38, 3.2, 1.2]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[1, 0.7]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshStandardMaterial color="#0f172a" emissive="#3b82f6" emissiveIntensity={0.3} wireframe />
        </mesh>
      </group>

      {/* Wall Shelf (Back Wall) */}
      <group position={[-1.2, 2.8, -2.38]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.04, 0.4]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <group ref={shelfBooksRef}>
          <mesh position={[-0.4, 0.15, 0]} rotation={[0, 0.1, 0]} userData={{ isBook: true }}>
            <boxGeometry args={[0.06, 0.3, 0.25]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          <mesh position={[-0.32, 0.15, 0.02]} rotation={[0, -0.05, 0]} userData={{ isBook: true }}>
            <boxGeometry args={[0.08, 0.32, 0.25]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          
          <group position={[0.5, 0, 0.05]}>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.1, 0.08, 0.2, 12]} />
              <meshStandardMaterial color="#a8a29e" />
            </mesh>
            <group ref={plantLeavesRef}>
              <mesh position={[0, 0.25, 0]}>
                <sphereGeometry args={[0.08, 8, 8]} scale={[1, 1.5, 1]} />
                <meshStandardMaterial color="#166534" />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Hanging Cable */}
      <group position={[-2, 5, -2]} rotation={[0, 0, 0.1]}>
        <mesh>
          <cylinderGeometry args={[0.01, 0.01, 2, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.05]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>

      {/* Central Desk */}
      <group position={[0, 0.5, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[1.5, 1.0, 1.5]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[0, 0.51, 0]}>
          <boxGeometry args={[1.6, 0.05, 1.6]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>

        {/* Stack of Papers */}
        <group position={[-0.4, 0.54, -0.2]} rotation={[0, -0.3, 0]}>
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[0, i * 0.005, 0]} rotation={[0, Math.random() * 0.1, 0]}>
              <boxGeometry args={[0.25, 0.002, 0.35]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          ))}
        </group>

        {/* Decorative Desk Objects */}
        <mesh position={[0.4, 0.56, -0.4]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.4]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[-0.5, 0.58, 0.4]} rotation={[0, Math.PI/4, 0]}>
          <coneGeometry args={[0.08, 0.15, 4]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Scattered Tools on Floor */}
      <group position={[-1.5, 0, -1.5]} rotation={[0, 1, 0]}>
        <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        <mesh position={[0.15, 0.01, 0.05]} rotation={[Math.PI / 2, 0, 0.8]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.6} />
        </mesh>
      </group>

      {/* Near-Cabinet Trinket: Metallic Sphere */}
      <mesh ref={sphereRef} position={[-1.2, 0.1, 0.8]} castShadow>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#64748b" metalness={1} roughness={0.1} emissive="#64748b" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default Room;
