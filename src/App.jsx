import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Section from './components/Section';
import Hero from './sections/Hero';
import About from './sections/About';
import { navLinks } from './data/navigation';
import { useActiveSection } from './hooks/useActiveSection';

// The star background is decorative, so it loads after the page content.
const BackgroundStars = lazy(() => import('./components/BackgroundStars'));

const SECTION_IDS = ['hero', ...navLinks.map(l => l.id)];

// Sections already built — everything else still shows a placeholder.
const BUILT = ['about'];

export default function App() {
  useActiveSection(SECTION_IDS);

  return (
    <div className="relative min-h-screen">
      <Suspense fallback={null}>
        <BackgroundStars />
      </Suspense>

      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <About />

        {navLinks
          .filter(link => !BUILT.includes(link.id))
          .map(link => (
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
