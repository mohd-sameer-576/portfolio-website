import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      tl.to('.loading-content', {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.in'
      })
      .to('.loading-screen', {
        clipPath: 'inset(50% 0)',
        duration: 0.8,
        ease: 'power4.inOut'
      }, '-=0.2');
    }
  }, [progress, onComplete]);

  return (
    <div className="loading-screen fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center">
      <div className="loading-content text-center">
        <div className="relative mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            <span className="relative inline-block">
              CS
              <span className="absolute -inset-1 text-cyan-400 opacity-50 animate-pulse" style={{ clipPath: 'inset(0 0 50% 0)' }}>
                CS
              </span>
              <span className="absolute -inset-1 text-[#ff003c] opacity-50 animate-pulse" style={{ clipPath: 'inset(50% 0 0 0)', animationDelay: '0.1s' }}>
                CS
              </span>
            </span>
            <span className="gradient-text"> ENGINEER</span>
          </h1>
        </div>

        <div className="w-64 md:w-80 mx-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Loading</span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-[#ff003c] transition-all duration-100 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#ff003c]/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#ff003c]/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/30" />
    </div>
  );
};

export default LoadingScreen;
