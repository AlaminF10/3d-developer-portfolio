import { profile } from '../data/profile';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-semibold text-white">
            {profile.name}
          </p>
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} · Built with React, Three.js & React
            Three Fiber
          </p>
        </div>
        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
