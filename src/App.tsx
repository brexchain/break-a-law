import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Binary, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Layout, 
  Cpu,
  Linkedin,
  Globe,
  FileText,
  Download,
  Languages,
  Activity,
  Layers,
  Zap,
  Github,
  Menu,
  X
} from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import ThemeToggle from './components/ThemeToggle';
import WhatsAppContact from './components/WhatsAppContact';
import UXProBackground from './components/UXProBackground';
import TelemetryCursor from './components/TelemetryCursor';
import AuditTerminal from './components/AuditTerminal';
import { translations } from './translations';
import { cn } from './lib/utils';

const PROJECTS_DATA = [
  {
    id: "pd",
    title: "Park Dog",
    url: "https://park-dog.vercel.app",
    tech: ["React", "Firebase", "Socket.IO", "Testing"],
    gradient: "bg-blue-500",
    de: {
      description: "Echtzeit-Plattform für Hundebesitzer. Mein Fokus: Stresstest der Real-Time Kommunikation unter instabilen Netzwerkbedingungen.",
      highlights: [
        "Validierung von Edge-Cases in nicht-deterministischen Echtzeit-Umgebungen",
        "Echtzeit-Synchronisierung via Socket.IO mit Fokus auf State-Integrität",
        "Optimistische UI-Updates, die trotz hoher Latenz stabil bleiben"
      ],
      challenges: "Vermeidung von 'Race Conditions' und State-Drift bei gleichzeitigen Zugriffen hunderter User auf dieselbe Park-Instanz."
    },
    en: {
      description: "Real-time coordination platform. My focus: Stress-testing real-time communication under unstable network conditions.",
      highlights: [
        "Validation of edge cases in non-deterministic real-time environments",
        "Real-time synchronization via Socket.IO with a focus on state integrity",
        "Optimistic UI updates that remain stable despite high latency"
      ],
      challenges: "Avoiding race conditions and state drift when hundreds of users access the same park instance simultaneously."
    }
  },
  {
    id: "bw",
    title: "Baum Wien",
    url: "https://baumwien.vercel.app",
    tech: ["D3.js", "Data-Integrity", "OGD"],
    gradient: "bg-emerald-500",
    de: {
      description: "Visualisierung städtischer OGD-Daten. Fokus auf die Identifikation von Inkonsistenzen in öffentlichen Datensätzen.",
      highlights: [
        "Normalisierung und Validierung von 100k+ disparaten Datenpunkten",
        "Debugging von Visualisierungs-Code für präzise Geo-Korrelationen",
        "Entwicklung einer skalierbaren Logik für Umwelt-Heatmaps"
      ],
      challenges: "Identifikation und Korrektur von Messfehlern in den Rohdaten der Stadt Wien vor der Visualisierung."
    },
    en: {
      description: "Visualization of urban OGD data. Focus on identifying inconsistencies in public datasets.",
      highlights: [
        "Normalization and validation of 100k+ disparate data points",
        "Debugging visualization code for precise geo-correlations",
        "Development of scalable logic for environmental heatmaps"
      ],
      challenges: "Identification and correction of measurement errors in raw data from the city of Vienna prior to visualization."
    }
  },
  {
    id: "sz",
    title: "Schweizer",
    url: "https://schweizer.vercel.app",
    tech: ["Next.js", "UX-Consistency", "Layout-Audit"],
    gradient: "bg-zinc-500",
    de: {
      description: "Architektur-Showcase. Fokus auf chirurgische Präzision und die Konsistenz des Design-Systems über alle Viewports.",
      highlights: [
        "Automatisierter Audit der Grid-Ausrichtung über 12+ Breakpoints",
        "Validierung der typografischen Hierarchie in komplexen Layouts",
        "Optimierung der Asset-Pipeline für extrem geringe Ladezeiten"
      ],
      challenges: "Aufrechterhaltung einer konsistenten User-Experience bei maximaler visueller Komplexität und hoher Bilddichte."
    },
    en: {
      description: "Architectural showcase. Focus on surgical precision and design system consistency across all viewports.",
      highlights: [
        "Automated audit of grid alignment across 12+ breakpoints",
        "Validation of typographic hierarchy in complex layouts",
        "Optimization of asset pipeline for extremely low load times"
      ],
      challenges: "Maintaining a consistent user experience despite maximum visual complexity and high image density."
    }
  },
  {
    id: "bm",
    title: "Brauhof Max",
    url: "https://brauhof-max.vercel.app",
    tech: ["Mobile-Logic", "Process-Audit", "Automation"],
    gradient: "bg-amber-600",
    de: {
      description: "Digitales Gastro-Management. Audit und Optimierung von Bestell-Workflows für stressige Live-Umgebungen.",
      highlights: [
        "Validierung von End-to-End Transaktionslogik für mobile Bestellungen",
        "Stresstest der UI-Latenz unter realen Küchenbedingungen",
        "Implementierung von Fallbacks für instabile Netzwerkzustände im Service"
      ],
      challenges: "Integration digitaler Präzision in die chaotische Realität einer Live-Küche ohne Zeitverlust für das Personal."
    },
    en: {
      description: "Digital hospitality management. Audit and optimization of ordering workflows for high-stress environments.",
      highlights: [
        "Validation of end-to-end transaction logic for mobile orders",
        "Stress-testing UI latency under real-world kitchen conditions",
        "Implementation of fallbacks for unstable network states during service"
      ],
      challenges: "Integrating digital precision into the chaotic reality of a live kitchen without time loss for staff."
    }
  },
  {
    id: "tbb",
    title: "The Butler Brigade",
    url: "https://the-butler-brigade.vercel.app",
    tech: ["React", "Service-Logic", "Premium-UX"],
    gradient: "bg-slate-700",
    de: {
      description: "Exklusives Service-Management. Fokus auf diskrete Logik und Hochpräzisions-Workflows für Premium-Dienstleistungen.",
      highlights: [
        "Automatisierte Logistik-Validierung",
        "State-Management für komplexe VIP-Anfragen",
        "Präzisions-UI für exklusive Umgebungen"
      ],
      challenges: "Sicherstellung absoluter Vorhersehbarkeit in hochsensiblen Service-Szenarien."
    },
    en: {
      description: "Exclusive service management. Focus on discrete logic and high-precision workflows for premium services.",
      highlights: [
        "Automated logistics validation",
        "State management for complex VIP requests",
        "Precision UI for exclusive environments"
      ],
      challenges: "Ensuring absolute predictability in highly sensitive service scenarios."
    }
  },
  {
    id: "cv",
    title: "Capoeira Vienna",
    url: "https://capoeiravienna.vercel.app",
    tech: ["React", "Community-Logic", "Media-Optimization"],
    gradient: "bg-green-600",
    de: {
      description: "Dynamische Community-Plattform. Auditor-Check für die Integrität von Trainings-Daten und Event-Logik.",
      highlights: [
        "Validierung von Echtzeit-Event-Streams",
        "Responsive UI für Mobilgeräte im Trainings-Einsatz",
        "Optimierung der Datenstruktur für Community-Growth"
      ],
      challenges: "Performance-Optimierung bei der Darstellung hochfrequenter Media-Assets."
    },
    en: {
      description: "Dynamic community platform. Auditor check for training data integrity and event logic.",
      highlights: [
        "Validation of real-time event streams",
        "Responsive UI for mobile devices during training",
        "Data structure optimization for community growth"
      ],
      challenges: "Performance optimization for displaying high-frequency media assets."
    }
  },
  {
    id: "ts",
    title: "Paumann Service-UX",
    url: "https://paumann.vercel.app",
    tech: ["React", "Logic-Verification", "UX-Audit"],
    gradient: "bg-red-500",
    de: {
      description: "Interface für technische Serviceumgebungen. Fokus auf logische Konsistenzprüfung bei komplexen Maschinen-Checklisten.",
      highlights: [
        "Implementierung einer geführten UI-Logik für null Fehlertoleranz",
        "Reduzierung der kognitiven Belastung durch 'Audit-First' Design",
        "Validierung von Datenflüssen zwischen Frontend und Legacy-Services"
      ],
      challenges: "Sicherstellung der Datenintegrität bei Offline-First Szenarien in lauten, industriellen Umgebungen."
    },
    en: {
      description: "Interface for technical service environments. Focus on logical consistency checks for complex machinery checklists.",
      highlights: [
        "Implementation of guided UI logic for zero fault tolerance",
        "Reduction of cognitive load through 'Audit-First' design",
        "Validation of data flows between frontend and legacy services"
      ],
      challenges: "Ensuring data integrity in offline-first scenarios within noisy, industrial environments."
    }
  },
  {
    id: "ttl",
    title: "Triny Three Logic",
    url: "https://triny-three.vercel.app",
    tech: ["Three.js", "Zustand", "State-Machines"],
    gradient: "bg-orange-500",
    de: {
      description: "Interaktive 3D-Logik. Debugging komplexer Interaktionszustände, um 'Logic Leaks' in der 3D-Navigation zu verhindern.",
      highlights: [
        "Zustandsgesteuerte 3D-Mechaniken mit präziser Event-Validierung",
        "Robustes Fehler-Handling bei asynchronen Asset-Ladevorgängen",
        "Optimierung von Render-Zyklen für maximale Stabilität (60 FPS Performance-Audit)"
      ],
      challenges: "Synchronisierung asynchroner Logik-States mit Frame-basierten 3D-Visualisierungen ohne Memory Leaks."
    },
    en: {
      description: "Interactive 3D logic. Debugging complex interaction states to prevent 'logic leaks' in 3D navigation.",
      highlights: [
        "State-driven 3D mechanics with precise event validation",
        "Robust error handling for asynchronous asset loading",
        "Optimization of render cycles for maximum stability (60 FPS performance audit)"
      ],
      challenges: "Synchronizing asynchronous logic states with frame-based 3D visuals without memory leaks."
    }
  },
  {
    id: "c54",
    title: "Cumberland 54 Minimax",
    url: "https://cumberland54minimax.vercel.app",
    tech: ["Data-Logic", "React", "Filtering-QA"],
    gradient: "bg-yellow-500",
    de: {
      description: "High-Density Dashboard für Immobilien. Fokus auf performante Filterlogik und saubere Datenrepräsentation.",
      highlights: [
        "Entwicklung einer multidimensionalen, fehlerfreien Filter-Architektur",
        "Validierung von Inventar-Daten auf Konsistenz und Dubletten",
        "Performance-Audit der Such-Engine für Instant-Feedback"
      ],
      challenges: "Präsentation von hunderten Attributen pro Datensatz, ohne dass die UI unübersichtlich oder die Logik fehleranfällig wird."
    },
    en: {
      description: "High-density real estate dashboard. Focus on high-performance filter logic and clean data representation.",
      highlights: [
        "Development of a multi-dimensional, error-free filter architecture",
        "Validation of inventory data for consistency and duplicates",
        "Performance audit of the search engine for instant feedback"
      ],
      challenges: "Presenting hundreds of attributes per record without making the UI cluttered or the logic prone to errors."
    }
  },
  {
    id: "lcg",
    title: "Le Chansonnier Global",
    url: "https://le-chansonnier-global.vercel.app",
    tech: ["React", "Accessibility-Audit", "Global-Scale"],
    gradient: "bg-indigo-600",
    de: {
      description: "Globaler Kultur-Showcase. Fokus auf barrierefreie UI-Architektur und internationale Daten-Konsistenz.",
      highlights: [
        "Mehrstufiger Audit der Accessibility (WCAG)",
        "Globale CDN-Optimierung für Zero-Latency",
        "Zentralisierte Logik für mehrsprachige Inhalte"
      ],
      challenges: "Gewährleistung einer identischen Experience über diverse kulturelle und technische Grenzen hinweg."
    },
    en: {
      description: "Global cultural showcase. Focus on accessible UI architecture and international data consistency.",
      highlights: [
        "Multi-stage accessibility audit (WCAG)",
        "Global CDN optimization for zero-latency",
        "Centralized logic for multi-language content"
      ],
      challenges: "Ensuring an identical experience across diverse cultural and technical boundaries."
    }
  }
];

