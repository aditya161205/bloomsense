import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Cpu, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-forest-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-forest-600 dark:text-forest-400 font-semibold tracking-wide uppercase text-sm mb-2">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
              Bridging the Gap Between <br />
              <span className="text-forest-500">Silicon & Soil</span>
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              BloomSense was born from a simple problem: We loved plants, but our busy tech jobs meant we kept killing them. 
              We realized that nature doesn't need to be complicated, it just needs to be understood.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              By combining industrial-grade capacitive sensors with simple, user-friendly design, we've created a system 
              that gives your plants a voice. No more guessing, no more over-watering.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm text-forest-500">
                    <Leaf size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Sustainable</h4>
                    <p className="text-sm text-slate-500">Eco-friendly materials</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm text-forest-500">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Open Source</h4>
                    <p className="text-sm text-slate-500">Hackable hardware</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 rounded-3xl overflow-hidden shadow-2xl bg-slate-900"
          >
             {/* Abstract/Image placeholder */}
             <div className="absolute inset-0 bg-gradient-to-br from-forest-900 to-slate-950"></div>
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#34ae75 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-8">
                <Heart size={64} className="text-forest-400 mx-auto mb-4 animate-pulse" />
                <h4 className="text-2xl font-bold text-white">Designed for Growth</h4>
                <p className="text-slate-400 mt-2">Empowering green thumbs everywhere.</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;