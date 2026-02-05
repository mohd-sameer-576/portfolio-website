import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-8 md:py-12">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text">Mohammed Sameer</h3>
            <p className="text-gray-500 text-sm mt-1">Building digital experiences</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">About</a>
            <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#skills" className="text-gray-400 hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#experience" className="text-gray-400 hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-6 md:my-8" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-gray-500">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-[#ff003c] fill-[#ff003c]" />
          <span>using React, JavaScript & Tailwind CSS</span>
        </div>
        
        <p className="text-center text-gray-600 text-xs mt-4">
          &copy; {new Date().getFullYear()} CS Engineer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
