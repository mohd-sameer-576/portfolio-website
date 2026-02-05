import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Terminal, Cpu, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const shapesRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const shapes = shapesRef.current;
    const content = contentRef.current;

    if (!section || !title || !subtitle || !shapes || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(title, 
        { opacity: 0, y: 100, rotateX: -45 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2 }
      )
      .fromTo(subtitle,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(shapes.children,
        { opacity: 0, scale: 0, rotateY: 180 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1, stagger: 0.15 },
        '-=0.4'
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.8,
        }
      });

      scrollTl
        .to(content, {
          rotateX: 25,
          y: '-30%',
          scale: 0.85,
          opacity: 0,
          ease: 'none'
        })
        .to(shapes, {
          rotateX: 35,
          y: '-50%',
          opacity: 0,
          ease: 'none'
        }, '<');

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-400/5 via-transparent to-transparent" />
      
      <div 
        ref={shapesRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-[15%] left-[10%] animate-float" style={{ animationDelay: '0s' }}>
          <div className="relative w-16 h-16 md:w-24 md:h-24">
            <div className="absolute inset-0 border border-cyan-400/30 rotate-45" />
            <div className="absolute inset-0 border border-cyan-400/20 rotate-45" />
            <Cpu className="absolute inset-0 m-auto w-8 h-8 md:w-12 md:h-12 text-cyan-400/40" />
          </div>
        </div>
        
        <div className="absolute top-[20%] right-[15%] animate-float" style={{ animationDelay: '1s' }}>
          <div className="glass rounded-lg p-3 md:p-4 glow-cyan">
            <Terminal className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
          </div>
        </div>
        
        <div className="absolute bottom-[25%] left-[15%] animate-float" style={{ animationDelay: '2s' }}>
          <div className="glass rounded-lg p-3 md:p-4">
            <Code2 className="w-6 h-6 md:w-8 md:h-8 text-[#ff003c]" />
          </div>
        </div>
        
        <div className="absolute bottom-[20%] right-[10%] animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="glass rounded-lg p-3 md:p-4">
            <Layers className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
          </div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-rotate-slow" style={{ animationDuration: '30s' }} />
          <div className="absolute inset-8 border border-[#ff003c]/20 rounded-full animate-rotate-slow" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
          <div className="absolute inset-16 border border-cyan-400/10 rounded-full animate-rotate-slow" style={{ animationDuration: '20s' }} />
        </div>
      </div>

      <div 
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 md:mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-gray-300">Available for opportunities</span>
        </div>
        
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter mb-4 md:mb-6"
        >
          <span className="text-white">Mohammed Sameer</span>
          <br />
          <span className="gradient-text">Full-stack developer</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-12"
        >
          Crafting code into <span className="text-cyan-400">digital experiences</span>
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-xl mx-auto cursor-pointer">
          {['React', 'Node.js', 'Python', 'MongoDB', 'JavaScript', 'Next Js'].map((tech, i) => (
            <span 
              key={tech}
              className="glass px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm text-gray-300 hover:border-cyan-400/50 transition-colors"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs text-gray-500">Scroll to explore</span>
          <div className="w-5 h-8 border border-gray-600 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
