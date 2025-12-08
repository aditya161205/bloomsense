import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset to cover image when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video border border-slate-800"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors backdrop-blur-sm"
            >
              <X size={24} />
            </button>

            {/* Content Wrapper */}
            <div className="w-full h-full relative group bg-slate-900 flex items-center justify-center">
              
              {!isPlaying ? (
                /* --- COVER PHOTO STATE --- */
                <div 
                  className="absolute inset-0 z-20 cursor-pointer group" 
                  onClick={() => setIsPlaying(true)}
                >
                  {/* Placeholder Image - Using a tech/nature aesthetic image */}
                  <img 
                    src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1600&auto=format&fit=crop" 
                    alt="Demo Cover" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-500 scale-100 group-hover:scale-105"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-24 h-24 bg-forest-600 rounded-full flex items-center justify-center pl-2 text-white shadow-[0_0_40px_rgba(52,174,117,0.5)] border-4 border-forest-400/30"
                    >
                      <Play size={48} fill="currentColor" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-white font-bold text-xl tracking-widest uppercase mb-1">Watch Demo</h3>
                      <p className="text-slate-300 text-sm">Automated Watering System V3</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* --- VIMEO PLAYER STATE --- */
                <iframe 
                  src="https://player.vimeo.com/video/1144596656?autoplay=1&title=0&byline=0&portrait=0" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full object-cover z-10"
                  title="BloomSense Demo"
                ></iframe>
              )}

              {/* Live Indicator (Only show when playing) */}
              {isPlaying && (
                <div className="absolute top-6 left-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-forest-500"></span>
                      </span>
                      <span className="text-white font-medium text-sm">Live Demo</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;