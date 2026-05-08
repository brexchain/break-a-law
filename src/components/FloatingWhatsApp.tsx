import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Check, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

interface FloatingWhatsAppProps {
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
  "Ich habe eine spezifische Frage zu Ihrer 'Auditor-Mentalität'."
];

const PRESETS_EN = [
  "Hi Petar, I saw your portfolio and would love to chat about a project!",
  "Hello Mr. Brekalo, we would like to invite you for an interview.",
  "I have a specific question about your 'Auditor Mentality' approach."
];

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ phoneNumber, labels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const isGerman = labels.title === "Direkter Zugang";
  const presets = isGerman ? PRESETS_DE : PRESETS_EN;

  // Log to terminal helper
  const logToTerminal = (msg: string) => {
    window.dispatchEvent(new CustomEvent('portfolio-log', {
      detail: { message: msg, type: 'UI' }
    }));
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const encodedMessage = encodeURIComponent(message);
    logToTerminal(`WhatsApp redirect initiated for: ${title}`);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  const title = labels.title;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="w-[320px] sm:w-[380px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-50 dark:bg-black/40 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center text-black shadow-lg shadow-brand-green/20">
                  <MessageSquare size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{labels.title}</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                    <span className="text-[10px] text-zinc-500 font-mono italic">{labels.status}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              >
                <X size={16} className="text-zinc-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 block">{labels.intentLabel}</span>
                <div className="flex flex-col gap-2">
                  {presets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setMessage(preset);
                        logToTerminal("Preset message selected");
                      }}
                      className={cn(
                        "text-left text-[11px] p-2.5 rounded-xl border transition-all duration-300 cursor-pointer leading-tight",
                        message === preset 
                          ? "bg-brand-primary/5 border-brand-primary/30 text-brand-primary dark:text-brand-primary font-medium" 
                          : "bg-zinc-50 dark:bg-white/5 border-zinc-100 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10"
                      )}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                 <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 block">{labels.editLabel}</span>
                 <textarea
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   className="w-full h-24 bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-800 dark:text-zinc-300 focus:outline-none focus:border-brand-primary transition-colors resize-none font-sans leading-relaxed"
                   placeholder="..."
                 />
              </div>

              <motion.button
                disabled={message.trim().length === 0}
                onClick={handleSend}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-xs transition-all duration-500 shadow-xl cursor-pointer",
                  message.trim().length > 0
                    ? "bg-brand-green text-black hover:shadow-brand-green/30"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                )}
              >
                <Send size={16} />
                {labels.send}
                {message.trim().length > 0 && <Check size={14} className="ml-1" />}
              </motion.button>
              
              <div className="flex items-center justify-center gap-1.5 text-[9px] text-zinc-400 uppercase tracking-widest font-mono">
                <Shield size={10} className="text-brand-green" />
                {labels.encrypted}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          logToTerminal(`Floating WhatsApp bubble: ${isOpen ? 'CLOSED' : 'OPENED'}`);
        }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "pointer-events-auto h-14 w-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 cursor-pointer relative group",
          isOpen 
            ? "bg-zinc-900 dark:bg-white text-white dark:text-black rotate-90" 
            : "bg-brand-green text-black hover:shadow-brand-green/30"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="wa"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="relative"
            >
              <MessageSquare size={24} />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 border-2 border-brand-green rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 px-3 py-1.5 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
            {isGerman ? "Chat starten" : "Start Chat"}
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
