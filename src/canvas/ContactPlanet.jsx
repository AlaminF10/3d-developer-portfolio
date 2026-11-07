import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';

export default function ContactPlanet({ quality }) {
  const ring = useRef();
  const moon = useRef();
  const still = Boolean(quality) && quality.floatSpeed === 0;
  const high = Boolean(quality) && quality.name === 'high';

  useFrame(({ clock }) => {
    if (still) return;
    const t = clock.elapsedTime;
    if (ring.current) ring.current.rotation.z = t * 0.15;
    if (moon.current) {
      moon.current.position.set(
        Math.cos(t * 0.6) * 2.6,
        Math.sin(t * 0.6) * 0.5,
        Math.sin(t * 0.6) * 2.6,
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 3, 5]} intensity={2.2} />
      <pointLight
        position={[-4, -2, -2]}
        intensity={14}
        distance={12}
        color="#22d3ee"
      />

      <Float
        speed={still ? 0 : 1.2}
        floatIntensity={still ? 0 : 0.8}
        rotationIntensity={0.2}
      >
        <mesh>
          <sphereGeometry args={[1.45, 64, 64]} />
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#3b0764"
            emissiveIntensity={0.5}
            roughness={0.25}
            metalness={0.3}
            distort={still ? 0 : 0.28}
            speed={1.6}
          />
        </mesh>

        <group rotation={[1.2, 0.2, 0]}>
          <mesh ref={ring}>
            <torusGeometry args={[2.15, 0.035, 16, 160]} />
            <meshBasicMaterial color="#22d3ee" toneMapped={false} />
          </mesh>
          <mesh>
            <torusGeometry args={[2.45, 0.012, 16, 160]} />
            <meshBasicMaterial
              color="#a78bfa"
              transparent
              opacity={0.6}
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>

      <mesh ref={moon} position={[2.6, 0, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#e2e8f0"
          emissive="#94a3b8"
          emissiveIntensity={0.3}
        />
      </mesh>

      <Sparkles
        count={high ? 80 : 30}
        scale={7}
        size={2}
        speed={0.25}
        color="#a5f3fc"
      />
    </>
  );
}
