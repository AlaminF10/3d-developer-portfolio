import { motion } from 'framer-motion';
import Section from '../components/Section';
import TiltCard from '../components/TiltCard';
import { profile } from '../data/profile';
import { fadeIn, fadeUp, stagger } from '../utils/motion';

// Put a square photo at public/profile.jpg and set this to "/profile.jpg".
const PHOTO = '/profile.jpg';

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About me"
      title={
        <>
          Code, design & a bit of <span className="text-gradient">3D</span>
        </>
      }
    >
      <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={fadeIn('right')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-sm"
        >
          <TiltCard className="gradient-border glass rounded-3xl p-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 via-indigo-700 to-cyan-500">
              {PHOTO ? (
                <img
                  src={PHOTO}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-full place-items-center">
                  <span className="font-display text-8xl font-bold text-white/90 drop-shadow-xl transform-[translateZ(40px)]">
                    {profile.initials}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-night/70 px-4 py-3 backdrop-blur-md">
                <p className="font-display font-semibold text-white">
                  {profile.name}
                </p>
                <p className="text-sm text-ink-300">{profile.role}</p>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {profile.about.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp()}
              className="mb-5 text-lg leading-relaxed text-ink-200"
            >
              {para}
            </motion.p>
          ))}

          <motion.dl
            variants={fadeUp()}
            className="mt-10 grid grid-cols-3 gap-4"
          >
            {profile.highlights.map(h => (
              <div key={h.label} className="glass rounded-2xl p-5 text-center">
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                  {h.value}
                </dd>
                <dd className="mt-1 text-xs text-ink-400 sm:text-sm">
                  {h.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </Section>
  );
}
