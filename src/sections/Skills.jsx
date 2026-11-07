import { motion } from 'framer-motion';
import Section from '../components/Section';
import SceneShell from '../canvas/SceneShell';
import SkillsGlobe from '../canvas/SkillsGlobe';
import { concepts, globeSkills, skillGroups } from '../data/skills';
import { fadeUp, stagger } from '../utils/motion';

function SkillRow({ skill }) {
  const Icon = skill.icon;
  return (
    <motion.li
      variants={fadeUp(0, 20)}
      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/5"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-lg transition group-hover:scale-110"
        style={{ color: skill.color }}
      >
        <Icon aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink-100">{skill.name}</span>
          <span className="font-mono text-xs text-ink-500">{skill.level}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-violet-500 to-cyan-400"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.li>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          My <span className="text-gradient">tech stack</span>
        </>
      }
      intro="The tools I use to take an idea from a database schema to a polished, responsive interface."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* 3D globe */}
        <div className="glass gradient-border relative order-last h-95 overflow-hidden rounded-3xl sm:h-115 lg:order-first lg:sticky lg:top-28 lg:h-135">
          <SceneShell camera={{ position: [0, 0, 7], fov: 45 }}>
            {quality => (
              <>
                <ambientLight intensity={0.6} />
                <SkillsGlobe skills={globeSkills} quality={quality} />
              </>
            )}
          </SceneShell>
          <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center font-mono text-xs text-ink-500">
            move your mouse to tilt the globe
          </p>
        </div>

        {/* lists */}
        <div className="space-y-6">
          {skillGroups.map(group => (
            <motion.div
              key={group.title}
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="glass rounded-3xl p-5 sm:p-6"
            >
              <h3 className="mb-3 px-3 font-display text-lg font-semibold text-white">
                {group.title}
              </h3>
              <ul className="grid gap-1 sm:grid-cols-2">
                {group.skills.map(s => (
                  <SkillRow key={s.name} skill={s} />
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="mb-3 font-display text-lg font-semibold text-white">
              Concepts I work with
            </h3>
            <ul className="flex flex-wrap gap-2">
              {concepts.map(c => (
                <li
                  key={c}
                  className="rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-1.5 text-sm text-ink-200"
                >
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
