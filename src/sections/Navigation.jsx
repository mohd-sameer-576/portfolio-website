import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="mx-4 mt-4">
          <div className="glass-strong rounded-2xl px-4 md:px-6 py-3 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <a 
                href="#" 
                onClick={(e) => handleLinkClick(e, '#about')}
                className="text-lg font-bold gradient-text"
              >
               Mohammed Sameer
              </a>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="hidden md:block px-4 py-2 bg-cyan-400 text-black text-sm font-medium rounded-lg hover:bg-cyan-300 transition-colors"
              >
                Hire Me
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <div 
          className={`absolute top-20 left-4 right-4 glass-strong rounded-2xl p-6 transition-all duration-500 ${
            isMobileMenuOpen 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-3 text-lg text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-gray-800 my-2" />
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-4 py-3 bg-cyan-400 text-black text-center font-medium rounded-lg hover:bg-cyan-300 transition-colors"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
