
// @ts-nocheck
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { LevelConfig, GameStatus } from '../types';
import Room from './Room';
import InteractiveObject from './InteractiveObject';
import gsap from 'gsap';
import * as THREE from 'three';

interface GameSceneProps {
  level: LevelConfig;
  status: GameStatus;
  discoveryState: { drawersOpen: boolean[], bookMoved: boolean };
  lampOn: boolean;
  hasHammer: boolean;
  ballBroken: boolean;
  level3ResetTriggered: boolean;
  onObjectClick: (name: string, index?: number) => void;
}

const GameScene: React.FC<GameSceneProps> = ({ 
  level, status, discoveryState, lampOn, hasHammer, ballBroken, level3ResetTriggered, onObjectClick 
}) => {
  const { mouse, viewport, camera } = useThree();
  const tvScreenMaterialRef = useRef<any>(null);
  const tvGroupRef = useRef<THREE.Group>(null);
  const drawerRefs = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)];
  const ballRef = useRef<THREE.Group>(null);
  const hiddenBookRef = useRef<THREE.Group>(null);
  const hologramRef = useRef<THREE.Group>(null);
  const [isDraggingBall, setIsDraggingBall] = useState(false);

  // States for decorative interactive objects
  const [gaugePulse, setGaugePulse] = useState(0);
  const [tabletScreenOn, setTabletScreenOn] = useState(false);

  // Randomized shelf logic
  const keyDrawerIndex = useMemo(() => {
    if (level.id === 1) return 1; 
    return (level.id + 2) % 3;
  }, [level.id]);

  const keyPositionOffset = useMemo(() => {
    const offsets = [
      [-0.3, 0.05, -0.4], 
      [0.2, 0.05, 0.4],   
      [-0.2, 0.05, 0.35]  
    ];
    return offsets[level.id % 3];
  }, [level.id]);

  // TV Animations
  useEffect(() => {
    if (!tvScreenMaterialRef.current) return;
    const themeColor = new THREE.Color(level.themeColor);
    if (status === 'EXPLORING') {
      gsap.to(tvScreenMaterialRef.current.color, { r: themeColor.r * 0.5, g: themeColor.g * 0.5, b: themeColor.b * 0.5, duration: 0.5 });
      gsap.to(tvScreenMaterialRef.current.emissive, { r: themeColor.r, g: themeColor.g, b: themeColor.b, duration: 0.5 });
    } else if (status === 'QUESTIONING' || status === 'PIN_ENTRY') {
      gsap.to(tvScreenMaterialRef.current.color, { r: 1, g: 1, b: 1, duration: 0.3 });
      gsap.to(tvScreenMaterialRef.current.emissive, { r: 1, g: 1, b: 1, duration: 0.3 });
    } else {
      gsap.to(tvScreenMaterialRef.current.color, { r: 0.1, g: 0.1, b: 0.1, duration: 0.8 });
      gsap.to(tvScreenMaterialRef.current.emissive, { r: 0, g: 0, b: 0, duration: 0.8 });
    }

    if (level.id === 4 && status === 'KEY_REVEALED' && tvGroupRef.current) {
      gsap.to(tvGroupRef.current.position, { x: 1.2, duration: 1.5, ease: "power3.inOut" });
    } else if (tvGroupRef.current) {
      gsap.to(tvGroupRef.current.position, { x: 0, duration: 1, ease: "power3.out" });
    }
  }, [status, level.themeColor, level.id]);

  useEffect(() => {
    discoveryState.drawersOpen.forEach((isOpen, i) => {
      const drawer = drawerRefs[i].current;
      if (drawer) {
        gsap.to(drawer.position, {
          z: isOpen ? 0.82 : 0,
          duration: isOpen ? 1.4 : 1.1,
          ease: isOpen ? "back.out(1.1)" : "expo.inOut",
        });
      }
    });
  }, [discoveryState.drawersOpen]);

  // Book mechanism Level 2
  useEffect(() => {
    if (hiddenBookRef.current) {
      gsap.to(hiddenBookRef.current.position, {
        x: discoveryState.bookMoved ? 0.4 : 0,
        z: discoveryState.bookMoved ? 0.4 : 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
  }, [discoveryState.bookMoved]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (tvScreenMaterialRef.current && (status === 'EXPLORING' || status === 'QUESTIONING')) {
      tvScreenMaterialRef.current.emissiveIntensity = 1 + Math.sin(time * 5) * 0.4;
    }

    // Ball dragging Level 2
    if (isDraggingBall && ballRef.current) {
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.y / dir.y;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      ballRef.current.position.x = THREE.MathUtils.clamp(pos.x, -2.4, 2.4);
      ballRef.current.position.z = THREE.MathUtils.clamp(pos.z, -2.4, 2.4);
      ballRef.current.position.y = 0.15;
    }
    
    setGaugePulse(Math.sin(time * 5) * 0.1);

    if (hologramRef.current) {
      hologramRef.current.rotation.y = time * 0.8;
      hologramRef.current.position.y = Math.sin(time * 2) * 0.05 + 0.3;
    }
  });

  return (
    <group>
      <Room level={level} status={status} />

      {/* TV TERMINAL */}
      <group ref={tvGroupRef} position={[0, 1.8, -2.4]}>
        <InteractiveObject name="TV" position={[0, 0, 0]} onClick={() => onObjectClick('TV')} active={true} hoverScale={1.02}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 1.1, 0.1]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.055]}>
            <planeGeometry args={[1.7, 1.0]} />
            <meshStandardMaterial ref={tvScreenMaterialRef} color="#000" emissive="#000" />
          </mesh>
          <mesh position={[0, -0.6, -0.05]}>
            <boxGeometry args={[0.4, 0.1, 0.05]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </InteractiveObject>
      </group>

      {/* LEVEL 3 SPECIAL KEY ON TERMINAL */}
      {level.id === 3 && (
        <group position={[0, 2.3, -2.4]}>
          <InteractiveObject name="KEY" position={[0,0,0]} onClick={() => onObjectClick('KEY')} active={status === 'KEY_REVEALED'} hoverScale={2}>
            <mesh castShadow>
              <torusGeometry args={[0.15, 0.04]} />
              <meshStandardMaterial color="#0f172a" metalness={1} roughness={0.5} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.04, 0.4, 0.04]} />
              <meshStandardMaterial color="#0f172a" metalness={1} />
            </mesh>
          </InteractiveObject>
        </group>
      )}

      {/* BED */}
      <group position={[1.5, 0, -1.8]}>
        <InteractiveObject name="BED" position={[0, 0, 0]} onClick={() => onObjectClick('BED')} hoverScale={1.01}>
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.2, 2.2]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[1.15, 0.25, 2.15]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0, 0.45, -0.85]} castShadow>
            <boxGeometry args={[0.8, 0.15, 0.4]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, 0.43, 0.3]} castShadow>
            <boxGeometry args={[1.2, 0.05, 1.4]} />
            <meshStandardMaterial color={level.themeColor} transparent opacity={0.9} />
          </mesh>
        </InteractiveObject>
      </group>

      {/* MECHANICAL KEYBOARD */}
      <group position={[0, 1.05, 0.2]}>
        <InteractiveObject name="KEYBOARD" position={[0, 0, 0]} onClick={() => onObjectClick('KEYBOARD')} onPointerOver={() => onObjectClick('KEYBOARD')} hoverScale={1.05}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.02, 0.2]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <group position={[-0.2, 0.02, -0.07]}>
            {[...Array(5)].map((_, i) => (
              [...Array(3)].map((_, j) => (
                <mesh key={`${i}-${j}`} position={[i * 0.1, 0.01, j * 0.07]}>
                  <boxGeometry args={[0.08, 0.02, 0.05]} />
                  <meshStandardMaterial color={lampOn ? level.themeColor : "#334155"} emissive={lampOn ? level.themeColor : "#000"} emissiveIntensity={0.5} />
                </mesh>
              ))
            ))}
          </group>
        </InteractiveObject>
      </group>

      {/* HOLOGRAM PROJECTOR */}
      <group position={[1.8, 0.3, 1.2]}>
        <InteractiveObject name="HOLOGRAM" position={[0, 0, 0]} onClick={() => onObjectClick('HOLOGRAM')} hoverScale={1.1}>
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.05, 24]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          <group ref={hologramRef}>
             <mesh>
               <boxGeometry args={[0.2, 0.2, 0.2]} />
               <meshStandardMaterial color={level.themeColor} wireframe transparent opacity={0.6} emissive={level.themeColor} emissiveIntensity={2} />
             </mesh>
             <pointLight color={level.themeColor} intensity={0.5} distance={1} />
          </group>
        </InteractiveObject>
      </group>

      {/* SERVER MODULE */}
      <group position={[-2.2, 0, 1.8]}>
        <InteractiveObject name="SERVER_MODULE" position={[0, 0.4, 0]} onClick={() => onObjectClick('SERVER_MODULE')} hoverScale={1.03}>
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.8, 0.4]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0.201, 0.3, 0]}>
            <planeGeometry args={[0.05, 0.05]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={Math.random() > 0.5 ? 2 : 0.5} />
          </mesh>
          <mesh position={[0.201, 0.2, 0]}>
            <planeGeometry args={[0.05, 0.05]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={Math.random() > 0.5 ? 2 : 0.5} />
          </mesh>
          <mesh position={[0.201, 0.1, 0]}>
            <planeGeometry args={[0.05, 0.05]} />
            <meshStandardMaterial color="#f87171" emissive="#f87171" emissiveIntensity={0.2} />
          </mesh>
        </InteractiveObject>
      </group>

      {/* LEVEL 4 KEY */}
      {level.id === 4 && (
        <group position={[0, 1.5, -2.1]} scale={0.06} rotation={[0, Math.PI/4, Math.PI/2]}>
          <InteractiveObject name="KEY" position={[0,0,0]} onClick={() => onObjectClick('KEY')} active={status === 'KEY_REVEALED'} hoverScale={1.5}>
            <mesh castShadow>
              <torusGeometry args={[0.2, 0.05]} />
              <meshStandardMaterial color="#0f172a" metalness={1} roughness={0.5} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <boxGeometry args={[0.05, 0.5, 0.05]} />
              <meshStandardMaterial color="#0f172a" metalness={1} />
            </mesh>
          </InteractiveObject>
        </group>
      )}

      {/* HAMMER TOOL LEVEL 5 */}
      {level.id === 5 && !hasHammer && (
        <group position={[-1.2, 2.8, -2.38]}>
           <InteractiveObject name="HAMMER" position={[0, 0.1, 0]} rotation={[Math.PI/2, 0, 0.5]} onClick={() => onObjectClick('HAMMER')} hoverScale={1.2}>
            <group scale={0.4}>
              <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.02, 0.02, 0.6, 12]} /><meshStandardMaterial color="#78350f" /></mesh>
              <mesh position={[0, 0.5, 0]} rotation={[0,0,Math.PI/2]}><boxGeometry args={[0.1, 0.25, 0.1]} /><meshStandardMaterial color="#475569" metalness={0.8} /></mesh>
            </group>
          </InteractiveObject>
        </group>
      )}

      {/* METALLIC BALL */}
      <group 
        ref={ballRef} 
        position={[-1.2, 0.15, 0.8]} 
        onPointerDown={(e) => { e.stopPropagation(); setIsDraggingBall(true); }}
        onPointerUp={(e) => { e.stopPropagation(); setIsDraggingBall(false); }}
      >
        <InteractiveObject name="BALL" position={[0,0,0]} onClick={() => onObjectClick('BALL')} hoverScale={1.1}>
          <mesh castShadow>
            <sphereGeometry args={[ballBroken ? 0.01 : 0.15, 32, 32]} />
            <meshStandardMaterial color="#64748b" metalness={1} roughness={0.1} />
          </mesh>
          {ballBroken && <group>
              <mesh position={[0.05,0,0.05]} rotation={[0.4, 0.4, 0]}><sphereGeometry args={[0.04, 8, 8, 0, Math.PI]} /><meshStandardMaterial color="#64748b" metalness={1} /></mesh>
              <mesh position={[-0.05,0,-0.05]} rotation={[-0.4, 0.8, 0]}><sphereGeometry args={[0.05, 8, 8, 0, Math.PI]} /><meshStandardMaterial color="#64748b" metalness={1} /></mesh>
            </group>}
        </InteractiveObject>
      </group>

      {/* SPECIAL BOOK - Available in all levels */}
      <group position={[0.4, 1.05, -0.4]}>
        <InteractiveObject name="HIDDEN_BOOK" position={[0, 0.05, 0]} onClick={() => onObjectClick('HIDDEN_BOOK')} onPointerOver={() => onObjectClick('HIDDEN_BOOK')} ref={hiddenBookRef} hoverScale={1.1}>
          <mesh castShadow><boxGeometry args={[0.3, 0.1, 0.4]} /><meshStandardMaterial color="#b91c1c" /></mesh>
        </InteractiveObject>
      </group>

      {/* STACK OF PAPERS */}
      <group position={[-0.4, 1.05, -0.2]} rotation={[0, -0.3, 0]}>
        <InteractiveObject name="PAPER" position={[0, 0, 0]} onClick={() => onObjectClick('PAPER')} onPointerOver={() => onObjectClick('PAPER')} hoverScale={1.05}>
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[0, i * 0.005, 0]} rotation={[0, Math.random() * 0.1, 0]}>
              <boxGeometry args={[0.25, 0.002, 0.35]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          ))}
        </InteractiveObject>
      </group>

      {/* CABINET SYSTEM */}
      <group position={[-2, 0, 0]}>
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.5, 1.3]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.2} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <group key={i} position={[0.1, 1.05 - (i * 0.45), 0]}>
            <InteractiveObject name={`DRAWER_${i}`} position={[0, 0, 0]} onClick={() => onObjectClick(`DRAWER_${i}`, i)} active={status === 'CABINET_UNLOCKED' || status === 'KEY_REVEALED'}>
              <group ref={drawerRefs[i]}>
                <mesh position={[0.31, 0, 0]} castShadow><boxGeometry args={[0.04, 0.38, 1.2]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
                <mesh position={[0.34, 0, 0]}><boxGeometry args={[0.02, 0.04, 0.2]} /><meshStandardMaterial color="#94a3b8" /></mesh>
                <mesh position={[-0.15, -0.1, 0]}><boxGeometry args={[0.65, 0.15, 1.1]} /><meshStandardMaterial color="#f1f5f9" /></mesh>
                {/* Regular level keys in drawers */}
                {level.id !== 4 && level.id !== 2 && level.id !== 3 && level.id !== 5 && i === keyDrawerIndex && (
                  <group position={keyPositionOffset as any} scale={0.06} rotation={[0, Math.PI/4, Math.PI/2]}>
                    <InteractiveObject name="KEY" position={[0,0,0]} onClick={() => onObjectClick('KEY')} active={discoveryState.drawersOpen[i] && status === 'KEY_REVEALED'} hoverScale={2.5}>
                      <mesh castShadow><torusGeometry args={[0.2, 0.05]} /><meshStandardMaterial color="#0f172a" /></mesh>
                      <mesh position={[0, -0.3, 0]}><boxGeometry args={[0.05, 0.5, 0.05]} /><meshStandardMaterial color="#0f172a" /></mesh>
                    </InteractiveObject>
                  </group>
                )}
              </group>
            </InteractiveObject>
          </group>
        ))}
      </group>

      {/* LEVEL 5 RIGHT WALL SHELF KEY */}
      {level.id === 5 && (
        <group position={[2.35, 2.5, 0.5]}>
          <mesh castShadow><boxGeometry args={[0.3, 0.02, 0.6]} /><meshStandardMaterial color="#94a3b8" /></mesh>
          <group position={[0, 0.1, 0]} scale={0.08} rotation={[0, Math.PI/2, 0]}>
            <InteractiveObject name="KEY" position={[0,0,0]} onClick={() => onObjectClick('KEY')} active={status === 'KEY_REVEALED'} hoverScale={2}>
              <mesh castShadow><torusGeometry args={[0.2, 0.05]} /><meshStandardMaterial color="#0f172a" /></mesh>
              <mesh position={[0, -0.3, 0]}><boxGeometry args={[0.05, 0.5, 0.05]} /><meshStandardMaterial color="#0f172a" /></mesh>
            </InteractiveObject>
          </group>
        </group>
      )}

      {/* DESK LAMP */}
      <InteractiveObject name="DESK_LAMP" position={[0.5, 1.05, 0.4]} onClick={() => onObjectClick('DESK_LAMP')} hoverScale={1.05}>
        <group scale={0.8}>
          <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.1, 0.1, 0.04, 16]} /><meshStandardMaterial color="#475569" /></mesh>
          <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.01, 0.01, 0.5, 8]} /><meshStandardMaterial color="#64748b" /></mesh>
          <mesh position={[0, 0.5, 0]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.15, 0.2, 16]} />
            <meshStandardMaterial color={lampOn ? "#fef08a" : "#94a3b8"} emissive={lampOn ? "#facc15" : "#000"} emissiveIntensity={lampOn ? 2 : 0} />
          </mesh>
          {lampOn && <pointLight position={[0, 0.4, 0.1]} color="#fef08a" intensity={2} distance={3} />}
        </group>
      </InteractiveObject>

      {/* SPEAKER */}
      <group position={[1.0, 0.9, -1.0]}>
        <InteractiveObject name="SPEAKER" position={[0, 0, 0]} onClick={() => onObjectClick('SPEAKER')} onPointerOver={() => onObjectClick('SPEAKER')} hoverScale={1.1}>
          <mesh castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.5, 16]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.02, 16]} />
            <meshStandardMaterial color="#7f1d1d" />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
            <meshStandardMaterial color="#991b1b" />
          </mesh>
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </InteractiveObject>
      </group>

      {/* BOARD */}
      <group position={[-1.5, 1.2, -1.8]}>
        <InteractiveObject name="BOARD" position={[0, 0, 0]} onClick={() => onObjectClick('BOARD')} onPointerOver={() => onObjectClick('BOARD')} hoverScale={1.05}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.6, 0.02]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0, 0.011]}>
            <planeGeometry args={[0.75, 0.55]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </InteractiveObject>
      </group>

      {/* PHONE */}
      <InteractiveObject name="PHONE" position={[-0.4, 1.03, 0.5]} rotation={[-Math.PI / 2, 0, -0.2]} onClick={() => onObjectClick('PHONE')} onPointerOver={() => onObjectClick('PHONE')} hoverScale={1.1}>
        <group scale={0.6}>
          <mesh castShadow><boxGeometry args={[0.2, 0.4, 0.02]} /><meshStandardMaterial color="#0f172a" /></mesh>
          <mesh position={[0, 0, 0.011]}>
            <planeGeometry args={[0.18, 0.36]} />
            <meshStandardMaterial color={lampOn ? "#334155" : "#000"} emissive={lampOn ? "#60a5fa" : "#000"} emissiveIntensity={lampOn ? 0.8 : 0} />
          </mesh>
        </group>
      </InteractiveObject>

      <InteractiveObject name="TABLET" position={[1.5, 0.31, 1.1]} rotation={[-Math.PI / 2, 0, 0.5]} onClick={() => onObjectClick('TABLET')} hoverScale={1.08}>
        <group>
          <mesh castShadow><boxGeometry args={[0.4, 0.3, 0.02]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0, 0, 0.011]}><planeGeometry args={[0.36, 0.26]} /><meshStandardMaterial color={tabletScreenOn ? level.themeColor : "#0f172a"} emissive={tabletScreenOn ? level.themeColor : "#000"} emissiveIntensity={tabletScreenOn ? 1.5 : 0} /></mesh>
        </group>
      </InteractiveObject>

      <InteractiveObject name="WALL_GAUGE" position={[2.4, 2.8, 1.5]} rotation={[0, -Math.PI / 2, 0]} onClick={() => onObjectClick('WALL_GAUGE')} hoverScale={1.1}>
        <group>
          <mesh><cylinderGeometry args={[0.2, 0.2, 0.05, 32]} rotation={[Math.PI/2, 0, 0]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
          <mesh position={[0, 0, 0.03]} rotation={[0, 0, Math.PI / 4 + gaugePulse]}><boxGeometry args={[0.01, 0.15, 0.01]} /><meshStandardMaterial color="#ef4444" /></mesh>
        </group>
      </InteractiveObject>

      <InteractiveObject name="MUG" position={[1.5, 1.05, -1.2]} onClick={() => onObjectClick('MUG')}>
        <mesh castShadow><cylinderGeometry args={[0.05, 0.05, 0.12, 32]} /><meshStandardMaterial color="#f8fafc" /></mesh>
      </InteractiveObject>
    </group>
  );
};

export default GameScene;