export default function App() {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [cvMode, setCvMode] = useState<'short' | 'pdf'>('short');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  // Helper for logging to AuditTerminal
  const logToTerminal = (message: string, type: 'SYSTEM' | 'UI' | 'LOGIC' = 'UI') => {
    window.dispatchEvent(new CustomEvent('portfolio-log', {
      detail: { message, type }
    }));
  };

  useEffect(() => {
    // ASCII Signature
    console.log(
      "%cPETAR BREKALO | UX AUDITOR\n%cPrecision Logic & Future-Proof Interfaces\n---------------------------------",
      "color: #FF5C00; font-size: 20px; font-weight: bold; font-family: monospace;",
      "color: #888; font-size: 12px; font-family: monospace;"
    );

    // Keyboard Shortcuts
    const handleKeys = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 't') {
        logToTerminal("Shortcut: Manual Theme Override", "SYSTEM");
        // ThemeToggle logic is internal, but we can log the attempt
      }
      if (e.altKey && e.key.toLowerCase() === 'l') {
        setLang(prev => prev === 'de' ? 'en' : 'de');
        logToTerminal(`Shortcut: Language toggled to ${lang === 'de' ? 'EN' : 'DE'}`, "UI");
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [lang]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      logToTerminal("Mobile Navigation Overlay: ACTIVE", "UI");
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
     logToTerminal(`Environment initialized: lang=${lang.toUpperCase()}, viewport=${window.innerWidth}px`, "SYSTEM");
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white relative">
      <TelemetryCursor />
      <AuditTerminal />
      <UXProBackground />
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-white/80 dark:bg-black/95 backdrop-blur-xl border-zinc-200 dark:border-white/10 transition-all duration-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="h-9 w-9 rounded-xl bg-brand-primary flex items-center justify-center text-white font-display font-bold shadow-lg shadow-brand-primary/30"
            >
              PB
            </motion.div>
            <span className="font-display font-bold tracking-tight hidden xs:block uppercase text-sm">Petar Brekalo</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-8 mr-6">
              <a href="#projects" className="text-xs font-bold uppercase tracking-widest hover:text-brand-primary transition-colors">{t.nav.projects}</a>
              <a href="#cv" className="text-xs font-bold uppercase tracking-widest hover:text-brand-primary transition-colors">{t.nav.cv}</a>
              <a href="#philosophy" className="text-xs font-bold uppercase tracking-widest hover:text-brand-primary transition-colors">{t.nav.philosophy}</a>
            </div>
            
            <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-white/10 pl-4">
              <button 
                onClick={() => {
                  setLang(lang === 'de' ? 'en' : 'de');
                  logToTerminal(`Language manually set to ${lang === 'de' ? 'English' : 'German'}`, "UI");
                }}
                className="flex items-center gap-1.5 p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Languages size={18} className="text-zinc-500" />
                <span className="text-[10px] font-bold uppercase font-mono">{lang === 'de' ? 'EN' : 'DE'}</span>
              </button>
              <ThemeToggle />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden h-10 w-10 flex items-center justify-center rounded-2xl bg-zinc-900/90 dark:bg-white/90 text-white dark:text-black shadow-xl backdrop-blur-md cursor-pointer active:scale-90 transition-all border border-white/10 dark:border-black/10"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-white/10 p-6 md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-6 text-center">
                <a 
                  href="#projects" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-display font-bold py-2"
                >
                  {t.nav.projects}
                </a>
                <a 
                  href="#cv" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-display font-bold py-2"
                >
                  {t.nav.cv}
                </a>
                <a 
                  href="#philosophy" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-display font-bold py-2"
                >
                  {t.nav.philosophy}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-brand-primary/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-4 py-1.5 ">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-zinc-500">{t.hero.badge}</span>
            </div>
            
            <h1 className="font-display text-5xl font-bold leading-[1.1] sm:text-7xl mb-8">
              {t.hero.title} <span className="text-brand-primary italic">{t.hero.titleAccent}</span>
            </h1>
            
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects"
                className="group flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-4 text-sm font-bold text-white dark:text-black transition-all hover:scale-105"
              >
                {t.hero.cta}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <div className="flex items-center gap-4 px-4 overflow-hidden">
                <ShieldCheck size={24} className="text-brand-green" />
                <span className="text-[10px] uppercase font-bold tracking-tighter text-zinc-400">Tested to Audit Standards</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* CV Section */}
      <section id="cv" className="py-24 bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold mb-2">{t.nav.cv}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 uppercase text-xs font-bold tracking-widest">Mag. Petar Brekalo</p>
            </div>
            
            <div className="flex p-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <button 
                onClick={() => setCvMode('short')}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer",
                   cvMode === 'short' ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10" : "text-zinc-400"
                )}
              >
                <FileText size={14} />
                {t.cv.titleShort}
              </button>
              <button 
                onClick={() => setCvMode('pdf')}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer",
                   cvMode === 'pdf' ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10" : "text-zinc-400"
                )}
              >
                <Download size={14} />
                {t.cv.titlePdf}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {cvMode === 'short' ? (
              <motion.div 
                key="short"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              >
                <div className="lg:col-span-2 space-y-12">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-12">{t.cv.summary}</h3>
                    <div className="space-y-8 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-zinc-200 dark:before:bg-white/10">
                      {t.cv.stages.map((stage: any, i: number) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="relative pl-16 group"
                        >
                          <div className="absolute left-0 top-0 h-12 w-12 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform z-10">
                              {stage.icon === "ShieldCheck" && <ShieldCheck size={20} />}
                              {stage.icon === "Binary" && <Binary size={20} />}
                              {stage.icon === "Sparkles" && <Sparkles size={20} />}
                              {stage.icon === "Zap" && <Zap size={20} />}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-2">{stage.title}</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">{stage.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-8 rounded-3xl bg-zinc-900 text-white overflow-hidden relative border border-white/5">
                    <div className="absolute right-0 top-0 opacity-10 pointer-events-none"><Terminal size={200} /></div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 relative z-10">{t.cv.skills}</h3>
                    <div className="flex flex-wrap gap-3 relative z-10">
                        {["React 19", "Vite", "TypeScript", "Three.js", "Zustand", "Tailwind 4", "D3.js", "Socket.IO", "Firebase", "Audit Methodologies"].map(s => (
                            <span key={s} className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-mono">{s}</span>
                        ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                   <div className="p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5">
                      <h4 className="font-display font-bold mb-4">{t.cv.education}</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-brand-primary font-bold">Magister</p>
                          <p className="text-sm font-bold">University of Economics</p>
                          <p className="text-xs text-zinc-500 uppercase tracking-tighter">Wirtschaftsuniversität Wien</p>
                        </div>
                      </div>
                   </div>
                   <div className="p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-brand-primary text-white shadow-xl shadow-brand-primary/20">
                      <h4 className="font-display font-bold mb-4 italic">Auditor Background</h4>
                      <p className="text-sm leading-relaxed opacity-90">
                        "Decades of precision in system analysis, now translated into professional code architectures and stable UX cycles."
                      </p>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="pdf"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5"
              >
                <div className="h-20 w-20 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6">
                    <FileText size={40} className="text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Portfolio Mirror</h3>
                <p className="text-zinc-500 mb-8 px-4 text-center">Access my professional records, full certifications, and PDF assets at the main CV link.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                      href="https://cv-brekalo.vercel.app" 
                      target="_blank"
                      className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer shadow-lg"
                  >
                      <Globe size={18} />
                      cv-brekalo.vercel.app
                  </a>
                  <a 
                      href="https://github.com/brexchain" 
                      target="_blank"
                      className="flex items-center gap-2 bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer shadow-lg border border-zinc-300 dark:border-white/10"
                  >
                      <Github size={18} />
                      brexchain
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Future Showcase */}
      <section className="py-24 border-b border-zinc-200 dark:border-white/10 overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-2 block">{t.future.badge}</span>
            <h2 className="font-display text-4xl font-bold">{t.future.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.future.items.map((item: any, i: number) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm"
              >
                <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6 text-brand-primary">
                    {i === 0 && <Zap size={24} />}
                    {i === 1 && <Layers size={24} />}
                    {i === 2 && <Activity size={24} />}
                </div>
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-24 bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-bold mb-4">{t.projects.title}</h2>
              <p className="text-zinc-500 dark:text-zinc-400">{t.projects.desc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS_DATA.map((p) => {
              const content = lang === 'de' ? p.de : p.en;
              return (
                <ProjectCard 
                  key={p.id}
                  title={p.title}
                  description={content.description}
                  url={p.url}
                  tech={p.tech}
                  gradient={p.gradient}
                  highlights={content.highlights}
                  challenges={content.challenges}
                  labels={{
                    highlights: t.projects.highlights,
                    challenge: t.projects.challenges
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 relative overflow-hidden bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-4 text-brand-green font-mono text-xs uppercase tracking-[0.2em] font-bold underline decoration-2 underline-offset-8">{t.philosophy.badge}</div>
              <h2 className="font-display text-4xl font-bold mb-8 italic">{t.philosophy.title}</h2>
              <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>{t.philosophy.p1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm">
                    <h4 className="font-display font-bold text-zinc-900 dark:text-white mb-2">{t.philosophy.card1.title}</h4>
                    <p className="text-xs">{t.philosophy.card1.desc}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm">
                    <h4 className="font-display font-bold text-zinc-900 dark:text-white mb-2">{t.philosophy.card2.title}</h4>
                    <p className="text-xs">{t.philosophy.card2.desc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group lg:block hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-green rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-zinc-900 rounded-3xl p-8 border border-white/10 font-mono text-sm text-green-400">
                <div className="flex gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2">
                  <p><span className="text-purple-400">class</span> AuditorDeveloper &#123;</p>
                  <p className="pl-4"><span className="text-blue-400">constructor</span>() &#123;</p>
                  <p className="pl-8"><span className="text-zinc-500">// decade of precision</span></p>
                  <p className="pl-8"><span className="text-blue-400">this</span>.eyeForDetail = <span className="text-orange-400">Infinity</span>;</p>
                  <p className="pl-8"><span className="text-blue-400">this</span>.uxFun = <span className="text-orange-400">true</span>;</p>
                  <p className="pl-4">&#125;</p>
                  <p className="pl-4"><span className="text-blue-400">deploy</span>(code) &#123;</p>
                  <p className="pl-8 text-yellow-400">if (isStable(code) && feelsGreat(code)) &#123;</p>
                  <p className="pl-12 text-green-400">return "Stable & Fun 🚀";</p>
                  <p className="pl-8 text-yellow-400">&#125;</p>
                  <p>&#125;&#125;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-zinc-900 text-white">
        <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl sm:text-6xl font-bold mb-8">{t.contact.title}</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.contact.desc}
            </p>
            
            <div className="mb-16">
              <WhatsAppContact 
                phoneNumber="+436508278461" 
                labels={t.contact.wa}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-8">
                <a href="https://cv-brekalo.vercel.app" target="_blank" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase text-xs tracking-widest cursor-pointer">
                  <Globe size={18} /> {t.contact.fullCv}
                </a>
                <a href="https://www.linkedin.com/in/p-brekalo" target="_blank" className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black transition-colors duration-500">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-zinc-400 font-mono uppercase tracking-[0.2em]">
          <p>© 2024 Petar Brekalo. Crafted for Precision.</p>
          <div className="flex gap-8 items-center">
            <a href="https://github.com/brexchain" target="_blank" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <Github size={12} /> Github
            </a>
            <span className="opacity-30">|</span>
            <span className="hover:text-zinc-600 transition-colors">React 19</span>
            <span className="hover:text-zinc-600 transition-colors">Vite 6</span>
            <span className="hover:text-zinc-600 transition-colors">Tailwind 4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
