import React from 'react';
import { motion } from 'framer-motion';

interface MetricsCardProps {
  label: string;
  value: number;
  sublabel: string;
  delay?: number;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ label, value, sublabel, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative bg-white border border-zinc-200 p-6 hover:shadow-md transition-shadow duration-300 group rounded-sm"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <h3 className="text-4xl font-bold font-mono text-zinc-900 mb-2 tracking-tighter">
        {value}
      </h3>
      <div className="flex items-center gap-2 mb-1">
        <div className="h-[1px] w-4 bg-zinc-400"></div>
        <div className="text-zinc-900 text-xs font-bold uppercase tracking-widest">{label}</div>
      </div>
      <div className="text-zinc-500 text-[10px] font-mono pl-6">{sublabel}</div>
      
      {/* Corner accents */}
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-zinc-200 group-hover:bg-zinc-900 transition-colors" />
    </motion.div>
  );
};