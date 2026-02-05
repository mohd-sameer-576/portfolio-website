import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Chat App",
    description:
      "A real-time chat application built with the MERN stack using Socket.IO and Cloudinary.",
    image: "/image.png",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://introvertsonly.onrender.com/",
    githubUrl: "https://github.com/mohd-sameer-576/IntrovertsOnly",
  },
  {
    id: 2,
    title: "Simple E-Commerce Platform",
    description:
      "Admin uploads products, customers browse and contact seller.",
    image: "/mpgb.png",
    tags: ["React", "Tailwind CSS", "GSAP", "DaisyUI"],
    liveUrl: "https://mpgb-collection.netlify.app/",
    githubUrl: "https://github.com/mohd-sameer-576/MPGB-official",
  },
  {
    id: 3,
    title: "Password Manager",
    description:
      "A React-based password manager with CRUD functionality.",
    image: "/password.png",
    tags: ["React", "Tailwind CSS", "CRUD"],
    liveUrl: "https://mohd-sameer-576.github.io/password-manager/",
    githubUrl: "https://github.com/mohd-sameer-576/password-manager",
  },
  {
    id: 4,
    title: "ToDo List",
    description:
      "A ToDo app with async CRUD operations.",
    image: "/todo.png",
    tags: ["React", "Tailwind CSS", "CRUD"],
    liveUrl: "https://mohd-sameer-576.github.io/002-ToDo-with-asyn/",
    githubUrl: "https://github.com/mohd-sameer-576/002-ToDo-with-asyn",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* GSAP animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Auto-scroll */
  useEffect(() => {
  const el = itemRefs.current[activeIndex];
  if (!el || !carouselRef.current) return;

  carouselRef.current.scrollTo({
    left: el.offsetLeft - carouselRef.current.offsetLeft,
    behavior: "smooth",
  });
}, [activeIndex]);

  const next = () =>
    setActiveIndex((i) => (i + 1) % projects.length);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <h2 className="text-5xl font-bold">
            Selected <span className="text-cyan-400">Works</span>
          </h2>
          <p className="text-gray-400 mt-4">
            A showcase of my development projects.
          </p>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-[-3rem] top-1/2 -translate-y-1/2 z-30
                     w-12 h-12 rounded-full bg-black/60 border border-cyan-400/40
                     flex items-center justify-center hover:bg-cyan-400 hover:text-black transition"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          onClick={next}
          className="absolute right-2 md:right-[-3rem] top-1/2 -translate-y-1/2 z-30
                     w-12 h-12 rounded-full bg-black/60 border border-cyan-400/40
                     flex items-center justify-center hover:bg-cyan-400 hover:text-black transition"
        >
          <ChevronRight size={26} />
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className="flex-shrink-0 w-full md:w-[48%] lg:w-[32%] snap-center"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      className="hover:text-cyan-400"
                    >
                      <ExternalLink />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="hover:text-cyan-400"
                    >
                      <Github />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
