import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { random } from 'maath';

// Slowly drifting star field used as a fixed background behind the whole page.
export default function StarField({ count = 5000 }) {
  const ref = useRef();
  const positions = useMemo(
    () => random.inSphere(new Float32Array(count * 3), { radius: 1.3 }),
    [count],
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 14;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#d8ccff"
          size={0.0026}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
