import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Check, AlertCircle, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

interface WhatsAppContactProps {
  phoneNumber: string;
  labels: {
    title: string;
    status: string;
    intentLabel: string;
    editLabel: string;
    send: string;
    encrypted: string;
  };
}

const PRESETS_DE = [
  "Hallo Petar, ich habe Ihr Portfolio gesehen und würde gerne über ein Projekt sprechen!",
  "Guten Tag Herr Brekalo, wir würden Sie gerne zu einem Gespräch einladen.",
  "Ich habe eine spezifische Frage zu Ihrer 'Auditor-Mentalität'.",
  "Lassen Sie uns besprechen, wie wir unsere QA-Prozesse gemeinsam verbessern können."
];

const PRESETS_EN = [
  "Hi Petar, I saw your portfolio and would love to chat about a project!",
  "Guten Tag Herr Brekalo, we would like to invite you for an interview.",
  "I have a specific question about your 'Auditor Mentality' approach.",
  "Let's discuss how we can improve our QA processes together."
];

export default function WhatsAppContact({ phoneNumber, labels }: WhatsAppContactProps) {
  const [message, setMessage] = useState('');
  const isGerman = labels.title === "Direkter Zugang";
  const presets = isGerman ? PRESETS_DE : PRESETS_EN;

  const handleSend = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-xl dark:shadow-2xl">
        <div className="p-6 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center text-black">
              <MessageSquare size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-display uppercase tracking-wider">{labels.title}</h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">{labels.status}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
          </div>
        </div>

        <div className="p-8">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4 text-left">
            {labels.intentLabel}
          </label>
          <div className="grid grid-cols-1 gap-2 mb-8">
            {presets.map((preset, i) => (
              <button
                key={i}
                onClick={() => setMessage(preset)}
                className={cn(
                  "text-left text-xs p-3 rounded-xl border transition-all duration-300 cursor-pointer",
                  message === preset 
                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary dark:text-white" 
                    : "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20"
                )}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="relative mb-8">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4 text-left">
                {labels.editLabel}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="..."
              className="w-full h-32 bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl p-4 text-sm text-zinc-800 dark:text-zinc-300 focus:outline-none focus:border-brand-primary transition-colors resize-none font-sans"
            />
            <div className="absolute top-12 right-4 opacity-10 dark:opacity-20 pointer-events-none">
              <Terminal size={40} className="text-zinc-900 dark:text-white" />
            </div>
          </div>

          <motion.button
            disabled={message.trim().length === 0}
            onClick={handleSend}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center justify-center gap-3 py-5 rounded-full font-bold text-sm transition-all duration-500 shadow-lg cursor-pointer",
              message.trim().length > 0
                ? "bg-brand-green text-black hover:shadow-brand-green/20"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
            )}
          >
            <Send size={18} />
            {labels.send}
            {message.trim().length > 0 && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="ml-2"
              >
                <Check size={18} />
              </motion.span>
            )}
          </motion.button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
            <AlertCircle size={12} />
            {labels.encrypted}
          </div>
        </div>
      </div>
    </div>
  );
}
