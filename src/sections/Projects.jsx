import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import Section from '../components/Section';
import TiltCard from '../components/TiltCard';
import { projects } from '../data/projects';
import { socials } from '../data/socials';

function Cover({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    );
  }
  // Generated cover when there's no screenshot yet.
  const [a, b] = project.accent;
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute bottom-4 left-5 right-5 font-mono text-xs text-white/80">
        <p>$ git clone {project.repoUrl.replace('https://', '')}</p>
      </div>
      <p className="absolute left-5 top-4 font-display text-2xl font-bold text-white/95 drop-shadow">
        {project.category}
      </p>
    </div>
  );
}

function ProjectCard({ project, large }) {
  return (
    <TiltCard
      max={6}
      className={`glass gradient-border flex h-full flex-col overflow-hidden rounded-3xl ${large ? 'md:flex-row' : ''}`}
    >
      <div
        className={`overflow-hidden ${large ? 'aspect-video md:aspect-auto md:w-1/2' : 'aspect-video'}`}
      >
        <Cover project={project} />
      </div>
      <div className={`flex flex-1 flex-col p-6 ${large ? 'md:p-8' : ''}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">
          {project.category}
        </p>
        <h3
          className={`mt-2 font-display font-bold text-white ${large ? 'text-2xl md:text-3xl' : 'text-xl'}`}
        >
          {project.title}
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-300">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map(t => (
            <li
              key={t}
              className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-ink-200"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="relative z-20 mt-6 flex gap-3">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <FaGithub /> Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <HiExternalLink /> Live demo
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  const github = socials.find(s => s.name === 'GitHub');
  const featured = projects.filter(p => p.featured);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title={
        <>
          Things I've <span className="text-gradient">built</span>
        </>
      }
      intro="A selection of full-stack apps, academic team projects and experiments. Each one links to its source code on GitHub."
    >
      {/* Featured */}
      <div className="grid gap-8">
        {featured.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
          >
            <ProjectCard project={p} large />
          </motion.div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <a
          href={github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-ink-100 transition hover:text-white"
        >
          <FaGithub /> See all repositories on GitHub
        </a>
      </div>
    </Section>
  );
}
