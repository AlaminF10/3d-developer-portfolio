import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// 3D tilt on hover that follows the cursor. Pure CSS transforms — cheap.
export default function TiltCard({
  children,
  className = '',
  max = 10,
  ...rest
}) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  });
  const glowX = useTransform(x, v => `${v * 100}%`);
  const glowY = useTransform(y, v => `${v * 100}%`);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        '--gx': glowX,
        '--gy': glowY,
      }}
      className={`group relative transform-3d ${className}`}
      {...rest}
    >
      {/* cursor-following highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--gx) var(--gy), rgb(167 139 250 / 0.14), transparent 45%)',
        }}
      />
      {children}
    </motion.div>
  );
}
