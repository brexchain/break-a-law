import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, CheckCircle2, AlertCircle, RotateCcw, Globe } from 'lucide-react';
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
    // Prevent flip if clicking on a link
    if ((e.target as HTMLElement).closest('a')) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative h-[550px] w-full [perspective:1000px] group cursor-pointer"
        onClick={handleFlip}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* Front Side */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <div className="h-full w-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 p-8 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-500 shadow-xl dark:shadow-2xl">
              <div className={cn("absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20", gradient)} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1 group-hover:text-brand-primary transition-colors">{title}</h3>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-blue-500 hover:text-blue-600 font-bold transition-colors mb-3 block truncate max-w-[200px]"
                    >
                      {url.replace('https://', '')}
                    </a>
                    <div className="flex flex-wrap gap-2">
                      {tech.map((t) => (
                        <span key={t} className="rounded-full bg-zinc-900/5 dark:bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border border-zinc-900/5 dark:border-white/5 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-zinc-900/10 dark:bg-white/10 p-2 text-zinc-900 dark:text-white hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                <p className="mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  {description}
                </p>

                <div className="mt-auto space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-brand-green">
                      <CheckCircle2 size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest font-display italic">{labels.highlights}</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                          <span className="mt-1 h-1 w-1 rounded-full bg-brand-green" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-zinc-200/50 dark:bg-black/40 p-4 border border-zinc-200 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-brand-primary">
                      <AlertCircle size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest font-display italic">{labels.challenge}</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                      "{challenges}"
                    </p>
                  </div>
                  
                  <div className="pt-2 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 animate-pulse">Click to Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side (Preview) */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="h-full w-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-black shadow-2xl relative flex flex-col">
              <div className="flex items-center justify-between p-4 bg-zinc-900 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <span className="text-xs font-bold text-zinc-400 font-mono">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.open(url, '_blank')}
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl bg-red-950/55 text-red-400 border border-red-500/30 hover:bg-red-900/40 transition-colors"
                  >
                    Loading Forbidden?
                  </button>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open App
                  </a>
                </div>
              </div>
              
              <div className="flex-1 bg-white relative group/frame">
                <iframe 
                  src={url} 
                  className="h-full w-full border-none"
                  title={`${title} Preview`}
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/40 backdrop-blur-[2px] opacity-0 group-hover/frame:opacity-100 transition-opacity pointer-events-none">
                   <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10 text-center space-y-4 max-w-[80%] pointer-events-auto">
                      <Globe className="mx-auto text-blue-500" size={32} />
                      <p className="text-xs text-white font-bold leading-relaxed">Previewing interactive site. If the frame doesn't load, use the external link button.</p>
                      <button 
                        onClick={() => window.open(url, '_blank')}
                        className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Open In New Tab
                      </button>
                   </div>
                </div>
              </div>

              <div className="p-3 bg-zinc-950 text-center border-t border-white/5 flex items-center justify-center gap-2">
                <span className="text-[10px] font-mono text-zinc-400">Loading forbidden or failed?</span>
                <button 
                  onClick={() => window.open(url, '_blank')}
                  className="text-[10px] text-blue-400 hover:text-blue-300 font-bold underline uppercase font-mono"
                >
                  Direct Link
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Fallback link below tile */}
      <div className="px-4">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs font-bold text-blue-500 hover:text-blue-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
        >
          <ExternalLink size={14} />
          {title}: {url.replace('https://', '')}
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
