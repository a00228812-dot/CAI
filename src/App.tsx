import React, { useEffect, useRef, useState } from "react";
import { CloudShader } from "@/components/ui/cloud-shader";
import Cloudscape from "@/components/ui/cloudscape";
import DiscCascadeCarousel, { DiscCascadeItem } from "@/components/ui/disc-cascade-carousel";
import VideoPlayer from "@/components/ui/video-player";
import { GlassRevealCai } from "@/components/ui/liquid-glass-logo-reveal";
import ProceduralGroundBackground from "@/components/ui/procedural-ground-background";
const nubesVideoSrc = "/NUBES.mp4";
import {
  Play,
  Pause,
  X,
  PlusCircle,
  Volume2,
  VolumeX,
  Sparkles,
  Lock,
  ArrowDown,
  Clock,
  MapPin,
  CheckCircle2,
  Film,
  UserCheck,
} from "lucide-react";

// --- Video Talks Data ("BBVA Aprendemos Juntos" format for Autism Awareness) ---
export interface TalkVideo {
  id: number;
  title: string;
  speaker: string;
  role: string;
  duration: string;
  category: string;
  quote: string;
  synopsis: string;
  thumbnail: string;
  videoUrl?: string;
}

const TALKS_DATA: TalkVideo[] = [
  {
    id: 1,
    title: "Mirar el mismo cielo desde una mente diferente",
    speaker: "Dra. Elena Valenzuela",
    role: "Directora Clínica CAI • Neurodesarrollo",
    duration: "24:18",
    category: "Conciencia & Empatía",
    quote:
      "“El autismo no es un error de procesamiento; es otra arquitectura de la sensibilidad humana. Cuando dejamos de exigirles que encajen en moldes prestados, empiezan a construir su propio camino.”",
    synopsis:
      "Una conversación íntima al estilo 'Aprendemos Juntos' sobre cómo la comprensión familiar y escolar transforma la vida de los niños en el espectro autista, abriendo las puertas a su verdadera independencia.",
    thumbnail:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "El silencio también habla: Escuchar más allá de las palabras",
    speaker: "Mateo & Lucía Rivera",
    role: "Testimonio Familiar CAI",
    duration: "19:45",
    category: "Testimonio en Primera Persona",
    quote:
      "“Durante años pensé que mi hijo estaba atrapado en su mundo. En CAI aprendí que él no estaba encerrado: nos estaba esperando afuera, mirando las nubes con una paz que nosotros habíamos olvidado.”",
    synopsis:
      "Lucía comparte el viaje junto a su hijo Mateo desde el diagnóstico temprano hasta sus primeros pasos de vida independiente y comunicación alternativa.",
    thumbnail:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Mi propio camino: Descubrir mi autonomía y vocación",
    speaker: "Carlos Valderrama",
    role: "Joven Adulto Autista & Desarrollador",
    duration: "28:10",
    category: "Vida Independiente",
    quote:
      "“La gente suele ver lo que me cuesta hacer en una habitación ruidosa, pero rara vez ve los universos que puedo construir cuando se respeta mi ritmo.”",
    synopsis:
      "Carlos relata en primera persona el desafío de crecer sintiéndose incomprendido por el entorno social, y cómo las herramientas de autonomía del CAI le permitieron forjar su carrera profesional.",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "La sobrecarga sensorial explicada desde adentro",
    speaker: "Sofía Carballo",
    role: "Ilustradora, Activista TEA & Mentora",
    duration: "21:30",
    category: "Mundo Sensorial",
    quote:
      "“Imagina escuchar cada gota de lluvia como si cayera dentro de tu piel. No es capricho ni distancia: es sentir el mundo sin filtros.”",
    synopsis:
      "Un recorrido visual y auditivo por lo que experimenta un niño o joven autista frente a estímulos cotidianos, y cómo pequeños gestos de empatía ciudadana cambian su día por completo.",
    thumbnail:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "Educar para la libertad, no para la obediencia",
    speaker: "Prof. Marcos Restrepo",
    role: "Especialista en Autonomía y Transición",
    duration: "31:05",
    category: "Pedagogía Inclusiva",
    quote:
      "“Nuestra meta en CAI nunca ha sido que el niño parezca neurotípico; nuestra meta es que sea libre, autónomo y feliz siendo quien es.”",
    synopsis:
      "Herramientas prácticas para padres, docentes y comunidades que buscan acompañar a niños con autismo hacia una vida adulta plena y autónoma.",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Derribando el mito de la falta de empatía",
    speaker: "Valeria Sotomayor",
    role: "Cofundadora de la Causa CAI",
    duration: "25:50",
    category: "Concientización Social",
    quote:
      "“Sentimos tanto que a veces nos quedamos sin voz. Contar nuestra historia es el primer puente para que nadie vuelva a sentirse solo bajo este cielo.”",
    synopsis:
      "Por qué la sociedad confunde una expresión emocional distinta con indiferencia, y cómo las charlas abiertas transforman la mirada colectiva.",
    thumbnail:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
  },
];

