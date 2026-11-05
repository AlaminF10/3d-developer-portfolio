import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motion';

// Shared wrapper: consistent spacing, max width, and an animated heading.
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 ${className}`}
    >
      {(eyebrow || title) && (
        <motion.header
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-14 max-w-2xl"
        >
          {eyebrow && (
            <p className="mb-3 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-cyan">
              <span className="h-px w-8 bg-cyan/60" />
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-5 text-lg leading-relaxed text-ink-300">{intro}</p>
          )}
        </motion.header>
      )}
      {children}
    </section>
  );
}
