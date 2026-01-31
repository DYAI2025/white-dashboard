import React from 'react';
import { Project } from '../lib/types';
import { GitBranch, ArrowUpRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const priorityStyles = {
  High: 'border border-black bg-black text-white',
  Medium: 'border border-zinc-400 bg-white text-zinc-700',
  Low: 'border border-zinc-200 bg-zinc-50 text-zinc-500',
};

const statusStyles = {
  Backlog: 'text-zinc-400',
  Active: 'text-black font-bold',
  Refinement: 'text-zinc-600 italic',
  Completed: 'text-zinc-800 line-through decoration-zinc-400',
};

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="block h-full">
      <div className="h-full bg-white border border-zinc-200 hover:border-black transition-all duration-300 p-6 flex flex-col group rounded-sm hover:shadow-lg shadow-zinc-200">
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-zinc-900 font-mono group-hover:underline decoration-1 underline-offset-4">
              {project.name}
            </h3>
            <span className="text-[10px] text-zinc-400 font-mono mt-1 uppercase tracking-wider">
              LAST UPDATE: {new Date(project.updated_at).toLocaleDateString()}
            </span>
          </div>
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${priorityStyles[project.priority]}`}>
            {project.priority.charAt(0)}
          </span>
        </div>

        <p className="text-zinc-600 text-sm mb-6 flex-1 border-l-2 border-zinc-100 pl-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="text-[10px] uppercase font-bold px-1.5 py-0.5 border border-zinc-200 text-zinc-500">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
          <div className={`text-xs flex items-center gap-2 ${statusStyles[project.status]}`}>
             <div className={`w-1.5 h-1.5 ${project.status === 'Active' ? 'bg-black animate-pulse' : 'bg-zinc-300'}`}></div>
            {project.status.toUpperCase()}
          </div>
          
          <div className="flex gap-3 text-zinc-400">
            <GitBranch size={16} className="group-hover:text-black transition-colors" />
            <ArrowUpRight size={16} className="group-hover:text-black transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
};