const DISC_ITEMS_DATA: DiscCascadeItem[] = TALKS_DATA.map((talk) => ({
  title: talk.title,
  src: talk.thumbnail,
  alt: `${talk.title} — ${talk.speaker}`,
  credits: [
    { label: "Ponente", value: talk.speaker },
    { label: "Rol", value: talk.role },
    { label: "Duración", value: talk.duration },
    { label: "Enfoque", value: talk.category },
  ],
  reviews: [
    {
      source: "Testimonio CAI",
      quote: talk.quote.replace(/^[“”"']+|[“”"']+$/g, ""),
      stars: 5,
    },
    {
      source: "Sinopsis",
      quote: talk.synopsis,
      stars: 5,
    },
  ],
}));

// --- Events Data (Admin-published) ---
export interface CommunityEvent {
  id: string;
  day: string;
  monthYear: string;
  title: string;
  category: string;
  location: string;
  time: string;
  description: string;
}

const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: "ev-1",
    day: "18",
    monthYear: "NOV 2026",
    title: "Círculo Abierto: Mirando el Cielo de Nuestros Hijos",
    category: "Encuentro Familiar & Testimonios",
    location: "Jardín Sensorial CAI / Transmisión en Vivo",
    time: "17:30 hrs",
    description:
      "Un espacio al aire libre libre de juicios para escuchar a jóvenes autistas y familias compartir sus aprendizajes en el camino hacia la vida independiente.",
  },
  {
    id: "ev-2",
    day: "26",
    monthYear: "NOV 2026",
    title: "Taller de Autonomía Cotidiana: Mi Propio Camino",
    category: "Autonomía & Independencia",
    location: "Centro CAI — Aula Abierta",
    time: "10:00 hrs",
    description:
      "Jornada práctica para niños, jóvenes y acompañantes enfocada en habilidades para la vida diaria, toma de decisiones y confianza personal.",
  },
  {
    id: "ev-3",
    day: "05",
    monthYear: "DIC 2026",
    title: "Noche de Charlas: Empatía en Primera Persona",
    category: "Formato Aprendemos Juntos",
    location: "Auditorio Abierto CAI",
    time: "19:00 hrs",
    description:
      "Grabación en vivo de nuevas charlas de concientización con especialistas, terapeutas y portavoces en el espectro autista.",
  },
];

/**
 * ScrollBlurReveal
 * Desenfoca al entrar y deja el elemento 100% nítido (`filter: none`, `transform: none`)
 * tan pronto está en pantalla, garantizando lectura clara y fluidez en el carrusel 3D.
 */
const ScrollBlurReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxBlur?: number;
}> = ({ children, className = "", maxBlur = 18 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let currentP = 0;

    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 900;

        const start = vh * 0.96;
        const end = vh * 0.64;
        let targetP = (start - rect.top) / (start - end);

        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100;
        if (atBottom && rect.top < vh) {
          targetP = 1;
        }

        targetP = Math.max(0, Math.min(1, targetP));
        currentP += (targetP - currentP) * 0.14;

        if (currentP > 0.985) {
          el.style.filter = "none";
          el.style.opacity = "1";
          el.style.transform = "none";
        } else {
          const blur = ((1 - currentP) * maxBlur).toFixed(2);
          const opacity = (0.15 + currentP * 0.85).toFixed(3);
          const y = ((1 - currentP) * 28).toFixed(1);
          el.style.filter = `blur(${blur}px)`;
          el.style.opacity = opacity;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [maxBlur]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/**
 * ScrollTrailingDots
 * Va "escribiendo" puntitos suspensivos hacia la derecha de "actualidad"
 * uno por uno a medida que el usuario hace scroll, donde cada punto aparece con
 * el mismo efecto de blur -> enfoque, respetando un margen amplio antes del borde de la pantalla.
 */
const ScrollTrailingDots: React.FC<{ totalDots?: number }> = ({
  totalDots = 8,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;
    let smoothProgress = 0;

    const updateDots = () => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 900;

        // Comienza a escribir los puntos cuando la frase entra en el tercio inferior (78% vh)
        // y termina de escribirlos cuando sube hacia el tercio superior (32% vh)
        const startY = vh * 0.78;
        const endY = vh * 0.32;
        let targetProgress = (startY - rect.top) / (startY - endY);
        targetProgress = Math.max(0, Math.min(1, targetProgress));

        smoothProgress += (targetProgress - smoothProgress) * 0.14;

        for (let i = 0; i < totalDots; i++) {
          const dotEl = dotRefs.current[i];
          if (!dotEl) continue;

          // Los primeros 3 puntos aparecen temprano y los demás se van escribiendo progresivamente a su derecha
          const dotStart = (i / totalDots) * 0.72;
          const dotDuration = 0.28;
          let dotP = (smoothProgress - dotStart) / dotDuration;
          dotP = Math.max(0, Math.min(1, dotP));

          if (dotP > 0.985) {
            dotEl.style.opacity = "1";
            dotEl.style.filter = "none";
            dotEl.style.transform = "none";
          } else {
            const blurPx = ((1 - dotP) * 16).toFixed(2);
            const yPx = ((1 - dotP) * 10).toFixed(1);
            dotEl.style.opacity = dotP.toFixed(3);
            dotEl.style.filter = `blur(${blurPx}px)`;
            dotEl.style.transform = `translate3d(0, ${yPx}px, 0)`;
          }
        }
      }
      rafId = requestAnimationFrame(updateDots);
    };

    rafId = requestAnimationFrame(updateDots);
    return () => cancelAnimationFrame(rafId);
  }, [totalDots]);

  return (
    <span
      ref={containerRef}
      aria-label="..."
      className="inline-flex items-baseline ml-1 tracking-[0.12em]"
    >
      {Array.from({ length: totalDots }, (_, i) => (
        <span
          key={i}
          ref={(node) => {
            dotRefs.current[i] = node;
          }}
          className="inline-block will-change-[filter,opacity,transform]"
          style={{
            opacity: 0,
            filter: "blur(16px)",
          }}
        >
          .
        </span>
      ))}
    </span>
  );
};

