import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'React', level: 80 },
      { name: 'TypeScript', level: 40 },
      { name: 'Tailwind CSS', level: 90 },
    ],
    color: 'cyan'
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 88 },
      { name: 'Python', level: 60 },
      { name: 'MongoDB', level: 50 },
      { name: 'REST APIs', level: 70 },
      { name: 'Next.js', level: 65 },
    ],
    color: 'magenta'
  }
];

const floatingSkills = [
  'React', 'Node.js', 'Python', 'MongoDB', 'TypeScript', 
  'C++', 'JavaScript', 'HTML', 'CSS', 'Express',
  'Git', 'Next.js', 'AWS', 'Linux', 'REST'
];

const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const categoriesRef = useRef(null);
  const cloudRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const categories = categoriesRef.current;
    const cloud = cloudRef.current;

    if (!section || !header || !categories || !cloud) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(categories.children,
        { opacity: 0, y: 60, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: categories,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const progressBars = categories.querySelectorAll('.progress-fill');
      progressBars.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      const cloudItems = cloud.children;
      gsap.fromTo(cloudItems,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          scrollTrigger: {
            trigger: cloud,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      Array.from(cloudItems).forEach((item, i) => {
        gsap.to(item, {
          y: 'random(-15, 15)',
          x: 'random(-10, 10)',
          duration: 'random(2, 4)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full py-20 md:py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-400/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-cyan-400" />
            <span className="text-cyan-400 text-sm uppercase tracking-widest">Expertise</span>
            <span className="w-8 h-px bg-cyan-400" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life, 
            from frontend interfaces to backend systems.
          </p>
        </div>

        <div 
          ref={categoriesRef}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24"
        >
          {skillCategories.map((category, catIndex) => {
            const isCyan = category.color === 'cyan';
            return (
              <div 
                key={catIndex}
                className="glass rounded-2xl p-6 md:p-8 hover:border-cyan-400/30 transition-all"
              >
                <h3 className={`text-xl font-bold mb-6 ${isCyan ? 'text-cyan-400' : 'text-[#ff003c]'}`}>
                  {category.name}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{skill.name}</span>
                        <span className={`text-sm ${isCyan ? 'text-cyan-400' : 'text-[#ff003c]'}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`progress-fill h-full rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-[#ff003c]'}`}
                          data-width={skill.level}
                          style={{ boxShadow: isCyan ? '0 0 10px rgba(0, 240, 255, 0.5)' : '0 0 10px rgba(255, 0, 60, 0.5)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl text-gray-400">Technologies I Work With</h3>
        </div>
        
        <div 
          ref={cloudRef}
          className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto"
        >
          {floatingSkills.map((skill, index) => {
            const isCyan = index % 2 === 0;
            const sizes = ['text-sm', 'text-base', 'text-lg'];
            const size = sizes[index % 3];
            
            return (
              <span 
                key={skill}
                className={`${size} px-4 py-2 rounded-full glass cursor-default hover:scale-110 transition-transform ${isCyan ? 'hover:border-cyan-400/50 hover:text-cyan-400' : 'hover:border-[#ff003c]/50 hover:text-[#ff003c]'}`}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
