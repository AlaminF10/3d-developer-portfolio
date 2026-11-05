import { socials } from '../data/socials';

export default function SocialLinks({ size = 'md', exclude = [] }) {
  const box = size === 'sm' ? 'h-9 w-9 text-base' : 'h-11 w-11 text-lg';
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {socials
        .filter(s => !exclude.includes(s.name))
        .map(({ name, url, icon: Icon, color }) => (
          <li key={name}>
            <a
              href={url}
              target={url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              className={`group glass grid ${box} place-items-center rounded-xl text-ink-200 transition hover:-translate-y-1 hover:text-white`}
              style={{ '--brand': color }}
            >
              <Icon className="transition-colors group-hover:text-[var(--brand)]" />
            </a>
          </li>
        ))}
    </ul>
  );
}
