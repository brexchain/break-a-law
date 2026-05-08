import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { cn } from '../lib/utils';

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
      {/* Precision Crosshair Follower */}
      <motion.div
        className="fixed top-0 left-0 h-12 w-12 -ml-6 -mt-6 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="relative">
          {/* Main Scope Reticle */}
          <div className={cn(
            "absolute inset-0 rounded-full border-2 border-brand-primary/20 transition-all duration-700",
            isPointer ? "scale-150 opacity-10" : "scale-100 opacity-30"
          )} />
          
          {/* Scanning Lines */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full border border-dashed border-brand-green/20" 
          />

          {/* Compass Micro-dots */}
          <div className="absolute -top-4 left-1/2 -ml-0.5 w-1 h-1 bg-brand-primary/40 rounded-full" />
          <div className="absolute -bottom-4 left-1/2 -ml-0.5 w-1 h-1 bg-brand-primary/20 rounded-full" />
          <div className="absolute top-1/2 -left-4 -mt-0.5 w-1 h-1 bg-brand-primary/20 rounded-full" />
          <div className="absolute top-1/2 -right-4 -mt-0.5 w-1 h-1 bg-brand-primary/20 rounded-full" />
        </div>
        
        {/* Telemetry Labels (Moved further out to avoid crowding the arrow) */}
        <div className="absolute left-10 top-10 flex flex-col gap-1 font-mono text-[8px] uppercase tracking-tighter text-brand-primary/80 whitespace-nowrap bg-zinc-900/10 dark:bg-white/10 backdrop-blur-md p-2 rounded-lg border border-brand-primary/10 shadow-2xl">
          <div className="flex justify-between gap-6">
             <span className="opacity-40">LATENCY</span>
             <span className="text-brand-green">0.00{Math.floor(Math.random() * 9)}s</span>
          </div>
          <div className="flex justify-between gap-6">
             <span className="opacity-40">COORD_X</span>
             <span>{coords.x.toString().padStart(4, '0')}</span>
          </div>
          <div className="flex justify-between gap-6">
             <span className="opacity-40">COORD_Y</span>
             <span>{coords.y.toString().padStart(4, '0')}</span>
          </div>
          <div className="h-px bg-brand-primary/10 my-1" />
          <div className="flex justify-between gap-6">
             <span className="opacity-40">LOAD_PX</span>
             <span className="text-brand-green">{scrollProgress}%</span>
          </div>
          {isPointer && (
             <div className="text-[7px] text-brand-green font-bold flex items-center gap-1.5 mt-1 border-t border-brand-green/20 pt-1">
               <div className="h-1 w-1 rounded-full bg-brand-green animate-ping" />
               NODE_INTERACTIVE
             </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TelemetryCursor;
