import { motion } from 'framer-motion';
import { HiAcademicCap, HiBriefcase } from 'react-icons/hi';
import Section from '../components/Section';
import { journey } from '../data/journey';
import { fadeIn } from '../utils/motion';

export default function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Journey"
      title={
        <>
          Education & <span className="text-gradient">experience</span>
        </>
      }
    >
      <ol className="relative ml-4 border-l border-violet-400/20 sm:ml-6">
        {journey.map((item, i) => {
          const Icon = item.type === 'education' ? HiAcademicCap : HiBriefcase;
          return (
            <motion.li
              key={item.title}
              variants={fadeIn('left', i * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative mb-12 pl-10 last:mb-0 sm:pl-14"
            >
              <span className="absolute -left-5.5 top-0 grid h-11 w-11 place-items-center rounded-full border border-violet-400/40 bg-night-2 text-xl text-accent-soft shadow-lg shadow-violet-600/20">
                <Icon />
              </span>
              <div className="glass gradient-border rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-ink-300">{item.place}</p>
                  </div>
                  <span className="w-fit shrink-0 rounded-full bg-cyan/10 px-3 py-1 font-mono text-xs text-cyan">
                    {item.period}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {item.points.map(p => (
                    <li key={p} className="flex gap-3 text-ink-200">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
