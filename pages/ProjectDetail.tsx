import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectById } from '../lib/data';
import { Project } from '../lib/types';
import { ArrowLeft, Github, Globe, Box, Layers } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) fetchProjectById(id).then(setProject);
  }, [id]);

  if (!project) return <div className="p-10 text-center text-zinc-500 font-mono text-sm">FETCHING_PROTOCOL...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Link to="/projects" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-mono uppercase tracking-wide">
        <ArrowLeft size={14} /> Back to Registry
      </Link>

      <div className="bg-white border border-zinc-200 p-8 relative overflow-hidden shadow-sm">
         {/* Decorative Element */}
         <div className="absolute top-0 right-0 p-4 opacity-10">
             <div className="w-32 h-32 border-4 border-black rounded-full border-t-transparent animate-spin-slow"></div>
         </div>

         <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
            <div>
                <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-4xl font-bold text-zinc-900 font-mono tracking-tighter">{project.name.toUpperCase()}</h1>
                    <span className={`px-2 py-0.5 text-[10px] font-bold border uppercase tracking-widest ${project.priority === 'High' ? 'border-black bg-black text-white' : 'border-zinc-400 text-zinc-600'}`}>
                        {project.priority} PRIORITY
                    </span>
                </div>
                <p className="text-lg text-zinc-600 max-w-2xl font-sans leading-relaxed border-l-2 border-zinc-900 pl-4 mt-4">{project.description}</p>
                
                <div className="flex gap-4 mt-8">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white transition-colors text-sm font-bold rounded-sm">
                        <Github size={16} /> REPOSITORY
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 transition-colors text-sm font-bold rounded-sm">
                        <Globe size={16} /> LIVE_DEMO
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 min-w-[200px]">
                <div className="bg-zinc-50 p-4 border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1 tracking-widest">Current Status</span>
                    <span className="text-lg font-mono text-zinc-900 font-bold">{project.status.toUpperCase()}</span>
                </div>
                <div className="bg-zinc-50 p-4 border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1 tracking-widest">Pending Tasks</span>
                    <span className="text-lg font-mono text-zinc-900 font-bold">
                        {typeof project.tasks === 'object' && 'count' in (project.tasks || {}) 
                           ? (project.tasks as any).count 
                           : '0'} <span className="text-sm text-zinc-400 font-normal">UNITS</span>
                    </span>
                </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <section>
              <h3 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-zinc-200 pb-2">
                  <Box size={16} /> Stack_Manifest
              </h3>
              <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map(tech => (
                      <div key={tech} className="px-3 py-1 bg-white border border-zinc-300 text-zinc-700 font-mono text-xs uppercase font-bold">
                          {tech}
                      </div>
                  ))}
              </div>
          </section>

          {/* Tasks Placeholder */}
          <section>
              <h3 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-zinc-200 pb-2">
                  <Layers size={16} /> Modules
              </h3>
              <div className="space-y-3">
                  <div className="p-4 border border-zinc-200 bg-zinc-50 text-zinc-500 text-xs font-mono">
                      // DATABASE_CONNECTION_REQUIRED
                      <br/>
                      // UNABLE TO RETRIEVE TASK LIST
                  </div>
              </div>
          </section>
      </div>
    </div>
  );
};