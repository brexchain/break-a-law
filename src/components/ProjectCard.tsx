import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 p-8 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-500 shadow-xl dark:shadow-2xl"
    >
      {/* Decorative gradient overlay */}
      <div className={cn("absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20", gradient)} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">{title}</h3>
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
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
