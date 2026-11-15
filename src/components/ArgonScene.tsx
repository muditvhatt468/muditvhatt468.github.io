import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

interface SceneProps {
  driveMode: boolean;
  stationIndex: number;
  onSelectProject: (p: ProjectItem) => void;
  onUpdateCoords: (x: number, z: number) => void;
}

const STATIONS = [
  { pos: new THREE.Vector3(0, 4, 14), look: new THREE.Vector3(2, 1, 0) },
  { pos: new THREE.Vector3(-8, 5, 5), look: new THREE.Vector3(0, 1, -8) },
  { pos: new THREE.Vector3(9, 5, -4), look: new THREE.Vector3(0, 1, -10) },
  { pos: new THREE.Vector3(-5, 6, -12), look: new THREE.Vector3(2, 1, -4) },
  { pos: new THREE.Vector3(0, 3.5, 9), look: new THREE.Vector3(3, 1.5, 0) },
];

function WorldContent({ driveMode, stationIndex, onSelectProject, onUpdateCoords }: SceneProps) {
  const coreRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const roverRef = useRef<THREE.Group>(null!);
  const keys = useRef({ w: false, a: false, s: false, d: false });
  const speed = useRef(0);
  const angle = useRef(0);
  const currentLook = useRef(new THREE.Vector3(2, 1, 0));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.w = true;
      if (k === 's' || k === 'arrowdown') keys.current.s = true;
      if (k === 'a' || k === 'arrowleft') keys.current.a = true;
      if (k === 'd' || k === 'arrowright') keys.current.d = true;
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.w = false;
      if (k === 's' || k === 'arrowdown') keys.current.s = false;
      if (k === 'a' || k === 'arrowleft') keys.current.a = false;
      if (k === 'd' || k === 'arrowright') keys.current.d = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.35;
      coreRef.current.rotation.x = t * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.6;
    }

    // Rover WASD movement
    if (keys.current.w) speed.current = Math.min(speed.current + 0.015, 0.26);
    else if (keys.current.s) speed.current = Math.max(speed.current - 0.015, -0.16);
    else speed.current *= 0.92;

    if (keys.current.a) angle.current += 0.045;
    if (keys.current.d) angle.current -= 0.045;

    if (roverRef.current) {
      roverRef.current.rotation.y = angle.current;
      roverRef.current.position.x -= Math.sin(angle.current) * speed.current;
      roverRef.current.position.z -= Math.cos(angle.current) * speed.current;
      onUpdateCoords(roverRef.current.position.x, roverRef.current.position.z);
    }

    const isDrivingNow = driveMode || keys.current.w || keys.current.s || keys.current.a || keys.current.d;
    if (isDrivingNow && roverRef.current) {
      const offset = new THREE.Vector3(
        Math.sin(angle.current) * 7,
        3.8,
        Math.cos(angle.current) * 7
      );
      const target = roverRef.current.position.clone().add(offset);
      state.camera.position.lerp(target, 0.08);
      state.camera.lookAt(
        roverRef.current.position.x,
        roverRef.current.position.y + 0.8,
        roverRef.current.position.z
      );
    } else {
      const st = STATIONS[stationIndex] || STATIONS[0];
      state.camera.position.lerp(st.pos, 0.05);
      currentLook.current.lerp(st.look, 0.06);
      state.camera.lookAt(currentLook.current);
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={['#05050a', 0.018]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[8, 10, 8]} color="#00f0ff" intensity={3} distance={50} />
      <pointLight position={[-10, 8, -10]} color="#8b5cf6" intensity={3} distance={50} />

      <Stars radius={80} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />
      <gridHelper args={[140, 70, '#00f0ff', '#1e293b']} position={[0, -2, 0]} />

      {/* Central Tech Core */}
      <group position={[4, 1.5, 0]}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[2.4, 1]} />
          <meshStandardMaterial color="#00f0ff" wireframe emissive="#00a8b5" emissiveIntensity={0.5} />
        </mesh>
        <mesh ref={innerRef}>
          <octahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} emissive="#4c1d95" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Interactive 3D Project Monoliths */}
      {PROJECTS.map((proj) => (
        <Float key={proj.id} speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
          <group
            position={proj.position3D}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(proj);
            }}
          >
            <mesh>
              <octahedronGeometry args={[1.15, 0]} />
              <meshStandardMaterial color={proj.color} wireframe metalness={0.8} roughness={0.2} />
            </mesh>
            <Text
              position={[0, 1.8, 0]}
              fontSize={0.35}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {proj.title.split(' ')[0]}
            </Text>
          </group>
        </Float>
      ))}

      {/* WASD Drivable Cyber Rover */}
      <group ref={roverRef} position={[-3, -1.65, 6]}>
        <mesh>
          <boxGeometry args={[1.4, 0.45, 2.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} emissive="#00f0ff" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, 0.4, -0.1]}>
          <boxGeometry args={[1.0, 0.35, 1.1]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
        <mesh position={[0, 0.1, -1.12]}>
          <boxGeometry args={[1.2, 0.1, 0.1]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
    </>
  );
}

export default function ArgonScene(props: SceneProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 7, 16], fov: 60 }}>
        <WorldContent {...props} />
      </Canvas>
    </div>
  );
}
