import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, ChevronRight, Activity } from 'lucide-react';

interface LogEntry {
  id: string;
  time: string;
  type: 'SYSTEM' | 'UI' | 'LOGIC';
  message: string;
}

const AuditTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: LogEntry['type'] = 'SYSTEM') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      message,
    };
    setLogs(prev => [...prev.slice(-19), newLog]);
  };

  useEffect(() => {
    // Initial logs
    const bootLogs = [
      "Initializing UX Auditor Kernel...",
      "Logic verification: 100% stable",
      "UX/UI Precision assets loaded",
      "Waiting for user input..."
    ];
    
    bootLogs.forEach((msg, i) => {
       setTimeout(() => addLog(msg), i * 600);
    });

    // Listen for custom events
    const handleEvent = (e: any) => {
      if (e.detail?.message) {
        addLog(e.detail.message, e.detail.type || 'UI');
      }
    };

    window.addEventListener('portfolio-log', handleEvent);
    return () => window.removeEventListener('portfolio-log', handleEvent);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 h-96 bg-zinc-900/95 dark:bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-brand-primary" />
                <span className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-widest">Auditor_Console_v2.0</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Log Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-[10px] space-y-2 scrollbar-hide relative"
            >
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-20 opacity-50" />
              
              {logs.map((log) => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 font-bold ${
                    log.type === 'SYSTEM' ? 'text-brand-primary' : 
                    log.type === 'LOGIC' ? 'text-brand-green' : 'text-blue-400'
                  }`}>
                    {log.type}
                  </span>
                  <span className="text-zinc-300 break-words">{log.message}</span>
                </div>
              ))}
              <div className="flex items-center gap-1 text-brand-green animate-pulse">
                <ChevronRight size={12} />
                <span className="h-2 w-1 bg-brand-green" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-lg cursor-pointer ${
          isOpen 
            ? 'bg-brand-primary border-brand-primary text-white' 
            : 'bg-zinc-900/90 dark:bg-white/10 border-white/10 text-white backdrop-blur-sm'
        }`}
      >
        <Activity size={16} className={isOpen ? 'animate-pulse' : ''} />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          {isOpen ? 'Close Console' : 'Audit Console'}
        </span>
      </motion.button>
    </div>
  );
};

export default AuditTerminal;
