import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import VideoModal from './VideoModal';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-100 via-slate-50 to-slate-50 dark:from-forest-900/20 dark:via-slate-950 dark:to-slate-950 opacity-70"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-forest-400/20 rounded-full blur-3xl filter opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl filter opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-full px-4 py-1.5 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              System V3: Now with Multi-Zone Support
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Centralized Watering. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-500 to-teal-400">
              Precision Controlled.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            A smart loop for your plants. The Arduino monitors the soil, and the valves manage the tank. 
            Automated hydration, down to the last drop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 py-4 bg-forest-600 hover:bg-forest-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-forest-500/40 flex items-center justify-center gap-2"
            >
              Build Your System <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 group"
            >
              <span className="bg-slate-100 dark:bg-slate-700 p-1 rounded-full group-hover:bg-forest-100 dark:group-hover:bg-forest-900 group-hover:text-forest-600 transition-colors">
                 <Play size={16} className="ml-0.5" />
              </span>
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* SVG SCHEMATIC DIAGRAM */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 relative max-w-5xl mx-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl overflow-hidden"
        >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-100 dark:bg-slate-800 px-4 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-widest text-slate-500">
               System Logic Loop
            </div>

            {/* Responsive SVG Container */}
            <div className="w-full aspect-[2/1] md:aspect-[3/1] relative mt-6">
               <svg className="w-full h-full" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* --- DEFINITIONS --- */}
                  <defs>
                    <linearGradient id="wireGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* --- LAYOUT GUIDES (Hidden) --- 
                      Left: 100,200 (Plant)
                      Center Top: 450, 50 (Arduino)
                      Right: 800, 200 (Tank)
                  */}

                  {/* --- WIRING PATHS --- */}
                  
                  {/* Path 1: Sensor (Left) to Arduino (Center) */}
                  <path id="sensorPath" d="M 150 220 C 150 100, 300 80, 400 80" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" fill="none" />
                  
                  {/* Path 2: Arduino (Center) to Valve (Right) */}
                  <path id="valvePath" d="M 500 80 C 600 80, 700 120, 720 180" stroke="#4ade80" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" fill="none" />
                  
                  {/* Path 3: Water Pipe (Tank -> Valve -> Plant) */}
                  <path id="waterPath" d="M 750 250 L 720 250 L 720 200 L 150 200 L 150 210" stroke="#3b82f6" strokeWidth="4" opacity="0.3" fill="none" />


                  {/* --- ANIMATED SIGNALS --- */}

                  {/* 1. Data Signal (Yellow) */}
                  <circle r="4" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#sensorPath" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                  </circle>

                  {/* 2. Command Signal (Green) */}
                  <circle r="4" fill="#4ade80" filter="url(#glow)">
                    <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#valvePath" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
                  </circle>

                  {/* 3. Water Flow (Blue) */}
                  <circle r="3" fill="#60a5fa">
                     <animateMotion dur="2s" repeatCount="indefinite" begin="3s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#waterPath" />
                    </animateMotion>
                  </circle>


                  {/* --- COMPONENTS --- */}

                  {/* LEFT: PLANT POT & SENSOR */}
                  <g transform="translate(100, 180)">
                     {/* Pot */}
                     <path d="M 0 0 L 100 0 L 85 80 L 15 80 Z" fill="#8B4513" stroke="#5D2E0C" strokeWidth="2" />
                     <path d="M -5 0 L 105 0 L 105 15 L -5 15 Z" fill="#A0522D" stroke="#5D2E0C" strokeWidth="2" />
                     {/* Plant Sprout */}
                     <path d="M 50 0 Q 50 -40 20 -50 M 50 0 Q 50 -60 80 -70" stroke="#22c55e" strokeWidth="4" fill="none" />
                     <circle cx="20" cy="-50" r="5" fill="#22c55e" />
                     <circle cx="80" cy="-70" r="5" fill="#22c55e" />
                     {/* Sensor Probe */}
                     <rect x="60" y="10" width="10" height="60" fill="#fbbf24" stroke="#d97706" rx="2" transform="rotate(-10 65 10)" />
                     <text x="50" y="110" textAnchor="middle" className="text-xs font-bold fill-slate-500 uppercase tracking-widest">1. Sense</text>
                  </g>

                  {/* CENTER TOP: ARDUINO CONTROLLER */}
                  <g transform="translate(400, 40)">
                     <rect x="0" y="0" width="100" height="80" rx="8" fill="#0f766e" stroke="#14b8a6" strokeWidth="2" />
                     <rect x="10" y="10" width="80" height="60" rx="4" fill="#115e59" />
                     {/* Chip */}
                     <rect x="30" y="25" width="40" height="30" fill="#333" />
                     <circle cx="20" cy="40" r="4" fill="#4ade80">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
                     </circle>
                     <circle cx="80" cy="40" r="4" fill="#ef4444">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
                     </circle>
                     <text x="50" y="100" textAnchor="middle" className="text-xs font-bold fill-slate-500 uppercase tracking-widest">2. Analyze</text>
                  </g>

                  {/* RIGHT: TANK & VALVE */}
                  <g transform="translate(700, 150)">
                     {/* Tank */}
                     <rect x="50" y="0" width="100" height="120" rx="10" fill="#bfdbfe" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                     {/* Water Level */}
                     <rect x="55" y="40" width="90" height="75" rx="5" fill="#3b82f6" fillOpacity="0.5">
                        <animate attributeName="y" values="40;42;40" dur="4s" repeatCount="indefinite" />
                     </rect>
                     {/* Valve Box */}
                     <rect x="0" y="30" width="40" height="40" rx="4" fill="#1e293b" stroke="#475569" />
                     <circle cx="20" cy="50" r="6" fill="#ef4444">
                        <animate attributeName="fill" values="#ef4444;#ef4444;#22c55e;#ef4444" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.6;1" />
                     </circle>
                     <text x="100" y="140" textAnchor="middle" className="text-xs font-bold fill-slate-500 uppercase tracking-widest">3. Act</text>
                  </g>

               </svg>
            </div>
            
            {/* Legend / Status */}
            <div className="grid grid-cols-3 gap-4 mt-4 border-t border-slate-200 dark:border-slate-800 pt-4">
               <div className="text-center">
                  <p className="text-xs text-slate-500">Input</p>
                  <p className="font-bold text-slate-700 dark:text-slate-300">Moisture &lt; 30%</p>
               </div>
               <div className="text-center">
                  <p className="text-xs text-slate-500">Logic</p>
                  <p className="font-bold text-forest-500">Trigger Valve 1</p>
               </div>
               <div className="text-center">
                  <p className="text-xs text-slate-500">Output</p>
                  <p className="font-bold text-blue-500">Dispense 200ml</p>
               </div>
            </div>

        </motion.div>
      </div>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default Hero;