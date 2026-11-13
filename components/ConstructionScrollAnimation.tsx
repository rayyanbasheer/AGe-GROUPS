import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Layers, HardHat, CheckCircle2, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

const STAGES = [
  {
    id: 1,
    code: 'PHASE 01',
    title: 'Soil Testing & Deep Foundation',
    progress: '25%',
    spec: 'IS 1904 · M25 Footings',
    desc: 'Total-station laser leveling, soil bearing capacity verification, and heavy reinforced concrete footing excavation.'
  },
  {
    id: 2,
    code: 'PHASE 02',
    title: 'RCC Superstructure & Columns',
    progress: '50%',
    spec: 'Fe-550D TMT · IS 456:2000',
    desc: 'Precision plinth beams, seismic-grade columns, and post-tensioned floor slabs poured under principal engineer supervision.'
  },
  {
    id: 3,
    code: 'PHASE 03',
    title: 'Brickwork, MEP & Perforated Façade',
    progress: '75%',
    spec: 'FRLS Grid · Acoustic Masonry',
    desc: 'Chamber brick masonry, concealed hydro-sanitary conduits, three-phase electrical grids, and custom architectural elevation louvers.'
  },
  {
    id: 4,
    code: 'PHASE 04',
    title: 'Architectural Finishes & Handover',
    progress: '100%',
    spec: '60-Point Quality Audit',
    desc: 'Teak wood joinery, vitrified stone flooring, weather-shield exterior coatings, and final structural certification.'
  }
];

const ConstructionScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(4);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 25%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  const craneTrolleyX = useTransform(smoothProgress, [0, 1], ['15%', '75%']);
  const buildingFillHeight = useTransform(smoothProgress, [0, 0.85], ['15%', '100%']);

  return (
    <section
      ref={containerRef}
      className="py-20 lg:py-28 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden"
    >
      {/* Subtle architectural blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono-tabular font-semibold mb-2">
              <Compass className="w-4 h-4" />
              <span>LIVE STRUCTURAL ENGINEERING SEQUENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight text-balance">
              Engineered for precision at every elevation
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-slate-300 max-w-md leading-relaxed"
          >
            Scroll or select any construction phase below to inspect how AGe Groups takes a project from foundation excavation to structural completion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Interactive Animated Structural Blueprint & Crane */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-slate-950/90 border border-slate-800 rounded-lg p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[420px]"
          >
            {/* Top Blueprint Telemetry Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6 text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Structural Elevation Simulation</span>
              </div>
              <span className="font-mono-tabular text-blue-400 font-semibold">
                STAGE 0{activeStage} / 04 · {activeStage * 25}% COMPLETE
              </span>
            </div>

            {/* Animated SVG Crane & Multi-Story Building Assembly */}
            <div className="relative flex-1 flex flex-col items-center justify-end py-4">
              {/* Tower Crane Mast & Jib */}
              <div className="w-full max-w-md h-64 relative">
                {/* Crane Vertical Mast */}
                <div className="absolute left-6 bottom-0 w-3 h-60 border-x-2 border-amber-400/70 bg-amber-400/5 flex flex-col justify-between py-1">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="w-full h-px bg-amber-400/50 rotate-12" />
                  ))}
                </div>

                {/* Crane Horizontal Jib */}
                <div className="absolute left-2 top-3 right-6 h-2.5 border-y border-amber-400/80 bg-amber-400/10" />

                {/* Animated Crane Trolley & Hook */}
                <motion.div
                  style={{ left: craneTrolleyX }}
                  className="absolute top-5 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                >
                  <div className="w-5 h-2.5 bg-amber-400 rounded-xs shadow-sm" />
                  <motion.div
                    animate={{ height: [22, 36, 22] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px bg-amber-300/80"
                  />
                  <div className="w-8 h-2.5 bg-blue-400/90 border border-blue-200 rounded-xs shadow-md" />
                </motion.div>

                {/* Building Structure Frame (4 Animated Stories corresponding to Stages 1-4) */}
                <div className="absolute left-20 right-8 bottom-0 flex flex-col-reverse gap-1.5">
                  {/* Stage 1: Foundation & Plinth */}
                  <motion.div
                    animate={{
                      opacity: activeStage >= 1 ? 1 : 0.25,
                      scaleY: activeStage >= 1 ? 1 : 0.9
                    }}
                    transition={{ duration: 0.35 }}
                    className="h-9 rounded-xs border border-blue-400/60 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-blue-950/90 px-3 flex items-center justify-between text-[11px] font-mono-tabular"
                  >
                    <span className="text-blue-200">01 · RCC Raft &amp; Plinth Beam</span>
                    <span className="text-emerald-400">M25 Verified</span>
                  </motion.div>

                  {/* Stage 2: Ground + First Floor Structural Columns & Slabs */}
                  <motion.div
                    animate={{
                      opacity: activeStage >= 2 ? 1 : 0.2,
                      y: activeStage >= 2 ? 0 : 8
                    }}
                    transition={{ duration: 0.35 }}
                    className="h-12 rounded-xs border border-blue-400/60 bg-slate-900/90 grid grid-cols-4 gap-2 p-2 relative"
                  >
                    {[0, 1, 2, 3].map((col) => (
                      <div
                        key={col}
                        className="border border-blue-400/30 bg-blue-500/10 rounded-xs flex items-center justify-center"
                      >
                        <div className="w-1.5 h-full bg-blue-400/40" />
                      </div>
                    ))}
                    <span className="absolute right-2.5 top-1 text-[10px] font-mono-tabular text-blue-300">
                      02 · Fe-550D Frame
                    </span>
                  </motion.div>

                  {/* Stage 3: Perforated Architectural Facade & Louvers */}
                  <motion.div
                    animate={{
                      opacity: activeStage >= 3 ? 1 : 0.15,
                      y: activeStage >= 3 ? 0 : 10
                    }}
                    transition={{ duration: 0.35 }}
                    className="h-14 rounded-xs border border-blue-300/70 bg-gradient-to-r from-slate-900 via-blue-950/80 to-amber-950/50 p-2.5 flex items-center justify-between"
                  >
                    <div className="grid grid-cols-8 gap-1 flex-1 mr-4">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="h-2 bg-blue-200/30 rounded-[1px]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono-tabular text-amber-300 shrink-0">
                      03 · Façade &amp; MEP
                    </span>
                  </motion.div>

                  {/* Stage 4: Cantilever Roof Slab & Lighting */}
                  <motion.div
                    animate={{
                      opacity: activeStage >= 4 ? 1 : 0.12,
                      y: activeStage >= 4 ? 0 : 12
                    }}
                    transition={{ duration: 0.35 }}
                    className="h-9 rounded-xs border border-emerald-400/70 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-blue-950/80 px-3 flex items-center justify-between text-[11px] font-mono-tabular"
                  >
                    <span className="text-emerald-300">04 · Cantilever Coping &amp; Handover</span>
                    <span className="text-white font-semibold">100% Ready</span>
                  </motion.div>
                </div>

                {/* Scroll-Linked Vertical Elevation Laser Bar */}
                <div className="absolute right-1 bottom-0 top-6 w-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    style={{ height: buildingFillHeight }}
                    className="w-full bg-gradient-to-t from-blue-600 to-emerald-400 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Engineering Footer inside Blueprint Card */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Defect Stage Sign-Off</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-blue-300 hover:text-white font-medium transition-colors"
              >
                <span>Request Engineer Site Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right: 4 Interactive Phase Selector Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STAGES.map((stage, idx) => {
              const isSelected = activeStage >= stage.id;
              const isCurrent = activeStage === stage.id;
              return (
                <motion.button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage(stage.id)}
                  onMouseEnter={() => setActiveStage(stage.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`text-left p-6 rounded-lg border transition-all duration-200 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-slate-800/90 border-blue-400 shadow-lg'
                      : isSelected
                      ? 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
                      : 'bg-slate-900/60 border-slate-800/80 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tabular mb-3">
                      <span className={isCurrent ? 'text-blue-300 font-semibold' : 'text-slate-400'}>
                        {stage.code}
                      </span>
                      <span className="text-emerald-400 font-semibold">{stage.progress}</span>
                    </div>

                    <h3 className="text-base font-display font-bold text-white mb-2">
                      {stage.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono-tabular text-slate-400">
                    <span>{stage.spec}</span>
                    <CheckCircle2
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionScrollAnimation;
