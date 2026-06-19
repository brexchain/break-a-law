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
import { translations } from './translations';
import { cn } from './lib/utils';

const PROJECTS_DATA = [
  {
    id: "pd",
    title: "Park Dog",
    url: "https://park-dog.vercel.app",
    tech: ["React", "Firebase", "Live-Map", "Mobile-UX"],
    gradient: "bg-blue-500",
    de: {
      description: "Interaktive Echtzeit-Plattform für Hundebesitzer in Wien. Koordinieren Sie Playdates in Hundezonen und vernetzen Sie sich spielerisch mit der Community.",
      highlights: [
        "Interaktive Leaflet-Karte mit Live-Aktivitätsanzeige",
        "Echtzeit-Synchronisierung der Hundezone-Status via Firebase",
        "Community-Features zur Absprache von Hundespielen"
      ],
      challenges: "Robuste Echtzeit-Synchronisierung bei gleichzeitigem Zugriff vieler aktiver Nutzer."
    },
    en: {
      description: "Real-time coordination platform for dog owners in Vienna. Plan playdates at local dog parks and connect with the community seamlessly.",
      highlights: [
        "Interactive Leaflet map displaying real-time activity",
        "Real-time park occupancy status synced via Firebase",
        "Community lounge for quick playdate arrangements"
      ],
      challenges: "Ensuring reliable real-time updates and synchronization with active mobile traffic."
    }
  },
  {
    id: "bw",
    title: "Baum Wien",
    url: "https://baumwien.vercel.app",
    tech: ["D3.js", "GeoJSON", "Map-Visualization"],
    gradient: "bg-emerald-500",
    de: {
      description: "Interaktive Visualisierung städtischer OGD-Baumdaten der Stadt Wien. Spielerisches Erkunden von über 100.000 registrierten Stadtbäumen.",
      highlights: [
        "Normalisierung und Rendering von 100k+ OGD-Datenpunkten",
        "Interaktiver Filter nach Baumart, Bezirk und Pflanzjahr",
        "Detaillierte Charts zur Wiener Stadtökologie"
      ],
      challenges: "Verarbeitung und flüssiges Zeichnen riesiger Datenmengen direkt im Webbrowser."
    },
    en: {
      description: "Interactive visualization of public urban tree data from Vienna. Explore and filter over 100,000 registered urban trees.",
      highlights: [
        "Normalization and rendering of 100k+ public data records",
        "Interactive search & filters by species, district, and planting year",
        "Detailed statistical charts representing urban ecology"
      ],
      challenges: "Achieving highly responsive rendering of massive geographical datasets."
    }
  },
  {
    id: "sz",
    title: "Schweizer",
    url: "https://schweizer.vercel.app",
    tech: ["React", "Framer Motion", "Design-System"],
    gradient: "bg-zinc-500",
    de: {
      description: "Modernes Digital-Showcase für hochwertige Metallbau- und Fassadensysteme. Fokus auf Ästhetik und kompromisslose Layout-Präzision.",
      highlights: [
        "Ablenkungsfreie Präsentation von Schweizer Premium-Fassadenprojekten",
        "Flüssiges Gallery-Layout mit anspruchsvollen Animationen",
        "Optimierte Asset-Pipeline für extrem schnelle Ladezeiten"
      ],
      challenges: "Aufrechterhaltung perfekter Design-System-Konsistenz über alle Viewports hinweg."
    },
    en: {
      description: "High-end web presentation for premium architectural metal and glass facade systems. Focus on layout precision.",
      highlights: [
        "Clean presentation of high-end Schweizer facade construction projects",
        "Fluid gallery layout with custom entrance animations",
        "Fine-tuned asset loading pipeline for near-instant speed"
      ],
      challenges: "Preserving grid layout precision across all responsive form factors."
    }
  },
  {
    id: "bm",
    title: "Brauhof Max",
    url: "https://brauhof-max.vercel.app",
    tech: ["React", "Vite", "Responsive-UI"],
    gradient: "bg-amber-600",
    de: {
      description: "Elegante Webpräsenz für das Traditionsgasthaus und Hotel Brauhof Max in Amstetten. Digitale Speisekarte, Buchungshinweise und Reservierungen.",
      highlights: [
        "Übersichtliche und responsive Präsentation der Speisen",
        "Direkte Anbindung an den Tischreservierungs-Kanal",
        "Modernes Design gepaart mit traditioneller Gastfreundschaft"
      ],
      challenges: "Mobil-optimiertes Interface für schnelle Erreichbarkeit von Unterwegs."
    },
    en: {
      description: "Aesthetic digital showcase for the traditional Austrian restaurant and hotel Brauhof Max. Features dynamic menu boards and reservation info.",
      highlights: [
        "Structured and fully responsive digital dining menus",
        "Quick-access table reservation triggers and contact touchpoints",
        "Clean interface pairing modern layouts with hospitality heritage"
      ],
      challenges: "Achieving excellent readability and performance for mobile diners on the go."
    }
  },
  {
    id: "cw",
    title: "Coffee-Werk",
    url: "https://coffeewerk.vercel.app",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    gradient: "bg-orange-600",
    de: {
      description: "Repräsentative Webpräsenz für das Kaffee-Erlebnis im Coffee-Werk. Präsentation feinster Röstungen, Getränkekarten und der Café-Atmosphäre.",
      highlights: [
        "Ansprechende Produktinszenierung von hauseigenen Kaffeesorten",
        "Interaktive digitale Getränkekarte mit Geschmacksdetails",
        "Anspruchsvolle Typografie und flüssige Übergangseffekte"
      ],
      challenges: "Übertragung der ansprechenden Café-Atmosphäre in ein makelloses digitales Design."
    },
    en: {
      description: "Representative web presence for the coffee culture at Coffee-Werk. Showcasing premium roasts, cafe menus, and local charm.",
      highlights: [
        "Beautiful presentation of custom coffee roasts and blends",
        "Interactive menu boards outlining beverage parameters",
        "Sophisticated typography and seamless element transitions"
      ],
      challenges: "Translating the warm café atmosphere into a stunning digital brand universe."
    }
  },
  {
    id: "tbb",
    title: "The Butler Brigade",
    url: "https://the-butler-brigade.vercel.app",
    tech: ["React", "Framer Motion", "Premium-Design"],
    gradient: "bg-slate-700",
    de: {
      description: "Premium-Dienstleistungsportal für exklusives Haushaltsmanagement, privaten Kochservice und gehobene Butler-Dienste.",
      highlights: [
        "Elegantes Design-System passend zur exklusiven Dienstleistung",
        "Diskretes, unkompliziertes Booking-Interface für Premium-Kunden",
        "Moderne Darstellung der anspruchsvollen Servicekataloge"
      ],
      challenges: "Erschaffung einer digitalen Ästhetik von diskreten, erstklassigen Dienstleistungen."
    },
    en: {
      description: "Premium agency portal for luxury household management, private dining, and elite butler assistance services.",
      highlights: [
        "Elite design system matching high-end agency branding",
        "Discreet, straightforward booking triggers for premium clients",
        "Interactive presentation of luxury service packages"
      ],
      challenges: "Portraying premium services with a sense of security, polish, and elegance."
    }
  },
  {
    id: "cv",
    title: "Capoeira Vienna",
    url: "https://capoeiravienna.vercel.app",
    tech: ["React", "Community-Hub", "Media-Gallery"],
    gradient: "bg-green-600",
    de: {
      description: "Lebendiges Sport- und Community-Portal der Capoeira-Schule in Wien. Aktuelle Trainingspläne, Event-Buchungen und packende Video-Showcases.",
      highlights: [
        "Interaktiver Trainingskalender mit Filter nach Leistungsstufe",
        "Einfaches Anmeldesystem für Workshops und Spezialevents",
        "Flüssiges Streaming rasanter Trainingsvideos"
      ],
      challenges: "Benutzerfreundliche Organisation des dynamischen Trainings- und Eventangebots."
    },
    en: {
      description: "Dynamic web hub for the Capoeira community academy in Vienna. Integrates training schedules, event bookings, and media galleries.",
      highlights: [
        "Interactive weekly practice calendar with stage filtering",
        "Seamless sign-up triggers for workshops and roda events",
        "Optimized media galleries displaying high-energy martial arts"
      ],
      challenges: "Structuring highly dynamic event schedules in a clean, comprehensive format."
    }
  },
  {
    id: "ts",
    title: "Paumann",
    url: "https://paumann.vercel.app",
    tech: ["Next.js", "Framer Motion", "SVG-Assets"],
    gradient: "bg-red-500",
    de: {
      description: "Hervorragende Webpräsenz für Elektro Paumann GmbH. Kompetente Präsentation von Photovoltaik, Loxone Smart Home und moderner Elektroinstallation.",
      highlights: [
        "Interaktiver Photovoltaik-Rechner für erste Kostenschätzungen",
        "Elegante Portfolio-Auswahl für Wohn- und Gewerbebau-Referenzen",
        "SEO-optimiertes und blitzschnelles Performance-Layout"
      ],
      challenges: "Strukturierte Vermittlung komplexer Haustechnik-Themen in einem ansprechenden Design."
    },
    en: {
      description: "Aesthetic enterprise platform for Elektro Paumann GmbH. Clean showcase of photovoltaic systems, Loxone smart automation, and electrical engineering.",
      highlights: [
        "Interactive solar system size estimate helper tools",
        "Elegant layout for residential and commercial references",
        "Highly search-engine-optimized performance framework"
      ],
      challenges: "Synthesizing deep technical parameters of green energy into accessible customer paths."
    }
  },
  {
    id: "ttl",
    title: "Triny Three",
    url: "https://triny-three.vercel.app",
    tech: ["Three.js", "React Three Fiber", "WebGL"],
    gradient: "bg-orange-500",
    de: {
      description: "Interaktives 3D-Showcase auf Basis von Three.js. Erkundung von reaktiven WebGL-Umgebungen und zukunftsweisendem Interface-Design.",
      highlights: [
        "Echtzeit-3D-Rendering-Pipeline mit anspruchsvollen Shadern",
        "Interaktiver Trackball-Kameresteuerungs-Fluss",
        "Nahtloser Übergang zwischen 3D-Visualisierung und flachem UI-DOM"
      ],
      challenges: "Vermeidung von Leistungseinbußen auf mobilen Grafikchips bei aufwendigem 3D-Rendering."
    },
    en: {
      description: "Immersive 3D agency showcase powered by Three.js. Exploration of responsive WebGL environments and forward-looking interaction layouts.",
      highlights: [
        "Real-time interactive 3D scene architecture using modern shaders",
        "Fluid trackball camera interaction paths",
        "Smooth integration of WebGL scenes with traditional HTML components"
      ],
      challenges: "Ensuring stable render frame rates across mobile graphics hardware."
    }
  },
  {
    id: "lcg",
    title: "Le Chansonnier Global",
    url: "https://le-chansonnier-global.vercel.app",
    tech: ["React", "Framer Motion", "Aesthetic-Typography"],
    gradient: "bg-indigo-600",
    de: {
      description: "Stilvolle Webpräsenz für Le Chansonnier – französische Weinbar & Bistro in Wien. Präsentation erlesener Weine und Bistro-Gerichte.",
      highlights: [
        "Interaktive Weinkarte mit Filterung nach Rebsorten und Herkunftsregionen",
        "Ästhetisches Bild-Showcase der französischen Spezialitäten",
        "Nahtlose Desktop- und Mobil-Reservierungsmöglichkeiten"
      ],
      challenges: "Übertragung der gemütlichen, edlen Abendstimmung des Bistros auf das digitale User-Interface."
    },
    en: {
      description: "Sophisticated web presence for Le Chansonnier – French wine bar & bistro in Vienna. Presenting curated wine selections and dining menus.",
      highlights: [
        "Interactive wine collection table filtering by region and grape",
        "Elegant visual showcase of culinary kitchen specials",
        "Seamless booking triggers for tables and wine tastings"
      ],
      challenges: "Evoking the warm, candlelit atmosphere of the bistro via clean typography and shadows."
    }
  },
  {
    id: "nag",
    title: "No-Ads Guitar Tuner",
    url: "https://noaddsguitartuner.vercel.app/",
    tech: ["Web Audio API", "Pitch Detection", "React"],
    gradient: "bg-indigo-500",
    de: {
      description: "100% werbefreies, hochpräzises Web-Audiostimmgerät für Saiteninstrumente. Echtzeit-Frequenzanalyse direkt im Browser über Mikrofoneingaben.",
      highlights: [
        "Latenzfreie Tonhöhen-Visualisierung auf einer virtuellen Stimm-Nadel",
        "Automatische und manuelle Saitenauswahl für diverse Stimmungen",
        "Keine Registrierung oder lästige Werbung – reiner Funktionsfokus"
      ],
      challenges: "Störungsfreie Frequenzisolierung aus dem Mikrofonsignal in lauten Umgebungen."
    },
    en: {
      description: "Clean, 100% ad-free, high-precision browser-based guitar tuner. Features real-time pitch detection using microphone inputs.",
      highlights: [
        "Instant low-latency tuning feedback on a responsive visual needle",
        "Both hands-free auto-detection and manual pitch playback",
        "Zero install steps, cookie walls, or ads – maximum utility focus"
      ],
      challenges: "Extracting and filtering precise pitch frequencies from ambient mic noise."
    }
  },
  {
    id: "bs",
    title: "Balkan Studi",
    url: "https://balkanstudi.vercel.app",
    tech: ["Next.js", "Algolia/Search", "Catalog-UX"],
    gradient: "bg-teal-600",
    de: {
      description: "Akademisches Infoportal für Studierende in der Balkanregion. Strukturierte Darstellung von Studiengängen, Voraussetzungen und Dokumenten.",
      highlights: [
        "Kataloge von Studiengängen und kooperierenden Universitäten",
        "Flüssige Suchfunktionen mit sofortigem Suchergebnisformular",
        "Ressourcen-Verzeichnis zur Orientierung im Studiensystem"
      ],
      challenges: "Strukturierte Aufbereitung heterogener Studiendaten verschiedener Bildungsstätten."
    },
    en: {
      description: "Educational catalog and info portal for students in the Balkan region. Organizes courses, requirements, and key study resources.",
      highlights: [
        "Structured catalog mapping regional university courses and degrees",
        "Instant multi-attribute search and responsive filter lists",
        "Helpful resource checklists and survival guides for freshmen"
      ],
      challenges: "Establishing a standardized, pleasant reading hierarchy for course databases."
    }
  },
  {
    id: "mp",
    title: "Mixpult",
    url: "https://mixpult.vercel.app",
    tech: ["Web Audio API", "Svelte/React", "Analyser-Node"],
    gradient: "bg-purple-600",
    de: {
      description: "Interaktives Web-Mischpult und DJ-Mischpult. Mehrspur-Routing, Frequenz-Equalizer und Audioeffekte direkt im Webbrowser.",
      highlights: [
        "Echtzeit-Kanalabmischung mit Gain und Equalizer (High/Mid/Low)",
        "Flüssige Waveform- und Level-Meter-Analysen direkt am Deck",
        "Interaktiver Crossfader zur nahtlosen Überblendung von Songs"
      ],
      challenges: "Vermeidung von Latenzverzögerungen und Knistern bei der parallelen Wiedergabe mehrerer Audiospuren."
    },
    en: {
      description: "Fully interactive browser-based audio mixer program. Features multi-track deck routing, EQs, and real-time signal analysis.",
      highlights: [
        "True-to-hardware multi-channel mixing, knobs, and deck gain EQs",
        "Hardware-simulated dynamic frequency analyser and status meters",
        "Physical-inspired faders and active crossfading sliders"
      ],
      challenges: "Buffering and rendering dense multitrack audios without pops, clicks, or visual delays."
    }
  }
];

export default function App() {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [cvMode, setCvMode] = useState<'short' | 'pdf'>('short');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white relative">
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
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="flex items-center gap-1.5 p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Languages size={18} className="text-zinc-500" />
                <span className="text-[10px] font-bold uppercase font-mono">{lang === 'de' ? 'EN' : 'DE'}</span>
              </button>
              <ThemeToggle />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black shadow-lg cursor-pointer active:scale-95 transition-transform"
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
