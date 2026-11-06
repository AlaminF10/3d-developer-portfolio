import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { createCodeScreen, TOTAL_CHARS } from './CodeScreenTexture';

// A developer workstation built entirely from primitives — no model file to
// download, so the hero appears instantly even on slow connections.

const COLORS = {
  desk: '#1e1b3a',
  deskEdge: '#2d2858',
  metal: '#3b3b5c',
  dark: '#111127',
  accent: '#8b5cf6',
  cyan: '#22d3ee',
};

function Monitor({ screenTexture }) {
  return (
    <group position={[0, 1.55, -0.35]}>
      {/* bezel */}
      <RoundedBox
        args={[3.3, 2.05, 0.12]}
        radius={0.06}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial
          color={COLORS.dark}
          metalness={0.6}
          roughness={0.35}
        />
      </RoundedBox>
      {/* screen (emissive so it glows) */}
      <mesh position={[0, 0.02, 0.065]}>
        <planeGeometry args={[3.12, 1.9]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>
      {/* stand */}
      <mesh position={[0, -1.3, -0.08]} castShadow>
        <boxGeometry args={[0.18, 0.7, 0.12]} />
        <meshStandardMaterial
          color={COLORS.metal}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, -1.64, 0]} castShadow>
        <boxGeometry args={[1.1, 0.05, 0.6]} />
        <meshStandardMaterial
          color={COLORS.metal}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      {/* screen glow cast onto the desk */}
      <pointLight
        position={[0, 0, 0.8]}
        intensity={4}
        distance={4}
        color={COLORS.accent}
      />
    </group>
  );
}

function Keyboard() {
  const keys = useMemo(() => {
    const out = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 14; c++) {
        out.push([-1.04 + c * 0.16, 0.035, -0.22 + r * 0.15]);
      }
    }
    return out;
  }, []);
  return (
    <group position={[0, -0.08, 0.75]}>
      <RoundedBox
        args={[2.4, 0.06, 0.72]}
        radius={0.03}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={COLORS.dark}
          metalness={0.4}
          roughness={0.5}
        />
      </RoundedBox>
      {keys.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.13, 0.03, 0.12]} />
          <meshStandardMaterial
            color={i % 9 === 0 ? COLORS.accent : '#26264a'}
            emissive={i % 9 === 0 ? COLORS.accent : '#000000'}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function Mug() {
  return (
    <group position={[2.05, 0.09, 0.55]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.18, 0.42, 32]} />
        <meshStandardMaterial color={COLORS.cyan} roughness={0.3} />
      </mesh>
      <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.1, 0.03, 12, 24]} />
        <meshStandardMaterial color={COLORS.cyan} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Plant() {
  return (
    <group position={[-2.1, 0.08, -0.2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.24, 0.18, 0.4, 24]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
      </mesh>
      {[0, 1, 2, 3, 4].map(i => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 1.3) * 0.12,
            0.45 + (i % 2) * 0.15,
            Math.sin(i * 1.3) * 0.12,
          ]}
          rotation={[Math.cos(i) * 0.5, i, Math.sin(i) * 0.5]}
          castShadow
        >
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial
            color={i % 2 ? '#4ade80' : '#22c55e'}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function DeveloperDesk(props) {
  const { texture, type } = useMemo(() => createCodeScreen(), []);
  const typed = useRef(0);
  const last = useRef(0);

  useEffect(() => () => texture.dispose(), [texture]);

  // Type ~28 characters per second, pause, then loop.
  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (t - last.current < 1 / 28) return;
    last.current = t;
    typed.current = typed.current > TOTAL_CHARS + 90 ? 0 : typed.current + 1;
    type(Math.min(typed.current, TOTAL_CHARS), Math.floor(t * 2) % 2 === 0);
  });

  return (
    <group {...props}>
      {/* desk top */}
      <RoundedBox
        args={[5.6, 0.16, 2.4]}
        radius={0.05}
        position={[0, -0.2, 0.15]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={COLORS.desk}
          roughness={0.55}
          metalness={0.2}
        />
      </RoundedBox>
      {/* glowing front edge */}
      <mesh position={[0, -0.2, 1.36]}>
        <boxGeometry args={[5.5, 0.03, 0.01]} />
        <meshBasicMaterial color={COLORS.accent} toneMapped={false} />
      </mesh>
      {/* legs */}
      {[
        [-2.6, 0.95],
        [2.6, 0.95],
        [-2.6, -0.65],
        [2.6, -0.65],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, -1.25, z]} castShadow>
          <boxGeometry args={[0.1, 2, 0.1]} />
          <meshStandardMaterial
            color={COLORS.deskEdge}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}

      <Monitor screenTexture={texture} />
      <Keyboard />
      <Mug />
      <Plant />

      {/* mouse */}
      <RoundedBox
        args={[0.24, 0.08, 0.36]}
        radius={0.04}
        position={[1.6, -0.08, 0.8]}
        castShadow
      >
        <meshStandardMaterial
          color={COLORS.dark}
          metalness={0.4}
          roughness={0.4}
        />
      </RoundedBox>
    </group>
  );
}
