import { useEffect } from 'react';
import {
  ContactShadows,
  Float,
  PresentationControls,
  Sparkles,
} from '@react-three/drei';
import DeveloperDesk from './models/DeveloperDesk';
import { useAppStore } from '../store/useAppStore';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function HeroScene({ quality }) {
  const setSceneReady = useAppStore(s => s.setSceneReady);
  const isSmall = useMediaQuery('(max-width: 768px)');

  useEffect(() => setSceneReady(true), [setSceneReady]);

  const scale = isSmall ? 0.62 : 0.9;
  const position = isSmall ? [0, -0.6, 0] : [0, -0.35, 0];

  return (
    <>
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#a78bfa', '#0b0b1e', 0.6]} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.6}
        castShadow={quality.shadows}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        position={[-5, 2, -2]}
        intensity={12}
        distance={12}
        color="#22d3ee"
      />

      {/* Drag to rotate; snaps back to the default angle when released. */}
      <PresentationControls
        global={false}
        cursor
        snap
        speed={1.4}
        rotation={[0.18, -0.45, 0]}
        polar={[-0.15, 0.25]}
        azimuth={[-0.7, 0.7]}
      >
        <Float
          speed={quality.floatSpeed}
          rotationIntensity={quality.floatSpeed ? 0.25 : 0}
          floatIntensity={quality.floatSpeed ? 0.6 : 0}
        >
          <DeveloperDesk scale={scale} position={position} />
        </Float>
      </PresentationControls>

      <Sparkles
        count={quality.name === 'high' ? 60 : 25}
        scale={[8, 4, 4]}
        size={2.2}
        speed={0.3}
        color="#c4b5fd"
      />

      {quality.shadows && (
        <ContactShadows
          position={[0, -2.25, 0]}
          opacity={0.55}
          scale={12}
          blur={2.6}
          far={4}
        />
      )}
    </>
  );
}
