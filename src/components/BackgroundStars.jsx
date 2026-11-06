import SceneShell from '../canvas/SceneShell';
import StarField from '../canvas/StarField';

// Fixed full-screen star field behind every section.
export default function BackgroundStars() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* soft colour glows so the page isn't flat black */}
      <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="absolute -right-40 top-[45%] h-[460px] w-[460px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <SceneShell eager camera={{ position: [0, 0, 1], fov: 75 }}>
        {quality => <StarField count={quality.starCount} />}
      </SceneShell>
    </div>
  );
}
