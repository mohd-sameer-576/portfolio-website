import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './sections/LoadingScreen';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    if (!isLoading) {
      ScrollTrigger.refresh();
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <>
          <Navigation />
          
          <main className="relative">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
          </main>
          
          <Footer />
          
          <div className="fixed inset-0 pointer-events-none z-0">
            <div 
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff003c]/5 rounded-full blur-3xl" />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
