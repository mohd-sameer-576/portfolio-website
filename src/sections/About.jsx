import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Briefcase, Users, Award } from 'lucide-react';
import resume from '../../public/resume.pdf'

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Calendar, value: 'Freshers', label: 'Years Experience', color: 'cyan' },
  { icon: Briefcase, value: '5+', label: 'Projects Completed', color: 'magenta' },
];

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const statsContainer = statsRef.current;

    if (!section || !content || !statsContainer) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
        }
      });

      scrollTl
        .fromTo(content,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, ease: 'none' }
        );

      gsap.fromTo(statsContainer.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsContainer,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex items-center py-20 md:py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-400/5 to-transparent" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-cyan-400" />
              <span className="text-cyan-400 text-sm uppercase tracking-widest">About Me</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8">
              Building <span className="gradient-text">Digital</span>
              <br />
              Realities
            </h2>
            
            <div className="space-y-4 text-gray-400 text-base md:text-lg leading-relaxed">
              <p>
                I am a <span className="text-white font-medium">Computer Science Engineer</span> specializing in building exceptional digital experiences. With expertise in the MERN stack and modern web technologies, I turn complex problems into elegant solutions.
              </p>
              <p>
                My journey in tech started with a curiosity about how things work, which evolved into a passion for creating software that makes a difference. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href="#projects"
                className="group relative px-6 py-3 bg-cyan-400 text-black font-medium rounded-lg overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </a>
              <a 
                href="#contact"
                className="px-6 py-3 glass text-white font-medium rounded-lg hover:border-cyan-400/50 transition-all active:scale-105"
              >
                Get in Touch
              </a>
              <button className="px-6 py-3 glass text-white font-medium rounded-lg hover:border-cyan-400/50 transition-all active:scale-105"><a href={resume} download='resume'>Download Resume</a></button>
            </div>
          </div>
          
          <div 
            ref={statsRef}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isCyan = stat.color === 'cyan';
              return (
                <div 
                  key={index}
                  className="glass rounded-2xl p-6 md:p-8 hover:border-cyan-400/30 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isCyan ? 'bg-cyan-400/10' : 'bg-[#ff003c]/10'}`}>
                    <Icon className={`w-6 h-6 ${isCyan ? 'text-cyan-400' : 'text-[#ff003c]'}`} />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold mb-1 ${isCyan ? 'text-cyan-400' : 'text-[#ff003c]'}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
