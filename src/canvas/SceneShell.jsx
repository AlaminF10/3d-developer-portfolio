import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import CanvasLoader from "./CanvasLoader";
import { useWebGLSupport } from "../hooks/useWebGLSupport";
import { useDeviceQuality } from "../hooks/useDeviceQuality";

// FACADE + PROXY
// Every 3D scene in the site goes through this one component. It hides:
//   • WebGL detection + 2D fallback
//   • error boundary
//   • quality profile (Strategy) → dpr / antialias / shadows
//   • lazy mounting: the Canvas is created only when the section scrolls
//     near the viewport, and its render loop pauses when off-screen.
// Sections just write: <SceneShell fallback={...}>{scene}</SceneShell>
export default function SceneShell({
  children,
  fallback = null,
  camera = { position: [0, 0, 6], fov: 45 },
  className = "",
  eager = false,
  ...canvasProps
}) {
  const hostRef = useRef(null);
  const [mounted, setMounted] = useState(eager);
  const [visible, setVisible] = useState(eager);
  const webgl = useWebGLSupport();
  const quality = useDeviceQuality();

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "250px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={`relative h-full w-full ${className}`}>
      {!webgl ? (
        fallback
      ) : mounted ? (
        <CanvasErrorBoundary fallback={fallback}>
          <Canvas
            frameloop={visible ? "always" : "never"}
            dpr={quality.dpr}
            shadows={quality.shadows}
            camera={camera}
            gl={{ antialias: quality.antialias, alpha: true, powerPreference: "high-performance" }}
            {...canvasProps}
          >
            <Suspense fallback={<CanvasLoader />}>{children(quality)}</Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      ) : null}
    </div>
  );
}