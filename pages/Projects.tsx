import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../lib/data';
import { Project, Status, Priority } from '../lib/types';
import { ProjectCard } from '../components/ProjectCard';
import { Search, Plus, ListFilter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All');
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const filtered = projects.filter(p => {
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchPriority = filterPriority === 'All' || p.priority === filterPriority;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                        p.description.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPriority && matchSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight font-mono">PROJECT_REGISTRY</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Link 
                to="/projects/new"
                className="flex items-center justify-center gap-2 px-6 py-2 bg-zinc-900 hover:bg-zinc-700 text-white font-mono text-sm font-bold shadow-md transition-all rounded-sm"
            >
                <Plus size={16} />
                <span className="hidden md:inline">INIT_PROTOCOL</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input 
                  type="text" 
                  placeholder="SEARCH_INDEX..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-white border border-zinc-300 text-zinc-900 pl-10 pr-4 py-2 text-sm font-mono focus:outline-none focus:border-zinc-900 w-full md:w-64 rounded-sm"
                />
              </div>
              
              <div className="flex items-center gap-2 border border-zinc-300 bg-white px-2 rounded-sm">
                <ListFilter size={14} className="text-zinc-400" />
                <select 
                  className="bg-transparent text-zinc-900 py-2 text-sm font-mono focus:outline-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                >
                  <option value="All">STATUS: ALL</option>
                  <option value="Active">ACTIVE</option>
                  <option value="Backlog">BACKLOG</option>
                  <option value="Refinement">REFINEMENT</option>
                  <option value="Completed">COMPLETED</option>
                </select>
              </div>

              <select 
                className="bg-white border border-zinc-300 text-zinc-900 px-4 py-2 text-sm font-mono focus:outline-none focus:border-zinc-900 rounded-sm"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
              >
                <option value="All">PRIORITY: ALL</option>
                <option value="High">HIGH</option>
                <option value="Medium">MEDIUM</option>
                <option value="Low">LOW</option>
              </select>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20 border border-dashed border-zinc-300 bg-zinc-50">
          <p className="text-zinc-500 font-mono text-sm">NO_RECORDS_FOUND</p>
        </div>
      )}
    </div>
  );
};