import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, CheckCircle2, AlertCircle, X, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ProjectProps {
  title: string;
  description: string;
  highlights: string[];
  challenges: string;
  url: string;
  tech: string[];
  gradient: string;
  labels: {
    highlights: string;
    challenge: string;
  };
}

const ProjectCard: React.FC<ProjectProps> = ({ title, description, highlights, challenges, url, tech, gradient, labels }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    // Prevent flip if clicking the external link or iframe controls
    if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) return;
    
    const newState = !isFlipped;
    setIsFlipped(newState);
    
    // Log to Audit Console
    window.dispatchEvent(new CustomEvent('portfolio-log', {
      detail: { 
        message: `Card ${newState ? 'FLIPPED_TO_PREVIEW' : 'RETURNED_TO_INFO'}: ${title}`, 
        type: 'UI' 
      }
    }));
  };

  return (
    <div className="group perspective-1000 h-[500px] w-full">
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full w-full cursor-pointer"
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 backface-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 p-8 shadow-xl dark:shadow-2xl overflow-hidden hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-500"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={cn("absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20", gradient)} />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1 group-hover:text-brand-primary transition-colors truncate">
                  {title}
                </h3>
                <span className="text-[10px] font-mono text-zinc-400 hover:text-brand-primary transition-colors mb-3 block truncate">
                  {url.replace('https://', '')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span key={t} className="rounded-full bg-zinc-900/5 dark:bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border border-zinc-900/5 dark:border-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                  className="rounded-full bg-zinc-900/5 dark:bg-white/10 p-2 text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  title="Preview"
                >
                  <Maximize2 size={18} />
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full bg-brand-primary p-2 text-white hover:scale-110 transition-transform shadow-lg shadow-brand-primary/20"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            <p className="mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm antialiased">
              {description}
            </p>

            <div className="mt-auto space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3 text-brand-green">
                  <CheckCircle2 size={16} strokeWidth={2.5} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono">{labels.highlights}</span>
                </div>
                <ul className="grid grid-cols-1 gap-2.5">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/5 text-[11px] text-zinc-700 dark:text-zinc-300 leading-snug group/item hover:bg-zinc-900/[0.04] dark:hover:bg-white/[0.04] transition-colors">
                      <span className="mt-1 h-1 w-1 rounded-full bg-brand-green shadow-[0_0_8px_rgba(0,255,65,0.5)] flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-zinc-200/50 dark:bg-black/40 p-5 border border-zinc-200 dark:border-white/5 relative overflow-hidden group/challenge">
                <div className={cn("absolute -right-4 -bottom-4 h-16 w-16 rounded-full opacity-5 blur-xl", gradient)} />
                <div className="flex items-center gap-2 mb-2 text-brand-primary">
                  <AlertCircle size={16} strokeWidth={2.5} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono">{labels.challenge}</span>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed italic relative z-10">
                  "{challenges}"
                </p>
              </div>
            </div>
            
            <div className="pt-4 mt-auto">
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 text-center">
                Click card to flip for preview
              </div>
            </div>
          </div>
        </div>

        {/* Back Side (Preview) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 shadow-2xl overflow-hidden"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className={cn("h-3 w-3 rounded-full", gradient)} />
              <span className="text-xs font-bold font-mono tracking-tight dark:text-white truncate max-w-[150px]">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href={url} 
                target="_blank" 
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors text-zinc-500 hover:text-brand-primary"
              >
                <ExternalLink size={16} />
              </a>
              <button
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="p-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105 transition-transform cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          <div className="h-full w-full pt-14 bg-zinc-200 dark:bg-black relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-100 dark:bg-zinc-900 z-0">
               <div className={cn("w-16 h-16 rounded-full mb-4 blur-3xl opacity-50", gradient)} />
               <p className="text-xs font-mono text-zinc-500 mb-4 px-6 leading-relaxed">
                 Some sites restrict direct embedding for security reasons. 
                 If you see a "refused to connect" or "forbidden" message, 
                 please use the link below.
               </p>
               <a 
                 href={url} 
                 target="_blank" 
                 onClick={(e) => e.stopPropagation()}
                 className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold shadow-lg hover:scale-105 transition-transform"
               >
                 <ExternalLink size={14} /> Open Live Site
               </a>
            </div>
            <AnimatePresence>
              {isFlipped && (
                <motion.iframe
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  src={url}
                  className="relative h-full w-full border-none pointer-events-auto z-10 bg-transparent"
                  title={`${title} preview`}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;

