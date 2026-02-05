import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    type: 'education',
    title: 'Diploma in Mechanical Engineering',
    company: 'Govt. Polytechnic Masab Tank',
    location: 'Hyderabad, Telengana',
    period: '2021 - 2024',
    description: 'Completed foundational training in mechanical systems, manufacturing processes, engineering drawing, thermodynamics, and basic design and maintenance of mechanical components.',
    highlights: ['GPA: 8.12', 'Auto Cad'],
    color: 'cyan'
  },
  {
    type: 'education',
    title: 'Bachelor of Computer Science',
    company: 'Lords institute of Engineering and technology',
    location: 'Hyderabad, Telengana',
    period: '2024 - 2027',
    description: 'Graduated with honors. Strong foundation in software development and full stack web technologies. Experienced in building end-to-end web applications, working with databases, APIs, and modern frameworks. Actively learning, implementing real-world projects, and focused on writing clean, efficient, and scalable code.',
    highlights: [ 'Machine Learning', 'Artificial Intelligence','DBMS'],
    color: 'cyan'
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;

    if (!section || !header || !timeline) return;

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

      const items = timeline.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen w-full py-20 md:py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#ff003c]/5 to-transparent" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-cyan-400" />
            <span className="text-cyan-400 text-sm uppercase tracking-widest">Journey</span>
            <span className="w-8 h-px bg-cyan-400" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey and academic background that shaped my career in technology.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-[#ff003c] to-cyan-400" />
          
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => {
              const isCyan = exp.color === 'cyan';
              const isWork = exp.type === 'work';
              const Icon = isWork ? Briefcase : GraduationCap;
              
              return (
                <div 
                  key={index}
                  className={`timeline-item relative flex flex-col md:flex-row gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full glass flex items-center justify-center z-10">
                    <div className={`w-3 h-3 rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-[#ff003c]'}`} />
                  </div>
                  
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="glass rounded-2xl p-6 hover:border-cyan-400/30 transition-all">
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCyan ? 'bg-cyan-400/10' : 'bg-[#ff003c]/10'}`}>
                          <Icon className={`w-5 h-5 ${isCyan ? 'text-cyan-400' : 'text-[#ff003c]'}`} />
                        </div>
                        <span className={`text-sm font-medium ${isCyan ? 'text-cyan-400' : 'text-[#ff003c]'}`}>
                          {isWork ? 'Work' : 'Education'}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <p className="text-gray-300 mb-3">{exp.company}</p>
                      
                      <div className={`flex flex-wrap gap-4 text-sm text-gray-500 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4">
                        {exp.description}
                      </p>
                      
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {exp.highlights.map((highlight, hIndex) => (
                          <span 
                            key={hIndex}
                            className={`text-xs px-3 py-1 rounded-full ${isCyan ? 'bg-cyan-400/10 text-cyan-400' : 'bg-[#ff003c]/10 text-[#ff003c]'}`}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
