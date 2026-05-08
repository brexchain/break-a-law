import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function UXProBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none select-none opacity-20 dark:opacity-10">
      {/* Precision Grid */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          color: 'rgba(255, 92, 0, 0.05)'
        }} 
      />

      {/* Auditor Eye / Scanner Effect */}
      <motion.div 
        className="absolute h-[800px] w-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 92, 0, 0.03) 0%, transparent 70%)',
          left: mousePos.x - 400,
          top: mousePos.y - 400,
        }}
      />

      {/* Moving Tech Overlays */}
      <motion.div style={{ y: y1 }} className="absolute top-20 right-10 flex flex-col gap-4 font-mono text-[8px] uppercase tracking-widest text-zinc-400">
        <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-zinc-200 dark:bg-white/10" />
            <span>Core.v9.sys_active</span>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 opacity-50">
            <span className="text-brand-primary">[{Math.random().toString(16).slice(2, 8)}]</span>
            <span>Logic_Gate_Initialized</span>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-20 left-10 flex flex-col gap-4 font-mono text-[8px] uppercase tracking-widest text-zinc-400">
        <div className="p-4 border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg">
            <p className="text-zinc-900 dark:text-white font-bold mb-1">UX_AUDIT_LOG</p>
            <p>LATENCY: 12ms</p>
            <p>STATE: STABLE</p>
            <p>UX_FUN_RATIO: 1.0</p>
        </div>
      </motion.div>

      {/* Dynamic Measurements */}
      <div className="absolute top-1/2 left-6 h-[1px] w-24 bg-zinc-200 dark:bg-white/10 flex items-center justify-end pr-2 text-[8px] font-mono">
        <span className="bg-white dark:bg-black px-1 transform -translate-y-1/2">720PX_X</span>
      </div>
      <div className="absolute top-6 left-1/2 w-[1px] h-24 bg-zinc-200 dark:bg-white/10 flex items-end justify-center pb-2 text-[8px] font-mono">
        <span className="bg-white dark:bg-black py-1 [writing-mode:vertical-lr] transform -translate-x-1/2">480PX_Y</span>
      </div>
    </div>
  );
}
