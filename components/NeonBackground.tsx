import React from 'react';

export const NeonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-50">
      <svg className="absolute inset-0 w-full h-full text-zinc-900" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e4e4e7" />
          </pattern>
        </defs>
        
        {/* Subtle Grid Background */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Central Composition Group */}
        <g transform="translate(50%, 50%)" style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
           {/* Center Black Sphere (100% Fill) */}
           <circle cx="50%" cy="50%" r="40" fill="#18181b" />
           
           {/* Concentric Rings - Thin, varying opacity */}
           <circle cx="50%" cy="50%" r="120" fill="none" stroke="#18181b" strokeWidth="1" opacity="0.1" />
           <circle cx="50%" cy="50%" r="280" fill="none" stroke="#18181b" strokeWidth="1" opacity="0.05" />
           <circle cx="50%" cy="50%" r="450" fill="none" stroke="#18181b" strokeWidth="1" opacity="0.03" />

           {/* Dashed Ring */}
           <circle cx="50%" cy="50%" r="200" fill="none" stroke="#18181b" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

           {/* Radial Lines (Data Flows) */}
           <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#18181b" strokeWidth="1" opacity="0.1" />
           <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#18181b" strokeWidth="1" opacity="0.1" />
           <line x1="50%" y1="50%" x2="10%" y2="40%" stroke="#18181b" strokeWidth="1" opacity="0.1" />
           <line x1="50%" y1="50%" x2="90%" y2="60%" stroke="#18181b" strokeWidth="1" opacity="0.1" />

           {/* Geometric Data Points on Rings */}
           <rect x="calc(50% + 116px)" y="calc(50% - 4px)" width="8" height="8" fill="#18181b" />
           <polygon points="calc(50% - 200px),50% calc(50% - 210px),calc(50% - 5px) calc(50% - 210px),calc(50% + 5px)" fill="#71717a" />
           <circle cx="calc(50% + 190px)" cy="calc(50% + 62px)" r="4" fill="#a1a1aa" />
        </g>
        
        {/* Asymmetric Floating Elements */}
        <g opacity="0.4">
            <line x1="10%" y1="10%" x2="20%" y2="10%" stroke="#18181b" strokeWidth="2" />
            <rect x="20%" y="9.5%" width="5" height="5" fill="#18181b" />
            <text x="10%" y="9%" className="text-[10px] font-mono fill-zinc-400">SYS.01</text>
        </g>

         <g opacity="0.4">
            <line x1="85%" y1="90%" x2="95%" y2="90%" stroke="#18181b" strokeWidth="2" />
            <circle cx="85%" cy="90%" r="3" fill="#18181b" />
            <text x="92%" y="89%" className="text-[10px] font-mono fill-zinc-400">NET.04</text>
        </g>
      </svg>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
    </div>
  );
};