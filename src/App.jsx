import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import { navLinks } from './data/navigation';
import { useActiveSection } from './hooks/useActiveSection';

// The star background is decorative, so it loads after the page content.
const BackgroundStars = lazy(() => import('./components/BackgroundStars'));

const SECTION_IDS = ['hero', ...navLinks.map(l => l.id)];

export default function App() {
  useActiveSection(SECTION_IDS);

  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only z-100 rounded-md bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Suspense fallback={null}>
        <BackgroundStars />
      </Suspense>

      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
