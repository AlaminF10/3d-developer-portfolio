import { motion } from 'framer-motion';
import { HiArrowDown, HiDownload, HiLocationMarker } from 'react-icons/hi';
import SceneShell from '../canvas/SceneShell';
import HeroScene from '../canvas/HeroScene';
import TypingText from '../components/TypingText';
import SocialLinks from '../components/SocialLinks';
import { profile } from '../data/profile';
import { fadeUp, stagger } from '../utils/motion';

function HeroFallback() {
  // Shown when WebGL is unavailable: a static "code window" so the hero never looks empty.
  return (
    <div className="grid h-full place-items-center">
      <div className="glass gradient-border w-[min(420px,90%)] rounded-2xl p-5 font-mono text-sm">
        <div className="mb-4 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <p>
          <span className="text-violet-400">const</span> dev = {'{'}
        </p>
        <p className="pl-4">
          <span className="text-cyan-300">name</span>:{' '}
          <span className="text-green-300">"{profile.name}"</span>,
        </p>
        <p className="pl-4">
          <span className="text-cyan-300">role</span>:{' '}
          <span className="text-green-300">"{profile.role}"</span>,
        </p>
        <p>{'};'}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* ── Text ── */}
        <motion.div
          variants={stagger(0.12, 0.15)}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.p
            variants={fadeUp()}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/25 bg-green-400/10 px-4 py-1.5 text-sm text-green-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Open to internships & freelance work
          </motion.p>

          <motion.h1
            variants={fadeUp()}
            className="font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Hi, I'm <span className="text-gradient">{profile.shortName}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp()}
            className="mt-4 h-[1.4em] font-display text-2xl font-semibold text-ink-100 sm:text-3xl"
          >
            <TypingText words={profile.roles} />
          </motion.p>

          <motion.p
            variants={fadeUp()}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300"
          >
            {profile.heroLine}
          </motion.p>

          <motion.p
            variants={fadeUp()}
            className="mt-4 flex items-center gap-2 text-sm text-ink-400"
          >
            <HiLocationMarker className="text-cyan" /> {profile.location} ·{' '}
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp()}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-linear-to-r from-violet-500 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-violet-600/30 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              View my work
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-ink-100 transition hover:-translate-y-0.5 hover:text-white"
              >
                <HiDownload /> Download CV
              </a>
            )}
          </motion.div>

          <motion.div variants={fadeUp()} className="mt-9">
            <SocialLinks exclude={['Email']} />
          </motion.div>
        </motion.div>

        {/* ── 3D scene ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-95 sm:h-115 lg:h-150"
        >
          <SceneShell
            eager
            camera={{ position: [0, 1.4, 8.4], fov: 38 }}
            fallback={<HeroFallback />}
          >
            {quality => <HeroScene quality={quality} />}
          </SceneShell>
          <p className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 font-mono text-xs text-ink-500 sm:block">
            drag to rotate
          </p>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <span className="flex h-14 w-8 justify-center rounded-full border-2 border-ink-400/50 pt-2.5">
          <span className="animate-scroll-dot h-2.5 w-2.5 rounded-full bg-ink-200" />
        </span>
        <HiArrowDown className="sr-only" />
      </a>
    </section>
  );
}
