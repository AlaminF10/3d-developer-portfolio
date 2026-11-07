import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Skill names placed evenly on a sphere (Fibonacci lattice). The globe
// spins slowly and follows the mouse; labels on the far side fade out.

function fibonacciSphere(n, radius) {
  const pts = [];
  const offset = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * inc;
    pts.push(
      new THREE.Vector3(
        Math.cos(phi) * r * radius,
        y * radius,
        Math.sin(phi) * r * radius,
      ),
    );
  }
  return pts;
}

const tmp = new THREE.Vector3();

function Tag({ position, name, color }) {
  const anchor = useRef();
  const label = useRef();

  useFrame(() => {
    if (!anchor.current || !label.current) return;
    anchor.current.getWorldPosition(tmp);
    // 1 when facing the camera, ~0 at the back
    const facing = THREE.MathUtils.clamp((tmp.z + 2.4) / 4.8, 0, 1);
    label.current.style.opacity = String(0.12 + facing * 0.88);
    label.current.style.transform = `scale(${0.7 + facing * 0.35})`;
  });

  return (
    <group ref={anchor} position={position}>
      <Html center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
        <div
          ref={label}
          className="whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs font-medium backdrop-blur-sm"
          style={{
            color,
            borderColor: `${color}55`,
            background: 'rgba(10,10,30,0.55)',
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

export default function SkillsGlobe({ skills, radius = 2.4, quality }) {
  const group = useRef();
  const points = useMemo(
    () => fibonacciSphere(skills.length, radius),
    [skills.length, radius],
  );
  const still = quality && quality.floatSpeed === 0;

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += still ? 0 : delta * 0.18;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.35,
      0.05,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -pointer.x * 0.15,
      0.05,
    );
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[radius * 0.62, 2]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 0.3, 32, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
      <pointLight intensity={6} distance={6} color="#22d3ee" />
      {skills.map((s, i) => (
        <Tag key={s.name} position={points[i]} name={s.name} color={s.color} />
      ))}
    </group>
  );
}
