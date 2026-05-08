import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

const TelemetryCursor = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    };

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(Math.round(scrolled));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none hidden md:block">
      {/* Precision Crosshair */}
      <motion.div
        className="fixed top-0 left-0 h-8 w-8 -ml-4 -mt-4 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className={`relative transition-all duration-300 ${isPointer ? 'scale-150' : 'scale-100'}`}>
          {/* Main Cross */}
          <div className="absolute h-px w-6 bg-brand-primary/50" />
          <div className="absolute w-px h-6 bg-brand-primary/50" />
          
          {/* Small Center Dot */}
          <div className={`h-1 w-1 rounded-full bg-brand-primary transition-transform duration-300 ${isPointer ? 'scale-50' : 'scale-100'}`} />
          
          {/* Outer Circle Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`absolute h-8 w-8 rounded-full border border-dashed border-brand-primary/20 transition-all duration-300 ${isPointer ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}
          />
        </div>
        
        {/* Telemetry Labels */}
        <div className="absolute left-6 top-6 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-tighter text-brand-primary/70 whitespace-nowrap bg-black/5 dark:bg-white/5 backdrop-blur-sm p-1.5 rounded border border-brand-primary/10">
          <div className="flex justify-between gap-4">
             <span className="opacity-50">POS_X</span>
             <span>{coords.x.toString().padStart(4, '0')}</span>
          </div>
          <div className="flex justify-between gap-4">
             <span className="opacity-50">POS_Y</span>
             <span>{coords.y.toString().padStart(4, '0')}</span>
          </div>
          <div className="h-px bg-brand-primary/10 my-0.5" />
          <div className="flex justify-between gap-4">
             <span className="opacity-50">DEP_Z</span>
             <span className="text-brand-green">{scrollProgress}%</span>
          </div>
          {isPointer && (
             <div className="text-[8px] text-brand-green animate-pulse mt-1 font-bold">
               {"> INTERACTIVE_NODE"}
             </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TelemetryCursor;
