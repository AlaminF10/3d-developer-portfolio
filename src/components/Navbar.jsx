import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navLinks } from '../data/navigation';
import { profile } from '../data/profile';
import { useAppStore } from '../store/useAppStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useAppStore(s => s.activeSection);
  const menuOpen = useAppStore(s => s.menuOpen);
  const setMenuOpen = useAppStore(s => s.setMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the mobile menu with Escape
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-x-0 border-t-0 py-3' : 'py-5'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <a
          href="#hero"
          className="group flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-display text-sm font-bold text-night shadow-lg shadow-violet-500/30 transition-transform group-hover:rotate-6">
            {profile.initials}
          </span>
          <span className="hidden font-display text-lg font-semibold text-white sm:block">
            {profile.name}
            <span className="ml-2 font-sans text-sm font-normal text-ink-300">
              | {profile.tagline}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const active = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-white' : 'text-ink-300 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className="ml-3">
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-violet-500 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:brightness-110"
            >
              Hire me
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-2xl text-white md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-5 mt-3 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 font-medium ${
                    activeSection === link.id
                      ? 'bg-white/10 text-white'
                      : 'text-ink-200'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
