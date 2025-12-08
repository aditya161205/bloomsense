import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Settings, Activity, Droplet } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="w-8 h-8 text-white" />,
    title: "Arduino Controller",
    description: "The brain of the operation. Custom-programmed to monitor multiple sensors and control valves independently.",
    color: "bg-forest-500"
  },
  {
    icon: <Settings className="w-8 h-8 text-white" />,
    title: "Multi-Zone Valves",
    description: "Industrial-grade solenoid valves. Water plant A without drowning plant B. Support for up to 8 zones.",
    color: "bg-slate-800"
  },
  {
    icon: <Activity className="w-8 h-8 text-white" />,
    title: "Soil Feedback",
    description: "Capacitive moisture sensors placed in the soil send real-time data back to the central controller.",
    color: "bg-teal-500"
  },
  {
    icon: <Droplet className="w-8 h-8 text-white" />,
    title: "Smart Tank System",
    description: "Available in 5L to 50L capacities. The system alerts you when the main water reserve is low.",
    color: "bg-blue-500"
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-forest-600 dark:text-forest-400 font-semibold tracking-wide uppercase text-sm">System Architecture</h2>
          <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Professional Grade Automation
          </h3>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 dark:text-slate-400 mx-auto">
            Not just a pot. A complete hydrological ecosystem for your home or greenhouse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="relative group h-80 perspective-1000 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center text-center transition-all duration-300 overflow-hidden">
                <div className={`rounded-2xl p-4 ${feature.color} mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
                
                {/* Decoration */}
                <div className={`absolute bottom-0 left-0 w-full h-1 ${feature.color}`} />
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-slate-100 dark:bg-slate-700/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
