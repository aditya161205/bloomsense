import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SystemConfig, UsageType, CartItem } from '../types';
import { Home, Briefcase, Sprout, ShoppingCart, Droplets, Cpu, Activity, Zap } from 'lucide-react';

interface PotConfiguratorProps {
   onAddToCart: (item: CartItem) => void;
}

const PotConfigurator: React.FC<PotConfiguratorProps> = ({ onAddToCart }) => {
   const [config, setConfig] = useState<SystemConfig>({
      plantCount: 1,
      tankSize: 5,
      usageType: 'home'
   });

   const [price, setPrice] = useState(0);

   // Logic to determine system price
   useEffect(() => {
      // Base Kit (Arduino Controller + Power Supply + Casing)
      let total = 1499;

      // Cost per plant zone (1 Valve + 1 Soil Sensor + 2m Tubing)
      total += config.plantCount * 14.99;

      // Tank Cost
      if (config.tankSize === 10) total += 400.00;
      if (config.tankSize === 20) total += 800.00;
      if (config.tankSize === 50) total += 1200.00;

      // Bulk discount for Office/Greenhouse
      if (config.usageType === 'office') total *= 0.95;
      if (config.usageType === 'greenhouse') total *= 0.90;

      setPrice(total);
   }, [config]);

   const handleAddToCartClick = () => {
      const item: CartItem = {
         id: `sys-${Date.now()}`,
         name: `BloomSense Multi-Zone System (${config.plantCount} Plants)`,
         description: `${config.tankSize}L Tank | ${config.plantCount}x Moisture Sensors | ${config.plantCount}x Valves`,
         price: price,
         quantity: 1,
         type: 'system',
         image: 'https://placehold.co/100x100/34ae75/ffffff?text=System+Kit'
      };
      onAddToCart(item);
   };

   const usageOptions = [
      { id: 'home', icon: <Home size={24} />, label: 'Home Personal', desc: 'Compact aesthetics.' },
      { id: 'office', icon: <Briefcase size={24} />, label: 'Office Space', desc: 'Low maintenance.' },
      { id: 'greenhouse', icon: <Sprout size={24} />, label: 'Greenhouse', desc: 'High capacity.' },
   ];

   const tankOptions = [5, 10, 20, 50];

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Side: Configuration Form */}
            <div className="space-y-8 order-2 lg:order-1">
               <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Build Your System</h2>
                  <p className="text-slate-500 dark:text-slate-400">Configure the tank size and number of plant zones you need.</p>
               </div>

               {/* Step 1: Usage Environment */}
               <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-forest-100 text-forest-700 text-xs font-bold px-2 py-1 rounded">STEP 1</span>
                     <h3 className="font-semibold text-slate-900 dark:text-white">Environment</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                     {usageOptions.map((opt) => (
                        <button
                           key={opt.id}
                           onClick={() => setConfig({ ...config, usageType: opt.id as UsageType })}
                           className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${config.usageType === opt.id
                                 ? 'border-forest-500 bg-forest-50 dark:bg-forest-900/20 text-forest-700 dark:text-forest-400'
                                 : 'border-slate-200 dark:border-slate-700 hover:border-forest-300 dark:hover:border-forest-700 text-slate-600 dark:text-slate-400'
                              }`}
                        >
                           <div className="mb-2">{opt.icon}</div>
                           <div className="font-semibold text-sm">{opt.label}</div>
                           <div className="text-xs text-center mt-1 opacity-70 hidden md:block">{opt.desc}</div>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Step 2: Number of Plants (Zones) */}
               <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                     <span className="bg-forest-100 text-forest-700 text-xs font-bold px-2 py-1 rounded">STEP 2</span>
                     <h3 className="font-semibold text-slate-900 dark:text-white">How many plants? (Zones)</h3>
                  </div>

                  <div className="space-y-6">
                     <div>
                        <div className="flex justify-between mb-2">
                           <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Zones</label>
                           <span className="text-forest-600 font-bold">{config.plantCount} Plants</span>
                        </div>
                        <input
                           type="range"
                           min="1"
                           max="8"
                           step="1"
                           value={config.plantCount}
                           onChange={(e) => setConfig({ ...config, plantCount: parseInt(e.target.value) })}
                           className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-forest-500"
                        />
                        <div className="mt-2 text-xs text-slate-500">
                           *Includes 1 Sensor, 1 Valve, and 2m Tubing per plant.
                        </div>
                     </div>
                  </div>
               </div>

               {/* Step 3: Tank Size */}
               <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-forest-100 text-forest-700 text-xs font-bold px-2 py-1 rounded">STEP 3</span>
                     <h3 className="font-semibold text-slate-900 dark:text-white">Water Tank Capacity</h3>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                     {tankOptions.map((size) => (
                        <button
                           key={size}
                           onClick={() => setConfig({ ...config, tankSize: size })}
                           className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all duration-200 ${config.tankSize === size
                                 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                                 : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 text-slate-600 dark:text-slate-400'
                              }`}
                        >
                           <Droplets size={18} />
                           <span className="font-bold">{size} Liters</span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Result Block */}
               <div className="p-6 bg-slate-900 rounded-2xl text-white flex flex-col sm:flex-row justify-between items-center shadow-lg shadow-slate-900/20 gap-4">
                  <div>
                     <p className="text-slate-400 text-sm">System Total</p>
                     <div className="text-3xl font-bold">₹{price.toFixed(2)}</div>
                     <div className="text-forest-400 text-xs font-medium mt-1">
                        Includes Controller, Tank, {config.plantCount} Valves
                     </div>
                  </div>
                  <button
                     onClick={handleAddToCartClick}
                     className="w-full sm:w-auto bg-forest-600 hover:bg-forest-500 text-white px-8 py-3 rounded-full font-bold transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                     <ShoppingCart size={20} /> Add System
                  </button>
               </div>

            </div>

            {/* Right Side: Visual Diagram */}
            <div className="order-1 lg:order-2 bg-slate-50 dark:bg-slate-950 rounded-3xl p-4 lg:p-8 h-[500px] lg:h-[700px] flex flex-col relative overflow-hidden border border-slate-200 dark:border-slate-800">
               {/* Technical Grid Background */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

               <h3 className="absolute top-4 left-4 text-xs font-mono text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                  Live Schematic
               </h3>

               <div className="relative z-10 w-full h-full flex flex-col">

                  {/* UPPER SECTION: TANK + CONTROLLER */}
                  <div className="flex-1 flex items-end justify-center pb-8 relative">

                     {/* Tank Container */}
                     <motion.div
                        layout
                        className="relative border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm overflow-visible"
                        style={{
                           width: config.tankSize < 10 ? 140 : config.tankSize < 25 ? 180 : 220,
                           height: config.tankSize < 10 ? 160 : config.tankSize < 25 ? 200 : 240,
                        }}
                     >
                        {/* Water Level */}
                        <div className="absolute bottom-0 w-full bg-blue-500/50 rounded-b-md overflow-hidden transition-all duration-700 ease-in-out" style={{ height: '70%' }}>
                           <div className="absolute top-0 w-full h-1 bg-blue-400/80 animate-pulse"></div>
                           {/* Bubbles */}
                           <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-white/30 animate-ping"></div>
                           <div className="absolute bottom-10 right-8 w-1 h-1 rounded-full bg-white/30 animate-ping delay-700"></div>
                        </div>

                        {/* Liter Markings */}
                        <div className="absolute right-0 top-4 bottom-4 w-6 border-l border-slate-400/30 flex flex-col justify-between py-2 items-end pr-1">
                           <span className="text-[10px] text-slate-400 font-mono">{config.tankSize}L</span>
                           <span className="w-2 h-px bg-slate-400/50"></span>
                           <span className="w-2 h-px bg-slate-400/50"></span>
                           <span className="w-2 h-px bg-slate-400/50"></span>
                           <span className="text-[10px] text-slate-400 font-mono">0L</span>
                        </div>

                        {/* ARDUINO CONTROLLER (MOUNTED ON TANK) */}
                        <div className="absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-24 bg-teal-700 rounded-lg shadow-xl border border-teal-600 flex flex-col items-center py-3 z-30">
                           <div className="w-12 h-12 border border-teal-500/30 rounded bg-teal-800 flex items-center justify-center mb-2">
                              <Cpu size={20} className="text-teal-300" />
                           </div>
                           {/* Status LEDs */}
                           <div className="flex gap-1.5 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                           </div>
                           <span className="text-[8px] text-teal-200 font-mono tracking-tighter">ARDUINO</span>

                           {/* Wires Exiting Controller */}
                           <div className="absolute bottom-0 left-1/2 w-0.5 h-20 bg-slate-800 -z-10"></div>
                           <div className="absolute bottom-0 left-1/3 w-0.5 h-20 bg-yellow-500 -z-10 transform -rotate-12 origin-top"></div>
                        </div>
                     </motion.div>
                  </div>

                  {/* MIDDLE SECTION: PIPING MANIFOLD */}
                  <div className="h-16 w-full flex justify-center items-start relative">
                     {/* Vertical Drop from Tank */}
                     <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 h-8 w-3 bg-slate-300 dark:bg-slate-600 rounded-b-md z-0"></div>

                     {/* Horizontal Manifold Bar */}
                     <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 shadow-inner"
                        style={{ width: `${Math.max(140, config.plantCount * 90)}px` }}
                     >
                        {/* Mounting Brackets */}
                        <div className="absolute left-0 top-0 h-4 w-4 bg-slate-400 rounded-full"></div>
                        <div className="absolute right-0 top-0 h-4 w-4 bg-slate-400 rounded-full"></div>
                     </div>
                  </div>

                  {/* LOWER SECTION: ZONES (VALVES + POTS) */}
                  <div className="flex-1 flex justify-center items-start gap-4 overflow-x-auto pb-4 scrollbar-hide px-8">
                     <AnimatePresence>
                        {Array.from({ length: config.plantCount }).map((_, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 30, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className="flex flex-col items-center min-w-[80px] relative group"
                           >
                              {/* Vertical Pipe */}
                              <div className="w-2 h-8 bg-slate-300 dark:bg-slate-600 -mt-2"></div>

                              {/* SOLENOID VALVE */}
                              <div className="w-10 h-10 bg-slate-800 rounded-md shadow-lg border border-slate-700 flex flex-col items-center justify-center relative z-20">
                                 <Zap size={12} className="text-yellow-400 absolute top-1 right-1" />
                                 <div className="w-4 h-4 rounded-full border-2 border-slate-600 bg-slate-900 flex items-center justify-center">
                                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500 animate-pulse' : 'bg-red-900'}`}></div>
                                 </div>
                                 {/* Wire back to Arduino */}
                                 <div className="absolute top-0 left-1/2 w-px h-24 bg-red-500/40 -z-10 origin-bottom transform -rotate-12 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              </div>

                              {/* Tube to Pot */}
                              <div className="w-1.5 h-10 bg-blue-300/50 relative overflow-hidden">
                                 {i === 0 && <div className="absolute top-0 left-0 w-full h-4 bg-blue-500 animate-dropdown"></div>}
                              </div>

                              {/* POT & PLANT */}
                              <div className="relative mt-1">
                                 {/* Plant Icon */}
                                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-5px] text-forest-600 dark:text-forest-400 z-0">
                                    <Sprout size={i % 2 === 0 ? 32 : 28} />
                                 </div>

                                 {/* Pot Shape (CSS) */}
                                 <div className="w-16 h-12 bg-[#8B4513] relative z-10 shadow-lg"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}>
                                    <div className="absolute top-0 w-full h-2 bg-[#65330E]"></div>
                                 </div>

                                 {/* MOISTURE SENSOR (Inserted) */}
                                 <div className="absolute -top-6 -right-2 z-20 group-hover:-translate-y-1 transition-transform">
                                    <div className="w-2 h-8 bg-yellow-500 border border-yellow-600 rounded-t-sm transform rotate-12 origin-bottom-left"></div>
                                    {/* Sensor PCB Head */}
                                    <div className="absolute -top-1 -right-1 w-4 h-5 bg-slate-800 rounded-sm border border-slate-600 transform rotate-12"></div>
                                    {/* Sensor Wire */}
                                    <svg className="absolute top-0 left-0 w-20 h-40 pointer-events-none -z-10" style={{ transform: 'translate(-10px, -50px)' }}>
                                       <path d="M 10 10 Q 5 5 15 -50" stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.6" />
                                    </svg>
                                 </div>
                              </div>

                              <div className="mt-2 text-center">
                                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Zone {i + 1}</div>
                                 <div className="text-[9px] text-forest-500 font-mono">{i === 0 ? 'Watering' : 'Idle'}</div>
                              </div>

                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>

               </div>

               {/* Legend */}
               <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 space-y-1 backdrop-blur shadow-lg">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div> <span>Moisture Sensor</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-slate-800 rounded-sm border border-slate-600"></div> <span>Solenoid Valve</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-teal-700 rounded-sm"></div> <span>Arduino Unit</span>
                  </div>
               </div>

            </div>

         </div>
      </div>
   );
};

export default PotConfigurator;