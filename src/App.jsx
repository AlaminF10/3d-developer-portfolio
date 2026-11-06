import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Section from './components/Section';
import { navLinks } from './data/navigation';
import { profile } from './data/profile';
import { useActiveSection } from './hooks/useActiveSection';

// The star background is decorative, so it loads after the page content.
const BackgroundStars = lazy(() => import('./components/BackgroundStars'));

const SECTION_IDS = ['hero', ...navLinks.map(l => l.id)];

export default function App() {
  useActiveSection(SECTION_IDS);

  return (
    <div className="relative min-h-screen">
      <Suspense fallback={null}>
        <BackgroundStars />
      </Suspense>

      <Navbar />

      <main id="main" className="relative z-10">
        {/* Temporary hero — replaced by the 3D hero on Day 4 */}
        <section
          id="hero"
          className="flex min-h-screen items-center justify-center px-5"
        >
          <h1 className="font-display text-5xl font-bold text-white sm:text-7xl">
            Hi, I'm <span className="text-gradient">{profile.shortName}</span>
          </h1>
        </section>

        {navLinks.map(link => (
          <Section
            key={link.id}
            id={link.id}
            eyebrow={link.label}
            title={`${link.label} section`}
          >
            <div className="glass h-64 rounded-3xl" />
          </Section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