export function App() {
  // Estado que controla la aparición de toda la interfaz exactamente a los 4.0 segundos
  // mientras las nubes del video NUBES.mp4 se abren dejando el cielo azul en medio
  // Intro Logo Reveal: activo en el medio exactamente durante 3.3 segundos
  const [showIntroReveal, setShowIntroReveal] = useState(true);
  const [introRevealed, setIntroRevealed] = useState(false);

  // Referencias para el movimiento fluido del cielo, el video NUBES.mp4 y las capas de nubes cercanas
  const daySkyContainerRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLVideoElement>(null);
  const nearCloudShaderRef = useRef<HTMLDivElement>(null);
  const nearCloudscapeRef = useRef<HTMLDivElement>(null);
  const heroBlockRef = useRef<HTMLDivElement>(null);
  const cornerFrameRef = useRef<HTMLDivElement>(null);
  const sadQuoteBlockRef = useRef<HTMLDivElement>(null);
  const videoFrozenRef = useRef(false);

  // Interactive states
  const [selectedTalk, setSelectedTalk] = useState<TalkVideo | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(24);

  // Events & Admin states
  const [events, setEvents] = useState<CommunityEvent[]>(INITIAL_EVENTS);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [adminError, setAdminError] = useState("");

  // New event form state
  const [newEvTitle, setNewEvTitle] = useState("");
  const [newEvDay, setNewEvDay] = useState("");
  const [newEvMonthYear, setNewEvMonthYear] = useState("DIC 2026");
  const [newEvCategory, setNewEvCategory] = useState("Concientización & Charla");
  const [newEvLocation, setNewEvLocation] = useState("Espacio Abierto CAI");
  const [newEvTime, setNewEvTime] = useState("18:00 hrs");
  const [newEvDesc, setNewEvDesc] = useState("");

  // Event registration modal
  const [bookingEvent, setBookingEvent] = useState<CommunityEvent | null>(null);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [sensoryNotes, setSensoryNotes] = useState("");

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [ambientAudio, setAmbientAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Temporizador exacto de 4.0 segundos al iniciar la página:
  // Durante los primeros 4 segundos solo se ve NUBES.mp4 abriéndose; a los 4s aparece todo de blur a enfoque.
  // Además forzamos scroll arriba (0,0) y bloqueamos cualquier restauración automática de scroll del navegador.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";

    const revealTimer = window.setTimeout(() => {
      window.scrollTo(0, 0);
      setIntroRevealed(true);
      document.documentElement.style.overflow = "";
    }, 3300);

    const cleanupTimer = window.setTimeout(() => {
      setShowIntroReveal(false);
    }, 4100);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(cleanupTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Control estricto del video NUBES.mp4:
  // Se reproduce una sola vez al iniciar y cuando falta exactamente 1 segundo para terminar se congela (pause)
  // sin reiniciarse nunca a menos que se recargue la página.
  useEffect(() => {
    const video = videoBgRef.current;
    if (!video) return;

    let rafId = 0;

    const checkVideoFreeze = () => {
      if (video && !videoFrozenRef.current) {
        const dur = video.duration;
        if (dur && Number.isFinite(dur) && dur > 1) {
          if (video.currentTime >= dur - 1.0) {
            video.pause();
            video.currentTime = dur - 1.0;
            videoFrozenRef.current = true;
            return;
          }
        }
      }
      if (!videoFrozenRef.current) {
        rafId = requestAnimationFrame(checkVideoFreeze);
      }
    };

    rafId = requestAnimationFrame(checkVideoFreeze);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Loop de inercia (60fps): controla el desvanecido continuo y las nubes cercanas sin bordes ni líneas de sombreado
  useEffect(() => {
    let rafId = 0;
    let smoothScrollY = window.scrollY;

    const animateSky = () => {
      const targetScrollY = window.scrollY;
      smoothScrollY += (targetScrollY - smoothScrollY) * 0.045;

      const vh = window.innerHeight || 900;
      const sVh = smoothScrollY / vh;

      // 1. Transición continua del Cielo Diurno hacia el Caso Triste Nocturno:
      // Calculada directamente con la posición en pantalla de la primera frase ("Pero la gente no entiende lo que significa ser así")
      // para que ANTES de que esa frase llegue al centro de la pantalla (cuando su centro va por 75% vh),
      // el background ya esté 100% en nublado nocturno (dayOpacity = 0).
      let dayOpacity = Math.max(0, Math.min(1, 1 - (sVh - 2.65) / 0.85));
      if (sadQuoteBlockRef.current) {
        const rect = sadQuoteBlockRef.current.getBoundingClientRect();
        const quoteCenterY = rect.top + rect.height / 2;
        // Comienza a oscurecerse durante la frase conectora ("En la actualidad...", ~155% vh)
        // y queda 100% nublado nocturno cuando la frase triste aún viene subiendo por el 72% de la pantalla (antes de llegar al centro 50%).
        const startFadeY = vh * 1.55;
        const fullyDarkY = vh * 0.72;
        dayOpacity = Math.max(
          0,
          Math.min(1, (quoteCenterY - fullyDarkY) / (startFadeY - fullyDarkY)),
        );
      }

      if (daySkyContainerRef.current) {
        daySkyContainerRef.current.style.opacity = dayOpacity.toFixed(4);
        daySkyContainerRef.current.style.visibility =
          dayOpacity <= 0.005 ? "hidden" : "visible";
      }

      if (cornerFrameRef.current) {
        cornerFrameRef.current.style.pointerEvents = "none";
      }

      // 2. Componentes de nubes (CloudShader & Cloudscape) ocupando SIEMPRE el 100% de la pantalla (fixed inset-0)
      // SIN trasladar el contenedor verticalmente para que JAMÁS se vea el borde del canvas ni ninguna línea de sombreado.
      // Solo aparecen después de que el usuario empieza a bajar desde la intro (sVh > 0.15)
      if (nearCloudShaderRef.current) {
        const scrollActivation = Math.min(1, Math.max(0, (sVh - 0.15) / 0.6));
        const nearOpacity = scrollActivation * 0.34;
        nearCloudShaderRef.current.style.opacity = nearOpacity.toFixed(3);
      }

      if (nearCloudscapeRef.current) {
        let bankOpacity = 0;
        if (sVh > 0.45 && sVh < 3.1) {
          bankOpacity =
            Math.sin(((sVh - 0.45) / 2.65) * Math.PI) * 0.36;
        }
        nearCloudscapeRef.current.style.opacity = Math.max(
          0,
          bankOpacity,
        ).toFixed(3);
      }

      // 3. Intro Hero se eleva con suavidad al hacer scroll
      if (heroBlockRef.current) {
        const heroScrollOpacity = Math.max(0, Math.min(1, 1 - sVh * 1.15));
        const heroY = smoothScrollY * -0.15;
        heroBlockRef.current.style.opacity = heroScrollOpacity.toFixed(3);
        heroBlockRef.current.style.transform = `translate3d(0, ${heroY.toFixed(1)}px, 0)`;
      }

      rafId = requestAnimationFrame(animateSky);
    };

    rafId = requestAnimationFrame(animateSky);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Gentle wind / sky ambient sound generator using Web Audio API
  const toggleAmbientSound = () => {
    if (!ambientAudio) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioContextClass();
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 0.035;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 420;

        whiteNoise.connect(filter);
        filter.connect(ctx.destination);
        whiteNoise.start(0);
        audioCtxRef.current = ctx;
        setAmbientAudio(true);
        triggerToast("Brisa del cielo activada • Sonido sensorial suave");
      } catch {
        setAmbientAudio(true);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setAmbientAudio(false);
      triggerToast("Sonido silenciado");
    }
  };

  const handleAdminPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvTitle.trim() || !newEvDay.trim()) return;

    const created: CommunityEvent = {
      id: `ev-${Date.now()}`,
      day: newEvDay.trim(),
      monthYear: newEvMonthYear.trim().toUpperCase(),
      title: newEvTitle.trim(),
      category: newEvCategory,
      location: newEvLocation.trim(),
      time: newEvTime.trim(),
      description: newEvDesc.trim(),
    };

    setEvents([created, ...events]);
    setNewEvTitle("");
    setNewEvDay("");
    setNewEvDesc("");
    setIsAdminModalOpen(false);
    triggerToast("Evento publicado por el Administrador en el cielo de CAI");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEvent) return;
    triggerToast(`¡Tu lugar en "${bookingEvent.title}" ha sido reservado!`);
    setBookingEvent(null);
    setParticipantName("");
    setParticipantEmail("");
    setSensoryNotes("");
  };

  return (
    <div className="relative min-h-screen w-full text-white selection:bg-[#f4eec7] selection:text-[#0d2b4e]">
      {/* =====================================================================
          BACKGROUND LAYER 1: "EL CASO TRISTE" (NUBES DE NOCHE / PROCEDURAL GROUND)
          Usado TAL CUAL está en RESOURCES.TXT (fixed inset-0 -z-10)
          + Capa de blur transparente (sin oscurecer el fondo) para suavizar los polígonos
            dejando ver completamente los colores y el movimiento del background
      ===================================================================== */}
      <ProceduralGroundBackground />
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-[5] backdrop-blur-[16px] bg-transparent"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-[4] mix-blend-screen opacity-3 blur-[18px]"
      >
        <Cloudscape
          colorBottom="#000000"
          colorMid="#1d2452"
          colorTop="#4a3b8c"
          speed={0.35}
          height="100vh"
          className="w-full h-full"
        />
      </div>

      {/* =====================================================================
          BACKGROUND LAYER 2: VIDEO REAL @[NUBES.mp4] COMO INTRO Y BACKGROUND
          Se reproduce una sola vez al iniciar y se congela 1s antes de terminar.
          + COMPONENTES DE NUBES FIJOS A PANTALLA COMPLETA (SIN BORDES NI LÍNEAS)
      ===================================================================== */}
      <div
        ref={daySkyContainerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#1b5a96]"
      >
        {/* 1) VIDEO REAL NUBES.mp4 (Sin loop: se congela 1 segundo antes de acabar) */}
        <video
          ref={videoBgRef}
          src={nubesVideoSrc}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 2) COMPONENTE CloudShader (DE RESOURCES.TXT TAL CUAL)
               Fijo a pantalla completa (inset-0) sin traslación de contenedor para que JAMÁS
               exista una línea horizontal ni borde de sombreado entre secciones */}
        <div
          ref={nearCloudShaderRef}
          className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none"
          style={{ opacity: 0 }}
        >
          <CloudShader
            className="h-full w-full"
            speed={1.05}
            count={4}
            cloudColor="#ffffff"
            skyTopColor="#000000"
            skyBottomColor="#000000"
          />
        </div>

        {/* 3) COMPONENTE Cloudscape / Nubes Dispersas (DE RESOURCES.TXT TAL CUAL)
               Fijo a pantalla completa (inset-0) en mix-blend-screen para que las nubes pasen
               frente a la cámara sin ningún borde ni corte */}
        <div
          ref={nearCloudscapeRef}
          className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none"
          style={{ opacity: 0 }}
        >
          <Cloudscape
            colorBottom="#000000"
            colorMid="#8cbfe8"
            colorTop="#ffffff"
            speed={0.85}
            height="100vh"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* =====================================================================
          MARCO EDITORIAL EN LAS 4 ESQUINAS (ESTILO DE LAS IMÁGENES ENVIADAS)
          Fuera del contenedor con filter/transform para que position: fixed siempre se ancle al viewport real
      ===================================================================== */}
      {/* =====================================================================
          INTRO LOGO REVEAL (EN EL MEDIO, EXACTAMENTE 3.3 SEGUNDOS)
      ===================================================================== */}
      {showIntroReveal && (
        <div
          className={`fixed inset-0 z-30 pointer-events-none flex items-center justify-center transition-opacity duration-700 ease-out select-none ${

            introRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ willChange: "opacity" }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <GlassRevealCai className="w-full h-full" />
          </div>
        </div>
      )}

      <div
        ref={cornerFrameRef}
        className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
      >
        <div
          className="relative w-full h-full"
          style={{
            opacity: introRevealed ? 1 : 0,
            filter: introRevealed ? "blur(0px)" : "blur(24px)",
            transition:
              "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Top-Left Corner: solo visible al pasar el puntero */}
          <div
            className="absolute top-0 left-0 p-7 sm:p-11 md:p-14 flex flex-col gap-1 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-default group"
          >
            <a
              href="#cielo"
              className="font-display text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] leading-[1.15] text-white hover:text-[#f4eec7] transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            >
              CONCIENTIZACIÓN DEL
              <br />
              AUTISMO
            </a>
            <nav className="hidden md:flex items-center gap-4 mt-2 text-[11px] font-display font-semibold uppercase tracking-tight text-white/85">
              <a
                href="#historia"
                className="hover:text-[#f4eec7] transition-colors"
              >
                CAUSA
              </a>
              <a
                href="#realidad"
                className="hover:text-[#f4eec7] transition-colors"
              >
                REALIDAD
              </a>
              <a
                href="#charlas"
                className="hover:text-[#f4eec7] transition-colors"
              >
                CHARLAS
              </a>
              <a
                href="#eventos"
                className="hover:text-[#f4eec7] transition-colors"
              >
                EVENTOS
              </a>
            </nav>
          </div>

          {/* Top-Right Corner: Centro de Atención Integral + Controles */}
          <div
            className="absolute top-0 right-0 p-7 sm:p-11 md:p-14 flex flex-col items-end text-right gap-1 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-default group"
          >
            <a
              href="#cielo"
              className="font-display text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] leading-[1.15] text-white hover:text-[#f4eec7] transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            >
              CENTRO DE ATENCIÓN
              <br />
              INTEGRAL
            </a>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={toggleAmbientSound}
                className="inline-flex items-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-tight text-white/90 hover:text-[#f4eec7] transition-colors"
                title="Alternar sonido ambiente"
              >
                {ambientAudio ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#f4eec7]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 opacity-75" />
                )}
                <span>{ambientAudio ? "SONIDO ON" : "SONIDO OFF"}</span>
              </button>
              <span className="text-white/40">•</span>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-display font-bold uppercase tracking-tight text-white/90 hover:text-[#f4eec7] transition-colors"
                title="Acceso Administrador"
              >
                <Lock className="w-3 h-3" />
                <span>ADMIN</span>
              </button>
            </div>
          </div>

          {/* Bottom-Left Corner: CAI • IMPULSA */}
          <div
            className="absolute bottom-0 left-0 p-7 sm:p-11 md:p-14 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-default group"
          >
            <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
              CAI • IMPULSA
            </span>
          </div>

          {/* Bottom-Right Corner: SEMBRANDO OPORTUNIDADES */}
          <div
            className="absolute bottom-0 right-0 p-7 sm:p-11 md:p-14 text-right opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-default group"
          >
            <a
              href="#charlas"
              className="font-display text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] text-white hover:text-[#f4eec7] transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            >
              SEMBRANDO OPORTUNIDADES
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================================
          CONTENEDOR PRINCIPAL QUE PERMANECE OCULTO DURANTE LOS PRIMEROS 4 SEGUNDOS
          Y APARECE CON EFECTO DE BLUR A ENFOQUE SIN DESPLAZAR EL VIEWPORT
      ===================================================================== */}
      <div
        style={{
          opacity: introRevealed ? 1 : 0,
          filter: introRevealed ? "blur(0px)" : "blur(28px)",
          transition:
            "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: introRevealed ? "auto" : "none",
        }}
      >

        {/* =====================================================================
            CONTENIDO NARRATIVO ON-SCROLL
        ===================================================================== */}
        <main className="relative z-10 w-full">
          {/* -------------------------------------------------------------------
              INTRO & ACTO 1: APARECE A LOS 4 SEGUNDOS EN EL CENTRO AZUL DE NUBES.mp4
          ------------------------------------------------------------------- */}
          <section
            id="cielo"
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 text-center"
          >
            <div
              ref={heroBlockRef}
              className="max-w-7xl mx-auto flex flex-col items-center will-change-transform"
            >
              <h1 className="font-display font-bold text-[#f4eec7] text-[3.5rem] sm:text-[6.2rem] md:text-[8.2rem] lg:text-[10.2rem] leading-[0.88] tracking-[-0.045em] select-none drop-shadow-[0_10px_35px_rgba(8,35,70,0.28)]">
                Sembrando
                <br />
                oportunidades
              </h1>

              <p className="mt-8 sm:mt-10 max-w-2xl mx-auto font-display font-medium text-lg sm:text-2xl md:text-[1.65rem] leading-[1.25] tracking-[-0.02em] text-white drop-shadow-[0_4px_20px_rgba(6,28,60,0.55)]">
                Todos miramos el mismo cielo infinito, pero cada mente lo siente
                en su propio idioma.
              </p>

              <div className="mt-10 flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.15em] text-[#f4eec7] drop-shadow">
                <span>DESLIZA POR EL CIELO</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              ACTO 2: LA HISTORIA DE CAI, LA CAUSA Y LO QUE SE QUIERE LOGRAR
          ------------------------------------------------------------------- */}
          <section id="historia" className="relative w-full">
            {/* Pasaje 01: La Historia de CAI */}
            <div className="min-h-screen flex items-center justify-center px-6 sm:px-12 py-24 text-center">
              <ScrollBlurReveal maxBlur={14} className="max-w-6xl mx-auto">
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-white block mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                  LA HISTORIA DE CAI
                </span>

                <h2 className="font-display font-bold text-[#f4eec7] text-[3rem] sm:text-[5.2rem] md:text-[7rem] lg:text-[8.2rem] leading-[0.9] tracking-[-0.045em] drop-shadow-[0_10px_35px_rgba(8,35,70,0.3)]">
                  acompañar
                  <br />
                  sin moldes
                </h2>

                <p className="mt-8 max-w-2xl mx-auto font-display font-medium text-lg sm:text-2xl md:text-[1.65rem] leading-[1.3] tracking-[-0.015em] text-white drop-shadow-[0_4px_22px_rgba(6,28,60,0.65)]">
                  El Centro de Atención Integral nació cuando comprendimos que un
                  niño con autismo no necesita ser “corregido”, sino escuchado con
                  empatía, dignidad y respeto a su sensibilidad.
                </p>
              </ScrollBlurReveal>
            </div>

            {/* Pasaje 02: La Causa y lo que se quiere lograr (Independencia y su propio camino) */}
            <div className="min-h-screen flex items-center justify-center px-6 sm:px-12 py-24 text-center">
              <ScrollBlurReveal maxBlur={14} className="max-w-6xl mx-auto">
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-white block mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                  NUESTRA CAUSA Y PROPÓSITO
                </span>

                <h2 className="font-display font-bold text-[#f4eec7] text-[3rem] sm:text-[5.2rem] md:text-[7rem] lg:text-[8.2rem] leading-[0.9] tracking-[-0.045em] drop-shadow-[0_10px_35px_rgba(8,35,70,0.3)]">
                  su propio
                  <br />
                  camino
                </h2>

                <p className="mt-8 max-w-3xl mx-auto font-display font-medium text-lg sm:text-2xl md:text-[1.65rem] leading-[1.3] tracking-[-0.015em] text-white drop-shadow-[0_4px_22px_rgba(6,28,60,0.65)]">
                  Queremos lograr que cada niña y niño pueda ser independiente,
                  desarrollar su autonomía real y caminar bajo este cielo con sus
                  propias alas, sin depender de la sombra de nadie.
                </p>
              </ScrollBlurReveal>
            </div>

            {/* Pasaje 03: Transición antes del caso triste */}
            <div className="min-h-[90vh] flex items-center justify-center px-6 sm:px-12 py-24 text-center">
              <ScrollBlurReveal maxBlur={14} className="max-w-6xl mx-auto">
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-white block mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                  MIRAR MÁS ALLÁ
                </span>

                <h2 className="font-display font-bold text-[#f4eec7] text-[3rem] sm:text-[5rem] md:text-[6.6rem] lg:text-[7.6rem] leading-[0.9] tracking-[-0.045em] drop-shadow-[0_10px_35px_rgba(8,35,70,0.35)]">
                  un universo
                  <br />
                  por descubrir
                </h2>

                <p className="mt-8 max-w-2xl mx-auto font-display font-medium text-lg sm:text-2xl md:text-[1.6rem] leading-[1.3] tracking-[-0.015em] text-white drop-shadow-[0_4px_22px_rgba(6,28,60,0.7)]">
                  En CAI cada logro ilumina el día. Sin embargo, al cruzar la
                  puerta hacia la calle, el cielo todavía se nubla por los
                  prejuicios.
                </p>
              </ScrollBlurReveal>
            </div>
            {/* Pasaje 04 (Conector Tipográfico y Atmosférico): "En la actualidad........"
                En medio de la frase la tipografía hace transición entre la fuente inicial
                (DM Sans Bold #F4EEC7) y la fuente del lado nublado (Playfair Display Italic blanca),
                y los puntitos se van escribiendo a la derecha con blur -> enfoque respetando un margen lateral */}
            <div className="min-h-[85vh] flex items-center justify-center px-10 sm:px-20 md:px-28 py-20 text-center">
              <ScrollBlurReveal maxBlur={16} className="w-full max-w-5xl mx-auto">
                <h2 className="text-[2.4rem] sm:text-[4.2rem] md:text-[5.5rem] lg:text-[6.4rem] leading-[0.98] select-none whitespace-nowrap overflow-visible">
                  {/* Primera mitad: Fuente del inicio (DM Sans Bold Crema #F4EEC7) */}
                  <span className="font-display font-bold tracking-[-0.045em] text-[#f4eec7] drop-shadow-[0_8px_30px_rgba(8,35,70,0.4)]">
                    En la act
                  </span>
                  {/* Punto medio: Fusión progresiva de peso, inclinación y color */}
                  <span className="font-display font-medium italic tracking-[-0.025em] text-[#f9f6e5]">
                    ua
                  </span>
                  {/* Segunda mitad: Fuente del lado nublado + puntitos que se van escribiendo con blur */}
                  <span className="font-serif italic font-normal tracking-[-0.01em] text-white drop-shadow-[0_0_40px_rgba(165,180,252,0.5)]">
                    lidad
                    <ScrollTrailingDots totalDots={8} />
                  </span>
                </h2>
              </ScrollBlurReveal>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              ACTO 3: PARTE NUBLADA / CASO TRISTE (ProceduralGroundBackground)
              CUANDO ESTA FRASE LLEGA AL CENTRO DE LA PANTALLA, EL BACKGROUND YA ESTÁ 100% EN NUBLADO
          ------------------------------------------------------------------- */}
          <section id="realidad" className="relative w-full pt-20 pb-12">
            {/* Frase 1: Blurred -> Enfocada con el scroll (Fuente Playfair Display intacta) */}
            <div
              ref={sadQuoteBlockRef}
              className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center"
            >
              <ScrollBlurReveal maxBlur={20} className="max-w-5xl mx-auto">
                <span className="text-xs uppercase tracking-[0.4em] text-[#a5b4fc] block mb-8">
                  Cuando el cielo se nubla afuera
                </span>
                <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] font-normal text-white tracking-tight drop-shadow-[0_0_45px_rgba(150,80,255,0.35)]">
                  Mucha gente no entiende lo que significa vivir como ellos
                </h2>
                <p className="mt-8 text-base sm:text-xl text-white/85 font-light max-w-2xl mx-auto leading-relaxed">
                  Las miradas que juzgan una crisis sensorial como un berrinche. El
                  silencio que aparta al niño que juega distinto. La soledad de las
                  familias cuando el mundo cierra los ojos.
                </p>
              </ScrollBlurReveal>
            </div>

            {/* Frase 2: Misma animación Blurred -> Enfocada con el scroll (Fuente Playfair Display intacta) */}
            <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center">
              <ScrollBlurReveal maxBlur={20} className="max-w-5xl mx-auto">
                <span className="text-xs uppercase tracking-[0.4em] text-[#5cb3ff] block mb-8">
                  Nuestra respuesta
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] font-normal text-white tracking-tight drop-shadow-[0_0_50px_rgba(92,179,255,0.4)]">
                  Por eso queremos contarles su historia.
                </h2>
                <p className="mt-8 text-base sm:text-xl text-white/85 font-light max-w-2xl mx-auto leading-relaxed">
                  Porque nadie puede amar ni respetar lo que no conoce. Escucha en
                  primera persona las charlas y testimonios que abren el panorama.
                </p>
              </ScrollBlurReveal>
            </div>
          </section>

          {/* -------------------------------------------------------------------
              ACTO 4: CARROUSEL DE DISCOS (DiscCascadeCarousel)
              Con efecto de blur en las orillas del marco para encajar con la página
          ------------------------------------------------------------------- */}
          <section id="charlas" className="relative w-full py-16 px-4 sm:px-6">
            <ScrollBlurReveal maxBlur={18} className="w-full">
              <div className="text-center px-6 mb-8">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#9dcdff] mb-3">
                  <Film className="w-3.5 h-3.5" />
                  Charlas de Conciencia & Testimonios CAI
                </span>
                <p className="text-sm sm:text-base text-white/85 font-light">
                  Explora las historias de nuestra comunidad • Selecciona cualquier disco para ver la charla completa
                </p>
              </div>

              {/* Marco con efecto de blur en las orillas para fundirse fluidamente con el cielo nocturno */}
              <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <DiscCascadeCarousel
                  items={DISC_ITEMS_DATA}
                  brand="CAI • IMPULSA"
                  nav={[{ label: "Charlas" }, { label: "Testimonios" }]}
                  indexLabel="Catálogo"
                  defaultIndex={0}
                  loop
                  autoplay={4500}
                  discSize="clamp(160px, min(40vmin, 30vw), 340px)"
                  spacing={1.06}
                  background="radial-gradient(120% 90% at 50% 40%, rgba(13, 26, 45, 0.88), rgba(3, 7, 16, 0.98))"
                  color="#ecebe7"
                  serif="Playfair Display, Georgia, serif"
                  sans="DM Sans, sans-serif"
                  display="Playfair Display, serif"
                  fontHref="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;700&display=swap"
                  hint="Arrastra para explorar • Clic en el disco para ver charla"
                  ariaLabel="Catálogo de Charlas CAI"
                  onSelect={(item, index) => {
                    setSelectedTalk(TALKS_DATA[index]);
                    setIsPlayingVideo(false);
                  }}
                />

                {/* Sombreado perimetral y difuminado (blur) en las 4 orillas del marco */}
                <div
                  className="pointer-events-none absolute inset-0 z-30 rounded-3xl"
                  style={{
                    boxShadow: "inset 0 0 90px 45px rgba(3, 8, 18, 0.95), inset 0 0 160px 80px rgba(3, 8, 18, 0.6)",
                  }}
                />
                {/* Bordes con backdrop-blur para suavizar la unión con el fondo */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030812] via-[#030812]/75 to-transparent z-25 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_25%,transparent)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030812] via-[#030812]/75 to-transparent z-25 backdrop-blur-md [mask-image:linear-gradient(to_top,black_25%,transparent)]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#030812] via-[#030812]/75 to-transparent z-25 backdrop-blur-md [mask-image:linear-gradient(to_right,black_25%,transparent)]" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#030812] via-[#030812]/75 to-transparent z-25 backdrop-blur-md [mask-image:linear-gradient(to_left,black_25%,transparent)]" />
              </div>
            </ScrollBlurReveal>
          </section>

          {/* -------------------------------------------------------------------
              ACTO 5: EVENTOS COMUNITARIOS DE CAI (PUBLICADOS SOLO POR EL ADMINISTRADOR)
              Mantiene la fuente Playfair Display de la parte nocturna
          ------------------------------------------------------------------- */}
          <section
            id="eventos"
            className="relative w-full max-w-5xl mx-auto px-6 md:px-12 py-32"
          >
            <ScrollBlurReveal maxBlur={12}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-white/15">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#5cb3ff] mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    Participa en la Causa
                  </span>
                  <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
                    Encuentros bajo el mismo cielo
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-white/85 font-light max-w-xl">
                    Eventos, círculos de empatía y talleres de vida independiente
                    convocados oficialmente por la administración de CAI.
                  </p>
                </div>

                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="self-start md:self-auto inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] backdrop-blur-md transition-all"
                >
                  <PlusCircle className="w-4 h-4 text-[#5cb3ff]" />
                  <span>Publicar Evento (Admin)</span>
                </button>
              </div>

              <div className="divide-y divide-white/10">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 group transition-opacity"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-6 md:gap-12">
                      <div className="shrink-0">
                        <span className="font-serif text-5xl sm:text-6xl text-[#5cb3ff] font-light block leading-none">
                          {ev.day}
                        </span>
                        <span className="text-xs tracking-[0.25em] uppercase text-white/70 mt-2 block">
                          {ev.monthYear}
                        </span>
                      </div>

                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] text-[#a5b4fc] mb-2">
                          <span>{ev.category}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 text-white/80">
                            <Clock className="w-3 h-3" /> {ev.time}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 text-white/80">
                            <MapPin className="w-3 h-3" /> {ev.location}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#9dcdff] transition-colors">
                          {ev.title}
                        </h3>

                        <p className="mt-3 text-base text-white/85 font-light leading-relaxed">
                          {ev.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setBookingEvent(ev)}
                      className="self-start md:self-center shrink-0 px-7 py-3 rounded-full bg-[#5cb3ff] hover:bg-white text-[#001d34] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-[0_0_30px_rgba(92,179,255,0.3)]"
                    >
                      Participar
                    </button>
                  </div>
                ))}
              </div>
            </ScrollBlurReveal>
          </section>

          {/* -------------------------------------------------------------------
              PIE DE PÁGINA POÉTICO
          ------------------------------------------------------------------- */}
          <footer className="relative z-10 py-24 px-6 text-center text-white/70 text-xs tracking-[0.25em] uppercase font-light">
            <p className="font-serif italic text-xl sm:text-2xl text-white tracking-normal normal-case mb-4">
              “Para que cada niño con autismo pueda ser independiente y caminar su propio cielo.”
            </p>
            <p>CAI — Centro de Atención Integral • Sembrando Oportunidades</p>
          </footer>
        </main>
      </div>

      {/* =====================================================================
          MODAL 1: REPRODUCTOR DE VIDEO DE LAS CHARLAS DE CONCIENCIA
      ===================================================================== */}
      {selectedTalk && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-2xl"
          onClick={() => setSelectedTalk(null)}
        >
          <div
            className="relative w-full max-w-4xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#5cb3ff] block font-medium">
                  {selectedTalk.category} • {selectedTalk.duration}
                </span>
                <h3 className="font-serif text-xl sm:text-3xl text-white font-normal mt-1 leading-snug">
                  {selectedTalk.title}
                </h3>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  {selectedTalk.speaker} — {selectedTalk.role}
                </p>
              </div>
              <button
                onClick={() => setSelectedTalk(null)}
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Cerrar reproductor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Componente VideoPlayer con controles y salto +-15s */}
            <div className="w-full">
              <VideoPlayer
                src={selectedTalk.videoUrl || "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4"}
                poster={selectedTalk.thumbnail}
                autoPlay={true}
              />
            </div>

            <div className="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-start">
              <div className="md:col-span-7">
                <p className="font-serif italic text-sm sm:text-base text-white/95 leading-relaxed">
                  {selectedTalk.quote}
                </p>
              </div>
              <div className="md:col-span-5 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {selectedTalk.synopsis}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: ACCESO EXCLUSIVO ADMINISTRADOR PARA PUBLICAR EVENTOS
      ===================================================================== */}
      {isAdminModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          onClick={() => setIsAdminModalOpen(false)}
        >
          <div
            className="w-full max-w-lg text-white p-8 rounded-3xl bg-[#0e1024]/90 border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#5cb3ff]" />
                <h4 className="font-serif text-2xl">
                  Publicación de Eventos (Administrador)
                </h4>
              </div>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isAdminAuthenticated ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPin === "1234" || adminPin.toLowerCase() === "cai") {
                    setIsAdminAuthenticated(true);
                    setAdminError("");
                  } else {
                    setAdminError(
                      "Clave incorrecta. Usa 'cai' o '1234' para la demostración.",
                    );
                  }
                }}
                className="mt-6 space-y-5"
              >
                <p className="text-sm text-white/75 font-light">
                  Solo el administrador de CAI puede publicar nuevos eventos en la
                  plataforma. Ingresa tu clave de administrador (Demo:{" "}
                  <code className="text-[#5cb3ff]">cai</code> o{" "}
                  <code className="text-[#5cb3ff]">1234</code>):
                </p>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="Clave de administrador..."
                  className="w-full bg-white/5 border-b border-white/30 focus:border-[#5cb3ff] px-4 py-3 text-white outline-none transition-colors"
                  required
                />
                {adminError && (
                  <p className="text-xs text-red-400">{adminError}</p>
                )}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#5cb3ff] text-[#001d34] text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    Desbloquear Panel
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAdminPublish} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                    Título del Evento
                  </label>
                  <input
                    type="text"
                    value={newEvTitle}
                    onChange={(e) => setNewEvTitle(e.target.value)}
                    placeholder="Ej. Caminata bajo el Cielo por la Autonomía"
                    className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                      Día
                    </label>
                    <input
                      type="text"
                      value={newEvDay}
                      onChange={(e) => setNewEvDay(e.target.value)}
                      placeholder="14"
                      className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                      Mes / Año
                    </label>
                    <input
                      type="text"
                      value={newEvMonthYear}
                      onChange={(e) => setNewEvMonthYear(e.target.value)}
                      placeholder="DIC 2026"
                      className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                      Hora
                    </label>
                    <input
                      type="text"
                      value={newEvTime}
                      onChange={(e) => setNewEvTime(e.target.value)}
                      placeholder="17:00 hrs"
                      className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                      Categoría
                    </label>
                    <input
                      type="text"
                      value={newEvCategory}
                      onChange={(e) => setNewEvCategory(e.target.value)}
                      className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                      Lugar
                    </label>
                    <input
                      type="text"
                      value={newEvLocation}
                      onChange={(e) => setNewEvLocation(e.target.value)}
                      className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                    Descripción de la Convocatoria
                  </label>
                  <textarea
                    rows={3}
                    value={newEvDesc}
                    onChange={(e) => setNewEvDesc(e.target.value)}
                    placeholder="Comparte el propósito del encuentro y cómo ayudará a las familias..."
                    className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(false)}
                    className="px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-full bg-[#5cb3ff] text-[#001d34] text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    Publicar Evento
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: PARTICIPAR EN EVENTO COMUNITARIO
      ===================================================================== */}
      {bookingEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          onClick={() => setBookingEvent(null)}
        >
          <div
            className="w-full max-w-lg text-white p-8 rounded-3xl bg-[#0e1024]/90 border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#5cb3ff]" />
                <h4 className="font-serif text-2xl">Sumarse al Encuentro</h4>
              </div>
              <button
                onClick={() => setBookingEvent(null)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#5cb3ff]">
                {bookingEvent.day} {bookingEvent.monthYear} • {bookingEvent.time}
              </span>
              <h5 className="font-serif text-2xl text-white mt-1">
                {bookingEvent.title}
              </h5>
              <p className="text-xs text-white/65 mt-2 font-light">
                Todos nuestros eventos cuentan con espacios de calma sensorial y
                acompañamiento respetuoso.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Tu nombre o el de tu familia"
                  className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  placeholder="Para enviarte la guía de anticipación"
                  className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                  ¿Alguna necesidad sensorial o apoyo que debamos prever?
                </label>
                <input
                  type="text"
                  value={sensoryNotes}
                  onChange={(e) => setSensoryNotes(e.target.value)}
                  placeholder="Opcional: sensibilidad auditiva, espacio tranquilo..."
                  className="w-full bg-white/5 border-b border-white/25 focus:border-[#5cb3ff] px-3 py-2.5 text-white outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingEvent(null)}
                  className="px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-[#5cb3ff] text-[#001d34] text-xs uppercase tracking-[0.2em] font-medium"
                >
                  Confirmar Participación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-white/15 backdrop-blur-xl text-white text-xs uppercase tracking-[0.18em] shadow-2xl">
          <CheckCircle2 className="w-4 h-4 text-[#5cb3ff]" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}

export default App;
