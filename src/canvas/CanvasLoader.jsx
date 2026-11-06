import { Html, useProgress } from '@react-three/drei';

export default function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-ink-200">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-400" />
        <span className="font-mono text-sm">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}
